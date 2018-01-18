class StateManager {
    constructor() {
        this.pages = new Map();
        this.activePage = null;
    }

    addPage(name, obj) {
        this.pages.set(name, obj);
    }

    setPage(name) {
        this.activePage = this.pages.get(name);
        return this.pages.get(name);
    }

    getPage() {
        let url = browser.getUrl();
        let key = null;
        url = url.replace(browser.options.baseUrl, '');
        this.pages.forEach((v, k) => {
            if (url.includes(v.pageUrl)) {
                key = k
            }
        });
        if (!key) {
            throw Error(`Page ${url} is not defined!`);
        }
        this.activePage = this.pages.get(key);
        return this.pages.get(key);
    }

    clear() {
        this.pages.clear();
    }
}

module.exports = new StateManager();