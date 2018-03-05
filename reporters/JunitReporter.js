"use strict";
const xml2js = require('xml2js'),
    fs = require('fs'),
    path = require('path'),
    chalk = require('chalk');

class JunitReporter {

    /**
     * Build xml
     * @param jsonData 
     * @return {{testsuites: (webdriver.promise.Promise|promise.Promise<any[]>|Array|wdpromise.Promise<any[]>|*|{İ, I, İ})}}
     * @private
     */
    _build(jsonData) {
        return {
            testsuites: jsonData.map((testSuiteData) => {
                return {
                    testsuite: {
                        $: this._getTestSuiteAttrs(testSuiteData),
                        properties: this._getProperties(testSuiteData),
                        testcase: this._getTestCases(testSuiteData)
                    }
                }
            })
        }
    }

    /**
     * Get test cases data
     * @param testSuiteData
     * @return {Array}
     * @private
     */
    _getTestCases(testSuiteData) {
        return testSuiteData.elements.map((testCase) => {
            let tc = {
                $: {
                    name: testCase.name,
                    classname: testSuiteData.name
                }
            };
            const failedStep = testCase.steps.find((testStep) => {
                return testStep.result.status === "failed"
            });

            if (failedStep) {
                tc.failure = failedStep.result.error_message
            }
            return tc
        })
    }

    /**
     * Get properties data of test suite
     * @param testSuiteData
     * @return {Array}
     * @private
     */
    _getProperties(testSuiteData) {
        return [
            {
                property: {
                    $: {
                        name: "URI",
                        value: testSuiteData.uri
                    }
                }
            }
        ]
    }

    /**
     * Get test suite attrs
     * @param testSuiteData
     * @return {{name, package, id: number}}
     * @private
     */
    _getTestSuiteAttrs(testSuiteData) {
        return {
            name: testSuiteData.name,
            package: testSuiteData.name,
            id: testSuiteData.name
        }
    }

    /**
     * Generate XML and write into the file 
     * @param {string} pathToJson 
     * @param {string} pathToXml 
     */
    generateXMLReport(pathToJson, pathToXml) {
        const xml = new xml2js.Builder().buildObject(this._build(require(path.join(pathToJson, 'report.json'))));
        if (!fs.existsSync(pathToXml)) {
            fs.mkdirSync(pathToXml);
        }
        fs.writeFileSync(path.join(pathToXml, 'report.xml'), xml);
        console.log(chalk.blue(`\n 
=====================================================================================
    XML report generated in:
    
    ${path.join(pathToXml, 'report.xml')}
=====================================================================================\n`));
    }
}


module.exports = JunitReporter;