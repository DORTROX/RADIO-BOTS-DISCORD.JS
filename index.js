const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const Discord = require("discord.js")
const ytdl = require("ytdl-core")

const radio = new Discord.Client()

const log = "Log id (If you want)"
const vc = "Voice Channel ID"
const link = "Youtube Video Link"
const token = ""


// play song as soon as bot come online
radio.on("ready", () => {
    console.log(`Logged in as ${radio.user.tag}`)
    const voiceChannel = radio.channels.cache.get(vc)
    radio.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'Music',
            type: 'LISTENING',
        }
    })
    voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl(link, { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio.channels.cache.get(log).send(reset)
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
    });
        radio.on('voiceStateUpdate', (oldState, newState) => {

//If a user join vc user will get a greeting message in log channel.
      let name = newState.id;
            if(newState.channelID == vc) {
      radio.channels.cache.get(log).send(`Thanks for joining <@${name}>. I hope you enjoy`)
}

          
//Prolly useless but prefer keeping it If a new user join channel Bot will start playing song.
    if (oldState.member.user.bot) return;
    if (oldState.member.user) return;
        voiceChannel.join().then(connection => {
        console.log("Joined voice channel")
        function play(connection) {
            connection.voice.setSelfDeaf(true);
            const stream = ytdl(link, { filter: "audio" })
            const dispatcher = connection.play(stream)
            dispatcher.on("finish", () => {
                play(connection)
                radio.channels.cache.get(log).send(reset)
            })
        }
        play(connection)
    }).catch(e => {
        const error = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('Error Table')
            .setDescription('```js\n' + e + '\n```')
   	    .setFooter('DORTROX');
        radio.channels.cache.get(log).send(error)
    });

})
})

radio.login(process.env.token || token);
