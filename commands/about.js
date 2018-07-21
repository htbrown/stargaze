const Discord = require('discord.js');
module.exports = async (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription('Hey! I\'m Stargaze, a simple starboard bot by Hexabyte, with help from Anidox. Here\'s some statistics about me.')
    .setFooter(`v${require('../package.json').version}`)
    .setColor(0x36393F)
    .addField('Users', client.users.size, true)
    .addField('Guilds', client.guilds.size, true)
    .addField('Discord.js version', Discord.version, true)
    .addField('Node.js version', process.version, true);
    message.channel.send(embed);
}

module.exports.description = 'Shows some info about Stargaze.'