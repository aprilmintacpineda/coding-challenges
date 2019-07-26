const { By } = require('selenium-webdriver');

class CreateBoardForm {
  constructor () {
    this.count = 0;
  }

  async open () {
    try {
      await driver.findElement(By.xpath('//*[@id="empty-workspace"]/button')).click();
    } catch (e) {
      await driver.findElement(By.id('new-board-button')).click();
    }

    await sleep(100);
  }

  async cancel () {
    await driver.findElement(By.xpath('//*[@id="create-board"]/input[2]')).click();
    await sleep(100);
  }

  async fillTitle () {
    const title = `${testId}#${this.count}`;
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/input')).sendKeys(title);
    this.count++;
    return title;
  }

  async clearTitle () {
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[1]/input')).clear();
    await sleep(100);
  }

  async fillDescription () {
    const description = `${testId}#${this.count}`;
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[2]/textarea')).sendKeys(description);
    this.count++;
    return description;
  }

  async clearDescription () {
    await driver.findElement(By.xpath('//*[@id="create-board"]/div[2]/textarea')).clear();
    await sleep(100);
  }

  async submit () {
    await driver.findElement(By.xpath('//*[@id="create-board"]/input[1]')).click();
    await sleep(100);
  }
}

module.exports = () => new CreateBoardForm();
