const config = require('../config.json');
module.exports = async (client, message, args) => {
    if (!config.maintainers.includes(message.author.id)) return client.util.embed(client, message, 'red', 'What are you doing?', 'Hey! You\'re not supposed to be here! Now shoo, go on!')
    try {
        var evaled = eval(args[0]);

       if (evaled === client.token || evaled === config.token) return client.util.embed(client, message, 'red', 'Nice one mate!', 'What do you think you\'re doing? Exposing my token, that\'s like raiding a server!');

        if (typeof evaled !== "string"){
            evaled = require("util").inspect(evaled);
        }

        client.util.embed(client, message, 'green', 'Eval Result', `\`\`\`${evaled}\`\`\``);
    } catch (err) {
        client.util.embed(client, message, 'red', 'Oops!', `Seems like something's gone wrong with your code. Here's what I returned. \n\`\`\`${err}\`\`\``);
    }
}

module.exports.description = 'Runs JS code.'