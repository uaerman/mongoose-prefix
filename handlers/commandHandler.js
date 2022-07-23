const client = require("../index")
const chalk = require("chalk")

    const fs = require("fs");
    const dir = fs.readdirSync("./commands");
    dir.forEach((dir) => {
      const files = fs
        .readdirSync(`./commands/${dir}`)
        .filter((file) => file.endsWith(".js"));
        for (let file of files) {
        const cmd = require(`../commands/${dir}/${file}`);
        console.log(`[IXA] Loadded: ${cmd.name}.`);
        client.commands.set(cmd.name, cmd);
      }
    });

