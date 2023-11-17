const config = require('../config.json');
const { check, cross } = require('../data/emojis.json');

module.exports = (bot, msg) => {
    if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!bot.commands.has(commandName)) return;

    const command = bot.commands.get(commandName);

    try {
        command.execute(bot, msg, args);
    } catch (error) {
        console.error(error);
        bot.createMessage(msg.channel.id, `${cross} There was an error trying to execute that command!`).catch(console.error);
    }
};