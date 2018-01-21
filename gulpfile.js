const gulp = require('gulp');
const wdio = require('gulp-webdriver');
const allure = require('allure-commandline');
const creds = require('./tests/configs/creds');
const browsersConfig = require('./tests/configs/browserConfigs');
const args = require('./help').args.help().argv;

gulp.task('test', test);
test.description = 'Run e2e test with parameters';

gulp.task('report', (done) => {
    const generation = allure(['generate', './reports/' + args.env + '/' + process.env.BROWSER + '/allure', '--clean']);
    generation.on('exit', (exitCode) => {
        console.log('Generation is finished with code:', exitCode);
        done();
    })
});
report.description = 'Generate allure report after tests';

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
        tags = args.tags;
        tags.includes(',')
            ? tags = tags.slice(',')
            : tags = [tags];
    }
    capabilities.tags = tags;

    return gulp.src('./wdio.conf.js')
        .pipe(wdio({
            baseUrl: baseUrl,
            capabilities: [capabilities],
            desiredCapabilities: capabilities
        }));
}

