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
            throw Error(`Page ${url} was not defined!`);
        }
        this.activePage = this.pages.get(key);
        return this.pages.get(key);
    }

    getElement(elementName) {
        return this._searchComponent(elementName);
    }

    _searchComponent(elementPath) {
        if (elementPath.includes('->')) {
            let elements = elementPath.split(' -> ');
            let length = elements.length - 1;
            let component = this.activePage.components.get(elements.pop());
            while (length > 1) {
                component = component.components.get(elements.pop());
                length--;
            }
            let lastElement = elements.pop();
            return this._returnElement(component.components,lastElement);
        } else {
            return this._returnElement(this.activePage.components,elementPath);
        }
    }

    _returnElement(component, element){
        if (component.has(element)) {
            let selector = component.get(element);
            if (Array.isArray(selector)){
                return $$(selector);
            }else{
                return $(selector);
            }
        }else{
            throw Error(`Element ${element} is not in ${component}!`);
        }
    }

    clear() {
        this.pages.clear();
    }
}

module.exports = new StateManager();