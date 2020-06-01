const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const fs = require("fs")
const coins = require("../json/coins.json")
const numeral = require("numeral")
const prefix = botconfig.prefix
function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first()
    let numbers = message.content.split(" ").slice(2).join(' ')
    if (!user) {
      return message.channel.send("❌ Mention user after the command, Example: "+ prefix + "transfer @user 100")
    }
    if (!numbers) {
      return message.channel.send("❌ You didnt specify the amount of coins you want to transfer, Example: "+ prefix + "transfer @user 100")
    }
    if (!isNumber(numbers)) {
      return message.channel.send("❌ Invalid amount")
    }
    if (numbers < 50) {
      return message.channel.send("❌ You cant transfer coins less then 50 coin")
    }
    if (numbers.includes(".")) {
      return message.channel.send("❌ Invalid amount !")
    }
    let from = coins[message.author.id];
    let to = coins[user.id];
    if (numbers > from.coins) {
      return message.channel.send("❌ You cant transfer this amount of coins because you dont have this amount")
    }
    if (user.id === message.author.id) {
      return message.channel.send("❌ You cant transfer coins to yourself !?")
    }
    message.channel.send(`✅ Transferred \`\`${numbers}\`\` Coins To ${user.user.username}#${user.user.discriminator}`)
    user.send(`⚠️ ${message.author.username}#${message.author.discriminator} Transferred \`\`${numbers}\`\` Coins To Your Wallet !`)
    numbers = parseInt(numbers)
    coins[message.author.id] = {
      coins: from.coins - numbers,
      points: from.points
    }
    coins[user.id] = {
      coins: to.coins + numbers,
      points: to.points
    }
    fs.writeFile("./commands/json/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.error(err)
    });
  }
module.exports.config = {
    name: "transfer",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}