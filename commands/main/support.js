const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    message.channel.send('✅ Check Your Direct Messages')
    message.author.send(bot.user.username + ' Support Server Invite: ' + botconfig.invitesupport)
  }
module.exports.config = {
    name: "support",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}