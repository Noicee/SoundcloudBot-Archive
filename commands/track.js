const { MessageEmbed, Client } = require('discord.js');
const index = require('../index.js');
const config = require("../config.json");
const fetch = require('node-fetch');

module.exports.run = async ( client, message, guild) => {

const prefix = config.userSettings.prefix;
const args = message.content.slice(prefix.length).split(/ +/);
const cmd = args.shift().toLowerCase();

function milToMin(milSec) {
    var minutes = Math.floor(milSec / 60000);
    var seconds = ((milSec % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  let completeEmbed = new MessageEmbed()
  .setColor(config.mainColor)
  .setDescription("<a:done:714743682724659211> Operation completed successfully!");

  let noArgsEmbed = new MessageEmbed()
    .setColor(config.mainColor)
    .setDescription(`:x: No argument provided. Valid usage: ${prefix}track [userID] [category]`);
  
    if (!args.length) return message.channel.send(noArgsEmbed);

    if(!args[0]) return message.channel.send("Please input a valid user ID. You can get a SC users user ID from the command ?id [username]")
    if(!args[1]) return message.channel.send("Please input a valid name for the category you wish to have all the user's tracks sent to. Note: channels are case sensitive.")

  let userID = args.shift();
  let authID = 'enSCGLkGEJANQfrxZYQkCVT5gq2F3fBp';
  let limit = 5;
  let trackApi = `https://api-v2.soundcloud.com/users/${userID}/tracks?representation=&client_id=${authID}&limit=${limit}&app_version=1590406688&app_locale=en`;
  //let resolveApi = `https://api-v2.soundcloud.com/resolve?url=http://soundcloud.com/${username}&client_id=${authID}`;


// function getUserID (username) {
// let resolveApi = `https://api-v2.soundcloud.com/resolve?url=http://soundcloud.com/${username}&client_id=${authID}`;
//   fetch(resolveApi)
//   .then(res => res.json())
//   .then(json => {
//       return json.id;
//   })
//   .catch(err => console.error(err));
// }



  fetch(trackApi)
  .then(res => res.json())
  .then(json => {

    let array = json.collection;

    let userCategory = args.join(" ");
    //message.guild.channels.create("Tracks", {type: 'category'});
    //let trackCategory = message.guild.channels.cache.find(c => c.name == "Tracks" && c.type == "category");
    let trackCategory = message.guild.channels.cache.find(c => c.name == userCategory && c.type == "category").id
    //if (!trackCategory) message.guild.channels.create("Tracks", {type: 'category'})
    
    for (i = 0; i < array.length; i++) { 

        const embed = new MessageEmbed()
        .setAuthor('Track', array[i].user.avatar_url)
        .setTitle(`${array[i].title} by ${array[i].user.username}`)
        .setURL(array[i].permalink_url)
        .setColor(0xff0000)
        .setThumbnail(array[i].artwork_url || array[i].user.avatar_url) //set to avatar url if no artwork is found
        .addField('Upload Title', array[i].title, true)
        .addField('Producer', array[i].producer || "N/A", true)
        .addField('Status', array[i].state)
        .addField('Release Date', new Date(array[i].display_date).toLocaleDateString(), true)
        .addField('Run Time', milToMin(array[i].duration), true)
        .addField('Genre', array[i].genre, true)
        .addField('Tags', array[i].tag_list || "N/A", true)
        .addField('Link', array[i].permalink_url)
        .addField('Plays', array[i].playback_count, true)
        .addField('Likes', array[i].likes_count, true)
        .addField('Reposts', array[i].reposts_count, true)
        .setFooter(`SoundCloud Bot developed by www.noice.cc`);

        function createTracks () {
            message.guild.channels.create(array[i].permalink || 'track-' + i)
            .then(channel => channel.setParent(trackCategory))
            .then(channel.send(embed))
            .catch(err => message.channel.send(err))
        }
        createTracks();

    }
  })
  //if (typeof trackCategory == 'undefined') return message.channel.send("Error. Invalid category name specified.")
  .then(message.channel.send(completeEmbed))
  .catch(err => console.error(err));


//    message.guild.channels.cache.forEach(channel => channel.delete());



} //end of module exports

module.exports.help = {
  name: "track"
}


    // let array = json.collection;
    // array.forEach(array => {
    // const embed = new MessageEmbed()
    // .setAuthor('Track', array.user.avatar_url)
    // .setTitle(`${array.title} by ${array}.user.username}`)
    // .setURL(array.permalink_url)
    // .setColor(0xff0000)
    // .setThumbnail(array.artwork_url || array.user.avatar_url) //set to avatar url if no artwork is found
    // .addField('Upload Title', array.title, true)
    // .addField('Producer', array.producer || "N/A", true)
    // .addField('Status', array.state)
    // .addField('Release Date', new Date(array.display_date).toLocaleDateString(), true)
    // .addField('Run Time', milToMin(array.duration), true)
    // .addField('Genre', array.genre, true)
    // .addField('Tags', array.tag_list, true)
    // .addField('Link', array.permalink_url)
    // .addField('Plays', array.playback_count, true)
    // .addField('Likes', array.likes_count, true)
    // .addField('Reposts', array.reposts_count, true)
    // .setFooter(`SoundCloud Bot developed by www.noice.cc`);
    
    // return message.channel.send(embed);
    // });


    //json.collection[0].title

    // const embed = new MessageEmbed()
    // .setAuthor('Track', json.collection[0].user.avatar_url)
    // .setTitle(`${json.collection[1].title} by ${json.collection[1]}.user.username}`)
    // .setURL(json.collection[1].permalink_url)
    // .setColor(0xff0000)
    // .setThumbnail(json.collection[1].artwork_url || json.collection[1].user.avatar_url) //set to avatar url if no artwork is found
    // .addField('Upload Title', json.collection[1].title, true)
    // .addField('Producer', json.collection[1].producer || "N/A", true)
    // .addField('Status', json.collection[1].state)
    // .addField('Release Date', new Date(json.collection[1].display_date).toLocaleDateString(), true)
    // .addField('Run Time', milToMin(json.collection[1].duration), true)
    // .addField('Genre', json.collection[1].genre, true)
    // .addField('Tags', json.collection[1].tag_list, true)
    // .addField('Link', json.collection[1].permalink_url)
    // .addField('Plays', json.collection[1].playback_count, true)
    // .addField('Likes', json.collection[1].likes_count, true)
    // .addField('Reposts', json.collection[1].reposts_count, true)
    // .setFooter(`SoundCloud Bot developed by www.noice.cc`);
    
    // return message.channel.send(embed);