const { By } = require('selenium-webdriver');

module.exports = async (driver, testId) => {
  // can create board without description
  const CreateBoardForm = require('../CreateBoardForm')(driver, testId);
  let title = null;

  await CreateBoardForm.open();
  await CreateBoardForm.fillTitle();
  await CreateBoardForm.clearTitle();
  logTestResult(
    'CreateBoard > Creating without description validates title',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );
  title = await CreateBoardForm.fillTitle();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Creating without description',
    await driver.findElement(By.xpath('//*[@id="boards"]/div/p[1]/strong')).getText() === title
  );

  // can create board with description
  await CreateBoardForm.open();
  await CreateBoardForm.fillTitle();
  await CreateBoardForm.clearTitle();
  logTestResult(
    'CreateBoard > Creating with description validates title',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );
  title = await CreateBoardForm.fillTitle();
  await CreateBoardForm.fillDescription();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Creating with description',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[1]/strong')).getText() === title
  );
};
