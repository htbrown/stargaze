const fs = require('fs'), package = require('../package.json');
module.exports = async (client, message, args) => {
    let commands = [];
    fs.readdirSync('./commands/').forEach(f => {
        commands.push([f.substring(0, f.length-3), require(`./${f}`).description]);
      });
      message.channel.send({embed: {
          author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
          },
          description: 'Sent to your DMs!',
          color: 0x36393F,
          footer: {
              text: `v${package.version}`
          }
      }});
      message.author.send({embed: {
        author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
        },
        title: 'Help',
        color: 0x36393F,
        fields: commands.map(function(c) {return {name: c[0], value: c[1]}}),
        footer: {
            text: `v${package.version}`
        }
      }})
}

module.exports.description = 'Shows help for the bot.'