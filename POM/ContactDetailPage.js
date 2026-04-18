const { expect } = require("@playwright/test");

class ContactDetailPage 
{
    constructor(page) 
    {
        this.page = page;
        this.success= page.locator(".successMsg p");
        this.passport = page.getByText("Enter passport number", { exact: true })
        //this.email = page.locator("[id*=proposal-card-emailId]");
        this.pincode = page.locator("input[id*='pincodeDetails']")
        this.address = page.locator("[id*=proposal-card-address]");
        this.mobileNo = page.locator("[id*=proposal-card-altMobile]");
        //this.nomineeAge = page.locator("[id*=proposal-card-nomineeAgeCheckbox]");
        this.pan = page.getByRole('textbox', { name: 'Enter pan number' })
        this.nominee = page.locator("[id*=proposal-card-nomineeName]");
        //this.termsCheck = page.locator("[id*=termsCheckbox]");
        this.kycCheck = page.getByLabel(/I hereby consent to receive information/);
        this.nomineeCheck = page.getByRole('checkbox', { name: 'I declare that nominee is of 18 years of age'});
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.skipOptn = this.page.getByRole('radio', { name: 'Skip' });
        //this.payNow = page.locator("#proposalForm-cta-mobile", { hasText: 'Pay Now' })
    }

    async contactDetail(userData) {

        // expect(this.email).toBeVisible({ timeout: 20000 });
        // await this.email.fill("sgr@gmail.com");
         
        // ✅ wait for redirect to thank you page
        await this.page.waitForURL(/thankyou/, { timeout: 30000 });

        await expect(this.success).toBeVisible();
        const successMsg= await this.success.textContent();
        console.log(successMsg);
        await expect(successMsg).toContain("Congratulations! Your payment is successful");

        await this.passport.fill(userData.passport);
        await this.pincode.fill("400001");

        await this.address.fill(''); // clear first
        await this.address.pressSequentially("Test test test test ");
        await expect(this.address).toHaveValue("Test test test test ");
        await this.address.press('Tab');
        
        await this.mobileNo.fill("9594809189");

       // await this.pan.press('CapsLock');
        await this.pan.fill(userData.pan);
       // await this.pan.press('CapsLock');

        await this.nominee.fill(''); // clear first
        await this.nominee.pressSequentially("Nominee Pawar");
        await expect(this.nominee).toHaveValue("Nominee Pawar");

        // Trigger blur
        await this.nominee.press('Tab');

        const relationDropdown = this.page.getByText("Select nominee relation");
        await relationDropdown.click();
        await this.page.getByText("Mother", { exact: true }).click();
       // await expect(this.page.getByText("Mother", { exact: true })).toContainText("Mother");

        await this.page.locator("body").click();
        await this.page.waitForTimeout(2000);

         // await this.nomineeAge.check();
        // await expect(this.nomineeAge).toBeChecked();

        // await this.terms.check();
        // await expect(this.terms).toBeChecked();

        await this.kycCheck.click();
        await expect(this.kycCheck).toBeChecked();

        await this.nomineeCheck.check();
        await expect(this.nomineeCheck).toBeChecked();

        await expect(this.continueBtn).toBeEnabled();
        await this.continueBtn.click();

        await expect(this.skipOptn).toBeVisible();
        await this.skipOptn.check();

        await expect(this.page.getByRole("button",{ name: "Submit" })).toBeVisible();
        await this.page.getByRole("button",{ name: "Submit" }).click();
    }
}
module.exports={ ContactDetailPage };