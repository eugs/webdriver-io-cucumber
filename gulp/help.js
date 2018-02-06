module.exports.args = require('yargs')
    .option('env', {
        alias: 'e',
        describe: 'Run tests on specified env with cread definded in config/creds file'
    })
    .option('url', {
        alias: 'u',
        describe: 'Run tests on specified url, for default - base url for specified environment'
    })
    .option('browser', {
        alias: 'b',
        describe: 'Run tests on specified browser, for default - Chrome'
    })
    .option('user', {
        alias: 'l',
        describe: 'Run tests on env with user login different from default for this env'
    })
    .option('password', {
        alias: 'p',
        describe: 'Run tests on env with password different from default for user specified in config/creds'
    })
    .option('tags', {
        alias: 't',
        describe: 'Run scenarios with specified tags. If needs more than 1 tag, it should be separated by commas'
    })
    .option('parallel', {
        alias: 'r',
        describe: 'Run scenarios in parallel with specified number of browser instances. For default: 2'
    })
    .demandOption(['env'], 'Please provide "env" argument to run tests');