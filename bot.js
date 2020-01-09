const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'kingsnugglezbot',
    password: 'oauth:7ssdtw10iu31yxj5ntwqblg8ap12rh'
  },
  channels: [
    'KingSnugglez'
  ]
};

const catfacts = [
        "Cats are North America’s most popular pets: there are 73 million cats compared to 63 million dogs. Over 30% of households in North America own a cat.",
        "During the Middle Ages, cats were associated with withcraft, and on St. John’s Day, people all over Europe would stuff them into sacks and toss the cats into bonfires. On holy days, people celebrated by tossing cats from church towers.",
        "Tigers are excellent swimmers and do not avoid water.",
        "Unlike humans, cats cannot detect sweetness which likely explains why they are not drawn to it at all.",
        "Julius Ceasar, Henri II, Charles XI, and Napoleon were all afraid of cats."
];

var ggNum = 0;

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
    if (commandName.includes('!d')) {
        const num = rollDice(commandName);
        client.say(target, `You rolled a ${num}. Link: https://glitch.com/~twitch-chatbot`);
        console.log(`* Executed ${commandName} command`);
    } else if (commandName === '!catfact'){
        var fact = catfacts[Math.floor(Math.random()* catfacts.length)]
        client.say(target, `Your cat fact is: ${fact}`);
        console.log(`* Executed ${commandName} command. ${num}`);
    } else if (commandName === 'gg') {
        ggNum++;
        console.log(context);
        client.say(target, `Chat has said gg ${ggNum} times. Kappa`);
    } else if (commandName === 'merlock'){
        client.say(target, `/timeout ${context.username} 10`);
        client.say(target, `${context.username} has found the word of the day!`);
    } else {
        console.log(`* Unknown command ${commandName}`);
    }
}

// Function called when the "dice" command is issued
function rollDice (commandName) {
  const sides = parseInt(commandName.replace(/\D/g, ""));
  console.log(sides);
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}


/* Context Object Ex.
{ 'badge-info': null,
  badges: { broadcaster: '1' },
  color: '#FF69B4',
  'display-name': 'KingSnugglez',
  emotes: null,
  flags: null,
  id: 'f0085609-7c64-4463-8933-cd1885d55436',
  mod: false,
  'room-id': '38849822',
  subscriber: false,
  'tmi-sent-ts': '1578609896231',
  turbo: false,
  'user-id': '38849822',
  'user-type': null,
  'emotes-raw': null,
  'badge-info-raw': null,
  'badges-raw': 'broadcaster/1',
  username: 'kingsnugglez',
  'message-type': 'chat' }
  */