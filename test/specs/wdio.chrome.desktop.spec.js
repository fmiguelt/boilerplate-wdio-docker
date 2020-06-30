
const WdioPage = require ('../page-components/webdriverio.page');

describe('webdriver.io', () => {
    it('should have the right title', async () => {
        await WdioPage.open();
        await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    })
    it('should click and open the API page ', async () => {
        await WdioPage.open();
        await WdioPage.selectPageFromMenu(2);
        const url = await WdioPage.getUrl();
        await expect(url).toContain('api.html')
    })
})