const { test, expect } = require("../fixtures/baseTestIns");
const testData = require('../Utils/TestData.json');
const { getApiPremium } = require("../Utils/apiHelper");

test.describe('@e2e @web Insurance Purchase Flow - Multiple Users', () => {

  for (const user of testData.users) {

    test(`@smoke Flow for ${user.name}`, async ({ homePage, quotePage, proposalPage, paymentPage, contactDetailPage, orderPage, request }) => {
      //const homePage = new HomePage(page);
      await homePage.goTo();
      await expect(homePage.page).toHaveURL(/travelqa/);
      await homePage.quoteSelectionCriteria(user);

      //const quotePage = new QuotePage(page);
      const quotePremium = await quotePage.quoteDetails();

      // const proposalPage = new ProposalPage(page);
      await proposalPage.proposalDetail(user);

      // const contactDetailPage = new ContactDetailPage(page);
      // await contactDetailPage.contactDetail()

      //const paymentPage = new PaymentPage(page);
      await paymentPage.paymentDetail();

      // const contactDetailPage = new ContactDetailPage(page);
      await contactDetailPage.contactDetail(user);

      //const orderPage = new OrderPage(page);
      const finalPremium = await orderPage.orderDetails();

      // ✅ UI vs UI validation
      expect(Math.abs(finalPremium - quotePremium)).toBeLessThanOrEqual(1);

      console.log(`Quote Premium: ${quotePremium}`);
      console.log(`Final Premium: ${finalPremium}`);

      // ✅ API call (IMPORTANT: pass user + request)
      const apiPremium = await getApiPremium(request,user);
      console.log(`API Premium: ${apiPremium}`);

      // ✅ UI vs API validation
      expect(Math.abs(finalPremium - apiPremium)).toBeLessThanOrEqual(1);

    });
  }
});



//await expect(page.locator(".card-heading")).toHaveText("Payment Successful !");

//await page.getByRole("button", { name: "Upload Now" }).click();

// await page.locator(".inputRow__input").nth(1).click();

// await expect(page.locator("option[value='1']")).toBeVisible({ timeout: 10000 });
// await page.locator("option[value='1']").click();

// Upload front side document
// await page.locator("input[type='file']").first().setInputFiles("fixtures/Front.pdf");

// // Upload back side document
// await page.locator("input[type='file']").nth(1).setInputFiles("fixtures/Back.pdf");

// await page.pause();

// await page.locator(".inputRow__input").nth(2).click();
// await page.locator("option[value='3']").click();

