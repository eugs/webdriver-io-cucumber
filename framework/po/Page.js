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
        const chainLink = {
            component: this,
            locator: '',
            isCollection: false
        };

        const tokens = elementPath.split(/\s*->\s*/);
        const initValue = this._elementDependsOnType(tokens.shift(), chainLink);
        const resultChainLink = tokens.reduce((currentChainLink, token) => this._elementDependsOnType(token, currentChainLink), initValue);

        if (resultChainLink.isCollection) {
            return browser.elements(resultChainLink.locator).value;
        } else {
            return browser.element(resultChainLink.locator);
        }
    }

    /**
     * Defines is it some element of the collection or just the element
     * @param {String} name - element name
     */
    _isArray(name) {
        if (name.includes('#')) {
            let tempArray = name.split(/\s*of\s*/);
            let collectionName = tempArray[1];
            let orderNum = tempArray[0].substr(1);
            return { name: collectionName, orderNum };
        } else {
            return { name };
        }
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

        newChainLink.isCollection = false;

        if (chainLink.component.components.has(elementName.name)) {
            const component = chainLink.component.components.get(elementName.name);

            if (component instanceof Component) {
                newChainLink.component = component;
                newChainLink.locator = constructLocator(component.locator, chainLink.locator);
            } else if (component instanceof Collection) {
                newChainLink.component = component;

                if (elementName.orderNum) {
                    newChainLink.locator = constructLocator(`${component.locator}:nth-child(${elementName.orderNum})`, chainLink.locator);
                } else {
                    newChainLink.locator = constructLocator(component.locator, chainLink.locator);
                    newChainLink.isCollection = true;
                }

            } else if (typeof component === 'string') {
                newChainLink.component = null;
                newChainLink.locator = constructLocator(component, chainLink.locator);
            }

        } else {
            throw new Error(`Element '${elementName.name}' isn't defined on the page!`);
        }

        return newChainLink;

        function constructLocator(childLocator, parentLocator) {
            return parentLocator
                ? newChainLink.locator = parentLocator + ' ' + childLocator
                : newChainLink.locator = childLocator;
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