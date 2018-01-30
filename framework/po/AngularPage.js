const Page = require("./Page");
const Component = require('./Component');
const Collection = require('./Collection');

class AngularPage extends Page {
    constructor(locator, url = '/') {
        super(locator);
        this.pageUrl = url;
    }

    waitAngular() {
        let rootElement = browser.options.rootElement;
        browser.waitUntil(() => {
            return browser.execute((rootElement) => {
                if (window.angular == undefined) {
                    return true;
                } else {
                    var r = false;
                    window.angular.getTestability(window.document.getElementsByTagName(rootElement)).whenStable(function () { r = true; });
                    return r;
                }
            }, rootElement).value;
        }, browser.options.waitforTimeout);
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
            this.waitAngular();
            currentChainLink = this._elementDependsOnType(tokens.pop(), currentChainLink);
        }
        return currentChainLink.element;

    }
}
module.exports = AngularPage;