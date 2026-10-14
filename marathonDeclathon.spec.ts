import test, { expect } from "@playwright/test";
import { log } from "node:console";

test('Declathon for marathon', async ({page})=>{
 
    //Navigate to https://www.decathlon.in/.
    await page.goto("https://www.decathlon.in/")

    //Verify the user is navigated to the Decathlon home page. 
    let homepage = await page.getByRole('link',{name:'Decathlon Home'})
    await expect(homepage).toBeVisible()

    //Click on the Search icon on the home page. 
    await page.locator('input[enterkeyhint="search"]').click()
   //Verify the search input field is enabled. 
    let serachBox= page.locator('input[enterkeyhint="search"]')
    let ab = await expect(serachBox).toBeEnabled()
      console.log("Search box is enabled");
//Enter the product name as "shoes" in the search field. 
       await page.locator('input[enterkeyhint="search"]').fill("shoes")
       await page.locator('(//span[text()="Shoes"]/parent::div)[1]').click()
// Capture and print the page title in the console.
   let title=  page.getByRole('heading',{name:"Shoes"})
  console.log(title);
  //Verify the page title is displayed as "Search | shoes".
    await expect.soft(title).toContainText("Shoes")
    console.log('Shoes page is printed');
// Click on the "Running" category filter.
   await page.locator('//button[@type="button"] /span[text()="Sport"]').click()
   await page.locator('//span[text()="Running"]//ancestor::label').click({timeout:5000})
// Click on the "Men" gender filter. 

await page.locator('//button[@type="button"] /span[text()="Gender"]').click()
await page.locator('//span[text()="Men"]//ancestor::label').click()

// Click on the shoe size filter "UK 10.5".
await page.locator('//button[@type="button"] /span[text()="Size"]').click()
await page.locator('//span[text()="10.5"]//ancestor::label').click()

//Click on the "Most relevant" sorting dropdown.
await page.locator('//button[@type="button"] /span[text()="Most relevant"]').click()
await page.locator('//span[text()="Price (low → high) "]/parent::button').click()

// Click on the first product from the displayed product list
await page.locator('(//span[text()="Decathlon"]//parent::div[@data-test-id="product-card:product-card:title"])[1]').click()

//Select the shoe size "10.5" on the product detail page
await page.locator('//span[text()="10.5"]//parent::button[@aria-label="Select size 10.5"]').click()

//Click on the "Add to Cart" button.
await page.locator('//span[text()="Add to cart"]//parent::button[@aria-disabled="false"]').click()
// to check Contents: "Product(s) added to cart", this can be done by freezing the DOM,
// STEP1: GO TO CONSOLE-> TYPE "allow pAsting"
//STEP 2: TYPE THIS TIMEOUT IN CONSOLE - setTimeout(()=>{debugger},4000)
//STEP3: AFter that click on add to card and  we can inscpect the DOM to fetch the xpath or locators.
await page.locator('//h3[text()="Product(s) added to cart"]').isVisible();
console.log("Product added to card is visible");
//Click on the Cart option.
await page.locator('//a[@aria-label="Cart"]').click()
// Fetch the total cart value.
 let values = await page.locator('//div[@class="flex gap-1"]//p[@classname="font-semibold"]').textContent()
//Print the total cart amount in the console.
 console.log("Cart values is", values);
})