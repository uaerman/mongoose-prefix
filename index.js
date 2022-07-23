const mongoose = require("mongoose")
const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages, 
  ],
  partials: [Partials.Channel],
})

module.exports = client;

const config  = require("./config.json");
const chalk = require("chalk")
const {GuildSettings} = require("./schema")
client.commands = new Collection();
require("./handlers/commandHandler")
require("./handlers/eventHandler")(client)

  mongoose.connect(config.mongodb_sv, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
}).then(()=>{
  console.log(`${chalk.red("[IXA]")} ${chalk.yellow("Connected to the database!")}`)
}).catch((err) => {
  console.log(err);
})

client
  .login(config.token)
  .then(() => console.log(`${chalk.red("[IXA]")} ${chalk.green("Bot Connected!")}`))
  .catch(() => console.log(`${chalk.red("[IXA]")} ${chalk.red("Bot can't connected!")}`));

client.on("warn", (info) => console.log(info));
client.on("error", console.error);
