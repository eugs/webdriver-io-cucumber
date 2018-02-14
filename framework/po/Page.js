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
        console.log('HERE!!!!');
        let chainLink = {
            component: this,
            locator: ''
        };

        let tokens = elementPath.split(' -> ').reverse();
        console.log(tokens);
        let currentChainLink = chainLink;
        console.log(tokens.length);
        
        while (tokens.length > 0) {
            console.log(tokens.length);
            currentChainLink = this._elementDependsOnType(tokens.pop(), currentChainLink);
            console.log('here2');

        }
        console.log(currentChainLink);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!');

        if (currentChainLink.isCollection) {
            // browser.waitUntil(() => browser.elements(currentChainLink.locator), WAIT_FOR_ELEMENT);
            return browser.elements(currentChainLink.locator);
        } else {
            //browser.waitUntil(() => browser.element(currentChainLink.locator), WAIT_FOR_ELEMENT);
            console.log(browser.element(currentChainLink.locator));
            return browser.element(currentChainLink.locator);
        }
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

    _waitForElement(elementLocator, parent) {
        if (parent) {
            browser.waitUntil(() => parent.$(elementLocator), WAIT_FOR_ELEMENT);
            return parent.$(elementLocator);
        } else {
            browser.waitUntil(() => $(elementLocator), WAIT_FOR_ELEMENT);
            return $(elementLocator);
        }
    }

    _waitForCollection(elementLocator, parent) {
        if (parent) {
            browser.waitUntil(() => parent.$$(elementLocator), WAIT_FOR_ELEMENT);
            return parent.$$(elementLocator);
        } else {
            browser.waitUntil(() => $$(elementLocator), WAIT_FOR_ELEMENT);
            return $$(elementLocator);
        }
    }

    _waitForElementOfCollection(elementLocator, orderNum, parent) {
        if (parent) {
            browser.waitUntil(() => parent.$$(elementLocator)[orderNum], WAIT_FOR_ELEMENT);
            return parent.$$(elementLocator)[orderNum];
        } else {
            browser.waitUntil(() => $$(elementLocator)[orderNum], WAIT_FOR_ELEMENT);
            return $$(elementLocator)[orderNum];
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
        let newChainLink = {};
        newChainLink.isCollection = false;
        console.log('2222222222222222222222');
        // console.log(chainLink);
        if (chainLink.component.components.has(elementName.name)) {
            const component = chainLink.component.components.get(elementName.name);
            console.log('+++++');
            // console.log(component);

            if (component instanceof Component) {
                console.log('11111111111111111');
                newChainLink.component = component;
                chainLink.locator
                    ? newChainLink.locator = chainLink.locator + ' ' + component.locator
                    : newChainLink.locator = component.locator;
                console.log(newChainLink.locator);
                // chainLink.element
                //     ? newChainLink.element = this._waitForElement(component.locator, chainLink.element)
                //     : newChainLink.element = this._waitForElement(component.locator);

            } else if (component instanceof Collection) {
                newChainLink.component = component;

                if (elementName.orderNum) {
                    chainLink.locator
                        ? newChainLink.locator = chainLink.locator + ' ' + component.locator + ':nth-child(' + [elementName.orderNum] + ')'
                        : newChainLink.locator = component.locator + ':nth-child(' + [elementName.orderNum] + ')';
                } else {
                    chainLink.locator
                        ? newChainLink.locator = chainLink.locator + ' ' + component.locator
                        : newChainLink.locator = component.locator;
                    newChainLink.isCollection = true;
                }

            } else if (typeof component === 'string') {
                newChainLink.component = null;
                console.log('here');
                //console.log(chainLink.locator);
                chainLink.locator
                    ? newChainLink.locator = chainLink.locator + ' ' + component
                    : newChainLink.locator = component;
                console.log(newChainLink.locator);
            }
            
        } else {
            throw new Error(`Element '${elementName.name}' isn't defined on the page!`);
        }
        return newChainLink;

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