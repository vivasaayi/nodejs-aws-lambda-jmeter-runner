const S3Proxy = require("./proxies/s3-proxy");
const executeCommand = require("./proxies/command-executor");

const s3Proxy = new S3Proxy();

class TestRunner {
    async checkIfFileExists() {

    }
    async assertDestinationFile(params) {
        if (params.S3) {
            await s3Proxy.downloadFile();
        }

        const fileName = "";

        await this.checkIfFileExists(fileName);
    }

    async runTest() {
        return executeCommand("jmeter -n -t /tests/simple-test.jmx", function () {
            console.log("Success")
        }, function () {
            console.log("Error")
        });
    }

    async publishTestResults() {
        await s3Proxy.uploadFile("FileName");
    }

    async runTests(params) {
        await this.assertDestinationFile(params);
        await this.runTest();
        await this.publishTestResults();
    }
}

module.exports = TestRunner