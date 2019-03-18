//const { driver, browser } = require('./driver');
/*const driver = require("selenium-webdriver");
const browser = new driver.Builder().withCapabilities(driver.Capabilities.chrome()).build();


module.exports = function World() {
  this.driver = driver;
  this.browser = browser;
}; */

var {setWorldConstructor} = require('cucumber');
var seleniumWebdriver = require('selenium-webdriver');

function CustomWorld() {
  this.browser = new seleniumWebdriver.Builder().withCapabilities(seleniumWebdriver.Capabilities.chrome()).build();

  // Returns a promise that resolves to the element
  this.waitForElement = function(locator) {
    var condition = seleniumWebdriver.until.elementLocated(locator);
    return this.browser.wait(condition)
  }
 
}

setWorldConstructor(CustomWorld)

