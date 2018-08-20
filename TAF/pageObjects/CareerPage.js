'use strict';

const ec = protractor.ExpectedConditions;
const DELAY = 5000;

class CareerPage {
    constructor() {
        this.logo = element(by.css('a.header__logo-container'));
        this.searchForm  = element(by.css('div.recruiting-search-ui.job-search-ui.multi-select-filter-wrapper'));
        this.jobId = element(by.id('new_form_job_search_1445745853_copy-keyword'));
        this.location = element(by.css('div.selection'));
        this.country = "//strong[text()='$']";
        this.city = "//li[text()='$']";
        this.skills = element(by.css('div.selected-params'));
        this.skillName = "//span[contains(text(), '$')]";
        this.find = element(by.css('button.recruiting-search__submit'));
        this.noSearchResults = element(by.css('.search-result__error-message'));
        this.apply = element(by.css('a.search-result__item-apply'));
        this.searchHeading = element(by.css('.search-result__heading'));
        this.searchResultList = element.all(by.xpath("//div[@class='search-result__list']//footer/div/a"));
        this.jobTitle = element(by.css('a.search-result__item-name'));
        this.jobLocation = element(by.css('strong.search-result__location'));
    }
    // Open the epam career page
    open() {
        browser.get('https://epam.com/careers');
    }
    // Make sure that epam logo is displayed
    isLogoDisplayed() {
        return this.logo.isDisplayed();  
    }
    // Make sure that job search form is displayed
    isSearchFormVisible() {
        return this.logo.isDisplayed(); 
    }
    // Type job id or keywoed
    setJobId(job) {
        return this.jobId.sendKeys(job);
    }
    // Set county/city 
    setLocation(country, city) {
        return this.location.click()
            // Get rid of sleep command
            .then(() => browser.sleep(1000))
            .then(() => element(by.xpath(this.country.replace('$', country))).click())
            .then(() => element(by.xpath(this.city.replace('$', city))).click());
    }
    // Set skills
    setSkills(skill) {
        return this.skills.click()
            .then(() => element(by.xpath(this.skillName.replace('$', skill))).click())
            .then(() => this.skills.click());
    }
    // Click to find a job
    clickToSearch() {
        return this.find.click();
    }
    // Get success massage
    getSearchResults() {
        browser.wait(ec.visibilityOf(this.searchHeading), DELAY);
        return this.searchHeading.getText();
    }  
    // Get no results message 
    getMessage() {
        browser.wait(ec.visibilityOf(this.noSearchResults), DELAY);
        return this.noSearchResults.getText();
    }
    // Clear job id field
    clearJobIdField() {
        return this.jobId.clear();
    }
    // Get count of jobs found
    getJobsCount() {
        browser.wait(ec.visibilityOf(this.searchHeading), DELAY);
        return this.searchResultList.getText();
    }
    // Get job title from the found item
    getJobTitle() {
        return this.jobTitle.getText();
    }
    // Get job location 
    getJobLocation() {
        return this.jobLocation.getText();
    }
    // make sure that apply button exists
    isElementPresent() {
        return this.apply.isDisplayed();
    }
    // Apply for the job
    clickToApply() {
        return this.apply.click();
    }
    //TODO add check for element existance before clicking or typeing on it.
} 

module.exports = CareerPage;