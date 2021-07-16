const TestRunner = require("./test-runner/test-runner");

const testRunner = new TestRunner();

module.exports.handler = function () {
    console.log("Starting Tests");
    await testRunner.runTests();
    console.log("Tests Completed");
}