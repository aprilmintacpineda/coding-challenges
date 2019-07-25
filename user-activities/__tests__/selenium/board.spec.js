const { By } = require('selenium-webdriver');

class CreateBoard {
  constructor (driver, testId) {
    this.driver = driver;
    this.testId = testId;
    this.count = 0;
  }

  async open () {
    try {
      await this.driver.findElement(By.xpath('//*[@id="empty-workspace"]/button')).click();
    } catch (e) {
      await this.driver.findElement(By.id('new-board-button')).click();
    }

    await sleep(100);
  }

  async cancel () {
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/input[2]')).click();
    await sleep(100);
  }

  async fillTitle () {
    const title = `${this.testId}#${this.count}`;
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/input')).sendKeys(title);
    this.count++;
    return title;
  }

  async clearTitle () {
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/input')).clear();
    await sleep(100);
  }

  async fillDescription () {
    const description = `${this.testId}#${this.count}`;
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[2]/textarea')).sendKeys(description);
    this.count++;
    return description;
  }

  async clearDescription () {
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[2]/textarea')).clear();
    await sleep(100);
  }

  async submit () {
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/input[1]')).click();
    await sleep(100);
  }
}

module.exports = (driver, testId) => {
  const CreateBoardForm = new CreateBoard(driver, testId);

  return {
    tests: [
      async () => {
        // test validation message of title
        await CreateBoardForm.open();
        await CreateBoardForm.fillTitle();
        await CreateBoardForm.clearTitle();
        logTestResult(
          'CreateBoard > Title validation',
          await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
        );
        await CreateBoardForm.cancel();
      },
      async () => {
        // submitting an empty form
        await CreateBoardForm.open();
        await CreateBoardForm.submit();
        logTestResult(
          'CreateBoard > Submit empty form',
          await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
        );
        await CreateBoardForm.cancel();
      },
      async () => {
        // can create board without description
        await CreateBoardForm.open();
        await CreateBoardForm.fillTitle();
        await CreateBoardForm.clearTitle();
        logTestResult(
          'CreateBoard > Creating without description validates title',
          await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
        );
        const title = await CreateBoardForm.fillTitle();
        await CreateBoardForm.submit();
        logTestResult(
          'CreateBoard > Creating without description',
          await driver.findElement(By.xpath('//*[@id="boards"]/div/p[1]/strong')).getText() === title
        );
      },
      async () => {
        // can create board with description
        await CreateBoardForm.open();
        await CreateBoardForm.fillTitle();
        await CreateBoardForm.clearTitle();
        logTestResult(
          'CreateBoard > Creating with description validates title',
          await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
        );
        const title = await CreateBoardForm.fillTitle();
        await CreateBoardForm.fillDescription();
        await CreateBoardForm.submit();
        logTestResult(
          'CreateBoard > Creating with description',
          await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[1]/strong')).getText() === title
        );
      },
      async () => {
        // editing a board

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
      }
    ]
  };
};
