const AbstractComponent = require("./abstractComponent");

class Component extends AbstractComponent{
    constructor(name, locator){
        super(locator);
        this.components.set(name,locator);
    }
}

module.exports = Component;