const { By } = require('selenium-webdriver');

module.exports = async () => {
  // deleting board
  const targetBoardTitle = await driver.findElement(By.xpath('//*[@id="boards"]/div[1]/p[1]/strong')).getText();
  await driver.findElement(By.xpath('//*[@id="boards"]/div[1]/div/button[2]')).click();
  await driver.findElement(By.xpath('//*[@id="delete-board-dialog"]/div[2]/button[1]')).click();
  logTestResult(
    'CreateBoard > Delete board',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[1]/p[1]/strong')).getText() !== targetBoardTitle
  );

  /**
   * Can create board again after deleting a board
   */

  const CreateBoardForm = require('../CreateBoardForm')();
  let title = null;

  // with description
  await CreateBoardForm.open();
  await CreateBoardForm.fillTitle();
  await CreateBoardForm.fillDescription();
  await CreateBoardForm.clearTitle();
  logTestResult(
    'CreateBoard > Delete board : create board form validates title',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );
  title = await CreateBoardForm.fillTitle();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Delete board : can create board with description',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[1]/strong')).getText() === title
  );

  await CreateBoardForm.open();
  await CreateBoardForm.fillTitle();
  await CreateBoardForm.clearTitle();
  logTestResult(
    'CreateBoard > Delete board : create board form validates title',
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
  );
  title = await CreateBoardForm.fillTitle();
  await CreateBoardForm.submit();
  logTestResult(
    'CreateBoard > Delete board : can create board without description',
    await driver.findElement(By.xpath('//*[@id="boards"]/div[3]/p[1]/strong')).getText() === title
  );

  // can cancel in the middle of creating board
  await CreateBoardForm.open();
  await CreateBoardForm.fillTitle();
  await CreateBoardForm.clearTitle();
  await CreateBoardForm.fillDescription();
  await CreateBoardForm.cancel();
  logTestResult(
    'CreateBoard > Delete board : createBoard cancel',
    !await elementExists(By.xpath('//*[@id="create-board"]'))
  );
};
