const { By } = require('selenium-webdriver');

module.exports = async (driver, testId) => {
  // submitting an empty form
  const CreateBoardForm = require('../CreateBoardForm')(driver, testId);
  await CreateBoardForm.open();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Submit empty form',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );
  await CreateBoardForm.cancel();
};
