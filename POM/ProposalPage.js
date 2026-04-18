const { expect } = require("@playwright/test");

class ProposalPage {

    constructor(page) {
        this.page = page;
        // locators
        this.fullName = page.locator("text=Enter full name");
        this.dob = page.getByRole('textbox', { name: 'Enter date of birth (DD-MM-YYYY)' })
        this.email= page.locator("[id*=proposal-card-emailId]")
        //this.passport = page.getByText("Enter passport number", { exact: true })
        this.pan = page.getByRole('textbox', { name: 'Enter pan number' })
        this.mobile = page.locator(".custom-dropdown-floating-placeholder-inner input");
        this.nominee = page.locator("[id*=proposal-card-nomineeName]");
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.ped = page.getByText('No', { exact: true });
        this.payNow = page.getByRole('button', { name: 'Pay Now'});
        
    }

    async proposalDetail(userData) {


        await this.fullName.fill(userData.fullName);
        await this.page.getByText(userData.gender, { exact: true }).click();

        // await this.page.getByText('Enter date of birth (DD-MM-YYYY').click();
        await this.dob.fill(`${userData.dob}`);

        await this.email.fill(userData.email);

        // await this.pan.press('CapsLock');
        // await this.pan.fill('BMZPP1482R');
        // await this.pan.press('CapsLock');


        // await this.page.locator(".custom-dropdown-country-icon-wrapper").click();
        // //await page.locator("#search").fill("+91");
        // await this.page.locator("#search").pressSequentially("ind");

        // const options = await this.page.locator(".dropdown-list li");

        // await expect(options.first()).toBeVisible();
        // const count = await options.count();

        // for (let i = 0; i < count; i++) {
        //     const text = await options.nth(i).textContent();

        //     if (text?.includes("India") || text?.includes("+91")) {
        //         await options.nth(i).click();
        //         break;
        //     }
        // }

        //OR skip from 126 till for loop closure
        //await page.locator('.dropdown-list li', { hasText: 'India' }).click();

        //wait for dropdown to close
        //await expect(this.mobile).toBeVisible({ timeout: 15000 });
        
        await this.mobile.fill(''); // clear first
        await this.mobile.pressSequentially(userData.MobNo);
        await expect(this.mobile).toHaveValue(userData.MobNo);
        await this.mobile.press('Tab');


        // await this.nominee.fill(''); // clear first
        // await this.nominee.pressSequentially("Nominee Pawar");
        // await expect(this.nominee).toHaveValue("Nominee Pawar");

        // // Trigger blur
        // await this.nominee.press('Tab');

        // const relationDropdown = this.page.locator(".additionalDetails__formFields__2col .customDropdown");
        // await relationDropdown.click();
        // await this.page.getByText("Mother", { exact: true }).click();
        // await expect(relationDropdown).toContainText("Mother");

        await this.page.locator("body").click();
        await this.page.waitForTimeout(1500);

        await expect(this.continueBtn).toBeVisible();
        await this.continueBtn.click();

        //PED Page 
        await expect(this.ped).toBeVisible();
        await this.ped.click();

        await this.page.locator(".acceptTermsCheckLabel").check();
        
        // await expect(this.page.getByRole('button', { name: 'Continue' })).toBeVisible({ timeout: 20000 });
        // await this.page.getByRole('button', { name: 'Continue' }).click();

        await expect(this.payNow).toBeVisible();
        await this.payNow.click();
    }
}

module.exports = { ProposalPage };