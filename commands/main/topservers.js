const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    if(!message.member.colorRole){
      var color = "#000000"
    }
    else{
      var color = message.member.colorRole.color
    }
    let Guilds  = [];
    let BeforeG = []
    bot.guilds.forEach(g => {
      BeforeG.push({
        name: g.name,      
        count: g.memberCount,
        url: g.iconURL
      });
    })
    let top = 1
    let embed = new Discord.RichEmbed()
    var dist10 = ''
    embed.setColor(color)
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
    .setTitle('**Top Servers**')
    BeforeG.sort((gA, gB) => {
      return gB.count - gA.count;}).forEach((g) => {
      if(top < 11){
        if (top === 1) {
         embed.setThumbnail(g.url) 
         dist10 = `\`\`${top}.\`\` `+ "**" + g.name + "**" + '\n\ ' + `Members: ${g.count}`
        }
        else {
          dist10 = dist10 + '\n\ ' + '\n\ ' +`\`\`${top}.\`\` `+ "**" + g.name + "**" + '\n\ ' + `Members: ${g.count}`
        }
      top = top + 1
      }
    });
    embed.setDescription(dist10)
    embed.setTimestamp()
    .setFooter(`${bot.guilds.size} Servers`)
    message.channel.send(embed)
  }
module.exports.config = {
    name: "topservers",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}