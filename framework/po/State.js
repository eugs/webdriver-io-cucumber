class State {

    constructor() {
        this.pages = new Map();
    }

    /**
     * Add page
     * @param name
     * @param obj
     */
    addPage(name, obj) {
        this.pages.set(name, obj);
    }

    /**
     * Get page by name
     * @param name
     * @return {Page}
     */
    getPageByName(name) {
        return this.pages.get(name);
    }

    /**
     * Get page by URL
     * @return {Page}
     */
    getPage() {
        let url = browser.getUrl();
        let key = null;
        this.pages.forEach((v, k) => {
            let re = new RegExp(v.pageUrl);
            if (url.search(re) != -1) {
                key = k;
            }
        });

        if (!key) {
            throw new Error(`Page ${url} is not defined!`);
        }

        return this.pages.get(key);
    }
}

module.exports = new State();