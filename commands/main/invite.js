const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    message.channel.send('✅ Check Your Direct Messages')
    message.author.send(bot.user.username + ' Invite: ' + botconfig.inviteurl)
  }
module.exports.config = {
    name: "invite",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}