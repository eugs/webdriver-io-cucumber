const { defineSupportCode } = require('cucumber');
const expect = require('chai').expect;
const state = require('../pop/index');

defineSupportCode(({ Given, When, Then, And, setDefaultTimeout }) => {
    setDefaultTimeout(60 * 1000);
    Given(/^I am on "(.*)" page$/, (page) => {
        browser.url(browser.options.baseUrl + state.getPageByName(page).pageUrl);
    });
    When(/^I click on "(.*)" button$/, (button) => {
        let element = state.getPage().getElement(button);
        element.click();
    });
    Then(/^I should be on "(.*)" page$/, (page) => {
        browser.waitUntil(() =>{
            return browser.getUrl().search(state.getPageByName(page).pageUrl) !== -1
        });
    });

    Then(/^I wait "(.*)" second\(s\)$/, (time) => {
        browser.pause(time * 1000);
    });

    Then(/^I press "(.*)" key$/, (key) => {
        browser.keys(key);
    });

    Then(/^I enter text "(.*)" in "(.*)" element$/, (text, field) => {
        text = browser.options.memory.getValue(text);
        let element = state.getPage().getElement(field);
        element.setValue(text);
    });

    Then(/^Element "(.*)" should be visible$/, (element) => {
        expect(state.getPage().getElement(element).isVisible()).to.eql(true);
    });

    Then(/^I wait element "(.*)" visibility for "(.*)" seconds$/, (element, timeout) => {
        browser.waitUntil(() => {
            return state.getPage().getElement(element)
        }, timeout*1000)
    });

    Then(/^I'm looking for "(.*)" value of "(.*)" elements and click it$/, (value, element) => {
        let elementCollection = state.getPage().getElement(element);
        let separatedCollection = elementCollection.filter(el => el.getText() === value);
        separatedCollection[0].click();
    });

    Then(/^Check sorted "(.*)" element values$/, (element) => {
        element = state.getPage().getElement(element);
        const elementText = element.map((el) => {
            return el.getText();
        });
        const sortedElementText = elementText.slice().sort().reverse();
        expect(elementText.toString()).to.equal(sortedElementText.toString());
    });
});
