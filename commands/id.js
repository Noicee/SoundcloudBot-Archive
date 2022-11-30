const { MessageEmbed } = require('discord.js');
const index = require('../index.js');
const config = require("../config.json");
const fetch = require('node-fetch')

module.exports.run = async (ops, message, _bot, _args) => {
    const prefix = config.userSettings.prefix;
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();


    let noArgsEmbed = new MessageEmbed()
    .setColor(config.mainColor)
    .setDescription(`:x: No argument provided. Valid usage: ${prefix}id [username] (CASE SENSITIVE)`);
  
    if (!args.length) return message.channel.send(noArgsEmbed);

    let username = args[0];
    let authID = 'enSCGLkGEJANQfrxZYQkCVT5gq2F3fBp';
    // enSCGLkGEJANQfrxZYQkCVT5gq2F3fBp
    // 1BRMajD9kXgL34VfNJLbvKlgCfQmFswG

    let resolveApi = `https://api-v2.soundcloud.com/resolve?url=http://soundcloud.com/${username}&client_id=${authID}`;

    fetch(resolveApi)
    .then(res => res.json())
    .then(json => {
        return message.channel.send(`${username}'s userID is: ${json.id}`);
    })
    .catch(err => console.error(err));

}

module.exports.help = {
  name: "id"
}
