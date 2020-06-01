const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first()
    if (!user) {
      message.channel.send(message.author.displayAvatarURL);
      return
    }
    message.channel.send(user.user.displayAvatarURL)
    }
module.exports.config = {
    name: "avatar",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}