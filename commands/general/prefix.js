const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const {GuildSettings} = require("../../schema")
const config = require("../../config.json")
module.exports = {
  name: "prefix",
  description: "-",
  async execute(client, message, args) {
    const getPrefix = await GuildSettings.findOne({guildId: message.guild.id})
    if (args[0] === "set") { 
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply("You do not have the necessary permissions to use this command.")
        let prefix = args[1]
        if (!prefix) return message.reply("You must specify a prefix!")
        await GuildSettings.updateOne({guildId: message.guild.id}, {$set: {prefix: prefix}}, {new: true, upsert: true})
        message.reply(`Done! New Prefix is: \`${prefix}\``)
        return;
    }
    if (args[0] === "reset") { 
      if (!message.member.permissions.has(PermissionFlagsBits.Administrator)) return message.reply("You do not have the necessary permissions to use this command.")
      await GuildSettings.updateOne({guildId: message.guild.id}, {$set: {prefix: config.prefix}}, {new: true, upsert: true})
      message.reply(`Done! Guild prefix is reset!`)
      return;
    }
    message.reply(`My prefix is: \`${getPrefix ? getPrefix.prefix : config.prefix}\``)
  },
};
