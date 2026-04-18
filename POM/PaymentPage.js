const { expect } = require("@playwright/test");

class PaymentPage {
    constructor(page) {
        this.page = page;
        this.paymentMode = page.getByText("Payment Mode");
       // this.netBankingBtn = page.locator("text=Netbanking");
       // this.netBankingBtn = page.getByRole("button", { name: "Netbanking" });
        this.netBankingBtn = page.getByText("Netbanking");
        this.bankName = page.getByText("Axis Bank");
        this.payNowBtn=page.getByRole("button", { name: "Pay Now" })
        this.paymentTile= page.locator("h3:has-text('Welcome to Razorpay Software Private Ltd Bank')")
        this.successBtn= page.locator(".success");
    }

    async paymentDetail() {

        await expect(this.paymentMode).toBeVisible();

        await expect(this.netBankingBtn).toBeVisible();
        await this.netBankingBtn.click();

        await this.page.locator("#demo-simple-select").click();
        await expect(this.bankName).toBeVisible();
        await this.bankName.click();
        await this.payNowBtn.click();
        // page.locator(".hero-primary")).toHaveText("Welcome to Razorpay Software Private Ltd Bank");

        await this.page.waitForLoadState('load');
        await expect(this.paymentTile).toBeVisible();
        
        await expect(this.successBtn.first()).toBeVisible();
        await this.successBtn.first().click();

    }
}

module.exports = { PaymentPage };