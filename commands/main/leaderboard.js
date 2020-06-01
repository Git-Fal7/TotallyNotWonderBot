const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const levels = require("../json/levels/level.json")
const coins = require("../json/coins.json")
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    if(!message.member.colorRole){
      var color = "#000000"
    }
    else{
      var color = message.member.colorRole.color
    }
    let Members  = [];
    let BeforeM = []
    bot.users.forEach(m => {
      if (!m.bot){
        if(levels[m.id]){
          BeforeM.push({
          name: m.id,      
          points: coins[m.id].points,
          level: levels[m.id].level,
          totalxp: levels[m.id].totalxp
        });
        }
      }
    })
    let top = 1
    let embed = new Discord.RichEmbed()
    var dist10 = ''
    embed.setColor(color)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
    .setTitle('**The Global Leaderboard**')
    BeforeM.sort((mA, mB) => {
      return mB.totalxp - mA.totalxp;}).forEach((m) => {
      if(top < 11){
        if(top == 1){
         dist10 = `\`\`${top}.\`\` `+  '<@' + m.name + '>' + ` Points: \`\`${m.points}\`\` Level: \`\`${m.level}\`\` ` + '\n\ '
        }
        else{
          dist10 = dist10 + `\`\`${top}.\`\` `+  '<@' + m.name + '>' + ` Points: \`\`${m.points}\`\` Level: \`\`${m.level}\`\` ` + '\n\ '
        }
      top = top + 1
      }
    });
    embed.setDescription(dist10)
    embed.setTimestamp()
    .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL)
    message.channel.send(embed)
  }
module.exports.config = {
    name: "leaderboard",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}