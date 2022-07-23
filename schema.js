const { Schema , model } = require("mongoose");

const guildSettings = new Schema({
  guildId: {type: String, require: true},
  prefix: {type: String, require: true, default: "!"}
})

const GuildSettings = model("Guild", guildSettings);

module.exports = { GuildSettings }