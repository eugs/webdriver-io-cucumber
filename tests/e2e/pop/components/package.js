const path = require('path');
const Collection = require(path.resolve('./framework/po/Collection'));

class Package extends Collection {
    constructor(name = 'Package',locator = 'section'){
        super(name, locator);
        this.defineElement('Package Name', 'h3');
        this.defineElement('Publisher Name', 'a.item__publisherName___3I3K2');
        this.defineElement('Description', 'p');
        this.defineCollection('Dependencies', 'a.package-list-item__keyword___3nFbv')
    }
}
module.exports = Package;