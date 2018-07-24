const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let botembed = new Discord.RichEmbed()
        .setColor("#6457A6")
        .setTitle("Commands")
        .setThumbnail(bot.user.displayAvatarURL)
        .addField("Prefix", ">>")
        .addField(">>bot", "display the bot information")
        .addField(">>server", "display the server information")
    message.channel.send(botembed);
}

module.exports.help = {
    name: "help"
}