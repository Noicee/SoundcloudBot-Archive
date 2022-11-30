const { MessageEmbed, Client } = require('discord.js');
const index = require('../index.js');
const config = require("../config.json");

module.exports.run = async (client, message, ops) => {
  let botembed = new MessageEmbed()
    .setColor(config.mainColor)
    .setDescription(":x: This command can __ONLY__ be used by authorized developers, sorry.");
  //if (message.author.id !== ops) return message.channel.send(botembed);

  try {
    index.restartBot(message.channel);
  } catch (err) {
    //return message.channel.send(`Unable to refresh commands.`);
    let botembed = new MessageEmbed()
      .setColor(config.mainColor)
      .setDescription(":x: Unable to restart bot! Error: " + err);

    return message.channel.send(botembed);
  }
}

module.exports.help = {
  name: "restart"
}
