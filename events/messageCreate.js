const Discord = require("discord.js");
const client = require("../index");
const config = require("../config.json");
const {GuildSettings} = require("../schema")
client.on("messageCreate", async (message) => {
  const getGuildData = await GuildSettings.findOne({guildId: message.guild.id})
  var defaultPrefix = config.prefix
  var prefix = getGuildData ? getGuildData.prefix : defaultPrefix
  if (
    !message.content.startsWith(prefix) &&
    !message.content.startsWith(defaultPrefix) ||
    message.author.bot ||
    message.channel.type === "dm"
  )
    return;

    var args = message.content.split(' ').slice(1)  
    let commandName = message.content.split(' ')[0].slice(prefix.length);
    const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  if (!command) return;

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});
