const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const coins = require("../json/coins.json")
const fs = require("fs")
const numeral = require("numeral")
const prefix = botconfig.prefix
const daily = require("../daily.json")
module.exports.run = async (bot, message, args) => {
    if(daily[message.author.id]){
      if(daily[message.author.id] > Date.now()){ 
        let hours = parseInt(Math.abs((daily[message.author.id] - Date.now()) / 3600000))
        return message.channel.send("❌ You can get your daily only once a day, time remaining: " + hours + "h");
      }
    }
    let userData = coins[message.author.id];
    daily[message.author.id] = Date.now() + 86400000;
    fs.writeFile("./commands/daily.json", JSON.stringify(daily), (err) => {
      if (err) console.error(err)
    });
    let max = 1000
    let min = 100
    let reward = (Math.floor(Math.random() * (max - min + 1)) + min)
    coins[message.author.id] = {
      coins: userData.coins + reward,
      points: userData.points
    }
    fs.writeFile("./commands/json/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.error(err)
    });
    message.channel.send(`${botconfig.logo} You got your daily \`\`${reward}\`\` Coins`)
}
module.exports.config = {
    name: "daily",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}