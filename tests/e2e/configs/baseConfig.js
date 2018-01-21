const path = require('path');

exports.config = {
    specs: [
        path.resolve('./tests/e2e/features/*.feature'),
        path.resolve('./tests/e2e/features/**/*.feature'),
    ],  
    services: ['selenium-standalone'],
    seleniumLogs: './logs',
    sync: true,
    logLevel: 'data',
    coloredLogs: true,
    deprecationWarnings: true,
    bail: 10,
    waitforTimeout: 60000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    framework: 'cucumber',
    cucumberOpts: {
        require: ['./tests/e2e/step_definitions'],        
        format: 'json:.report/results.json',
        strict: true, 
        colors: true,   
        tags: [],          
        timeout: 20000,     
        ignoreUndefinedDefinitions: false, 
    },
};