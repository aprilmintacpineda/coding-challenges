const uuid = require('uuid/v4');
const { Builder } = require('selenium-webdriver');

const testId = uuid();

log('opening browser');
const driver = new Builder()
  .forBrowser('chrome')
  .build();

async function runTests (suite) {
  for (let a = 0, max = suite.tests.length; a < max; a++) {
    if (suite.beforeEach) await suite.beforeEach();
    await suite.tests[a](driver, testId);
    if (suite.afterEach) await suite.afterEach();
  }
}

(async () => {
  try {
    log('Opening https://working-space.herokuapp.com/');
    await driver.get('https://working-space.herokuapp.com/');
    log('Running tests...');

    await runTests(require('./boards'));
    await sleep(2000);
  } finally {
    driver.quit();
  }
})();
