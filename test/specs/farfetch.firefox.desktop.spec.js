
const Farfetch = require ('../page-components/farfetch.page');

describe('farfetch.com', () => {
    it('should open a product page', async () => {
        await Farfetch.open({item: 'item-14664952.aspx'})
        
        await expect(await Farfetch.getPage()).toContain('farfetch.com');
    });
    it('should open login page', async () => {
        await Farfetch.openLoginPage();

        await expect(await Farfetch.getPage()).toContain('login.aspx');
    });

});