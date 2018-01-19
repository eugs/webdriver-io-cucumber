const AbstractComponent = require("./AbstractComponent");

class Collection extends AbstractComponent {
    constructor(name, locator) {
        super(locator);
        this.components.set(name, locator);
    }
}

module.exports = Collection;