const {defineSupportCode} = require('cucumber');
const expect = require('chai').expect;

defineSupportCode(({Given, When, Then, And, setDefaultTimeout})=>{
    setDefaultTimeout(60*1000);
    Given(/^I am on "(.*)" page$/,(page)=>{
        if (page === 'Home'){
            browser.url('https://www.npmjs.com/');
        }
        if (page === 'Features'){
            browser.url('https://www.npmjs.com/features');
        }
    });
    When(/^I click on "(.*)" button$/,(button)=>{
        if (button === 'Features'){
            browser.click('#nav-features-link');
        }
    });
    Then(/^I should be on "(.*)" page$/,(page)=>{
        if (page === 'Features'){
            let url = browser.getUrl();
            expect(url).to.eql('https://www.npmjs.com/features');
        }
    });
})