const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Get help with commands/the bot',
    execute(bot, msg, args) {
        const prefix = config.prefix || '!';

        if (!args[0]) {
            const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

            const commandsList = commandFiles.map(file => {
                const commandModule = require(`../commands/${file}`);
                return `- ${commandModule.name}`;
            }
            ).join('\n');

            bot.createMessage(msg.channel.id, {
                embed: {
                    title: 'Help System',
                    description: `Use \`${prefix}help <command>\` to get help with a specific command. The commands are:\n\n${commandsList}`,
                    color: 0x6699FF,
                    author: {
                        name: bot.user.username,
                        icon_url: bot.user.avatarURL
                    }
                }
            });
        } else {
            const commandFile = `${args[0].toLowerCase()}.js`;
            const commandPath = path.join(__dirname, `../commands/${commandFile}`);

            if (fs.existsSync(commandPath)) {
                const commandModule = require(commandPath);

                bot.createMessage(msg.channel.id, {
                    embed: {
                        description: `**Description:** ${commandModule.description}\n**Usage:** ${prefix}${commandModule.name} ${commandModule.usage || ''}`,
                        color: 0x6699FF,
                        author: {
                            name: `Command: ${commandModule.name}`,
                            icon_url: bot.user.avatarURL
                        }
                    }
                });
            } else {
                bot.createMessage(msg.channel.id, {
                    embed: {
                        description: `Command \`${args[0]}\` not found.`,
                        color: 0xff4731,
                        author: {
                            name: `Error`,
                            icon_url: bot.user.avatarURL
                        }
                    }
                });
            }
        }
    }
};