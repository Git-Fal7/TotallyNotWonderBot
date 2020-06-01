const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    message.author.send(botconfig.voteURL)
  }
module.exports.config = {
    name: "vote",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}