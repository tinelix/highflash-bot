const Discord = require(`discord.js`);
const forEachTimeout = require('foreach-timeout');
const client = new Discord.Client();
const os = require('os');
const strftime = require('strftime')

// каким же я был п***атым говнокодером уже тогда в 2019 и 2020 году, весь код был плохо структурирован и раскидан на весь JS-файл
// (всего 1837 строк в JS-файле)
// щас я уже понял, что намного удобнее и практичнее сделать бота с модульными командами
//
// комментарий от Tinelix (aka. DMIT Computers) от 09.07.2022

var blockid = `id0` && `id1`


	var blockmsg_embed = {
   embed: {
color: 0xff0000,
author: {
     name: "Команда недоступна"
	 },
    description: "Автор бота отключил Вам все команды по причине: *оскорбление в отзыве*"
	}};

    client.on('guildCreate', (guild) => {
			  	  	var t_log = {
   embed: {
color: 0x55ff55,
author: {
     name: "Servers Log",
	 icon_url: guild.iconURL
},
    description: "DMITBot has joined the **" + guild.name + "** server! Now it has **" + client.guilds.size + "** servers. \:clap\: \:clap\:\nThanks!",
	   fields: [
      {
           name: "Server ID",
           value: guild.id
    },
       {
           name: "Channels | Members | Roles | Online",
           value: guild.channels.size + " ch. | " + guild.memberCount + " memb. | " + guild.roles.size + " roles | " + guild.presences.size + " online"
       },
    {
        name: "Onwer",
        value: guild.owner.user.tag + " \(" + guild.owner.user.id + "\)"
    },
	{
           name: "Created at",
           value: strftime('%d/%m/%Y %H:%M', new Date(guild.createdTimestamp))
    },
      ]
	}}
		  client.channels.get("564022728143929370").send(t_log);})
		  
		      client.on('guildDelete', (guild) => {
			  	  	var t_log = {
   embed: {
color: 0xff0000,
author: {
     name: "Servers Log",
	 icon_url: guild.iconURL
},
    description: "DMITBot left, kicked out, banned from **" + guild.name + "** server! Now it has **" + client.guilds.size + "** servers. \nCan you explain to the bot author what you didn't like? :worried:",
	}}
		  client.channels.get("564022728143929370").send(t_log);})
		
	
	
var prefix = "dm~"

client.login(`<token>`)

client.on("ready", () => {
	client.user.setGame("Starting Dmitryev Bot...")
});


client.on("message", message => {
  if(message.author === client.user) return;
  if(message.content.startsWith(prefix + "test")) {
	  	  	var t_log = {
   embed: {
color: 0xff8800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}

	var test_embed = {
   embed: {
color: 0xff9900,
author: {
     name: "Проверка состояния бота",
     icon_url: client.user.avatarURL
},
    description: "Проверка прошла успешно. Никаких ошибок пока не обнаружено.",
   fields: [
      {
           name: "Размер процесса",
           value: Math.round(process.memoryUsage().heapUsed / 1024) + " кБ"
    },
       {
           name: "Время отправки",
           value: client.ping + " мсек"
       },
    {
        name: "Платформа",
        value: os.platform()
    },
         {
            name: "Процессор",
            value: os.cpus()[0].model
         },
       {
         name: "Кол-во серверов / пользователей",
         value: client.guilds.size + " / " + client.users.size
       }
      ]
   }
};
client.channels.get("564022728143929370").send(t_log);
message.channel.send(test_embed);
}});

client.on("message", message => {
  if(message.author === client.user) return;
  if(message.content.startsWith(prefix + "help rainbow")) {
	  	  	var t_log = {
   embed: {
color: 0xff8800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	  
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  			var rainbowhelp_embed = {
        embed: {
            color: 0xff0055,

            author: {
                name: "Что делать, если \"радужный\" режим не работает должным образом",
                icon_url: client.user.avatarURL
            },
  description: "1. Перетащите роль `DmitBot \(β\)` на шаг выше роли `Multicolor` \(если у Вас \n роли Multicolor нет, создайте ее!\)\n2. Если хотите охватить всеми участниками радугой, перетащите эту же роль \nвместе с DmitBot'ом вверх после конечной цели, \nнапример, администратор или модератор.\n3.Если Вы оставите, как есть, роль Multicolor ниже остальных, то эффекта радуги не будет. Необходимо роли Multicolor и DmitBot расположить \nповерх определенных титулов.\n\nЕсли три из перечисленных условий не помогли, возможно, был вызван краш \nWebSocket, и для устранения - необходима перезагрузка бота.\n\nБлагодарим Вас за приглашенние бота и желаем Вам удачи!"
		}
					};
client.channels.get("564022728143929370").send(t_log);
message.channel.send(rainbowhelp_embed)
}}});

let rainbowOn = new Set();
let rainbowRole = new Set();
let blocked = new Set();

let colors = ['#ff0000', '#ffa500', '#ffff00', '#00ff00', '#00BFFF', '#0000ff', '#ff00ff'];


function send(id, msg) {return};

function roleChanginging () {
    forEachTimeout(colors, color => {
        client.guilds.forEach(guild => {
            if (rainbowOn.has(guild.id) && guild.roles.find(r => r.name === 'Multicolor')) {
                const role = guild.roles.find(r => r.name === 'Multicolor')
                if (role.editable && role) role.setColor(color); 
            };
        });
    }, 1500).then(() => roleChanginging());
};

roleChanginging();


roleChanginging();
client.on('message', message => {
    if (message.channel.type !== 'text' || message.author.bot || !message.content.startsWith(prefix) || !message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;
    if(message.channel.type === 'dm') return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    function succ (text) {
        const embed = new Discord.RichEmbed()
        .setColor('55ff55')
        .setTitle('Успех :white_check_mark:')
        .setDescription(`**${text}**`)
        return message.channel.send({embed});
    }

    function err (text, perms) {
        const embed = new Discord.RichEmbed()
        .setColor('ff5555')
        .setTitle('Ошибка :exclamation:')
        .setDescription(`Причина: **${text}**`)
        if (perms) embed.setDescription(`**У вас нет права "${perms}"**`);
        return message.channel.send({embed});
    }

    if (command === 'stop') {
	    if(message.channel.type === 'dm') return;
			if (blockid === message.author.id) return message.send('Автор бота отключил Вам все команды бота по причине: ' + reasonblock);

        if (!message.member.hasPermission("MANAGE_ROLES")) return err(null, 'Управление ролями')

        if (!rainbowOn.has(message.guild.id)) return err('Изменение роли и так не включено')

        rainbowOn.delete(message.guild.id)
        succ('Изменение роли успешно отключено')
		
        send('461516811855200256', `Пользователь ${message.author} (${message.author.tag}) **отключил** :negative_squared_cross_mark: изменение роли на ${message.guild.name} (${message.guild.id})`)
    }
    
        if (['rainbow', 'rb'].includes(command)) {
				var rb_log = {
   embed: {
color: 0xff8800,
author: {
     name: "Commands Log",
     icon_url: client.user.avatarURL
},
    description: message.author.tag + " launched a color change on " + message.guild.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
	}};
			client.channels.get("564022728143929370").send(rb_log);
				if (blockid === message.author.id) return message.send('Автор бота отключил Вам все команды бота по причине: ' + reasonblock);

            const role = message.guild.roles.find("name", 'Multicolor')

            if (!message.member.hasPermission("MANAGE_ROLES")) return err(null, 'Управление ролями')

            if (!role) return err('На вашем сервере нет роли с названием \`Multicolor\`');

            if (!role.editable) return err(`У меня недостаточно прав для изменения роли ${role}`)

            if (rainbowOn.has(message.guild.id)) return err('Нельзя создавать более одной меняющейся роли на сервере');

            rainbowOn.add(message.guild.id);

            send('461516811855200256', `Пользователь ${message.author} (${message.author.tag}) **включил** :white_check_mark: изменение роли на ${message.guild.name} (${message.guild.id})`)

            succ('\"Радужный\" режим включен.');
        }

    /*if (command === 'set-colors') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');
        let allColors = [];
        if (!args[1] || args[7]) return message.reply('Укажите от 2-ух до 7-ми цветов');
            
        for (let i = 0; i < args.length; i++) {
            if (!args[i].match(hexreg)) return message.reply(`Аргумент **${i + 1}** не является hex цветом (\`#ff0000\`)`)
            allColors.push(`${i + 1}) **${args[i]}**`)
        } 
        db.query(`SELECT * FROM guildData WHERE id = ${message.guild.id}`, (err, rows) => {
            if (err) console.log(err);
            if (!rows[0]) db.query(`INSERT INTO guildData (id, colors) VALUES ('${message.guild.id}', '${colors}')`, console.log)
            db.query(`UPDATE guildData SET colors = '${args.join(' ')}' WHERE id = '${message.guild.id}'`);
        })
        message.reply(`Цвета меняющейся роли изменены на:\n${allColors.join('\n')}`);
    }
    if (command === 'reset-colors') {
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply('У вас недостаточно прав');
        db.query(`SELECT * FROM guildData WHERE id = ${message.guild.id}`, (err, rows) => {
            if (err) console.log(err);
            if (!rows[0]) db.query(`INSERT INTO guildData (id, colors) VALUES ('${message.guild.id}', '${colors}')`, console.log)
            db.query(`UPDATE guildData SET colors = '${colors}' WHERE id = '${message.guild.id}'`);
        })
        message.reply('Цвета меняющейся роли изменены на стандартные');
    }*/
});

client.on('ready', () => {

    var timerId = setInterval(function() {
  client.user.setGame(client.guilds.size + " servers | dm~help")
    }, 10000);
			var timerId = setInterval(function() {
console.log("\n██████       ███   ███     ██   ██████\n     ██     ██ ██ ██ ██           ██\n      ██    ██ ██ ██ ██    ██     ██\n      ██   ██   ███   ██   ██     ██\n     ██    ██         ██   ██     ██\n██████    ██           ██  ██     ██")
console.log("\nServers \(" + client.guilds.size + "\):")
  client.guilds.forEach((guild) => {
        console.log(" = " + guild.name + "\n   ID: " + guild.id + " | Users: " + guild.memberCount + " | Online: " + guild.presences.size)
  })
  console.log("\nUsers: " + client.users.size + "\nCommand complete.")
			clearInterval(timerId);
}, 2000);
});

client.on('ready', () => {
  console.log(`Starting ${client.user.tag}...`);
  var timerId = setInterval(function() {
  client.user.setGame(client.users.size + " users | dm~help")
}, 12000);
});

client.on('ready', () => {
    // List servers the bot is connected to
			var timerId = setInterval(function() {
console.log("\n██████       ███   ███     ██   ██████\n     ██     ██ ██ ██ ██           ██\n      ██    ██ ██ ██ ██    ██     ██\n      ██   ██   ███   ██   ██     ██\n     ██    ██         ██   ██     ██\n██████    ██           ██  ██     ██")
console.log("\nServers \(" + client.guilds.size + "\):")
  client.guilds.forEach((guild) => {
        console.log(" = " + guild.name + "\n   ID: " + guild.id + " | Users: " + guild.memberCount + " | Online: " + guild.presences.size)
  })
  console.log("\nUsers: " + client.users.size + "\nCommand complete.")
}, 120000);
})

client.on('message', message => {
	if (!message.guild) return;
    if (message.content.startsWith(prefix + 'mass-say я говнокодер')) {
        client.guilds.forEach(guild => {
            let channels = guild.channels.filter(channel => channel.type === 'text' && channel.permissionsFor(guild.members.get(client.user.id)).has('SEND_MESSAGES'));
            if (channels.size > 0) channels.first().send("тут ниче нету :)");
        })
    }
});



client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + 'ban')) {
	  	   	  if(message.channel.type === 'dm') return;
			  
		    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban({
          reason: 'Меня попросил забанить их ${member}',
        }).then(() => {
		  		var ban_log = {
   embed: {
color: 0xff8800,
author: {
     name: message.author.tag,
     icon_url: client.user.avatarURL
},
    description: member.tag + " banned by user " + message.author.tag,
		   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
   }
};
	  client.channels.get("564022728143929370").send(ban_log);
          message.channel.sendMessage(`**Сообщение**\n${user.tag} забанен из Вашего сервера.`);
        }).catch(err => {
          message.channel.sendMessage('**Ошибка**\nНевозможно выполнить действия, поскольку бот/Вы не имеете права администратора.');
          console.error(err);
        });
      } else {
        message.channel.sendMessage('**Ошибка**\nНевозможно выполнить действие, поскольку в Вашем сервере нет этого участника, либо этот участник покинул Ваш сервер');
      }
    } else {
      message.channel.sendMessage('**Правильное использование команды**\nДля того, чтобы забанить человека, напишите dm~ban @имя#тег');
    }
  }}
});


client.on('message', message => {
		  	   	  if(message.channel.type === 'dm') return;
    if(message.content === prefix + "support") {
			  	  	var t_log = {
   embed: {
color: 0xff8800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
		let chid = message.channel.id
	var support_embed = {
        embed: {
            color: 0xff0055,

            author: {
                name: "Служба поддержки бота Dmit",
                icon_url: client.user.avatarURL
            },
  description: "dm~support bugreport <баг> - сообщить о баге\ndm~support note <отзыв> - отзыв"
		}
					};
						  client.channels.get("564022728143929370").send(t_log);
    message.channel.send(support_embed);
}}});

   client.on("message", message => {
    if(message.author === client.user) return;
		  	   	  if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + "support bug")) {
			  	  	var t_log = {
   embed: {
color: 0x2255ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
			var supportbug_embed = {
        embed: {
            color: 0xff0055,

            author: {
                name: "Служба поддержки бота Dmit",
                icon_url: client.user.avatarURL
            },
  description: "Автор бота ответит через некоторое время, дождитесь ответа."
		}
					};
    message.channel.send(supportbug_embed);
							  client.channels.get("564022728143929370").send(t_log);

						      let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.tag + " \(" + message.author.id + "\) написал: " + message.content + " на " + message.channel.id)})
   }}});
   
      client.on("message", message => {
    if(message.author === client.user) return;
		  	   	  if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + "support note")) {
			  	  	var t_log = {
   embed: {
color: 0x2255ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
			var supportbug_embed = {
        embed: {
            color: 0xff0055,

            author: {
                name: "Служба поддержки бота Dmit",
                icon_url: client.user.avatarURL
            },
  description: "Автор бота ответит через некоторое время, дождитесь ответа."
		}
					};
											  client.channels.get("564022728143929370").send(t_log);
    message.channel.send(supportbug_embed);

						      let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.tag + " \(" + message.author.id + "\) написал: " + message.content + " на " + message.channel.id)})
	  }}});

	

  
   client.on("message", message => {
    if(message.author === client.user) return;
		  	   	  if(message.channel.type === 'dm') return;
    if(message.content === prefix + "help") {
			  	  	var t_log = {
   embed: {
color: 0x007700,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
		var help_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: client.user.username,
                icon_url: client.user.avatarURL
            },
  description: "Версия 2.1.0 (17.04.2019)",
            fields: [
                {
                    name: "Справка",
                    value: "dm~about - о DmitBot\r\ndm~support - служба поддержки бота\r\ndm~servinfo - о сервере\r\ndm~donate - помочь проекту\r\ndm~links - ссылки на автора"
                },
                {
                    name: "Опции",
                    value: "dm~test - проверить состояние бота\r\ndm~ping - пинг"
                },
                {
                    name: "Модератор",
                    value: "dm~prune <от 2 до 999> - удалить сообщения\r\ndm~ban - забанить кого-то\r\ndm~kick - выгнать кого-то\r\ndm~myavatar - мой аватар\r\ndm~userinfo - о пользователе"
                },
                {
                    name: "Развлечения",
                    value: "\(!\) dm~news - Dmit News\r\ndm~memes - Интернет-мемы\r\ndm~8ball <вопрос> - игра \"Шар судьбы\"\ndm~emoji-ind - Индикатор эмоций\r\ndm~say - сказать что-нибудь от имени бота"
             },
                {
                    name: "Режим радуги",
                    value: "dm~rb - включить\r\ndm~stop - отключить\r\ndm~help rainbow - что делать, если режим радуги не работает должным образом?"
             }
            ]
        }
    };
						  client.channels.get("564022728143929370").send(t_log);
message.channel.send(help_embed);
let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send("*Открывает справочник " + message.author.id + " \(" + message.author.tag + "\)*")}) 
	}
   }});
 
 client.on("message", message => {
   if (message.content.startsWith(prefix + "servjoined")) {
    // List servers the bot is connected to
    console.log("Сервера \(" + client.guilds.size + "\):")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
})
   }
   });
  
client.on('message', function(message) { 
    if (message.content.startsWith("dm~prune")) { 
    if(message.channel.type === 'dm') return;
		  	  	var t_log = {
   embed: {
color: 0xff0000,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
						  client.channels.get("564022728143929370").send(t_log);
  let args = message.content.split(" ").slice(1);
		var deletemsg_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Пожалуйста, подождите...",
                icon_url: client.user.avatarURL
            },
  description: ":hourglass_flowing_sand: Удаление сообщений..."
		}
					};
					
			var delmsgerr_o_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Ошибка",
                icon_url: client.user.avatarURL
            },
  description: "Пожалуйста, укажите после этой команды любое число от 2 до 100 для удаления."
		}
					};
					
			var delmsgerr_t_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Ошибка",
                icon_url: client.user.avatarURL
            },
  description: "Невозможно удалить сообщения, поскольку Вы или бот не имеет прав на управление сообщениями."
		}
					};

    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.channel.send(delmsgerr_o_embed);
    
    // So we get our messages, and delete them. Simple enough, right?
	message.channel.send(deletemsg_embed)
    const fetched = message.channel.fetchMessages({limit: deleteCount}).then(function(fetched){ 
        message.channel.bulkDelete(fetched); 
       }, function(err){message.channel.send(delmsgerr_t_embed)})       
}}}); 


client.on('message', message => {
		  	   	  if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + "myavatar")) {
			  	  	var t_log = {
   embed: {
color: 0xff8800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}

		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  						  client.channels.get("564022728143929370").send(t_log);
	var myavatar_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Аватар пользователя " + message.author.tag,
                icon_url: client.user.avatarURL
            },
  description: message.author.avatarURL
		}
					};
    message.channel.send(myavatar_embed);
    let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send("*Показывает аватар " + message.author.tag + " \(" + message.author.id + "\)*")})
	}}});


  client.on('message', message => {
    if (!message.guild) return;
    if (message.content.startsWith('dm~kick')) {
	  if(message.channel.type === 'dm') return;
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  		  		var kick_log = {
   embed: {
color: 0xff8800,
author: {
     name: message.author.tag,
     icon_url: client.user.avatarURL
},
    description: member.tag + " kicked by user " + message.author.tag + "\n```Server ID: " + message.guild.id +  "\nUser ID: " + message.author.id + "```",
		   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
   }
};
	  						  client.channels.get("564022728143929370").send(kick_log);
      const user = message.mentions.users.first();
      if (user) {
        const member = message.guild.member(user);
        if (member) {
          member.kick('Optional reason that will display in the audit logs').then(() => {
            message.reply(`${user.tag} выгнан из Вашего сервера.`);
          }).catch(err => {
            message.channel.sendMessage('Невозможно выполнить действия, поскольку бот/Вы не имеете права администратора.');
            console.error(err);
          });
        } else {
          message.channel.sendMessage('Невозможно выполнить действие, поскольку в Вашем сервере нет этого участника, либо этот участник покинул Ваш сервер');
        }
      } else {
        message.channel.sendMessage('Для того, чтобы выгнать участника, напишите dm~kick @имя');
      }
    }
  }});


  client.on('message', message => {
	  	  	   	  if(message.channel.type === 'dm') return;
    if (message.content === 'dm~ping') {
			  	  	var t_log = {
   embed: {
color: 0x2255ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  						  client.channels.get("564022728143929370").send(t_log);
	message.channel.sendMessage(':hourglass_flowing_sand:');
		var timerId = setInterval(function() {
  clearInterval(timerId);
  	var ping_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Пинг",
                icon_url: client.user.avatarURL
            },
  description: "Ваш пинг составляет " + client.ping + " с задержкой до 5 секунд.\n\nСделайте пожертвование, чтобы бот пинганул без задержек. Подробнее - пишите `dm~donate`"
		}
					};
        message.channel.send(ping_embed)
}, 5000);
    }}
  });


  client.on(`ready`, async () => {
  client.user.setStatus('online')
  .then(console.log)
  .catch(console.error);
  });

  client.on('message', message => {
    if(message.author === client.user) return;
		  	   	  if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + 'about')) {
			  	  	var t_log = {
   embed: {
color: 0x008800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  						  client.channels.get("564022728143929370").send(t_log);
		var about_embed = {
   embed: {
color: 0x0088ff,
author: {
     name: "О боте DmitBot",
     icon_url: client.user.avatarURL
},
   fields: [
      {
           name: "Версия",
           value: "2.1.0 (17.04.2019)"
    },
       {
           name: "Автор/Разработчик",
           value: "`\[dmit.discord.gg\]#7004`"
       },
    {
        name: "Авторские права",
        value: "Copyright © Dmit Computers, 2019. Все права защищены."
    },
      ]
   }
};
message.channel.send(about_embed);
    }
  }});
  
// set message listener 
client.on('message', message => {
    if(message.author === client.user) return;
	  	   	  if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + 'reset')) {
     message.channel.send('Перезагрузка...')
     .then(msg => client.destroy())
     .then(() => client.login('NTA3NT...')); // <your_token_here> is п**да
    }
});

// Turn bot off (destroy), then turn it back on
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]

}
  
    client.on('message', message => {
    if(message.author === client.user) return;
	if(message.channel.type === 'dm') return;
    if(message.content.startsWith(prefix + 'links')) {
			  	  	var t_log = {
   embed: {
color: 0x2255ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
		  if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  						  client.channels.get("564022728143929370").send(t_log);
		     var links_embed = {
   embed: {
color: 0xaa88ff,
author: {
     name: "Ссылки на автора",
     icon_url: client.user.avatarURL
},
   fields: [
	  {
		   name: "Приглашение бота",
		   value: "_нету_"
	  },
           ]
   }
}
        message.channel.send(links_embed);
let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send("Каждый мечтает иметь своего охранника, особенно " + message.author.id + " \(" + message.author.tag + "\).")}) 
	}
	}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content === prefix + 'news') {
	  	  	  	var t_log = {
   embed: {
color: 0xaa88ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  						  client.channels.get("564022728143929370").send(t_log);
     var news_embed = {
   embed: {
color: 0xaa88ff,
author: {
     name: "Dmit News",
     icon_url: client.user.avatarURL
},
   fields: [
      {
		   name: "С 27 марта 2018 г. открылся блог-сайт канала DMIT+",
           value: "Подробнее - пишите `dm~news 001`"
      },
      ]
   }
};
message.channel.send(news_embed);
  }
}});


client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content === prefix + 'news 001') {
	  	  	  	var t_log = {
   embed: {
color: 0xaa88ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
     var news_001_embed = {
   embed: {
color: 0xaa88ff,
author: {
     name: "Новости Dmit",
     icon_url: client.user.avatarURL
},
   fields: [
      {
           name: "С 27 марта 2018 г. открылся сайт-блог канала DMIT+",
           value: "_теперь его уже нету_"

    },
      ]
   }
};
message.channel.send(news_001_embed);
  }
}});

client.on('message', message => {
	if(message.author === client.user) return;
	if(message.content.startsWith(prefix + 'eval')) {
		   let args = message.content.split(" ").slice(1);
		   if(message.author.id !== "484921597015359488") return;
    try {
      var code = args.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`**Ошибка выполнения кода** \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

}); // END MESSAGE HANDLER

function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

client.on('message', message => {
	if(message.channel.type === 'dm') return;
  if(message.content.startsWith(prefix + 'ads +')) {
	  	  	  	var t_log = {
   embed: {
color: 0xffff00,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	  if (message.author.id === '484921597015359488') {
		      let args = message.content.split(" + ").slice(1);
		      client.channels.get('543748248012193792').send(args.join(" ")).catch(console.error);
	  } else {
		  	  	  						  client.channels.get("564022728143929370").send(t_log);
     var ads_err_embed = {
   embed: {
color: 0xff0000,
author: {
     name: "Ошибка",
     icon_url: client.user.avatarURL,
},
description: "Команда будет доступна только, если Вы сделаете пожертвование.\n\nПодробнее: `dm~donate` + ввод."
   }
};
message.channel.send(ads_err_embed);
	  }
		 }
});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content.startsWith(prefix + '8ball')) {
	  	  	  	var t_log = {
   embed: {
color: 0x2200ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
 let answers = ["Да.", "Нет.", "Естественно.", "Возможно.", "Конечно.", "Не могу ответить на этот вопрос", "Похоже\, Вы задаете слишком много вопросов. Пожалуйста, повторите попытку позже.", "Cомневаюсь.", "Это маловероятно.", "Не знаю, как вы, но я отвечаю отрицательно.", "Да или нет? То, что вы задаете, это сложный вопрос."]; //массив ответов
      let rand = Math.floor(Math.random()*answers.length);
      var eightball_embed = {
         embed: {
            color: 0x0088ff,
            author: {
                      name: "Шар судьбы",
                      icon_url: client.user.avatarURL
                    },
            fields: [
                       {
                         name: "Ответ",
                         value: answers[rand]
                       },
                    ]
                }
                        };
message.channel.send(eightball_embed);
let str = "<@461516811855200256>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.id + " или " + message.author.tag + " спрашивает у \"Шара судьбы\" такой вопрос: " + message.content)}) 
  }
}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.content.startsWith(prefix + 'servinfo')) {
	  	  	  	var t_log = {
   embed: {
color: 0x3333ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	  if(message.channel.type === 'dm') return;
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
      let verifLvl = ['Отсутствует', '1-й уровень', '2-й уровень', '3-й уровень', '4-й уровень']
	  message.guild.region = message.guild.region[0].toUpperCase() + message.guild.region.slice(1);
      var si_info = {
    embed: {
        color: 0x8800ff,
        author: {
              name: "О сервере \"" + message.guild.name + "\"",
              icon_url: client.user.avatarURL
                   },
          fields: [
		    {
                 name: "ID",
                 value: message.guild.id
            },
            {
                 name: "Дата создания",
                 value: strftime('%d.%m.%Y', new Date(message.guild.createdTimestamp))
            },
            {
                 name: "Владелец",
                 value: message.guild.owner.user.tag
            },
            {
                 name: "Каналов | Участников | Онлайн",
                 value: message.guild.channels.size + " | " + message.guild.memberCount + " | " + message.guild.presences.size
            },
            {
                   name: "Регион/Страна",
                   value: message.guild.region
            },
            {
                 name: "Степень модерации",
                 value: verifLvl[message.guild.verificationLevel]
       },
           ]
       }
   };
message.channel.send(si_info);
let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.id + " или " + message.author.tag + " хочет узнать инфу о сервере, в которой он сидит. Нормально, а че?")}) 
   }
}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.content.startsWith(prefix + 'userinfo')) {
	  	  	  	var t_log = {
   embed: {
color: 0x3333ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	  if(message.channel.type === 'dm') return;
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  let args = message.content.split(" ").slice(1);
	  let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
	  let argsUser = message.guild.member.user || message.author
	  if (member){argsUser = member.user}
	  else {argsUser = message.author}
	  let statuses = {
		  online: "Онлайн",
		  idle: "Не активен",
		  dnd: "Не беспокоить",
		  offline: "Оффлайн"
	  }
	  let game
	  if (!argsUser.presence.game) game = `${statuses[argsUser.presence.status]}`
	  else if (argsUser.presence.game.type == 0) game = `Играет/Работает в **${argsUser.presence.game.name}**`
	  else if (argsUser.presence.game.type == 1) game = `Ведет стрим **${argsUser.presence.game.name}**\n${argsUser.presence.game.url}`
      else if (argsUser.presence.game.type == 2) game = `Слушает в Spotify ${argsUser.presence.game.name}`
      else if (argsUser.presence.game.type == 3) game = `Смотрит **${argsUser.presence.game.name}**`
      let day = 1000 * 60 * 60 * 24
	  let month = 30
	  let date1 = new Date(message.createdTimestamp)
	  let date2 = new Date(argsUser.createdTimestamp)
	  let date3 = new Date(message.guild.member(argsUser).joinedTimestamp)
	  if (Math.round(Math.abs((date1.getTime() - date3.getTime()) / day)) > 30 || Math.round(Math.abs((date1.getTime() - date2.getTime()) / day)) > 30) {
		  let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day / month))
		  		  let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day / month))
		        var ui_info = {
    embed: {
        color: 0x8800ff,
        author: {
              name: "О пользователе \"" + argsUser.username + "\"",
              icon_url: argsUser.avatarURL
                   },
          fields: [
		    {
                 name: "ID",
                 value: argsUser.id
            },
            {
                 name: "Статус",
                 value: game
            },
            {
                 name: "Дата регистрации",
                 value: strftime('%d.%m.%Y в %H:%M', new Date(argsUser.createdTimestamp)) + " \(" + diff1 + " мес. назад\)"
            },
            {
                 name: "Дата входа в сервер",
                 value: strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(argsUser).joinedTimestamp)) + " \(" + diff2 + " мес. назад\)"
            },
            {
                 name: "Роли",
                 value: message.guild.member(argsUser).roles.filter(r => r.id != message.guild.id).map(role => role.name).join(', ') || "Отсутствуют"
            },
           ]
       }
	  }
	  message.channel.send(ui_info);
	  } else {
	  let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
	  let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))
	  
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
      var ui_info = {
    embed: {
        color: 0x8800ff,
        author: {
              name: "О пользователе \"" + argsUser.username + "\"",
              icon_url: argsUser.avatarURL
                   },
          fields: [
		    {
                 name: "ID",
                 value: argsUser.id
            },
            {
                 name: "Статус",
                 value: game
            },
            {
                 name: "Дата регистрации",
                 value: strftime('%d.%m.%Y в %H:%M', new Date(argsUser.createdTimestamp)) + " \(" + diff1 + " дн. назад\)"
            },
            {
                 name: "Дата входа в сервер",
                 value: strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(argsUser).joinedTimestamp)) + " \(" + diff2 + " дн. назад\)"
            },
            {
                 name: "Роли",
                 value: message.guild.member(argsUser).roles.filter(r => r.id != message.guild.id).map(role => role.name).join(', ') || "Отсутствуют"
            },
           ]
       }
   };
message.channel.send(ui_info);
let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.id + " или " + message.author.tag + " хочет узнать инфу о сервере, в которой он сидит. Нормально, а че?")}) 
   }
}}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content.startsWith(prefix + "say")) {
	  	  	  	var t_log = {
   embed: {
color: 0x008800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
	let args = message.content.split(" ").slice(1);
    const sayMessage = args.join(" ");
    message.delete().catch(console.log("\n\nError! I can not manage messages.\n\nReason\n" + message.author.tag + ": " + message.content)); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage + "\n*Отправлено пользователем " + message.author.tag + "*");
                                  }
});


client.on('message', message => {
	if(message.channel.type === 'dm') return;
  if(message.author === client.user) return;
  if(message.content === prefix + 'memes') {
	  	  	  	var t_log = {
   embed: {
color: 0x0088ff,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
	    	var memes_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Интернет-мемы",
                icon_url: client.user.avatarURL
            },
  description: "Введите любую категорию.\n\ndm~memes дружко - Сергей Дружко\ndm~memes мз - Меньше знаешь..."
			}}
					};
        message.channel.send(memes_embed)
}});

client.on('message', message => {
	if(message.channel.type === 'dm') return;
  if(message.author === client.user) return;
  if(message.content.startsWith(prefix + 'memes дружко')) {
	  	  	  	var t_log = {
   embed: {
color: 0x550000,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
	  	    	var memes_001_embed = {
        embed: {
            color: 0xff0000,

            author: {
                name: "Интернет-мемы - Сергей Дружко",
                icon_url: client.user.avatarURL
            },
  description: "https://jrnlst.ru/sites/default/files/covers/cover_6.jpg"
		}
					};
        message.channel.send(memes_001_embed)
  }
}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content.startsWith(prefix + 'memes мз')) {
	  	  	  	var t_log = {
   embed: {
color: 0x558800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
      message.channel.sendMessage('**Интернет-мемы - Меньше знаешь...**\nhttps://avatars.mds.yandex.net/get-zen_doc/1222384/pub_5b63fd506c95a000a96a3184_5b64051e5c951200aa90a245/scale_600')
  }
}});

client.on('message', message => {
	if(message.channel.type === 'dm') return;
  if(message.author === client.user) return;
  if(message.content.startsWith(prefix + 'memes fcplm')) {
	  	  	  	var t_log = {
   embed: {
color: 0x55ff00,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
      message.channel.sendMessage('**Интернет-мемы - Facepalm**\nhttps://i.kym-cdn.com/photos/images/newsfeed/000/339/529/280.jpg')
	  }
}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.content.startsWith('Привет')) {
      message.channel.sendMessage('О, привет! :)')
  }
});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content.startsWith(prefix + 'emoji-ind')) {
	  	  	  	var t_log = {
   embed: {
color: 0x558800,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
 let emoji = [":joy:", ":thinking:", ":grin:", ":slight_smile:", ":grimacing:", ":wink:", ":slight_smile:", ":worried:", ":angry:", ":rage:", ":hushed:", ":scream:", ":cry:", ":sob:", ":zipper_mouth:", ":raised_hands:", ":thumbsup:", ":thumbsdown:", ":frowning2:", ":ok_hand:"]; //массив ответов
      let rand = Math.floor(Math.random()*emoji.length);
      var emoji_embed = {
         embed: {
            color: 0x0088ff,
            author: {
                      name: "Индикатор эмоций",
                      icon_url: client.user.avatarURL
                    },
            fields: [
                       {
                         name: "Эмоция",
                         value: emoji[rand]
                       },
                    ]
                }
                        };
message.channel.send(emoji_embed);
let str = "<@461516811855200256>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.id + " или " + message.author.tag + " сдедал фокус-покус со словами: " + message.content)}) 
  }
}});

client.on('message', message => {
  if(message.author === client.user) return;
  if(message.channel.type === 'dm') return;
  if(message.content.startsWith(prefix + 'donate')) {
	  	  	  	var t_log = {
   embed: {
color: 0x00aa00,
author: {
     name: "Commands Log",
},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
	   fields: [
      {
           name: "Server ID",
           value: message.guild.id
    },
       {
           name: "Channel ID",
           value: message.channel.id
       },
    {
        name: "User ID",
        value: message.author.id
    },
      ]
		}}
	    if(blockid === message.author.id) {

	  message.channel.send(blockmsg_embed)
  } else {
	  	  	  						  client.channels.get("564022728143929370").send(t_log);
	       var donate_embed = {
   embed: {
color: 0x44aa44,
author: {
     name: "Пожертвование",
     icon_url: client.user.avatarURL,
},
description: "За донат вы получите:\n1. Команду `dm~ads +` для рекламы Вашего сервера!\n2. `dm~ping` без задержки\n3. `dm~memes +` для отправки своих мемов.\n\n_тут пусто_\n\nМин. - 15 RUB \(р.\)/6 UAH \(укр. гр.\)/0.15 USD \(долл. США\)"
   }
};
      message.channel.sendMessage(donate_embed)
let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.fetchUser(id) 
    .then(user => {user.send(message.author.id + " или " + message.author.tag + " хочет узнать о пожертвовании или просто задонатить. ;\)")}) 
  }
}});
  
client.on(`message`, async message => {
	    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + "off я быдлокод")) {
        message.channel.sendMessage("Завершение работы...");
      await client.destroy()
  }});

  client.on('message', message => {
    if(message.author === client.user) return;
    if(message.content.startsWith(prefix + 'off')) {
	message.channel.sendMessage('**Ошибка**\nОтказано в доступе.');
  }});
