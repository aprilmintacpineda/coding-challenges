require('./globals');

const uuid = require('uuid/v4');
const { Builder } = require('selenium-webdriver');

global.testId = uuid();

log('opening browser');
global.driver = new Builder().forBrowser('chrome').build();

async function runTests (suite) {
  for (let a = 0, max = suite.tests.length; a < max; a++) {
    if (suite.beforeEach) await suite.beforeEach();
    await suite.tests[a]();
    if (suite.afterEach) await suite.afterEach();
  }
}

(async () => {
  try {
    log('Opening https://working-space.herokuapp.com/');
    await driver.get('https://working-space.herokuapp.com/');
    log('Running tests...');

    await runTests(require('./boards'));
  } finally {
    log('Running completed. Closing driver...');
    await sleep(2000);
    driver.quit();
  }
})();
