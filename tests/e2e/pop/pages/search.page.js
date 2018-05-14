const path = require('path');
const Page = require(path.resolve('./framework/po/Page'));
const Menu = require('../components/menu');
const Package = require('../components/package');

class Search extends Page {
    constructor(selector = 'body', url = '/search'){
        super(selector,url);
        this.defineComponent('Menu', new Menu());
        this.defineCollection('Package', new Package());
    }
}

module.exports = Search;