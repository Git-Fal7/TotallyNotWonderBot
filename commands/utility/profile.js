const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const coins = require("../json/coins.json")
const levels = require("../json/levels/level.json")
const Canvas = require("canvas");
const fs = require("fs")
const numeral = require("numeral")
const prefix = botconfig.prefix
module.exports.run = async (bot, message, args) => {
    let user = message.mentions.members.first()
    let getRank = 1
    let isFinished = 1
    let BeforeM = []
    let distrank
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
    if(!user){
    BeforeM.sort((mA, mB) => {
      return mB.totalxp - mA.totalxp;}).forEach((m) => {
      if(isFinished == 1)
        distrank = `\`\`${getRank}.\`\` `+  '<@' + m.name + '>' + ` Points: \`\`${m.points}\`\` Level: \`\`${m.level}\`\` ` + '\n\ ' 
        if(distrank.includes('<@' + message.author.id + '>')){
          isFinished = 0
        }
        if(isFinished == 1){
          getRank = getRank + 1
        }
      }
    );
    let userData = coins[message.author.id];
    let coin = coins[message.author.id].coins;
    if (coin > 999){
      coin = numeral(coin).format('0.0a')
    }
    let Image = Canvas.Image,
    canvas = new Canvas.createCanvas(960, 400),
    ctx = canvas.getContext('2d');
    let url = message.author.displayAvatarURL.endsWith(".webp") ? message.author.displayAvatarURL.slice(5, -20) + ".gif" : message.author.displayAvatarURL;
    let background = await Canvas.loadImage('./commands/images/profile.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = "mitix 47px AGA Arabesque";
        ctx.fontSize = '10px';
        ctx.fillStyle = "#3c303e";
          ctx.textAlign = "center";
          ctx.fillText(message.author.username, 140, 52)
          ctx.font = "mitix 36px AGA Arabesque";
          ctx.fontSize = '10px';
          ctx.fillStyle = "#3c303e";
          ctx.fillText(levels[message.author.id].level, 67, 345)
          ctx.font = "mitix 34px AGA Arabesque";
          ctx.fontSize = '10px';
          ctx.fillStyle = "#f5eee2";
          ctx.fillText(`#`+ getRank, 375, 295)
          ctx.fillText(userData.points, 620, 295)
          ctx.fillText(coin, 865, 295)
          ctx.beginPath();
          //(Pos.x,Pos.y,)
          //4e alda2rh ale tkon 3nd alavatar.
          ctx.arc(210, 200, 102, 0, Math.PI*2, true);
	        ctx.closePath();
  	      ctx.clip();
          //(drawavatar,Pos.x,Pos.y,Width,Height)
          let ava = await Canvas.loadImage(url);
          ctx.drawImage(ava, 105, 95, 210, 210);
          let attachment = new Discord.Attachment(canvas.toBuffer(), 'TotallyNotWonder.png');
          message.channel.send(attachment)
      return
    }
  BeforeM.sort((mA, mB) => {
      return mB.totalxp - mA.totalxp;}).forEach((m) => {
      if(isFinished == 1)
        distrank = `\`\`${getRank}.\`\` `+  '<@' + m.name + '>' + ` Points: \`\`${m.points}\`\` Level: \`\`${m.level}\`\` ` + '\n\ ' 
        if(distrank.includes('<@' +  user.user.id + '>')){
          isFinished = 0
        }
        if(isFinished == 1){
          getRank = getRank + 1
        }
      }
    );
    let userData = coins[user.user.id];
    let coin = coins[user.user.id].coins;
    if (coin > 999){
      coin = numeral(coin).format('0.0a')
    }
    let Image = Canvas.Image,
    canvas = new Canvas.createCanvas(960, 400),
    ctx = canvas.getContext('2d');
    let url = user.user.displayAvatarURL.endsWith(".webp") ? user.user.displayAvatarURL.slice(5, -20) + ".gif" :  user.user.displayAvatarURL;
    let background = await Canvas.loadImage('./commands/images/profile.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.font = "mitix 47px AGA Arabesque";
        ctx.fontSize = '10px';
        ctx.fillStyle = "#3c303e";
          ctx.textAlign = "center";
          ctx.fillText( user.user.username, 140, 52)
          ctx.font = "mitix 36px AGA Arabesque";
          ctx.fontSize = '10px';
          ctx.fillStyle = "#3c303e";
          ctx.fillText(levels[ user.user.id].level, 67, 345)
          ctx.font = "mitix 34px AGA Arabesque";
          ctx.fontSize = '10px';
          ctx.fillStyle = "#f5eee2";
          ctx.fillText(`#`+ getRank, 375, 295)
          ctx.fillText(userData.points, 620, 295)
          ctx.fillText(coin, 865, 295)
          ctx.beginPath();
          //(Pos.x,Pos.y,)
          //4e alda2rh ale tkon 3nd alavatar.
          ctx.arc(210, 200, 102, 0, Math.PI*2, true);
	        ctx.closePath();
  	      ctx.clip();
          //(drawavatar,Pos.x,Pos.y,Width,Height)
          let ava = await Canvas.loadImage(url);
          ctx.drawImage(ava, 105, 95, 210, 210);
          let attachment = new Discord.Attachment(canvas.toBuffer(), 'TotallyNotWonder.png');
          message.channel.send(attachment)
  }
module.exports.config = {
    name: "profile",
    aliases: [],
    usage: "",
    description: "",
    accessableby: "Members"
}