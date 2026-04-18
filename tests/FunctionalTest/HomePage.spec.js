const { test, expect } = require("@playwright/test");
const { HomePage } = require("../../POM/HomePage");
//const testData = require("../../Utils/TestData.json");

test.describe("@web @homepage Home Page Functional Test", () => 
{
  test("@emptyCountry Empty Country Field", async ({ page }) => 
  {
    const homePage = new HomePage(page);
    await homePage.goTo();

    const exploreBtn = page.getByRole('button', { name: 'Explore Plans ›' })
    await expect(exploreBtn).toBeEnabled();
    await exploreBtn.click();

    await expect(page.locator(".errorMsg", { hasText:"destination country" })).toBeVisible();
    await expect(page.getByText("Please select trip dates")).toBeVisible();
    await expect(page.getByText("Please add traveller(s)")).toBeVisible();
  });

  test("@invalidCountry Home Page Functional Test", async ({ page }) => 
  {
    const homePage = new HomePage(page);
    await homePage.goTo();

    await page.getByRole('textbox', { name: 'Search country' }).click();

    await page.locator('#country').fill("test invalid country ");
    await expect(page.locator(".search-item", { hasText: "No result found" })).toBeVisible();
   });

    //OR 
    //const country= await page.locator(".search-item");
    //await country.getByText("Canada").click();

    //Start & End Date
    // await this.startDate.filter({ hasText: 'Start date' }).click();
    // await this.page.getByRole('cell', { name: 'Apr 21,' }).click();
    // await this.page.getByRole('cell', { name: 'Apr 30,' }).click();
    // await this.page.getByRole('button', { name: 'Continue' }).click();

    // await this.age.click();
    // await this.page.getByText('22 years').click();

    // await this.page.getByRole('radio', { name: 'No' }).check();
    // await this.page.getByRole('button', { name: 'Done' }).click();

    // await this.page.getByRole('button', { name: 'Explore Plans ›' }).click();
    // await expect(page.getByRole('button', { name: 'Get Quotes' })).toBeEnabled();
  
})