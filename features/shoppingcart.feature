Feature:  Add products to shopping cart
  Background:  
    Given browse to web site
  
 Scenario: The cart should be empty 
    When The page is loaded the cart should be empty
 
 Scenario: Add an item to an empty cart
    When I add an item named "Purple Camera"
    Then Cart should show "Purple Camera" and price "$45.50"

 Scenario: Check 10% discount is applied if cart total is $100 and more
    When  Cart total is greater than or equa to 100.00
    Then  I should see 10% discount applied correctly
    
 Scenario: Edit Shopping Cart - Remove one prodcut from cart
    Given  Cart has "USB Plug" products
    When   I delete one "USB Plug" from cart 
    Then  The cart total should be  reduced from 02 to 01 for "USB Plug"

  Scenario: Search for Camera
    When  I search for "Camera"
    Then  It should list results containing search keyword "Camera" 

  