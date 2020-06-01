const Discord = require("discord.js")
const botconfig = require("../botconfig.json");
const coins = require("../json/coins.json")
const Canvas = require("canvas");
const fs = require("fs")
const numeral = require("numeral")
const prefix = botconfig.prefix
//i recommend just removing the entire command, since i don't like gambling
module.exports.run = async (bot, message, args) => {
    message.channel.send("this is pointless, why would you gamble?")
}
module.exports.config = {
    name: "slots",
    aliases: ["slot"],
    usage: "",
    description: "",
    accessableby: "Members"
}