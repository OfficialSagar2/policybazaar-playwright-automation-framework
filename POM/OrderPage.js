const { expect } = require("@playwright/test");

class OrderPage {
    constructor(page) {
        this.page = page;
        this.viewBtn = page.locator(".viewLink");
        this.orderDetail = page.locator(".flexWrap div");
        this.bookingId = page.locator(".premiumInfo p strong");
    }

    async orderDetails() {
        await expect(this.viewBtn).toBeVisible();
        //await this.viewBtn.toHaveText("View details ›");
        await this.viewBtn.click();

        const order = await this.orderDetail.nth(1).allTextContents();
        const orderID = order[0].replace("Order Number ", "").trim();
        console.log("Order ID:", orderID);

        const bookingText = await this.page.locator(".premiumInfo p").nth(0).allTextContents();
        const bookingId = bookingText[0].replace(" Booking ID: ", "").trim();
        console.log("Booking ID :", bookingId);

        // const premiumText = await this.page.locator(".premiumInfo p").nth(1).allTextContents();
        // const premiumValue = premiumText[0].replace("  Premium: ", "").trim();
        // console.log("Premium :", finalPremium);
        // return Number(finalPremium);

        const premiumText = await this.page.locator(".premiumInfo p:has-text('Premium')").textContent();
        const finalPremium = Number(premiumText.replace(/[^\d]/g, '').trim());
        console.log("Premium:", finalPremium);
        return finalPremium;

    }
}

module.exports = { OrderPage };
