const path = require('path');
const Page = require(path.resolve('./framework/po/page'));
const Menu = require('../components/menu');
const Packages = require('../collections/packages');

class Home extends Page {
    constructor(selector = '.screen-fill-body', url = '/'){
        super(selector,url);
        this.defineComponent('Menu', new Menu());
        this.defineComponent('Packages', new Packages());
    }
}

module.exports = Home;