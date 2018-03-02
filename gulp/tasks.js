const creds = require('../tests/configs/creds'),
    browsersConfig = require('../tests/configs/browserConfigs'),
    wdio = require('gulp-webdriver'),
    allure = require('allure-commandline'),
    path = require('path'),
    config = path.resolve('./wdio.conf.js'),
    CredentialServer = require("../framework/credential_server/CredentialServer");


module.exports = function (gulp, creds, browsersConfig, pathToCustomTestsInfo, server = new CredentialServer()) {
    const args = require('./help').args.help().argv;

    gulp.task('c_server', () => {
        server.start(3099);
    });

    gulp.task('test', ['c_server'], test);

    gulp.task('report', () => {
        const report = require('multiple-cucumber-html-reporter');
        const os = require('os');
        let platform = os.platform() === 'win32' ? 'windows' : os.platform();
        const customData = require(path.resolve(pathToCustomTestsInfo));
        let browserName = args.browser ? args.browser : 'chrome';
        let date = new Date();
        let reportDate = date.getHours() + '.' + date.getMinutes() + 'time_' + date.getDate() + '_' + parseInt(date.getMonth() + 1) + '_' + date.getFullYear() + '_date';
        let jsonPath = customData.jsonPath ? customData.jsonPath : path.resolve('./reports/' + args.env + '/' + browserName + '/json');
        let reportPath = customData.reportPath ? customData.reportPath : path.resolve('./reports/' + args.env + '/' + browserName + '/html/' + reportDate);
        report.generate({
            jsonDir: jsonPath,
            reportPath: reportPath,
            metadata: {
                browser: {
                    name: browserName,
                    version: customData.browserVersion
                },
                device: customData.device,
                platform: {
                    name: platform,
                    version: os.release()
                }
            },
            customData: {
                title: 'Run info',
                data: [
                    { label: 'Project', value: customData.project },
                    { label: 'Release', value: customData.release },
                    { label: 'Execution Start Time', value: customData.startTime },
                    { label: 'Execution End Time', value: customData.endTime }
                ]
            }
        });
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
                server.stop();
                process.exit(1);
            });
    }
};