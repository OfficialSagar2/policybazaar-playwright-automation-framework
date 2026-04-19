const { test, expect } = require("../fixtures/baseTestIns");
const testData = require('../Utils/TestData.json');
const { getApiPremium } = require("../Utils/apiHelper");

    test("@smoke Order Page Testing", async ({ homePage, quotePage, proposalPage, paymentPage, contactDetailPage, orderPage, request }) => 
    {
      const user = testData.users[0];
      await homePage.goTo();
      await expect(homePage.page).toHaveURL(/travelqa/);
      await homePage.quoteSelectionCriteria(user);
      const quotePremium = await quotePage.quoteDetails();
      await proposalPage.proposalDetail(user);
      await paymentPage.paymentDetail();
      await contactDetailPage.contactDetail(user);

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




