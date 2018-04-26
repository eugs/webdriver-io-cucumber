const creds = require('../tests/configs/creds'),
    browsersConfig = require('../tests/configs/browserConfigs'),
    wdio = require('gulp-webdriver'),
    path = require('path'),
    config = path.resolve('./wdio.conf.js'),
    selenium = require('selenium-standalone'),
    taskKiller = require("../framework/taskKiller");

module.exports = function (gulp, creds, browsersConfig, pathToCustomTestsInfo) {
    const args = require('./help').args.help().argv;

    gulp.task('selenium', () => {
        selenium.start((err) => {
            if (err) throw err
        });
    });

    gulp.task('test', ['selenium'], test);

    gulp.task('report', () => {
        const customData = require(path.resolve(pathToCustomTestsInfo)),
            JunitReporter = require('wd-cucumber').JunitReporter,
            HTMLReporter = require('wd-cucumber').HTMLReporter;

        const browserName = args.browser ? args.browser : 'chrome';
        if (!customData.jsonPath) {
            customData.jsonPath = path.resolve('./reports/' + args.env + '/' + browserName + '/json');
        }
        if (!customData.xmlPath) {
            customData.xmlPath = path.resolve('./reports/' + args.env + '/' + browserName + '/xml');
        }
        if (!customData.reportPath) {
            customData.reportPath = path.resolve('./reports/' + args.env + '/' + browserName + '/html/');
        }
        customData.browserName = browserName;

        new HTMLReporter(customData).generate();
        new JunitReporter().generateXMLReport(customData.jsonPath, customData.xmlPath);
    });

    gulp.task("kill", () => taskKiller.kill(["chromedriver", "iedriverserver"]));

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
                process.exit();
            })
            .on("error", function (err) {
                console.log(err);
                process.exit(1);
            });
    }
};