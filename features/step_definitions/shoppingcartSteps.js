let webdriver = require('selenium-webdriver');
let assert = require('assert');
let By = webdriver.By;
let until = webdriver.until;
//let browser;
let waitTime = 2000;
let product = require('./../pageObjects/product.js');
const cart = require('./../pageObjects/cart.js');
const  expect = require('chai').expect;
const { Given, When, Then } = require('cucumber');


function errorFunction(message) {
      try {
          expect(message).to.equal("");//test failes when an element can't be located within waitTime
    }
      catch(e){

      } 
  }

   Given(/^browse to web site$/,async function() {
    
    await this.browser.get('https://vuejs.mikesprague.me/shopping-cart');
    });
    
   Then(/^The page is loaded the cart should be empty$/, async function() {
    var shoppingCart = new cart(this.browser);
    await shoppingCart.getTotalCostElement().then(function(item){
              item.getText().then(function(discountText){
                  expect(discountText).to.contain("$0.00");
              });
      },errorFunction);
     
   });
   //Scenario: Add an item to an empty cart
  When('I add an item named {string}', async function (itemText) {
    var nokiaProduct = new product(this.browser);
    var itemId = 4;
    this.itemText = itemText;
    await nokiaProduct.addToCart("Camera",itemId).then(
        function (addToCartButton) {
            addToCartButton.click()
        },errorFunction);
  });
  Then('Cart should show {string} and price {string}',async function(itemText,price){
    var nokiaProduct = new product(this.browser);
    var itemId = 4;
    await nokiaProduct.getItemInCart("Camera",itemId).then( (itemInCart) => {
        itemInCart.getText().then((cartItemText) => {
            expect(cartItemText).to.include(itemText);
            expect(cartItemText).to.include(price);
        })
    },errorFunction);
  })
  //Scenario: Check 10% discount is applied if cart total is $100 and more
  When(/^Cart total is greater than or equa to 100.00$/, async function () {
    var nokiaProduct = new product(this.browser);
    var itemId = 1;
    await nokiaProduct.addToCart("Small Phone",itemId).then(
        function (addToCartButton) {
            addToCartButton.click();
        },errorFunction);
  });
  Then('I should see 10% discount applied correctly', async function () {
    var shoppingCart = new cart(this.browser);
     var discount;
     await shoppingCart.getDiscount().then(function(value){
        discount = value;
        if(discount > 0){
             shoppingCart.getDiscountElement().then(function(item){
                item.getText().then(function(discountText){
                    expect(discountText).to.contain((Math.round(discount * 100) / 100).toFixed(2)) ;
                });
            },errorFunction)
         }
        },errorFunction);
  });
  //Scenario: Edit Shopping Cart - Remove one prodcut from cart
  Given('Cart has {string} products', async function (itemText) {
    var usbStickProduct = new product(this.browser);
    var itemId = 2;
    await usbStickProduct.addToCart(itemText,itemId).then(
        function (addToCartButton) {
            addToCartButton.click();
            addToCartButton.click();
        },errorFunction)
  });
  When('I delete one {string} from cart',async function(itemText){
    var shoppingCart = new cart(this.browser);
    await shoppingCart.getQuantityDownElement(itemText).then(function(quantityDownElement){
        quantityDownElement.click();
    },errorFunction);
  })
  Then('The cart total should be by reduced from 02 to 01 for {string}',async function(itemText){
    var shoppingCart = new cart(this.browser);
    await shoppingCart.getItemQuantityElement(itemText).then(function(quantityElement){
        quantityElement.getText().then(function (quantity) {
            expect("01").to.equal("01", quantity);
        },errorFunction);
    },errorFunction);
    
  });
  //Scenario: Search for Camera
  When('I search for {string}', async function (itemText) {
    await this.browser.wait(until.elementLocated(By.xpath("//input[@placeholder='Search products...']")), waitTime, 'could not find search box').then(function (searchBox) {
        searchBox.sendKeys(itemText)
    },  errorFunction)
  });
  Then('It should list results containing search keyword {string}', async function (itemText) {
    await this.browser.wait(until.elementLocated(By.xpath("//h3"))).then(function (result) {
                result.getText().then(function (headerText) {
                    expect(itemText).to.equal(itemText, headerText);
                })
            } ,errorFunction);
  });