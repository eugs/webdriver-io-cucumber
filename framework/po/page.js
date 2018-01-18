const AbstractComponent = require("./abstractComponent");
const Component = require('./component');
const Collection = require('./collection');

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
        let currentElement;
        let currentComponent = this;
        let that = this;
        if (elementPath.includes(' ->')) {
            let elements = elementPath.split(' -> ').reverse();
            let element;
            while (elements.length > 0) {
                element = elements.pop();
                elementDependsOnType(element);
            }
        } else {
            elementDependsOnType(elementPath);
        }

        return currentElement;

        function elementDependsOnType(name) {
            let elementName = that._isArray(name);
            if (currentComponent.components.has(elementName.name)) {
                let component = currentComponent.components.get(elementName.name);

                if (component instanceof Component) {
                    currentComponent = component;

                    currentElement
                        ? currentElement = currentElement.$(component.locator)
                        : currentElement = $(component.locator);

                } else if (component instanceof Collection) {
                    currentComponent = component;

                    currentElement
                        ? currentElement = currentElement.$$(component.locator)[elementName.orderNum]
                        : currentElement = $$(component.locator)[elementName.orderNum];

                } else if (typeof component === 'string') {
                    currentComponent = null;

                    currentElement
                        ? currentElement = currentElement.$(component)
                        : currentElement = $(component);
                }
            } else {
                throw new Error(`Element '${elementName.name}' isn't defined on the page!`);
            }
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
            return {name: collectionName, orderNum};
        } else {
            return {name};
        }
    }


}

module.exports = Page;