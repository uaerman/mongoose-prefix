const { EmbedBuilder } = require("discord.js");
const {colors} = require("../../config")
module.exports = {
  name: "ping",
  description: "-",
  async execute(client, message, args) {
    const m = await message.channel.send("Pinging...");

    const embed = new EmbedBuilder()
      .setTitle("Pong")
      .addFields([
        {name: "⏳ Latency", value: `_**${m.createdTimestamp - message.createdTimestamp}ms**_`},
        {name: "💓 API", value: `_**${client.ws.ping}ms**_`}
      ])
      .setColor(0x209dd6)
      .setTimestamp();

    return m.edit({ content: "Done!", embeds: [embed] });
  },
};
