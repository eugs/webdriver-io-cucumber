class State {

  constructor() {
      this.pages = new Map();
      this.currentPage = '';
      this.autoSwitchPage = true;
  }

  /**
   * Add page
   * @param name
   * @param obj
   */
  addPage(name, obj) {
    if ((!name) || (!obj)) {
      throw new Error(`Wrong params: "${name}", "${obj}" in addPage()!`);
    }

    if (typeof name !== 'string') {
      throw new Error(`Please set page name as a string, got: ${name}`);
    }

    this.pages.set(name, obj);
  }

  /**
   * Get page by name
   * @param name
   * @return {Page}
   */
  getPageByName(name) {
    if (!(this.pages.get(name))) {
      throw new Error(`No such page: ${name} in State!`);
    }

    this.currentPageKey = name;
    return this.pages.get(name);
  }

  /**
   * Get page by URL
   * @return {Page}
   */
  getPage() {
    if (this.autoSwitchPage) {
      let url = browser.getUrl();
      let key = null;
      this.pages.forEach((v, k) => {
        let re = new RegExp(v.pageUrl);
        if (url.search(re) !== -1) {
          key = k;
        }
      });

      if (!key) {
        throw new Error(`Page ${url} is not defined!`);
      }

      this.currentPageKey = key;
    }

    return this.pages.get(this.currentPageKey);
  }

  turnAutoSwitchPage(value) {
    if (typeof value !== 'boolean') {
      throw new Error(`Value ${value} should be boolean!`);
    }

    this.autoSwitchPage = value;
  }

}

module.exports = new State();
