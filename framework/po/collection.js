const AbstractComponent = require("./abstractComponent");

class Collection extends AbstractComponent{
    constructor(name, locator){
        super(locator);
        this.components.set(name,locator);
    }
}

module.exports = Collection;