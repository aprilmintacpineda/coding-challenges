const { By } = require('selenium-webdriver');

module.exports = async () => {
  // editing a board

  const CreateBoardForm = require('../CreateBoardForm')();

  // edit board form validates title
  await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/div/button[1]')).click();
  await CreateBoardForm.clearTitle();
  logTestResult(
    'CreateBoard > Editing a board title validates title',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );

  // can cancel in the middle of editing
  await CreateBoardForm.cancel();

  // can change title
  await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/div/button[1]')).click();
  await CreateBoardForm.clearTitle();
  const title = await CreateBoardForm.fillTitle();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Editing a board allows changing title',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[1]/strong')).getText() === title
  );

  // can change description
  await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/div/button[1]')).click();
  await CreateBoardForm.clearDescription();
  const description = await CreateBoardForm.fillDescription();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Editing a board allows changing description',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[2]')).getText() === description
  );

  // can remove description
  await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/div/button[1]')).click();
  await CreateBoardForm.clearDescription();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Editing a board allows removing the description',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[2]')).getText() === 'No details provided.'
  );
};
