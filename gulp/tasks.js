const creds = require('../tests/configs/creds');
const browsersConfig = require('../tests/configs/browserConfigs');
const wdio = require('gulp-webdriver');
const allure = require('allure-commandline');
const path = require('path');
const server = require("gulp-express");

module.exports = function (gulp) {
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
        let baseUrl = creds[args.env].url;
        let capabilities;
        let tags = [];

        args.browser
            ? capabilities = browsersConfig[args.browser]
            : capabilities = browsersConfig.chrome;

        process.env.ENV = args.env;
        process.env.BROWSER = capabilities.browserName;
        // TODO 
        //user and password in memory
        //args.user and args.password

        if (args.tags) {
            tags = args.tags.split(/\s*\,\s*/gm);
        }
        capabilities.tags = tags;
        
        return gulp.src(path.resolve('./wdio.conf.js'))
            .pipe(wdio({
                baseUrl: baseUrl,
                capabilities: [capabilities],
                desiredCapabilities: capabilities
            }));
    }
};