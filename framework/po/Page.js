const AbstractComponent = require("./AbstractComponent");
const Component = require('./Component');
const Collection = require('./Collection');
const WAIT_FOR_ELEMENT = 60 * 1000;

class Page extends AbstractComponent {
    constructor(locator, url = '/') {
        super(locator);
        this.pageUrl = url;
    }

    /**
     * Returns webdriverio element by the element name from the page object
     * @param {String} elementPath - element name or full path to element
     */
    getElement(elementPath) {
        /**
         * @type {{component: Page, element: null}}
         */
        let currentChainLink = {
            component: this,
            element: null
        };
        const tokens = elementPath.split(' -> ').reverse();
        while (tokens.length > 0) {
            currentChainLink = this._elementDependsOnType(tokens.pop(), currentChainLink);
        }
        return currentChainLink.element;
    }

    /**
     * Defines is it some element of the collection or just the element
     * @param {String} name - element name
     */
    _isArray(name) {
        if (name.includes('#')) {
            let tempArray = name.split(' of ');
            let collectionName = tempArray[1];
            let orderNum = parseInt(tempArray[0].substr(1)) - 1;
            return { name: collectionName, orderNum };
        } else {
            return { name };
        }
    }

    /**
     * 
     * @param {Object} element 
     * @returns {Object}
     * @private
     */
    _waitForElement(element) {
        browser.waitUntil(() => { return element; }, WAIT_FOR_ELEMENT);
        return element;
    }

    /**
     *
     * @param {String} name
     * @param {Object} chainLink {{component: Page, element: null}}
     * @return {Object}
     * @private
     */
    _elementDependsOnType(name, chainLink) {
        const elementName = this._isArray(name);
        const newChainLink = {};

        if (chainLink.component.components.has(elementName.name)) {
            const component = chainLink.component.components.get(elementName.name);
            newChainLink.component = component;

            if (component instanceof Component) {
                newChainLink.element = this._getElementsDependsOnCollection(chainLink, newChainLink.component.locator);

            } else if (component instanceof Collection) {
                newChainLink.element = this._getElementsDependsOnCollection(chainLink, newChainLink.component.locator, true, elementName.orderNum);

            } else if (typeof component === 'string') {
                newChainLink.element = this._getElementsDependsOnCollection(chainLink, newChainLink.component);
            }
            return newChainLink;
        } else {
            throw new Error(`Element '${elementName.name}' isn't defined on the page!`);
        }
    }

    /**
     * 
     * @param {Object} parent 
     * @param {Object} newElement 
     * @param {Boolean} isCollection 
     * @param {Number} orderNum 
     */
    _getElementsDependsOnCollection(parent, newElement, isCollection, orderNum) {
        if (this._isParentACollection(parent)) {
            return parent.element.map(el => {
                if (isCollection) {
                    return this._getElementsIfCollection(el, newElement, orderNum)
                } else {
                    return this._waitForElement(el.$(newElement));
                }
            })
        } else {
            if (isCollection) {
                return this._waitForElement(this._getElementsIfCollection(parent.element, newElement, orderNum))
            } else {
                return parent.element
                    ? this._waitForElement(parent.element.$(newElement))
                    : this._waitForElement($(newElement))
            }
        }
    }

    /**
     * 
     * @param {Object | Array} parent 
     */
    _isParentACollection(parent) {
        return Array.isArray(parent.element);
    }

    /**
     * 
     * @param {Object} parent 
     * @param {Object} newElement 
     * @param {Number} orderNum 
     */
    _getElementsIfCollection(parent, newElement, orderNum) {
        if (orderNum != undefined && parent) {
            return parent.$$(newElement)[orderNum];
        } else if (orderNum != undefined) {
            return $$(newElement)[orderNum];
        } else if (parent) {
            return parent.$$(newElement);
        } else {
            return $$(newElement);
        }
    }

    /**
     * Set new collection by selector or collection object
     * @param {String} name - collection name
     * @param {String|Collection} selector - can be selector of collection or collection object
     */
    defineCollection(name, selector) {
        if (selector instanceof Collection) {
            this.components.set(name, selector);
        } else {
            this.components.set(name, new Collection(name, selector));
        }
    }

}

module.exports = Page;