const AbstractComponent = require("./abstractComponent");

class Component extends AbstractComponent{
    constructor(name, locator){
        super(locator);
        // this.locator = locator;
        // this.name = name;
        this.components.set(name,locator);
        // this.components = new Map();
    }
    //TODO Delete
    // defineElement(name, locator){
    //     this.components.set(name, locator);
    // }
    //
    // defineCollection(name){
    //     return this.components.get(name);
    // }
    //
    // defineComponent(name){
    //     return this.components.get(name);
    // }

}

module.exports = Component;