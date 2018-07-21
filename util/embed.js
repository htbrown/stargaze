const package = require('../package.json'), Discord = require('discord.js');
module.exports = async (client, message, clr, title, description, fields, footer, thumbnail, image) => {
  switch(clr) {
    case 'red':
      color = 0xe74c3c;
      break;
    case 'blue':
      color = 0x3498db;
      break;
    case 'green':
      color = 0x2ecc71;
      break;
    default:
      color = 0x36393F;
      break;
  }

  return message.channel.send({embed: {
    author: {name: client.user.username, icon_url: client.user.avatarURL},
    color,
    title,
    description,
    fields,
    thumbnail,
    image,
    footer: {text: footer !== undefined ? footer + ` | v${package.version}` : `v${package.version}`}
  }});
}