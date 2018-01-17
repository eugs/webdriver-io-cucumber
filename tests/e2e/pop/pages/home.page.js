const path = require('path');
const Page = require(path.resolve('./framework/po/page'));
const Menu = require('../components/menu');

class Home extends Page {
    constructor(selector = '.screen-fill-body', url = '/'){
        super(selector,url);
        this.defineComponent('Menu', new Menu());
    }
}

module.exports = Home;