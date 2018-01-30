const path = require('path');
const state = require(path.resolve('./framework/po/State'));

state.addPage('Home', new (require('./pages/home.page')));
state.addPage('Features', new (require('./pages/features.page')));

module.exports = state;