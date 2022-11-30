const { MessageEmbed } = require('discord.js');
const index = require('../index.js');
const config = require("../config.json");

module.exports.run = async (ops, message, _bot, _args) => {

  let botembed = new MessageEmbed()
    .setColor(config.mainColor)
    .setDescription(":x: This command can __ONLY__ be used by authorized developers, sorry.");
  if (message.author.id !== '488182608367452201') return message.channel.send(botembed);

  try {
    index.refreshCmds();
    //message.channel.send(`Successfully refreshed all commands. :)`);
    let botembed = new MessageEmbed()
      .setColor(config.mainColor)
      .setDescription(":white_check_mark: Successfully refreshed all commands!");

    return message.channel.send(botembed);
  } catch (err) {
    //return message.channel.send(`Unable to refresh commands.`);
    let botembed = new MessageEmbed()
      .setColor(config.mainColor)
      .setDescription(":x: Unable to refresh commands! Error: " + err);

    return message.channel.send(botembed);
  }
}

module.exports.help = {
  name: "refresh"
}
