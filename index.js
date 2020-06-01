const botconfig = require("./commands/botconfig.json");
const Discord = require("discord.js");
const fs = require("fs")
const coins = require("./commands/json/coins.json")
const level = require("./commands/json/levels/level.json")
const bot = new Discord.Client({disableEveryone: true});
var cooldowns = []
bot.on("ready", async () => {
    console.log(`${bot.user.username} Online`)
    bot.user.setActivity(`${botconfig.prefix}help`, { type: "WATCHING" });
})
bot.commands = new Discord.Collection
bot.aliases = new Discord.Collection

//Read the main commands files
fs.readdir("./commands/main/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't find commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/main/${f}`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(aliases => {
            bot.aliases.set(aliases, pull.config.name)
        });
    });
});
//reads all the utlities commands
fs.readdir("./commands/utility/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't find commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/utility/${f}`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(aliases => {
            bot.aliases.set(aliases, pull.config.name)
        });
    });
});
fs.readdir("./commands/fun/", (err, files) => {
    if(err) console.log(err)
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0) {
        return console.log("[LOGS] Couldn't find commands!");
    }
    jsfile.forEach((f, i) => {
        let pull = require(`./commands/fun/${f}`)
        bot.commands.set(pull.config.name, pull);
        pull.config.aliases.forEach(aliases => {
            bot.aliases.set(aliases, pull.config.name)
        });
    });
});
bot.on("message", async message => {
  if (!level[message.author.id]) {
    level[message.author.id] = {
      level: 0,
      xp: 0,
      totalxp: 0
    }
    fs.writeFile("./commands/json/levels/level.json", JSON.stringify(level), (err) => {
      if (err) console.error(err)
    });
  };
  if (!coins[message.author.id]) {
    coins[message.author.id] = {
      coins: 500,
      points: 0
    }
    fs.writeFile("./commands/json/coins.json", JSON.stringify(coins), (err) => {
      if (err) console.error(err)
    });
  };
  if(message.author.bot || message.channel.type === "dm") return;
  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ")
  let cmd = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let commandFile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.aliases.get(cmd.slice(prefix.length)))
  if(commandFile) {
    if(cooldowns[message.author.id]){
      if(cooldowns[message.author.id] > Date.now()){
        let seconds = parseInt(Math.abs((cooldowns[message.author.id] - Date.now()) / 1000))
        return message.channel.send("⏰ Cooldown, You Have To Wait To Type Commands Again Remains: " + seconds + "s");
      }
    }
    cooldowns[message.author.id] = Date.now() + 3000;
    let levels = level[message.author.id]
    level[message.author.id] = {
      level: levels.level,
      xp: levels.xp + 1,
      totalxp: levels.totalxp + 1
    }
    let isLevelup = (levels.level + 1) * 100
    if (levels.xp == isLevelup){
      message.channel.send(`🎉 You leveled up ! , your level now is ` + levels.level + 1)
      level[message.author.id] = {
        level: levels.level + 1,
        xp: 0,
        totalxp: levels.totalxp
      }
    }
    fs.writeFile("./commands/json/levels/level.json", JSON.stringify(level), (err) => {
      if (err) console.error(err)
    });
    commandFile.run(bot,message,args)
  }
})
bot.login(botconfig.token);