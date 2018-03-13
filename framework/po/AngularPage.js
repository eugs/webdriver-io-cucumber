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
     * @param {String} withoutSync - flag (will not wait synchronization with Angular)
     */
    getElement(elementPath, withoutSync) {
        if (!withoutSync) {
            this.waitAngular();
        }
        return super.getElement(elementPath);

    }
}
module.exports = AngularPage;