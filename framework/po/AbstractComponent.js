"use strict";
const Collection = require('./Collection');

/**
 * @abstract
 * @type AbstractComponent
 */
class AbstractComponent {
    constructor(locator) {
        this.locator = locator;
        this.components = new Map();
    }

    /**
     * Define Element on component or page
     * @param name - element name
     * @param selector - element locator
     */
    defineElement(name, selector) {
        this.components.set(name, selector);
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

    /**
     * Define component
     * @param name
     * @param selector
     */
    defineComponent(name, selector) {
        this.components.set(name, selector);
    }

}

module.exports = AbstractComponent;