const path = require('path');
const wdio = require('gulp-webdriver');
const allure = require('allure-commandline');
const config = path.resolve('./wdio.conf.js');

module.exports = function (gulp, creds, browsersConfig) {
    const args = require('./help').args.help().argv;

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

        return gulp.src(config)
            .pipe(wdio({
                baseUrl: baseUrl,
                capabilities: [capabilities],
                desiredCapabilities: capabilities
            }));
    }
};