class Page {

  async open (path) {
    await browser.url(path)
  }

  async getUrl (){
    return await browser.getUrl();
  }

  async takeScreenshot (filename, options = {}){
    await browser.saveScreenshot(`./${filename}`);
  }

}

module.exports = Page;