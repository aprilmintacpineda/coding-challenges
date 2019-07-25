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
    const title = `Created by Selenium. ${this.testId}#${this.count}`;
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/input')).sendKeys(title);
    this.count += 1;
    return title;
  }

  async fillDescription () {
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[2]/textarea')).sendKeys('This board was created by Selenium.');
  }

  async clearTitle () {
    await this.driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/input')).clear();
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
    async beforeEach () {
      await CreateBoardForm.open();
    },
    tests: [
      async () => {
        // test validation message of title
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
        await CreateBoardForm.submit();
        logTestResult(
          'CreateBoard > Submit empty form',
          await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/p')).getText() === 'Please enter the name of this board.'
        );
        await CreateBoardForm.cancel();
      },
      async () => {
        // can create board without description
        const title = await CreateBoardForm.fillTitle();
        await CreateBoardForm.submit();
        logTestResult(
          'CreateBoard > Creating without description',
          await driver.findElement(By.xpath('//*[@id="boards"]/div/p[1]/strong')).getText() === title
        );
      },
      async () => {
        // can create board with description
        const title = await CreateBoardForm.fillTitle();
        await CreateBoardForm.fillDescription();
        await CreateBoardForm.submit();
        logTestResult(
          'CreateBoard > Creating with description',
          await driver.findElement(By.xpath('//*[@id="boards"]/div[2]/p[1]/strong')).getText() === title
        );
      }
    ]
  };
};
