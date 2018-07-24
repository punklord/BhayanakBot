const botconfig = require("./botconfig.json");
const tokenConfig = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection;

fs.readdir("./commands/", (err, files) => {
    console.clear();
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if(jsfile.length <= 0) {
        console.log("Could not find commands.");
        return;
    }
    jsfile.forEach((file, index) => {
        let props = require(`./commands/${file}`);
        console.log(`${file} loaded.`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("ready", async() => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
    bot.user.setActivity(">>help", {type: "WATCHING"});
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);
});

bot.login(tokenConfig.token);