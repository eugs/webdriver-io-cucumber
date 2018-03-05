const report = require('multiple-cucumber-html-reporter');
const os = require('os');
const platform = os.platform() === 'win32' ? 'windows' : os.platform();

class HTMLReporter {

    constructor(customData){
        this.customData = customData;
    }
    generate(){
        report.generate({
            jsonDir: this.customData.jsonPath,
            reportPath: this.customData.reportPath,
            metadata: {
                browser: {
                    name: this.customData.browserName,
                    version: this.customData.browserVersion
                },
                device: this.customData.device,
                platform: {
                    name: platform,
                    version: os.release()
                }
            },
            customData: {
                title: 'Run info',
                data: [
                    { label: 'Project', value: this.customData.project },
                    { label: 'Release', value: this.customData.release },
                    { label: 'Execution Start Time', value: this.customData.startTime },
                    { label: 'Execution End Time', value: this.customData.endTime }
                ]
            }
        });
    }
}

module.exports = HTMLReporter;