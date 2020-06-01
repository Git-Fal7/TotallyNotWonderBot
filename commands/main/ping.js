const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    var ping = Date.now() - message.createdTimestamp + " ms";
    message.channel.send("Bot ping: ``" + `${Date.now() - message.createdTimestamp}` + "ms``");
  }
module.exports.config = {
    name: "ping",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}