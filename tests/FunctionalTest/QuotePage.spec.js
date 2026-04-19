const { test, expect } = require("@playwright/test");
const { HomePage } = require("../../POM/HomePage");
const testData = require("../../Utils/TestData.json");

test.describe("@web @quote Quote Page Functional Test", () => {

    test("@invalidSI Invalid Sum Insured Test", async ({ page }) => {

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

    test("@excluded Excluded Countries Testing ", async ({ page }) => {

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

        //Insurer Selection from Dropdown
        await page.locator('li').filter({ hasText: 'Insurer' }).click();
        const tataCheckBox = page.locator("input[value='Tata AIG']")
        await expect(tataCheckBox).toBeVisible(); // Assertion
        await tataCheckBox.check();
        await page.getByRole('button', { name: 'Apply' }).click();

        // No plans found page
        await expect(page.locator(".noQuotesCard p")).toBeVisible();
        await expect(page.locator(".noQuotesCard p")).toContainText("No plans found");

    });

    test.only('@policyPdf Policy Brochure & Wording Testing', async ({ page }) => 
    {
        const homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.quoteSelectionCriteria(testData.users[0]);

        const plansHeader = page.locator('h2.singleProfileText');
        await expect(plansHeader).not.toHaveText(/Loading/);

        await expect(plansHeader).toBeVisible();
        await expect(plansHeader).toContainText('Showing');

        await page.locator('#premium_80068').getByText('View all features').click();

        await expect(page.getByRole('link', { name: 'Plan Brochure' })).toBeVisible();
        await page.getByRole('link', { name: 'Plan Brochure' }).click();
        await page.locator('#policy-brochure').contentFrame().locator('.ndfHFb-c4YZDc-cYSp0e-DARUcf-PLDbbf').click();

        await expect(page.getByRole('link', { name: 'Policy Wording' })).toBeVisible();
        await page.getByRole('link', { name: 'Policy Wording' }).click();
        await page.locator('#policy-wording').contentFrame().locator('.ndfHFb-c4YZDc-cYSp0e-DARUcf-PLDbbf').click();

        await page.locator('#modal-root i').click();
    })

    test('@editOption Edit Option Testing', async ({ page }) => 
    {
        const homePage = new HomePage(page);
        await homePage.goTo();
        await homePage.quoteSelectionCriteria(testData.users[0]);

        const plansHeader = page.locator('h2.singleProfileText');
        await expect(plansHeader).not.toHaveText(/Loading/);

        await expect(plansHeader).toBeVisible();
        await expect(plansHeader).toContainText('Showing');

        await page.getByText('Tata AIG').click();

        await expect(page.getByRole('link', { name: 'Edit' })).toBeVisible();
        await page.getByRole('link', { name: 'Edit' }).click();

        await page.getByText('Country VisitingUSA').click();   // cross x button clicked

        await page.locator('#input-row i').click();
        await page.getByText('Enter the countries you are').click();
        await page.getByRole('textbox', { name: 'Enter the countries you are' }).fill('iran');
        await page.getByText('Iran').click();
        await page.getByRole('button', { name: 'Save changes' }).click();

        await page.getByText('Insurer', { exact: true }).click();
        await page.locator('label').filter({ hasText: 'Tata AIG' }).click();
        await page.getByRole('button', { name: 'Apply' }).click();

        await expect(page.locator(".noQuotesCard p")).toBeVisible();
        await expect(page.locator(".noQuotesCard p")).toContainText("No plans found");

        await page.getByRole('link', { name: 'Edit' }).click();
        await page.getByText('Country VisitingIran').click();
        await page.locator('#input-row i').click();
        await page.getByText('Enter the countries you are').click();
        await page.getByRole('textbox', { name: 'Enter the countries you are' }).fill('cana');
        await page.locator('#search-country').getByText('Canada').click();
        await page.getByRole('button', { name: 'Save changes' }).click();

        await page.getByText('Tata AIG').click();
        await page.getByRole('img', { name: 'Tata AIG' }).click();
    });
})
