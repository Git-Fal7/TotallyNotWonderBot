const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
var cooldowns = []

module.exports.run = async (bot, message, args) => {
    if(!message.member.colorRole){
      var color = "#000000"
    }
    else{
      var color = message.member.colorRole.color
    }
    let embed = new Discord.RichEmbed()
    .setColor(color)
    .setAuthor(bot.user.username + ` bot Commands List`, message.author.displayAvatarURL)
    .setThumbnail(bot.user.displayAvatarURL)
    .addField(`Main`, "``help, ping, avatar, leaderboard, topservers, invite, support, vote``", true)
    .addField(`Utility`, "``coins, daily, transfer, profile``", true)
    .addField(`Fun & Games`, "``reverse, slots, fast, spelling, capital, flags``", true)
    .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL)
    message.channel.send(embed)
  }



module.exports.config = {
    name: "help",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}