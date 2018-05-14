const path = require('path');
const Page = require(path.resolve('./framework/po/Page'));

class Login extends Page {
    constructor(selector = '.liminal__container___vssy9', url = '/login'){
        super(selector,url);
        this.defineElement('Username', '#login_username');
        this.defineElement('Password', '#login_password');
        this.defineElement('Login', '.forms__btnPrimary___3eEPx');

    }
}

module.exports = Login;