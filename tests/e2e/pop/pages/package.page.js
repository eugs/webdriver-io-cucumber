const path = require('path');
const Page = require(path.resolve('./framework/po/Page'));

class Package extends Page {
    constructor(selector = 'body', url = '/package'){
        super(selector,url);
        this.defineElement('Active Readme Tab', 'li.tabs__tabActive___29JkF a[href="?activeTab=readme"]');
        this.defineElement('Readme Tab', 'li a[href="?activeTab=readme"]');
        this.defineElement('Readme Info', '#readme');

        this.defineElement('Active Dependencies Tab', 'li.tabs__tabActive___29JkF a[href="?activeTab=dependencies"]');
        this.defineElement('Dependencies Tab', 'li a[href="?activeTab=dependencies"]');
        this.defineElement('Dependencies Info', '#dependencies');

        this.defineElement('Active Dependents Tab', 'li.tabs__tabActive___29JkF a[href="?activeTab=dependents"]');
        this.defineElement('Dependents Tab', 'li a[href="?activeTab=dependents"]');
        this.defineElement('Dependents Info', '#dependents');

        this.defineElement('Active Versions Tab', 'li.tabs__tabActive___29JkF a[href="?activeTab=versions"]');
        this.defineElement('Versions Tab', 'li a[href="?activeTab=versions"]');
        this.defineElement('Versions Info', '#versions');

        this.defineCollection('Versions', 'a.versions__versions___2MpNL');
    }
}

module.exports = Package;