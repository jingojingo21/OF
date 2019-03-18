//const sanitize = require('sanitize-filename');
//const _ = require('lodash');
//const { browser } = require('./driver');
/*
module.exports = function() {

  this.After(function(scenario) {
   // let promise = null;
  //  if (scenario.isFailed()) {
    //  promise = this.screenshot.create(sanitize(_.toLower(scenario.getName()) + ".png").replace(/ /g, "_"));
  //  }
   // return promise;
  });

  this.After(function() {
    return this.browser.manage().deleteAllCookies();
  });

  this.registerHandler("AfterFeatures", function() {
    return this.browser.quit();
  });

};
*/

var {After,AfterAll, Before} = require('cucumber');

// Synchronous
/*Before(function () {
  this.count = 0;
});*/

// Asynchronous Callback
/*Before(function (testCase, callback) {
  var world = this;
  tmp.dir({unsafeCleanup: true}, function(error, dir) {
    if (error) {
      callback(error);
    } else {
      world.tmpDir = dir;
      callback();
    }
  });
});*/

// Asynchronous Promise
After(function () {
  // Assuming this.driver is a selenium webdriver
   return this.browser.quit();
});