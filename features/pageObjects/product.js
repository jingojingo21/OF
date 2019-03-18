let webdriver = require('selenium-webdriver');
By = webdriver.By;
until = webdriver.until;
var waitTime = 2000;
const config = require('./../../config.json');
const _ = require('lodash');
function Product(browser){
    this.browser = browser;
    this.addToCart=function(productHeader,itemId){
        var xpath = getAddToCartXpath(productHeader,itemId)
        return this.browser.wait(until.elementLocated(By.xpath(xpath)),waitTime,`could not find addToCartButton for ${productHeader}`);  
    }
    this.getItemInCart=function(productHeader,itemId){
        var xpath = getCartItemXPath(productHeader,itemId)
        return this.browser.wait(until.elementLocated(By.xpath(xpath)),waitTime,`could not get item from cart for ${productHeader}`) ;
    }
    var getAddToCartXpath = function(productHeader,itemId){
        var buttonXPath = "//h3[contains(text(),'_productHeader_')]/following-sibling::*/strong[contains(text(),'_itemText_')]/following-sibling::button";
        var product = _.find(config.products,{"header":productHeader});
        var item = _.find(product.items,{"id":itemId});
        var itemText = item.itemText;
        return buttonXPath.replace('_productHeader_',productHeader).replace('_itemText_',itemText);
    }
    var getCartItemXPath = function(productHeader,itemId){
        var cartItemXPath = "//ul[@class='list-unstyled']//li//small[contains(text(),'_cartText_')]";
        var product = _.find(config.products,{"header":productHeader});
        var item = _.find(product.items,{"id":itemId});
        var cartText = item.cartText;
        return cartItemXPath.replace('_cartText_',cartText);
    }
}
module.exports = Product;