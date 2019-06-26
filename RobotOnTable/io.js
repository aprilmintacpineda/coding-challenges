const readline = require('readline');
const { stdout, stdin } = process;

const rl = readline.createInterface({
  input: stdin,
  output: stdout
});


function say (...args) {
  // eslint-disable-next-line
  console.log(...args);
}

function ask (message = null) {
  return new Promise(resolve => {
    rl.question(message, answer => {
      resolve(answer.toLowerCase());
    });
  });
}

global.say = say;
global.ask = ask;
