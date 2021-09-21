const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {
    
    var logChannel = message.guild.channels.cache.find(channel => channel.name === "//ENTER LOG NAME//");

    if(message.guild.me.hasPermission(`MANAGE_CHANNELS`)) {
        message.channel.delete();
        let Embed = new discord.MessageEmbed()
            .setTitle(`Ticket Closed!`)
            .setDescription(`**Ticket Name:** ${message.channel.name}\n**Gesloten door:** <@${message.author.id}>`)
            .setColor(`#ab0a7d`)
            .setFooter("CrazeMC | MC-Server", "https://i.imgur.com/LvaXWkZ.jpg")
        logChannel.send(Embed);
    }

    if(!message.guild.me.hasPermission(`MANAGE_CHANNELS`)) {
        message.guild.send("Sorry maar je hebt hier helaas geen rechten voor.")
    }

}

module.exports.help = {
    name: "close"
}
