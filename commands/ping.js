module.exports = async (client, message, args) => {
    client.util.embed(client, message, undefined, 'Pong!', undefined, undefined, `The client ping is ${Math.floor(client.ping)}ms`);
}

module.exports.description = 'Pings the bot.'