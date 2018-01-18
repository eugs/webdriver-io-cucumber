const {defineSupportCode} = require('cucumber');
const expect = require('chai').expect;
const state = require('../pop/index');

defineSupportCode(({Given, When, Then, And, setDefaultTimeout})=>{
    setDefaultTimeout(60*1000);
    Given(/^I am on "(.*)" page$/,(page)=>{
        browser.url(browser.options.baseUrl+state.setPage(page).pageUrl);
    });
    When(/^I click on "(.*)" button$/,(button)=>{
        state.getPage().getElement(button).click();
    });
    Then(/^I should be on "(.*)" page$/,(page)=>{
        expect(browser.getUrl()).to.eql(browser.options.baseUrl+state.getPage().pageUrl);
    });
    Then(/^I wait "(.*)" second\(s\)$/,(time)=>{
        browser.pause(time*1000);
    });
});