require('./io');

const Robot = require('./Robot'), Plane = require('./Plane');

const validDirections = [
  'north',
  'west',
  'south',
  'east'
];

function extractCommand (input) {
  let [cmd, ...payload] = input.split(' ');
  if (payload.constructor === Array) payload = payload.join('');

  if (cmd === 'place') {
    const [x,y,f] = payload.split(',');

    if (
      !isNaN(x) &&
      !isNaN(y) &&
      validDirections.includes(f)
    ) {
      payload = {
        x: parseInt(x),
        y: parseInt(y),
        f
      };
    } else {
      cmd = null;
      payload = null;
    }
  }

  return { cmd, payload };
}

function runCommand (cmd, payload) {
  switch (cmd) {
    case 'place':
      return Bot.place(payload.x, payload.y, payload.f);
    case 'move':
      return Bot.move();
    case 'report':
      return Bot.report();
    case 'right':
      return Bot.right();
    case 'left':
      return Bot.left();
    case 'exit':
      say('Bye!');
      return process.exit();
    case 'help':
      say('Note');
      say('* these commands and arguments are not case sensitive. That means north is the same as nORTh.');
      say('Available commands');
      say('* PLACE x,y,f -> Instantly move the robot to a particular x,y point on the table. The "f" is where the robot would be facing and should be either north, west, south or east.');
      say('* MOVE -> Move the robot 1 unit forward to the direction of where it is currently facing.');
      say('* REPORT -> Will display the location of the robot (x, y) and it\'s face direction.');
      say('* LEFT/RIGTH -> Will change the direction of where the robot is facing, 90 degress to either left or right.');
      break;
    default:
      say('You entered an unknown command or you have given an invalid payload to a command. You can type help to get the list of commands.');
      break;
  }
}

async function tick () {
  if (!Bot.hasPlace)
    say('To begin, please initialize the location of the robot in the table using PLACE command.');

  const input = await ask('');
  const { cmd, payload } = extractCommand(input);

  if (!Bot.hasPlace && cmd !== 'place') {
    tick();
  } else {
    runCommand(cmd, payload);
    tick();
  }
}

say('************************************');
say('* Welcome to Coding Challenge 1    *');
say('* Solution by: April Mintac Pineda *');
say('************************************');

say('NOTES:');
say('- You can type EXIT anytime to exit out of the program.');
say('- You can type HELP anytime to show command list and description.');


const Bot = new Robot(new Plane(5, 5));
tick();
