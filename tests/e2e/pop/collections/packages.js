const path = require('path');
const Collection = require(path.resolve('./framework/po/collection'));

class Packages extends Collection {
    constructor(name = 'Packages',locator = '.marginalia-container a>img'){
        super(name, locator);
        // this.defineElement('Feature', 'li:nth-of-type(2) a');
    }
}
module.exports = Packages;