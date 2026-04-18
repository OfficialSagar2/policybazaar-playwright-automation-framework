const { test, expect } = require("@playwright/test");
const { HomePage } = require("../../POM/HomePage");
const testData = require("../../Utils/TestData.json");

test.describe("@web @quote Quote Page Functional Test", () => {

    test("@web @invalidSI Invalid Sum Insured Test", async ({ page }) => {

        const homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.quoteSelectionCriteria(testData.users[0]);

        const plansHeader = page.locator('h2.singleProfileText');
        await expect(plansHeader).not.toHaveText(/Loading/);

        await expect(plansHeader).toBeVisible();
        await expect(plansHeader).toContainText('Showing');

        //Sum Insured Dropdown Selection
        await page.locator('li').filter({ hasText: 'Sum Insured' }).click();

        await page.getByText('$ 150,000', { exact: true }).click();
        await page.getByRole('button', { name: 'Apply' }).click();

        //Print Selected Option
        const selectedOption = page.locator('a.selected');
        await expect(selectedOption).toContainText("$150,000");
        console.log(await selectedOption.textContent());

        //Insurer Dropdown Selection
        await page.locator('li').filter({ hasText: 'Insurer' }).click();
        const tataCheckBox = page.locator("input[value='Tata AIG']")

        // Wait for checkbox
        await expect(tataCheckBox).toBeVisible(); // Assertion
        await tataCheckBox.check();

        // Apply filter
        await page.getByRole('button', { name: 'Apply' }).click();

        await expect(page.locator(".noQuotesCard p")).toBeVisible();
        await expect(page.locator(".noQuotesCard p")).toContainText("No plans found");

    });

    test("@web @excluded Excluded Countries Testing ", async ({ page }) => {

        await page.goto('https://travelqa.policybazaar.com/');

        await page.getByRole('textbox', { name: 'Search country' }).click();

        await page.locator('#country').fill("Iran");
        await page.locator(".search-item", { hasText: "Iran" }).click();

        //Start & End Date
        await page.locator('#newPq_mainWrapper div').filter({ hasText: 'Start date' }).click();
        await page.getByRole('cell', { name: 'Apr 21,' }).click();
        await page.getByRole('cell', { name: 'Apr 30,' }).click();
        await page.getByRole('button', { name: 'Continue' }).click();

        await page.locator('#divarrow_undefined').click();
        await page.getByText('22 years').click();

        await page.getByRole('radio', { name: 'No' }).check();
        await page.getByRole('button', { name: 'Done' }).click();

        await page.getByRole('button', { name: 'Explore Plans ›' }).click();

        const plansHeader = page.locator('h2.singleProfileText');
        await expect(plansHeader).not.toHaveText(/Loading/);

        await expect(plansHeader).toBeVisible();
        await expect(plansHeader).toContainText('Showing');

        //Insurer Dropdown Selection
        await page.locator('li').filter({ hasText: 'Insurer' }).click();
        const tataCheckBox = page.locator("input[value='Tata AIG']")

        // Wait for checkbox
        await expect(tataCheckBox).toBeVisible(); // Assertion
        await tataCheckBox.check();

        // Apply filter
        await page.getByRole('button', { name: 'Apply' }).click();

        await expect(page.locator(".noQuotesCard p")).toBeVisible();
        await expect(page.locator(".noQuotesCard p")).toContainText("No plans found");

    });
})
