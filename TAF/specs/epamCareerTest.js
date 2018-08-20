
'use strict';

const CareerPage = require('../pageObjects/CareerPage.js');
const JobPage = require('../pageObjects/JobPage.js');

describe('EPAM Career Page', function() {
    let careerPage, jobPage;

    careerPage = new CareerPage();
    jobPage = new JobPage();
    beforeAll(() => {
        careerPage.open();
    });

    it('should display logo and search form', function() {
        expect(careerPage.isLogoDisplayed()).toBeTruthy();  
        expect(careerPage.isSearchFormVisible()).toBeTruthy();    
    });

    it('should not find job with specified filters', function(done) {
        careerPage.setJobId('designer')
        .then(() => careerPage.setLocation('Belgium', 'Antwerp'))
        .then(() => careerPage.setSkills('Software Engineering'))
        .then(() => careerPage.clickToSearch())
        .then(() => expect(careerPage.getMessage()).toBe("Sorry, your search returned no results. Please try another combination."))
        .then(done);
    });

    it('should find job with specified filters', function(done) {
        let count = 0;
        careerPage.clearJobIdField()
        .then(() => careerPage.setLocation('Armenia', 'Yerevan'))
        .then(() => careerPage.setSkills('Cloud & DevOps'))
        .then(() => careerPage.clickToSearch())
        .then(() => {
            careerPage.getJobsCount().then(c => {
                count = c.length;
                expect(careerPage.getSearchResults()).toBe(`WE FOUND ${count} JOB OPENING FOR YOU`);
            });            
        }).then(done);
    });

    it('should match with job name', function() {
        expect(careerPage.getJobTitle()).toBe("Senior DevOps Engineer");
    });

    it('should match with job location', function() {
        expect(careerPage.getJobLocation()).toBe("YEREVAN, ARMENIA");
    });

    it('should display apply button', function() {
        expect(careerPage.isElementPresent()).toBeTruthy();
    });

    it('should click apply button and go to job page', function(done) {
        careerPage.clickToApply()
        .then(() => expect(jobPage.getPageTitle()).toBe("Senior DevOps Engineer"))
        .then(done);
    });

    it('should contains correct header', function() {
        expect(jobPage.getHeader()).toBe("Senior DevOps Engineer");
    });

    it('should contains correct location', function() {
        expect(jobPage.getLocation()).toBe("Yerevan, Armenia");
    });

    it('should contains job apply form', function() {
        expect(jobPage.getApplyForm()).toBeTruthy();
    });
    
    afterAll(() => {
        browser.quit();
    })
    
  });