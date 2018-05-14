const path = require('path');
const Components = require(path.resolve('./framework/po/Component'));

class UserDropdown extends Components {
    constructor(name = 'User Dropdown',locator = '.header__userDropdown___8SWAs'){
        super(name, locator);
        this.defineElement('Logout', '.header__userLogout___15XaS');
    }
}
module.exports = UserDropdown;