const AbstractComponent = require("./AbstractComponent");

class Component extends AbstractComponent {
    constructor(name, locator) {
        super(locator);
        this.components.set(name, locator);
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

module.exports = Component;