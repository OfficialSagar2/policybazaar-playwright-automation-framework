const base = require('@playwright/test');
const { HomePage } = require("../POM/HomePage");
const { QuotePage } = require("../POM/QuotePage");
const { ProposalPage } = require("../POM/ProposalPage");
const { ContactDetailPage } = require("../POM/ContactDetailPage");
const { PaymentPage } = require("../POM/PaymentPage");
const { OrderPage } = require("../POM/OrderPage");
const userData = require("../Utils/TestData.json");

exports.test = base.test.extend(
    {

        homePage: async ({ page }, use) => {
            await use(new HomePage(page));
        },

        quotePage: async ({ page }, use) => {
            await use(new QuotePage(page));
        },

        proposalPage: async ({ page }, use) => {
            await use(new ProposalPage(page));
        },

        contactDetailPage: async ({ page }, use) => {
            await use(new ContactDetailPage(page));
        },

        paymentPage: async ({ page }, use) => {
            await use(new PaymentPage(page));
        },

        orderPage: async ({ page }, use) => {
            await use(new OrderPage(page));
        },

        userData: async ({ }, use) => {
            const data = require("../Utils/TestData.json");
            await use(data);
        }
    })

exports.expect = base.expect;
