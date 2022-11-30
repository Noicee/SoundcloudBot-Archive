const { Collection, Client, MessageEmbed, Guild } = require('discord.js');
const fs = require("fs");
const client = new Client({
  disableEveryone: true
});
const config = require("./config.json");

client.commands = new Collection();
guild = new Guild();

console.log(`\x1b[2m%s\x1b[37m`, "Loading commands...");
let successfulrestartembed = new MessageEmbed().setColor(config.userSettings.mainColor).setDescription("<a:done:714743682724659211> Successfully restarted bot!");
let restartembed = new MessageEmbed().setColor(config.userSettings.mainColor).setDescription("<a:load:714742765195362376> Restarting..."); //:arrows_counterclockwise:

module.exports = {

  refreshCmds: function() {
    fs.readdir("./commands/", (err, files) => {
      if (err) console.log(err);

      let jsf = files.filter(f => f.split(".").pop() === "js")
      if (jsf.length <= 0) return console.log(`\x1b[31m`, "Couldn't find commands.");

      jsf.forEach((f, i) => {
        delete require.cache[require.resolve(`./commands/${f}`)];
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
      });

    });
  },
  restartBot: function(channel) { //restart
    channel.send(restartembed)
      .then(msg => client.destroy())
      .then(() => client.login(config.userSettings.token))
      .then(() => channel.send(successfulrestartembed))
      .catch(console.error);
  }
}

function loadCmds() {
  fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);

    let jsf = files.filter(f => f.split(".").pop() === "js");
    if (jsf.length <= 0) {
      console.log(`\x1b[31m`, "Couldn't find commands.");
      return;
    }

    jsf.forEach((f, i) => {
      delete require.cache[require.resolve(`./commands/${f}`)];
      let props = require(`./commands/${f}`);
      console.log(`\x1b[37m`, `[Command]: ${f} loaded!`);
      client.commands.set(props.help.name, props);
    });

  });
}


//ready
client.on("ready", async () => {
  console.log(`\x1b[36m`, "[Result]: Commands have loaded successfully!", `\x1b[0m`);
  console.log(`\x1b[32m`, `${client.user.username} is online on ${Object.keys(client.guilds).length} servers with ${Object.keys(client.users).length} total users!`);
  client.user.setPresence({ activity: { name: '?help • www.noice.cc' }, status: 'online' });
});

loadCmds();

client.on("guildCreate", async (guild) => {
  console.log(`client joined ${guild.name} (${guild.id})`);
});


//message event
client.on('message', async message => {

  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.channel.send(`${client.user.username} does not work in private messages!`).then(m=>m.delete(8000));
  //if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("only staff members with **ADMINISTRATOR** can use this command! An ADMINISTRATOR can disable this by doing the `?perm disable` command.");

  let prefix = config.userSettings.prefix;
  let args = message.content.slice(prefix.length).split(/ +/);
  let cmd = args.shift().toLowerCase();
  let ops = config.staffID.owner;
  if (!message.content.startsWith(prefix)) return;

  let commandfile = client.commands.get(cmd);
  if (commandfile) commandfile.run(client, message, args, cmd, ops);


  if (cmd === 'test') {
    message.channel.send(`Cmd: ${cmd}\nArgs: ${args}`);
  }

  if (cmd === `invite`) {
    message.channel.send("Invite link: https://discordapp.com/oauth2/authorize?client_id=714686265211224085&scope=bot&permissions=8");
  }

  if (cmd === `eval`) {
    let code = args.join(" ");
    if(message.author.id !== "488182608367452201") return;
        try {
            let ev = eval(code);
            message.channel.send(`\`\`\`JS\n${ev}\`\`\``);
        } catch (err) {
            message.channel.send(`\`\`\`JS\nError: ${err}\`\`\``);
        }
  }

});

client.login(config.userSettings.token);