const Discord = require(`discord.js`);
const forEachTimeout = require("foreach-timeout");
const client = new Discord.Client();
const os = require("os");
const strftime = require("strftime");
const yt = require("ytdl-core");
const fs = require("fs");
const botconfig = require("./JSON/botconfig.json");
const request = require('node-superfetch');
const data = require("./JSON/data.json");
const prefixes = JSON.parse(fs.readFileSync('./JSON/prefixes.json'));
const blacklist = JSON.parse(fs.readFileSync('./JSON/blacklist.json'));
const ProgressBar = require("progress");
const { promptMessage } = require("./functions.js");
const randomPuppy = require("random-puppy");
const snekfetch = require("snekfetch");
const requester = require("request");
const chooseArr = ["🗻", "📰", "✂"];
const http = require("http");
var ping = require ("ping");
const math = require('mathjs');
const intformat = require("./intformat.js");
const YouTube = require("simple-youtube-api");
const ytapi = new YouTube(botconfig.ytapi_key);
const ghf = require("./JSON/ghf.json");
const weather = require("weather-js");
const keepAlive = require("./keepAlive.js");

client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./Commands/${file}`);
	client.commands.set(command.name, command);
}

var resultsh = [];
var messageId = "";

let prefix_a = botconfig.prefix_a;
let prefix_b = botconfig.prefix_b;
let prefix_c = botconfig.prefix_c;

var servers = {};
var prefix = botconfig.prefix;
var blockid = "396331064710135809";
client.login(process.env.MENYANET);

keepAlive();

client.on("ready", async () => {
  try {
    process.stdout.write("\x1Bc");
    console.log(`Starting ${client.user.tag}...`);
    console.log("Loading JSON-modules...");
    console.log("Loading Voice Streamer...");
    console.log("Loading FS Component...");
    console.log("Loading Date/Time Format Component...");
    console.log("Loading other components...");
	client.user.setStatus('dnd')
    var timerId = setInterval(function() {
      process.stdout.write("\x1Bc");
      var str = 0;
      var membc = "0";
      var onlinecount = 0;
      var ar = client.guilds.cache.array();
      for (let i = 0; i < ar.length; i++) {
        str += ar[i].presences.cache.size;
      }
      console.log(
        `\n░░░░░░░ ░  ░░░░   ▒▒▒▒ ▒     ▒ ▒▒  ██\n   ░    ░ ░    ▒ ▒     ▒     ▒  █  █\n   ░    ░ ▒    ▒ ▒▒▒   ▒     █   ██\n   ░    ▒ ▒    ▒ ▒     █     █  █  █\n   ▒    ▒ ▒    ▒  ▒▒██  ████ █ ██  ██\n\nXStep Bot ${botconfig.version} \(${botconfig.date}\)\n\(C\)opyright 2019-2020 Tinelix Development. All rights reserved.\n\nThis script started successfully.`
      );
      console.log(
        `\nPing: ${client.ws.ping.toFixed(2)} ms | Memory usage: ${Math.round(
          process.memoryUsage().heapUsed / 1024
        )} kB\nServers: ${client.guilds.cache.size} | Users: ${
          client.users.cache.size
        } | Online: ${str}`
      );
      
    }, 20000);
  } catch (e) {
      console.log(
        `\n░░░░░░░ ░  ░░░░   ▒▒▒▒ ▒     ▒ ▒▒  ██\n   ░    ░ ░    ▒ ▒     ▒     ▒  █  █\n   ░    ░ ▒    ▒ ▒▒▒   ▒     █   ██\n   ░    ▒ ▒    ▒ ▒     █     █  █  █\n   ▒    ▒ ▒    ▒  ▒▒██  ████ █ ██  ██\n\nXStep Bot ${botconfig.version} \(${botconfig.date}\)\n\(C\)opyright 2019-2020 Tinelix Development. All rights reserved.\n\nThis script started successfully.`
      );
    console.log("\nNo servers.");
  }
});
function checkTime() {
  client.setTimeout(checkTime, (59 - new Date().getUTCMinutes) * 1000 * 60);
  getHTTPResponce("https://google.com?any_else_api")
    .then(body => {
      var result = JSON.parse(body);
      var temp = 0;
    })
    .catch(error => {});
}

var timerId = setInterval(function users() {
  var str = 0;
  var membc = "0";
  var onlinecount = 0;
  var ar = client.guilds.cache.array();
  for (let i = 0; i < ar.length; i++) {
    str += ar[i].presences.cache.size;
  }
  var moscow = new Date().toLocaleString("en-US", {
    timeZone: "Europe/Moscow"
  });
  client.user.setActivity(`${strftime("%H:%M", new Date(moscow))} (UTC+3)`, {
    type: "LISTENING"
  });
  timerId = setTimeout(function servers() {
    client.user.setActivity(
      `${client.guilds.cache.size} servers | ${botconfig.prefix}help`,
      { type: "LISTENING" }
    );
    timerId = setTimeout(function clock() {
      client.user.setActivity(
        `${client.users.cache.size} users | ${botconfig.prefix}help`,
        { type: "LISTENING" }
      );
      timerId = setTimeout(function clock() {
        client.user.setActivity(`${str} online | ${botconfig.prefix}help`, {
          type: "LISTENING"
        });
      }, 4000);
    }, 4000);
  }, 4000);
}, 32000);

function emoji(id) {
  return client.emojis.get(id).toString();
}


client.on("guildCreate", guild => {
  var t_log = {
    embed: {
      color: 0x55ff55,
      author: {
        name: "Servers Log"
      },
      thumbnail: {
        url: guild.iconURL()
      },
      description:
        "Highflash has joined the **" +
        guild.name +
        "** server! Now it has **" +
        client.guilds.cache.size +
        "** servers. :clap: :clap:\nThanks!",
      fields: [
        {
          name: "Server ID",
          value: guild.id
        },
        {
          name: "Channels | Members | Roles | Online",
          value:
            guild.channels.cache.size +
            " ch. | " +
            guild.memberCount +
            " memb. | " +
            guild.roles.cache.size +
            " roles | " +
            guild.presences.cache.size +
            " online"
        },
        {
          name: "Onwer",
          value: guild.owner.user.tag + " (" + guild.owner.user.id + ")"
        },
        {
          name: "Created at",
          value: strftime("%d/%m/%Y %H:%M", new Date(guild.createdTimestamp))
        }
      ]
    }
  };
if(guild.id === "730454187279777903") {
guild.leave()
}
  client.channels.cache.get("564022728143929370").send(t_log);
});

client.on("guildDelete", guild => {
  var t_log = {
    embed: {
      color: 0xff0000,
      author: {
        name: "Servers Log"
      },
      thumbnail: {
        url: guild.iconURL()
      },
      description:
        "Highflash left, kicked out, banned from **" +
        guild.name +
        "** server! Now it has **" +
        client.guilds.cache.size +
        "** servers. \nCan you explain to the bot author what you didn't like? :worried:"
    }
  };
  client.channels.cache.get("564022728143929370").send(t_log);
});

client.on("ready", () => {
  process.stdout.write("\x1Bc");
  client.user.setActivity("Starting Highflash Bot...", { type: "LISTENING" });
});

client.on("message", message => {
 serverPrefix = JSON.parse(fs.readFileSync("./JSON/prefixes.json", "utf8"));
  blacklister = JSON.parse(fs.readFileSync("./JSON/blacklist.json", "utf8"));
let usePrefix = "";
try {
  if(!serverPrefix[message.guild.id]) {
    serverPrefix[message.guild.id] = {
      prefixes: 'forcustomprefixonly.'
    }
  }
usePrefix = serverPrefix[message.guild.id].prefixes
} catch(err) {
usePrefix = 'forcustomprefixonly.';
}
	if (!message.content.startsWith(botconfig.prefix) && !message.content.startsWith(usePrefix) && !message.content.startsWith(botconfig.prefix_a) && !message.content.startsWith(botconfig.prefix_b)&& !message.content.startsWith(botconfig.prefix_c)) return;
  
  if(message.author.bot || message.channel.type === "dm") return;
	
	if(message.content.startsWith(usePrefix) && usePrefix === "forcustomprefixonly.") return;
	
	let args = message.content.slice(botconfig.prefix.length).trim().split(/ +/);
	if(message.content.startsWith(botconfig.prefix_b)) {
		args = message.content.slice(botconfig.prefix_b.length).trim().split(/ +/);
	} else if(message.content.startsWith(botconfig.prefix) || message.content.startsWith(botconfig.prefix_a)){
		args = message.content.slice(botconfig.prefix.length).trim().split(/ +/);
	} else {
		args = message.content.slice(usePrefix.length).trim().split(/ +/);
	}

	const command = args.shift().toLowerCase();
	console.log("Message Content:\n" + command + " (" + args + ")\n\nPrefixes: " + botconfig.prefix_a + " " + botconfig.prefix_b + " " + botconfig.prefix_c);

  if(!blacklister[message.author.id]) {
    blacklister[message.author.id] = {
      id: '0',
      block_timeout: '0'
    }
      fs.writeFile("./JSON/blacklist.json", JSON.stringify(blacklist), err => {
      if (err) console.log(err);
    });
  }

  let msgcreatedAt = new Date(message.createdAt)
  let block_timeouter = new Date(blacklister[message.author.id].block_timeout)

  if((message.author.id === blacklister[message.author.id].id) && (msgcreatedAt < block_timeouter)) {
    return message.channel.send("Вам заблокировали доступ к команде до " + strftime(
              "%d.%m.%Y",
              new Date(block_timeouter)))
    }

	if (command === 'help') {
		console.log(client.commands.get('help'));
		client.commands.get('help').execute(message, client, botconfig, usePrefix)
	}	// Command 1
	else if (command === 'about') {
		client.commands.get('about').execute(message, client, botconfig)
	}  // Command 2
	else if (command === 'health') {
		client.commands.get('health').execute(message, client, args)
	}	// Command 3
	else if (command === 'remoji') {
		client.commands.get('remoji').execute(message, client, args)
	} 	// Command 4
	else if (command === 'srvlist') {
		client.commands.get('srvlist').execute(message, client, args, intformat)
	} 	// Command 5
	else if (command === 'donate') {
		client.commands.get('donate').execute(message, client, args)
	}	// Command 6
	else if (command === 'rps') {
		client.commands.get('rps').execute(message, client, args)
	}	// Command 7
	else if (command === 'wiki') {
		client.commands.get('wiki').execute(message, client, args, request)
	}	// Command 8
	else if (command === 'calc') {
		client.commands.get('calc').execute(message, client, args, math, botconfig)
	}	// Command 9
	else if (command === 'ban') {
		client.commands.get('ban').execute(message, client)
	}	// Command 10
	else if (command === 'audio' && message.content.slice(botconfig.prefix.length + 6).startsWith('play')) {
		client.commands.get('aud.play').execute(message, client, YouTube, ytapi, yt, strftime, servers)
	}	// Command 11, argument 1
	else if (command === 'audio' && message.content.slice(botconfig.prefix.length + 6).startsWith('leave')) {
		client.commands.get('aud.leave').execute(message, client, servers);
	}  // Command 11, argument 2
	else if (command === 'audio' && message.content.slice(botconfig.prefix_b.length + 6).startsWith('play')) {
		client.commands.get('aud.play').execute(message, client, YouTube, ytapi, yt, strftime, servers)
	}	// Command 11, argument 1
	else if (command === 'audio' && message.content.slice(botconfig.prefix_b.length + 6).startsWith('leave')) {
		client.commands.get('aud.leave').execute(message, client, servers);
	}  // Command 11, argument 2
	else if (command === 'audio' && message.content.slice(usePrefix.length + 6).startsWith('play')) {
		client.commands.get('aud.play').execute(message, client, YouTube, ytapi, yt, strftime, servers)
	}	// Command 11.1, argument 1
	else if (command === 'audio' && message.content.slice(usePrefix.length + 6).startsWith('leave')) {
		client.commands.get('aud.leave').execute(message, client, servers);
	}  // Command 11.1, argument 2
	else if (command === 'warn') {
		client.commands.get('warn').execute(message, client, fs)
	} // Command 12
	else if (command === 'binary') {
		client.commands.get('binary').execute(message, client)
	} // Command 13
	else if (command === 'avatar') {
		client.commands.get('avatar').execute(message, client)
	} // Command 14
	else if (command === 'kick') {
		client.commands.get('kick').execute(message, client)
	} // Command 15
	else if (command === 'links') {
		client.commands.get('links').execute(message, client)
	} // Command 16
	else if (command === 'photo') {
		client.commands.get('photo').execute(message, client, randomPuppy)
	} // Command 17
	else if (command === 'meme') {
		client.commands.get('meme').execute(message, client, randomPuppy)
	} // Command 18
	else if (command === 'eval') {
		client.commands.get('eval').execute(message, client)
	} // Command 19
	else if (command === 'ads' && message.content.slice(botconfig.prefix.length + 4).startsWith('+')) {
		client.commands.get('ads.add').execute(message, client)
	} // Command 20
	else if (command === 'ads' && message.content.slice(botconfig.prefix_b.length + 4).startsWith('+')) {
		client.commands.get('ads.add').execute(message, client)
	} // Command 20
	else if (command === 'ads' && message.content.slice(usePrefix.length + 4).startsWith('+')) {
		client.commands.get('ads.add').execute(message, client)
	} // Command 20.1
	else if (command === '8ball') {
		client.commands.get('8ball').execute(message, client)
	} // Command 21
	else if (command === 'channel') {
		client.commands.get('channel').execute(message, client, strftime)
	} // Command 22
	else if (command === 'server') {
		client.commands.get('server').execute(message, client, strftime)
	} // Command 23
	else if (command === 'user') {
		client.commands.get('user').execute(message, client, strftime)
	} // Command 24
	else if (command === 'say') {
		client.commands.get('say').execute(message, client)
	} // Command 25
	else if (command === 'reverse') {
		client.commands.get('reverse').execute(message, client)
	} // Command 26
	else if (command === 'prune') {
		client.commands.get('prune').execute(message, client)
	} // Command 27
	else if (command === 'report') {
    if (message.author.id == '461516527242575892') return message.channel.send('Вам заблокировали доступ к этой команде.');
		client.commands.get('report').execute(message, client)
	} // Command 28
	else if (command === 'weather') {
		client.commands.get('weather').execute(message, client, weather, args)
	} // Command 29
	else if (command === 'rules') {
		client.commands.get('rules').execute(message, client)
	} // Command 30, for owner only
	else if (command === 'readme') {
		client.commands.get('readme').execute(message, client)
	}  // Command 31, for owner only
	else if (command === 'settings' && message.content.slice(botconfig.prefix.length + 9).startsWith('-prefix')) {
		client.commands.get('prefix').execute(client, message, prefixes)
	} // Command 32, for admininstrators only
	else if (command === 'settings' && message.content.slice(botconfig.prefix_b.length + 9).startsWith('-prefix')) {
		client.commands.get('prefix').execute(client, message, prefixes)
	} // Command 32.1, for admininstrators only
	else if (command === 'settings' && message.content.slice(usePrefix.length + 9).startsWith('-prefix')) {
		client.commands.get('prefix').execute(client, message, prefixes)
	} // Command 32.2, for admininstrators only
	else if (command === 'goals') {
		client.commands.get('goals').execute(message, client, ProgressBar)
	}  // Command 33
	else if (command === 'serv_bl') {
		client.commands.get('server.blacklist').execute(message, client, fs)
	}
  else if (command === 'blacklist' && message.content.slice(botconfig.prefix.length + 10).startsWith('-add')) {
	client.commands.get('blacklist.add').execute(client, message, blacklist)
	}  // Command 34
  else if (command === 'blacklist' && message.content.slice(botconfig.prefix_b.length + 10).startsWith('-add')) {
	client.commands.get('blacklist.add').execute(client, message, blacklist)
	}  // Command 34.1
  else if (command === 'blacklist' && message.content.slice(usePrefix.length + 10).startsWith('-add')) {
	client.commands.get('blacklist.add').execute(client, message, blacklist)
	}  // Command 34.1
	else { 
		message.channel.send("Извините, у нас нет такой команды или Вы указали неправильное использование команды. Чтобы узнать весь список доступных команд и аргументов к нему, пишите `h.help`.")
	}
});
