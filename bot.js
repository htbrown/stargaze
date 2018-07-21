const Discord = require('discord.js'),
log = require('hexalogger'),
enmap = require('enmap'),
level = require('enmap-level'),
client = new Discord.Client(),
config = require('./config.json'),
fs = require('fs');

const provider = new level({ name: 'test' });
client.db = new enmap({ provider: provider });
(async function() {
    await client.db.defer;
    log.success('DB loaded.');
}());

let alreadyStarred = {};

client.on('ready', async () => {
    log.ascii('Star');
    client.user.setActivity('shooting stars', {type: 'WATCHING'});
    log.success(`Logged into Discord with the username ${client.user.tag}.`);
    log.success('Ready.')
    if (client.guilds.size < 1) {
        log.warn('This bot is currently in no servers.')
    }
    fs.readdirSync('./util').forEach(u => {
        client.util = {};
        if(u.startsWith('_')) return;
        let util = u.split('.js')[0];
        client.util[util] = require(`./util/${u}`);
        log.success(`'${util}' util loaded.`);
    });
});

client.on('message', async (message) => {
    /* Command Handler */
    if (!message.content.startsWith(config.prefix)) {
        return;
    } else {
        const client = message.client;
        if (message.channel.type === "dm") return client.util.embed(client, message, 'red', 'Error', 'You cannot use commands in a DM channel.');
        const args = message.content.split(" ");
        const command = args.shift().slice(config.prefix.length);
        let cmdFile = require(`./commands/${command}`);
        log.info(`${message.author.tag} has executed the ${command} command in ${message.guild.name}`)
        if (cmdFile) {
            cmdFile(client, message, args);
        }
    }
});



client.on('messageReactionAdd', async (reaction) => {
    if(!reaction.emoji.name == '⭐') return;
    if (reaction.message.author.bot === true) return;
    let channel = reaction.message.guild.channels.get(client.db.get(reaction.message.guild.id)), embed = {embed: {
        author: {name: reaction.message.author.tag, icon_url: reaction.message.author.displayAvatarURL},
        color: 0x36393F, 
        description: reaction.message.content,
        footer: {icon_url: 'https://twemoji.maxcdn.com/72x72/2b50.png', text: `${reaction.users.array().length}`},
        image: {url: reaction.message.attachments.first() == undefined ? undefined : reaction.message.attachments.first().proxyURL}
      }};
    if(alreadyStarred[reaction.message.id] !== undefined) {
        let msg = await channel.fetchMessage(alreadyStarred[reaction.message.id]);
        msg.edit(embed);
    } else {
        let msg = await channel.send(embed);
        alreadyStarred[reaction.message.id] = msg.id;
    }
});

client.login(config.token);