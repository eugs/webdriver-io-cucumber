const { defineSupportCode } = require('cucumber');
const state = require('../pop/index');
const expect = require('chai').expect;

defineSupportCode(({ Before, After, setDefaultTimeout }) => {
    setDefaultTimeout(60 * 1000);

    Before({tags: '@login'}, () => {
        browser.url(browser.options.baseUrl + state.getPageByName('Home').pageUrl);
        state.getPage().getElement('Menu -> Login').click();
        browser.pause(2000);
        expect(browser.getUrl()).to.eql(browser.options.baseUrl + state.getPageByName('Login').pageUrl);
        state.getPage().getElement('Username').setValue('maksimliubinski');
        state.getPage().getElement('Password').setValue('npmjspassword');
        state.getPage().getElement('Login').click();
        expect(browser.getUrl()).to.eql(browser.options.baseUrl + state.getPageByName('Home').pageUrl);
    });

    After({tags: '@logout'}, () => {
        browser.url(browser.options.baseUrl + state.getPageByName('Home').pageUrl);
        state.getPage().getElement('Menu -> User Button').click();
        // state.getPage().getElement('Menu -> User Dropdown -> Logout').waitForVisible(2000);
        state.getPage().getElement('Menu -> User Dropdown -> Logout').click();
        expect(browser.getUrl()).to.eql(browser.options.baseUrl + state.getPageByName('Home').pageUrl);
        expect(state.getPage().getElement('Menu -> Login').isVisible()).to.eql(true);
    });

});