const path = require('path');

exports.config = {
    specs: [
        path.resolve('./tests/e2e/features/**/*')
    ],
    services: ['selenium-standalone'],
    seleniumLogs: './logs',
    sync: true,
    logLevel: 'silent',
    coloredLogs: true,
    deprecationWarnings: false,
    bail: 0,
    waitforTimeout: 60000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 1,
    framework: 'cucumber',
    reporters: ['junit', 'dot', 'allure', 'json', 'spec'],
    reporterOptions: {
        junit: {
            outputDir: './reports/' + process.env.ENV + '/' + process.env.BROWSER + '/xml'
        },
        allure: {
            outputDir: './reports/' + process.env.ENV + '/' + process.env.BROWSER + '/allure'
        },
        json: {
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