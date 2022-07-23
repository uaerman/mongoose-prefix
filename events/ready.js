const client = require("../index");
const chalk = require("chalk")
const { ActivityType } = require("discord.js");

client.on("ready", async () => {
  console.log(chalk.red("[IXA]") + chalk.blue(` ${client.user.username} READY!`))
  client.user.setPresence({
    status: "online",
  });
  client.user.setActivity({ 
    name: "Made for You 💚", 
    type: "STREAMING", 
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  });
});
