let webdriver = require('selenium-webdriver');
By = webdriver.By;
until = webdriver.until;
var waitTime = 2000;
const config = require('./../../config.json');
const _ = require('lodash');

function cart(browser, done) {
   this.browser = browser;
    this.done = done;
    this.getDiscount = function () {
        var xpath = "//ul[@class='list-unstyled']//li//div[@class='col-xs-3 text-right']"
        return new Promise(function(resolved,rejected){
            browser.wait(until.elementsLocated(By.xpath(xpath)), waitTime, "could not find items").then(function (items) {
            Promise.all(items).then(function (values) {
                var prs = [];
                for (var i = 0, len = values.length; i < len; i++) {
                    prs.push(values[i].getText());
                }(until.elementLocated)
                Promise.all(prs).then(function (prices) {
                    var total = 0;
                    for (var i = 0; i < prices.length; i++) {
                        total += parseFloat(prices[i].substr(1));
                    }
                    var discount = 0;
                    if(total > 100)
                        discount = total * 0.10;

                    resolved(discount);
                },function(message){
                    rejected(message);
                })
            },function(message){
                rejected(message);
            })
        });
        })
        
    }
    this.getDiscountElement = function () {
        var css = "p.text-discount.text-right"
        return this.browser.wait(until.elementLocated(By.css(css)), waitTime, "could not find discount element")
    }
    this.getDonationElement= function () {
        var xpath = "//ul[@class='list-unstyled']//li//p//small//em[contains(text(),'100% of your donation goes to the local SPCA')]"
        return this.browser.wait(until.elementLocated(By.xpath(xpath)), waitTime, "could not find donation element")
    }
     this.getTotalCostElement= function () {
        var xpath = "//ul[@class='list-unstyled']//li//div[@class='col-xs-6 text-right total-cost']"
        return this.browser.wait(until.elementLocated(By.xpath(xpath)), waitTime, "could not find total cost element")
    }
    this.getTotalItemsElement= function () {
        var xpath = "//ul[@class='list-unstyled']//li//div[@class='col-xs-6 total-count']"
        return this.browser.wait(until.elementLocated(By.xpath(xpath)), waitTime, "could not find total items element")
    }

    this.getQuantityUpElement= function (itemText) {
        var xpath = "//ul[@class='list-unstyled']//small[contains(text(),'"+ itemText +"')]//preceding-sibling::button[@title='Add One']"
        return this.browser.wait(until.elementLocated(By.xpath(xpath)), waitTime, "could not find quantity up element")
    }
    
    this.getQuantityDownElement= function (itemText) {
        var xpath = "//ul[@class='list-unstyled']//small[contains(text(),'"+ itemText +"')]//preceding-sibling::button[@title='Remove One']"
        return this.browser.wait(until.elementLocated(By.xpath(xpath)), waitTime, "could not find quantity down element")
        
    }
    this.getItemQuantityElement= function (itemText) {
        var xpath =  "//ul[@class='list-unstyled']//small[contains(text(),'"+itemText+"')]//preceding-sibling::small"
        return this.browser.wait(until.elementLocated(By.xpath(xpath)), waitTime, "could not find item quantity element")
       
    }
}


module.exports = cart;
