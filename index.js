const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if(err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if(jsFiles.length <=0) {
        console.log("[CrazeMC] Er zijn 0 files ingeladen,");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`[CrazeMC] De file ${f} is ingeladen.`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.login(process.env.token);

client.on("ready", async () => {

    console.log(`[CrazeMC] ${client.user.username} is online`);
    client.user.setActivity("CrownMT", {type: "PLAYING"});

});

client.on("guildMemberAdd", member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "「👋🏻」welkom");
    if(!channel) console.log("[CrazeMC] Heb geen welkomskanaal kunnen vinden.");

    var joinEmbed = new discord.MessageEmbed()
            .setColor("#fc7703")
            .addField(`Nieuw Discord Lid!`, `${member.user} Is de server gejoined!.`)
            .setTimestamp()
            .setFooter("play.crownmt.nl | CrownMT", "https://i.imgur.com/FEiMSFi.png")
            .setThumbnail(member.user.displayAvatarURL());
    channel.send(joinEmbed);

});

client.on("message", async message => {

    if(message.author.bot) return;

    if(message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;

    var commands = client.commands.get(command.slice(prefix.length));

    if(commands) commands.run(client,message, args);

});
