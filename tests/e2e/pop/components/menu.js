const path = require('path');
const Components = require(path.resolve('./framework/po/Component'));
const UserDropdown = require('../components/userDropdown');

class Menu extends Components {
    constructor(name = 'Menu',locator = 'header'){
        super(name, locator);
        this.defineComponent('User Dropdown', new UserDropdown());
        this.defineElement('User Button', '.header__dropdownButton___2lGJo');
        this.defineElement('Feature', '#nav-features-link');
        this.defineElement('Search', 'input[type="search"]');
        this.defineElement('Login', 'a[href="/login"]');
        this.defineElement('Dropdown Button', '.header__dropdownButton___2lGJo');
    }
}
module.exports = Menu;