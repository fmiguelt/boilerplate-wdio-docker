const Page = require ('../abstractions/Page');

class Farfetch extends Page {

    loginButton() { 
      return $('#slice-header [title="Login page."]');
    }

    async open ({baseUrl = 'https://www.farfetch.com/', subfolder = 'uk', path = '/'}) {
       await super.open(`${baseUrl}${subfolder}${path}`);
    }

    async getPage() {
      return await super.getUrl();
    }

    async openLoginPage() {
      const login = await this.loginButton(); 
      await login.waitForClickable();
      await login.click();
    }

}

module.exports = new Farfetch()
