
exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
  
    onPrepare() {
      browser.driver.manage().window().maximize();
      browser.ignoreSynchronization = true;
    },
    capabilities: {
        browserName: 'chrome'
    },
    jasmineNodeOpts: {
        defaultTimeoutInterval: 240000
    },
    specs: ['./specs/epamCareerTest.js'],
  
  };