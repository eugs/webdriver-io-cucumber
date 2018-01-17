const path = require('path');
const state = require(path.resolve('./framework/po/stateManager'));

state.addPage('Home', new (require('./pages/home.page')));
state.addPage('Features', new (require('./pages/features.page')));

module.exports = state;