module.exports = bot => {
    console.log(`[✨ ONLINE] ${bot.user.username} is now online and responsive!`);
    bot.editStatus({ name: `${bot.guilds.size} ${bot.guilds.size === 1 ? 'server' : 'servers'}`, type: 3 });
};