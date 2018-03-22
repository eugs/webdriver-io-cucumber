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

Create users pool for multiple instances in wdio.conf.js
```
const credentialManager = require('wd-cucumber').ServerCredentialManager;
    onPrepare() {
        if (this.user) {
            credentialManager.createPool([{ user: this.user, password: this.password }]);
        } else {
            credentialManager.createPool(creds[process.env.ENV].creds);
        }
    }
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

