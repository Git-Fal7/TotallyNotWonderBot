const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const coins = require("../json/coins.json")
const numeral = require("numeral")
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first()
    if(!user){
      let userData = coins[message.author.id].coins;
      if (userData > 999){    
        userData = numeral(userData).format('0.0a')}
      message.channel.send(`${botconfig.logo} You Have \`\`${userData}\`\` Coins`);
      return;
    }
    let userData = coins[user.id].coins;
    if (userData > 999){    
        userData = numeral(userData).format('0.0a')}
      message.channel.send(`${botconfig.logo} <@${user.id}> has \`\`${userData}\`\` Coins`);
  }
module.exports.config = {
    name: "coins",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}