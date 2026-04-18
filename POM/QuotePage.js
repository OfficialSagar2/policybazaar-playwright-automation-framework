const { expect } = require("@playwright/test");

class QuotePage {

    constructor(page) {
        this.page = page;
        this.suminsured = page.locator('li').filter({ hasText: 'Sum Insured' });
        this.allOption = page.locator(".options_box_wrapper__option");
        this.selectedOption = page.locator('a.selected');
        this.insurer = page.locator('li').filter({ hasText: 'Insurer' });
    }


    async quoteDetails() {

        const plansHeader = this.page.locator('h2.singleProfileText');
        await expect(plansHeader).not.toHaveText(/Loading/);

        await expect(plansHeader).toBeVisible();
        await expect(plansHeader).toContainText('Showing');

        await this.suminsured.click();

        //Print all SI options
        const allOptions = await this.allOption.allTextContents();
        await expect(allOptions).toContain('$ 50,000');
        console.log(allOptions);

        await this.page.getByText('$ 50,000', { exact: true }).click();
        await this.page.getByRole('button', { name: 'Apply' }).click();

        //Print Selected Option
        const selectedOption = this.selectedOption;
        await expect(selectedOption).toContainText('$50,000');
        console.log(await selectedOption.textContent());

        // Premium
        const premiumLocator = this.page.locator('.premiumPlanPrice');
        await expect(premiumLocator.first()).toBeVisible();
        const oldPremium = (await premiumLocator.first().textContent())?.replace(/[^\d]/g, '').trim();
        console.log(`Expected value : ${oldPremium}`);

       

        //Insurer Dropdown Selection
        await this.insurer.click();
        const tataCheckBox = this.page.locator("input[value='Tata AIG']")

        // Wait for checkbox
        await expect(tataCheckBox).toBeVisible(); // Assertion
        await tataCheckBox.check();

        // Apply filter
        await this.page.getByRole('button', { name: 'Apply' }).click();

        // const planLocator = this.page.locator(".quotesCard__planName p").nth(1);
        // await expect(planLocator).toBeVisible();
        // const planName = await planLocator.textContent();
        // console.log(planName);

        // Proceed button
        const productTitle = await this.page.locator('#premium_80068'); // or use the class if ID changes
        const proceedButton = productTitle.locator('button.travel_main_cta');
        await expect(proceedButton).toBeVisible();

        await Promise.all([
            this.page.waitForLoadState('networkidle'),
            proceedButton.click()
        ]);

        // Wait until at least one premium span contains digits
        await expect(this.page.locator('.cardsHeader span').first()).toHaveText(/\d+/);

        const premiumOptions = await this.page.locator('.cardsHeader span').allTextContents();

        const normalizedOptions = premiumOptions.map(opt => opt.replace(/[^\d]/g, '').trim());

        for (let i = 0; i < normalizedOptions.length; i++) {
            const newPremium = normalizedOptions[i];

            if (newPremium === oldPremium) {
                console.log(`Actual premium: ${newPremium}`);

                // Button IDs start at 1, so use i+1
                const buyButton = await this.page.locator(`[id="${i + 1}"]`);
                await expect(buyButton).toBeVisible();
                await buyButton.scrollIntoViewIfNeeded();
                await buyButton.click();

                break; // stop after clicking the matched premium
            }
        }

        return Number(oldPremium);
    }
}

module.exports = { QuotePage };