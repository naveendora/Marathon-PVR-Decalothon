import{expect, test} from "playwright/test"

test('Marathon for PVR', async({page})=> {
    //1. Launch the browser and open https://www.pvrcinemas.com/
  await page.goto("https://www.pvrcinemas.com/")
  //2.Select the city as “Chennai”
  await page.locator('[aria-label="[object Object]"]').click()
  await page.getByRole('heading' ,{name: "Chennai"}).click()
  //3.Choose cinema from the available list 
  await page.locator('[class="nav-icons"]').nth(2).click()
  await page.getByRole('heading', {name : "PVR Perambur - Spectrum Mall Chennai"}).click()
  //4.Select movie date and 5.Choose any available movie
  await page.locator('//div[@class="dates-inactive"]// h5[text()=16]').click()
  //6.Select available show time
  await page.locator(' (//div[@class="box-slot-moviesession  pointer show-spaces clickable"] //h5[text()="09:00 AM"])[2]').click()
  //7.Click on Book button and 8.Click on Accept for Terms & Conditions
  await page.locator('text = Accept').click()
  await page.locator('text = Accept').click()
  //9.Select the available seat
  await page.locator('(//td[@class="seats-col"] // span[text()=19])[5]').click()
  await page.locator('(//td[@class="seats-col"] // span[text()=20])[5]').click()
  //10.Verify seat information and total ticket amount using assertions
  let seat1=  page.locator(' //div[@class="seat-info"] //p[text()="G20"]')
  let seat2 =  page.locator(' //div[@class="seat-info"] //p[text()="G19"]')
  await expect.soft(seat1).toHaveText("G20")
  await expect.soft(seat2).toHaveText("G19")
  console.log("Seat Numbers are", `${await seat1.textContent()},${await seat2.textContent()}`)
  let seatInfo = page.locator('//h6[text()="436.04"]')
  await expect.soft(seatInfo).toHaveText("436.04")
  console.log("total Ammount value is", await seatInfo.textContent());
  //11.Verify the Title of the page 
  console.log(await page.title());
  //12.Proceed to booking 
 await page.locator('//div[@class="register-btn"]/button[text()="Proceed"]').click()
})