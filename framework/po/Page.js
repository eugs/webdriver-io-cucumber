const AbstractComponent = require("./AbstractComponent");
const Component = require('./Component');
const Collection = require('./Collection');

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
        const chainLink = {
            component: this,
            element: null
        };

        const tokens = elementPath.split(' -> ').reverse();

        let currentChainLink = chainLink;

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
            let orderNum = tempArray[0].substr(1);
            return { name: collectionName, orderNum };
        } else {
            return { name };
        }
    }

    _waitForElement(elementName) {
        browser.waitUntil(() => {
            return state.getPage().getElement(elementName);
        }, WAIT_FOR_ELEMENT);
    }

    /**
     *
     * @param name
     * @param chainLink {{component: Page, element: null}}
     * @return {*}
     * @private
     */
    _elementDependsOnType(name, chainLink) {
        const elementName = this._isArray(name);
        const newChainLink = {};

        if (chainLink.component.components.has(elementName.name)) {
            const component = chainLink.component.components.get(elementName.name);

            if (component instanceof Component) {
                newChainLink.component = component;
                if (chainLink.element) {
                    _waitForElement(chainLink.element.$(component.locator));
                    newChainLink.element = chainLink.element.$(component.locator);
                } else {
                    _waitForElement($(component.locator));
                    newChainLink.element = $(component.locator);
                }
            } else if (component instanceof Collection) {
                newChainLink.component = component;

                if (elementName.orderNum) {
                    if (chainLink.element) {
                        _waitForElement(chainLink.element.$$(component.locator)[elementName.orderNum]);
                        newChainLink.element = chainLink.element.$$(component.locator)[elementName.orderNum]
                    } else {
                        _waitForElement($$(component.locator)[elementName.orderNum]);
                        newChainLink.element = $$(component.locator)[elementName.orderNum];
                    }
                } else {
                    if (chainLink.element) {
                        _waitForElement(chainLink.element.$$(component.locator));
                        newChainLink.element = chainLink.element.$$(component.locator);
                    } else {
                        _waitForElement($$(component.locator));
                        newChainLink.element = $$(component.locator);
                    }
                }

            } else if (typeof component === 'string') {
                newChainLink.component = null;
                if (chainLink.element) {
                    _waitForElement(chainLink.element.$(component));
                    newChainLink.element = chainLink.element.$(component);
                } else {
                    _waitForElement($(component));
                    newChainLink.element = $(component);
                }
            }
        } else {
            throw new Error(`Element '${elementName.name}' isn't defined on the page!`);
        }

        return newChainLink
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