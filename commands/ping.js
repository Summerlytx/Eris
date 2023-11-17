const emojis = require('../data/emojis.json');

module.exports = {
    name: 'ping',
    description: 'Check the bot\'s ping',
    execute(bot, msg, args) {
        if (args[0] === 'ms') {
            const startTime = Date.now();
            const includeMs = args[0] && args[0].toLowerCase() === 'ms';

            bot.createMessage(msg.channel.id, `Pinging...`).then(m => {
                const endTime = Date.now();
                const ping = endTime - startTime;

                const emoji = ping < 299 ? emojis.online : ping < 599 ? emojis.idle : ping < 899 ? emojis.dnd : emojis.dnd;
                const pingText = includeMs ? `\`${ping}ms\`` : '';

                m.edit(`${emoji} Pong! ${pingText}`);
            });
        } else {
            bot.createMessage(msg.channel.id, `${emojis.online} Pong!`);
        }
    }
}