const chalk = require('chalk');

global.sleep = ms => new Promise(resolve => {
  setTimeout(resolve, ms);
});

global.logTestResult = (message, didPass) => {
  if (didPass) {
    // eslint-disable-next-line
    console.log(chalk.green(`${message} > PASSED`));
  } else {
    // eslint-disable-next-line
    console.log(chalk.red(`${message} > FAILED`));
    throw new Error('A test failed.');
  }
};

global.log = message => {
  // eslint-disable-next-line
  console.log(chalk.blue(message));
};

require('./run');
