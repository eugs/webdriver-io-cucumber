const gulp = require('gulp');
const creds = require('./tests/configs/creds');
const browsersConfig = require('./tests/configs/browserConfigs');
require('./gulp/tasks')(gulp, creds, browsersConfig);

