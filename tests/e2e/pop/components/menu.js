const path = require('path');
const Components = require(path.resolve('./framework/po/component'));

class Menu extends Components {
    constructor(name = 'Menu',locator = '.drop-down-menu-section.products-list'){
        super(name, locator);
        this.defineElement('Feature', 'li:nth-of-type(2) a');
    }
}
module.exports = Menu;