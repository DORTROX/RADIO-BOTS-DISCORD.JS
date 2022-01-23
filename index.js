const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require("discord.js")
const ytdl = require("ytdl-core")
const mongoose = require('mongoose');
const disord = require('discord-reply');
const ani = require('./schema/NfsGuildSchema')


const radio = new Discord.Client()

const log = "";
const link = "https://www.youtube.com/watch?v=7G7umMPwlO4";
const mongodburi = "Your mongoose cluster link here"

const reset = new Discord.MessageEmbed()
  .setColor('ORANGE')
  .setTitle('Restarting Song...')
  .setFooter('A bot by DORTROX-');

mongoose.connect(mongodburi, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((m) => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

radio.on('guildCreate', async (guild) => {
  let defaultChannel = "";
  guild.channels.cache.forEach((channel) => {
    if (channel.type == "text" && defaultChannel == "") {
      if (channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
        defaultChannel = channel;
      }
    }
  })
  //defaultChannel will be the channel object that it first finds the bot has permissions for
  defaultChannel.send(`Hello @everyone, I'm NFS Live. Thanks for inviting me, Use $Nlive "voiceChannel_id" to set me up`, {
    embed: {
      title: 'Our Server',
      url: 'https://discord.gg/SM22ddTSRr',
      color: 0x2471a3,
      description: "If need any help or wanna help us on other projects then join our server. ",

      footer: {
        text: 'D O R T R O 乂.'
      }
    }
  });
  const guildID = guild.id;
  ani.create({
    vcID: 'null',
    guildID: guildID,
  });
});
radio.on("guildDelete", async (guild) => {
  const guildID = guild.id;
  await ani.findOneAndDelete({ guildID: guildID });
})
    const prefix = "$Nlive";
  radio.on("message", async message => {
        if (!message.content.startsWith(prefix)) return;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
      const index = message.content.indexOf(" ");
      const vcid = message.content.slice(index + 1);
      const doc = await ani.findOne({ guildID: message.guild.id });
      try {
        const update = { vcID: vcid };
        await doc.updateOne(update);
        message.lineReply("Your vc setup is successfully completed!");
      } catch (err) {
        console.log(err);
        message.lineReply("Setup cancelled")
      }
            const loc = await ani.findOne({ guildID: message.guild.id });
        radio.channels.cache.get(loc.vcID).join().then(connection => {
      function play(connection) {
        connection.voice.setSelfDeaf(true);
        const stream = ytdl(link, { filter: "audio" })
        const dispatcher = connection.play(stream)
        dispatcher.on("finish", () => {
          play(connection)
        })
      }
      play(connection)
    }).catch(e => {
      const error = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Error Table')
        .setDescription('```js\n' + e + '\n```')
        .setFooter(`${radio.user.tag}`);
      radio.channels.cache.get(log).send(error)
    })
      
  })
radio.on("ready", async () => {
  console.log(`Logged in as ${radio.user.tag}`)
  radio.user.setActivity("NFS MUSIC", {
    type: "STREAMING",
    url: "https://www.twitch.tv/dortrox"
  });
  const guilds = await ani.find();
  let arr = [];
  for (const i in guilds) {
    let pft = arr.push(guilds[i].vcID)
  }

  for (let i = 0; i < arr.length; i++) {
    if(arr[i] === "null") return;
    radio.channels.cache.get(arr[i]).join().then(connection => {
      function play(connection) {
        connection.voice.setSelfDeaf(true);
        const stream = ytdl(link, { filter: "audio" })
        const dispatcher = connection.play(stream)
        dispatcher.on("finish", () => {
          play(connection)
        })
      }
      play(connection)
    }).catch(e => {
      const error = new Discord.MessageEmbed()
        .setColor('RED')
        .setTitle('Error Table')
        .setDescription('```js\n' + e + '\n```')
        .setFooter(`${radio.user.tag}`);
      radio.channels.cache.get(log).send(error)
    })
  };
})

radio.login(process.env.token);
