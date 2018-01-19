"use strict";

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
     * Define collection
     * @param name
     * @param selector
     */
    defineCollection(name, selector) {
        this.components.set(name, selector);
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