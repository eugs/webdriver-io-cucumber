const path = require('path');

exports.config = {
    specs: [
        './tests/e2e/features/**'
    ],
    seleniumLogs: './logs',
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    deprecationWarnings: false,
    bail: 0,
    waitforTimeout: 60000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 1,
    framework: 'cucumber2fix',
    reporters: ['dot', 'cucumber', 'cucumber-json'],
    reporterOptions: {
        'cucumber-json': {
            outputDir: './reports/' + process.env.ENV + '/' + process.env.BROWSER + '/json'
        }
    },
    cucumberOpts: {
        require: ['./tests/e2e/step_definitions'],
        strict: true,
        colors: true,
        tags: [],
        timeout: 20000,
        ignoreUndefinedDefinitions: false,
    },
};