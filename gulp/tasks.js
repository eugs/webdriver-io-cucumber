const creds = require('../tests/configs/creds'),
    browsersConfig = require('../tests/configs/browserConfigs'),
    wdio = require('gulp-webdriver'),
    allure = require('allure-commandline'),
    path = require('path'),
    server = require("gulp-express"),
    config = path.resolve('./wdio.conf.js');

module.exports = function (gulp, creds, browsersConfig) {
    const args = require('./help').args.help().argv;

    gulp.task("c_server", () => {
        server.run(["./framework/credential_server/server.js"]);
    });

    gulp.task('test', test);

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
            }));
    }
};