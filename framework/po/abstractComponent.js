"use strict";

/**
 * @abstract
 * @type AbstractComponent
 */
class AbstractComponent {
    constructor(locator){
        this.locator = locator;
        this.components = new Map();
    }

    /**
     * Define Element on component or page
     * @param name - element name
     * @param selector - element locator
     * @param component -
     */
    defineElement(name, selector, component){
        if (this.components.has(component)){
            this.components.get(component).set(name, selector);
        }else{
            this.components.set(name,selector);
        }
    }

    defineCollection(name, selector, component){
        if (this.components.has(component)){
            this.components.get(component).set(name, selector);
        }else{
            this.components.set(name,selector);
        }
    }

    defineComponent(name, selector, component){
        if (this.components.has(component)){
            this.components.get(component).set(name, selector);
        }else{
            this.components.set(name,selector);
        }

        // component?this.components.get(component).set(name, selector):this.components.set(name,selector);
    }

}

module.exports = AbstractComponent;