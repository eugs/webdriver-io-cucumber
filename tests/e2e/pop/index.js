const path = require('path');
const state = require(path.resolve('./framework/po/State'));
const prodCreds = require('../../consts/prodConsts');

browser.options.memory.setConstantMap(prodCreds);
state.addPage('Home', new (require('./pages/home.page')));
state.addPage('Features', new (require('./pages/features.page')));
state.addPage('Login', new (require('./pages/login.page')));
state.addPage('Package', new (require('./pages/package.page')));
state.addPage('Search', new(require('./pages/search.page')))

module.exports = state;