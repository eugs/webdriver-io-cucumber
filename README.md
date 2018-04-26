# webdriver-io-cucumber


### Simple "ready for action" BDD solution based on webdriver-io and cucumber


Options for gulp task 'test':
```
  --version        Show version number                                 [boolean]
  --env, -e        Run tests on specified env with cread definded in
                   config/creds file                                  [required]
  --url, -u        Run tests on specified url, for default - base url for
                   specified environment
  --browser, -b    Run tests on specified browser, for default - Chrome
  --user, -l       Run tests on env with user login different from default for
                   this env
  --password, -p   Run tests on env with password different from default for
                   user specified in config/creds
  --tags, -t       Run scenarios with specified tags. If needs more than 1 tag,
                   it should be separated by commas
  --instances, -i  Run scenarios in parallel with specified number of browser
                   instances. For default: 1
  --help           Show help                                           [boolean]
```

Examples:

Run tests
```
    gulp test -e prd -i 4 -t "@smoke"
```
Create html report
```
    gulp report -e prd
```

If you need to test Angular app, add 'rootElement' into wdio.conf.js:
```
    rootElement: '<your_angular_root_element>'
```

Example of page object for Angular app
```
const AngularPage = require('wd-cucumber').AngularPage;

class Home extends AngularPage {
    constructor(selector = '.screen-fill-body', url = '/'){
        super(selector,url);
        this.defineComponent('Menu', new Menu());
        this.defineComponent('Packages', new Packages());
    }
}
```

Run tests in parallel with different credentials:
1. Start credential server (server example [here](https://github.com/VolhaShut/Credential-Service))
2. Add credental manager functions in tests
    * Get sessionId from `createSessionId(<your_host:port>)`
    * Create user pool `createUserPool(<your_host:port>, <your_env>, [{user: <user>, password: <password>}], sessionId)`- before tests start (for example in wdio.config -> `onPrepare()`). Be aware, these functions are async!
    * Use `lockUser()`/`unlockUser()` for get and free user credential. For example:

                `browser.call(async () => credentials = await mg.lockUser('http://localhost:3002', <your_env_name>));`
    * Delete user pool from server, after tests were done: `deleteUserPool(<your_host:port>, <your_env>, sessionId)`


