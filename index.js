const path = require('path');
exports.State = require(path.resolve('./framework/po/State'));
exports.Collection = require(path.resolve('./framework/po/Collection'));
exports.Component = require(path.resolve('./framework/po/Component'));
exports.Page = require(path.resolve('./framework/po/Page'));
exports.CredentialManager = require(path.resolve('./framework/credential_manager/CredentialManager'));
exports.TaskKiller = require(path.resolve('./framework/credential_manager/TaskKiller'));
exports.tasks = require(path.resolve('./gulp/tasks'));