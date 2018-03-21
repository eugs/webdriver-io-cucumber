const creds = require('../tests/configs/creds'),
    browsersConfig = require('../tests/configs/browserConfigs'),
    wdio = require('gulp-webdriver'),
    path = require('path'),
    config = path.resolve('./wdio.conf.js'),
    CredentialServer = require("../framework/credential_server/CredentialServer");

module.exports = function (gulp, creds, browsersConfig, pathToCustomTestsInfo, server = new CredentialServer()) {
    const args = require('./help').args.help().argv;

    gulp.task('c_server', () => {
        server.start(3099);
    });

    gulp.task('selenium', () => {
        selenium.start(function (err, child) {
            if (err) {
                console.log(err);
                throw err;
            }
            console.log(`Selenium run with process PID${process.pid}`);
        });
    });

    gulp.task('test', ['c_server', 'selenium'], test);

    gulp.task('report', () => {
        const customData = require(path.resolve(pathToCustomTestsInfo)),
            JunitReporter = require('wd-cucumber').JunitReporter,
            HTMLReporter = require('wd-cucumber').HTMLReporter;

        let browserName = args.browser ? args.browser : 'chrome';
        let jsonPath = customData.jsonPath ? customData.jsonPath : path.resolve('./reports/' + args.env + '/' + browserName + '/json');
        let xmlPath = customData.xmlPath ? customData.xmlPath : path.resolve('./reports/' + args.env + '/' + browserName + '/xml');
        let reportPath = customData.reportPath ? customData.reportPath : path.resolve('./reports/' + args.env + '/' + browserName + '/html/');
        customData.browserName = browserName;
        customData.jsonPath = jsonPath;
        customData.reportPath = reportPath;

        new HTMLReporter(customData).generate();
        new JunitReporter().generateXMLReport(jsonPath, xmlPath);
    });

    function test() {
        let baseUrl = args.url
            ? args.url
            : creds[args.env].url,
            cucumberOpts = {},
            tags = [],
            user,
            password,
            instances,
            capabilities = args.browser
                ? browsersConfig[args.browser]
                : browsersConfig.chrome;

        if (args.user && args.password) {
            user = args.user;
            password = args.password;
        } else if (args.user) {
            throw new Error('Password is required with user argument!');
        }

        instances = args.instances ? args.instances : 1;
        process.env.ENV = args.env;
        process.env.BROWSER = capabilities.browserName;

        if (args.tags) {
            tags = args.tags.split(/\s*\,\s*/gm);
        }
        cucumberOpts.tags = tags;

        return gulp.src(config)
            .pipe(wdio({
                baseUrl: baseUrl,
                capabilities: [capabilities],
                desiredCapabilities: capabilities,
                cucumberOpts: cucumberOpts,
                maxInstances: instances,
                user: user,
                password: password
            }))
            .on("end", function () {
                console.log("E2E Testing complete");
                server.stop();
                process.exit();
            })
            .on("error", function (error) {
                console.log("E2E Tests failed");
                console.log(error);
                server.stop();
                process.exit(1);
            });
    }
};