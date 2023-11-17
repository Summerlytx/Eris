const { Client } = require('eris');
const fs = require('fs');
const path = require('path');

const config = require('./config.json');
const bot = new Client(config.token);

// Load events
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    bot.on(eventName, event.bind(null, bot));
}

// Load commands
bot.commands = new Map();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    bot.commands.set(command.name, command);
}

bot.connect();