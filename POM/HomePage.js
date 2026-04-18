class HomePage {

    constructor(page) {
        this.page=page;
        this.country= page.locator('#country');
        this.startDate= page.locator('#newPq_mainWrapper div');
        this.age = page.locator('#divarrow_undefined');
    }

    async goTo()
    {
        await this.page.goto('https://travelqa.policybazaar.com/');
    }

    async quoteSelectionCriteria(userData) {

        await this.page.getByRole('textbox', { name: 'Search country' }).click();

        await this.country.fill(userData.countryName);
        await this.page.locator(".search-item", { hasText: userData.countryName }).click();
        
        //OR 
        //const country= await page.locator(".search-item");
        //await country.getByText("Canada").click();

        //Start & End Date
        await this.startDate.filter({ hasText: 'Start date' }).click();
        await this.page.getByRole('cell', { name: 'Apr 21,' }).click();
        await this.page.getByRole('cell', { name: 'Apr 30,' }).click();
        await this.page.getByRole('button', { name: 'Continue' }).click();

        await this.age.click();
        await this.page.getByText('22 years').click();

        await this.page.getByRole('radio', { name: 'No' }).check();
        await this.page.getByRole('button', { name: 'Done' }).click();

        await this.page.getByRole('button', { name: 'Explore Plans ›' }).click();
    }
}

module.exports={ HomePage };