const creds = require('../tests/configs/creds'),
    browsersConfig = require('../tests/configs/browserConfigs'),
    wdio = require('gulp-webdriver'),
    allure = require('allure-commandline'),
    path = require('path'),
    config = path.resolve('./wdio.conf.js'),
    CredentialServer = require("../framework/credential_server/CredentialServer");


module.exports = function (gulp, creds, browsersConfig, server = new CredentialServer()) {
    const args = require('./help').args.help().argv;

    gulp.task('c_server', () => {
        server.start(3099);
    });

    gulp.task('test', ['c_server'], test);

    gulp.task('report', (done) => {
        let browserName = args.browser ? args.browser : 'chrome';
        const generation = allure(['generate', path.resolve('./reports/' + args.env + '/' + browserName + '/allure'), '--clean']);
        generation.on('exit', (exitCode) => {
            console.log('Generation is finished with code:', exitCode);
            done();
        })
    });

    function test() {
        let baseUrl = args.url
            ? args.url
            : creds[args.env].url,
            cucumberOpts = {},
            tags = [],
            user,
            password,
            capabilities = args.browser
                ? browsersConfig[args.browser]
                : browsersConfig.chrome;

        if (args.user && args.password) {
            user = args.user;
            password = args.password;
        } else if (args.user) {
            throw new Error('Password is required with user argument!');
        }

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