const AbstractComponent = require("./abstractComponent");

class Page extends AbstractComponent{
    constructor(locator, url='/'){
        super(locator);
        // this.pageLocator = locator;
        this.pageUrl = url;
        // this.components = new Map();
    }
    //TODO Delete
    // defineElement(name, selector, component){
    //     component?this.components.set(name, selector):this.components.set(name,selector);
    // }
    //
    // defineCollection(name, selector, component){
    //     component?this.components.get(component).set(name, selector):this.components.set(name,selector);
    // }
    //
    // defineComponent(name, selector, component){
    //     if (this.components.has(component)){
    //         this.components.get(component).set(name, selector);
    //     }else{
    //         this.components.set(name,selector);
    //     }
    //
    //     // component?this.components.get(component).set(name, selector):this.components.set(name,selector);
    // }

}

module.exports = Page;