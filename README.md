# webdriver-io-cucumber
Simple "ready for action" BDD solution based on webdriver-io and cucumber 

Options:
  --env, -e       Run tests on specified env with cread definded in config/creds
                  file                                                [required]
  --browser, -b   Run tests on specified browser, for default - Chrome
  --user, -u      Run tests on env with user login different from default for
                  this env
  --password, -p  Run tests on env with password different from default for user
                  specified in config/creds
  --tags, -t      Run scenarios with specified tags. If needs more than 1 tag,
                  it should be separated by commas
  --parallel, -l  Run scenarios in parallel with specified number of browser
                  instances. For default: 2

Run tests
    gulp test -e prd 

Create allure report
    gulp report -e prd