const { By } = require('selenium-webdriver');

module.exports = async (driver, testId) => {
  // test validation message of title
  const CreateBoardForm = require('../CreateBoardForm')(driver, testId);
  await CreateBoardForm.open();
  await CreateBoardForm.fillTitle();
  await CreateBoardForm.clearTitle();
  logTestResult(
    'CreateBoard > Title validation',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );
  await CreateBoardForm.cancel();
};
