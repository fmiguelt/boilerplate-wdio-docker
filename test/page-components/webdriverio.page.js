const Page = require ('../abstractions/Page');

class WdioPage extends Page {

    menuItems(position) { 
      return $(`.nav-site.nav-site-internal > li:nth-child(${position}) > a`) 
    }

    async open (path = 'https://webdriver.io') {
       await super.open(path);
    }

    async selectPageFromMenu(position) {
      const item = await this.menuItems(position); 
      await item.waitForClickable()
      await item.click()
    }

}

module.exports = new WdioPage()
