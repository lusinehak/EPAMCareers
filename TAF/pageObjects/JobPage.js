'use strict';

class JobPage {
    constructor() {
        this.header = element(by.css('header.recruiting-page__header > h1'));
        this.location = element(by.css('ul.recruiting-page__location'));
        this.applyForm = element(by.css('div.form-constructor .section'));
    }
    // Get page title
    getPageTitle() {
        return browser.getTitle();
    }
    // Get job title from job page
    getHeader() {
        return this.header.getText();
    }
    // Get job location
    getLocation() {
        return this.location.getText();
    }
    // make sure apply form exists
    getApplyForm() {
        return this.applyForm.isDisplayed();
    }
}

module.exports = JobPage;