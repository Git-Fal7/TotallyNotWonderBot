const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const coins = require("../json/coins.json")
const Canvas = require("canvas");
const fs = require("fs")
const numeral = require("numeral")
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    const type = require('../json/capital.json');
    const item = type[Math.floor(Math.random() * type.length)];
    const filter = response => {  
      return item.country.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };
    let Image = Canvas.Image,
    canvas = new Canvas.createCanvas(1065, 442),
    ctx = canvas.getContext('2d');
    let background = await Canvas.loadImage('./commands/images/capital.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.font = "mitix 69px AGA Arabesque";
    ctx.fontSize = '20px';
    ctx.fillStyle = "#f1f1f1";
    ctx.textAlign = "center";
    ctx.fillText(item.capital, 530, 247)
    let attachment = new Discord.Attachment(canvas.toBuffer(), 'TotallyNotWonder.png');
    var differance = Date.now() + 15
    message.channel.send(attachment).then(() => {
      message.channel.awaitMessages(filter, { maxMatches: 1, time: 15000, errors: ['time'] })
        .then((collected) => {
        let seconds = parseInt(Math.abs((differance - Date.now()) / 1000))
        let reply = "Not Bad, Better Luck Next Time 🙂"
        let reward = 10
        //I used else if many times , cause and or is buggy as hell
        if (seconds === 0){
          reply = "Too Fast !"
        }
        else if (seconds === 1){
          reply = "Too Fast !"
        }
        else if (seconds === 2){
          reply = "Too Fast !"
        }
        else if (seconds === 3){
          reply = "Fast"
        }
        else if (seconds === 4){
          reply = "Fast"
        }
        else if (seconds === 5){
          reply = "Good"
        }
        else if (seconds === 6){
          reply = "Good"
        }
        else if (seconds === 7){
          reply = "Good"
        }
        if (reply === "Too Fast !"){
          reward = 500
        }
        else if (reply === "Fast"){
          reward = 100
        }
        else if (reply === "Good"){
          reward = 100
        }
        let won = collected.first().author;
        let color = "#000000"
        let getwon = message.guild.members.get(won.id)
        if(getwon.colorRole){
         color = getwon.colorRole.color
        }
        let embed = new Discord.RichEmbed()
        embed.setColor(color)
        .setAuthor(`${won.tag}`, won.displayAvatarURL)
        .setTitle(`You did it in time!`)
        .setThumbnail(bot.user.displayAvatarURL)
        .setDescription(reward + ' coins has been added to your wallet')
        .addField(`You took:`, seconds + ` Seconds`, true)
        .addField(`Your speed rate:`, `${reply}`, true)
        .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL)
        message.channel.send(embed);
        let userData = coins[won.id];
        coins[won.id] = {
          coins: userData.coins + reward,
          points: userData.points + 1
        }
        fs.writeFile("./commands/json/coins.json", JSON.stringify(coins), (err) => {
          if (err) console.error(err)
        });
        })
        .catch(collected => { // Expected when a user never answered, any error in the code will go into this too
           message.channel.send(`You couldn't type the word correctly in time.. :(`);
        })
      });
}
module.exports.config = {
    name: "capital",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}