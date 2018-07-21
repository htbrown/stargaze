module.exports = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_GUILD')) return client.util.embed(client, message, 'red', 'Error', 'You require the Manage Server permission to do this.');
    client.util.embed(client, message, undefined, 'Setup', 'Please tag the channel you want me to send starred messages to.');
    message.channel.awaitMessages(m => m.content.startsWith('<#') && m.author.id == message.author.id, {maxMatches: 1}).then(c => {
        client.db.set(message.guild.id, c.first().content.substring(2, c.first().content.length-1));
        client.util.embed(client, message, undefined, 'Setup', undefined, undefined, 'Setup is done!');
    }) 
}
module.exports.description = 'Sets up the bot.'