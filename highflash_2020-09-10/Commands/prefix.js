const fs = require("fs");
const { prefix } = require("../JSON/botconfig.json");

module.exports = {
  name: "prefix",
  guildOnly: true,
  usage: `[wanted prefix]`,
  description: "Задает пользовательский префикс для Вашего сервера",
  execute(client, message, prefixes) {
	  
	let args = message.content.split(" -prefix ").slice(1);
	  
	let prefixerrEmbed = {
		embed: {
		color: 0xff0000,
		author: {
			name: "Ошибка",
			icon_url: client.user.avatarURL()
		},
		description:
			`Вы не можете выполнить эту команду, поскольку Вы не имеете права на управление сервером.`
		}
	};
	let prefixtoolongEmbed = {
		embed: {
		color: 0xff0000,
		author: {
			name: "Ошибка",
			icon_url: client.user.avatarURL()
		},
		description:
			`Ваш префикс не должен превышать 6 символов.`
		}
	};
	if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(prefixerrEmbed);
	try {
	if (args[0].length > 6) return message.channel.send(prefixtoolongEmbed);
		console.log(args[0].length);
	} catch(ex) {
    if (args == "") {
      if (prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
          prefixes: 'forcustomprefixonly.',
		  name: message.guild.name,
		  user: message.author.tag
        };
      }
    let defprefixEmbed = {
     embed: {
      color: 0xff8800,
      author: {
        name: "Пользовательский префикс",
        icon_url: client.user.avatarURL()
      },
      description:
        `Вы сбросили пользовательский префикс.`
    }
  };
      fs.writeFile("./JSON/prefixes.json", JSON.stringify(prefixes), err => {
		if (err) console.log(err);
	  });
      message.channel.send(defprefixEmbed);
      return;
    }};

    prefixes[message.guild.id] = {
      prefixes: args[0],
	  name: message.guild.name,
	  user: message.author.tag
    };

    fs.writeFile("./JSON/prefixes.json", JSON.stringify(prefixes), err => {
      if (err) console.log(err);
    });

    let prefixEmbed = {
     embed: {
      color: 0xff8800,
      author: {
        name: "Пользовательский префикс",
        icon_url: client.user.avatarURL()
      },
      description:
        `Префикс задан на \`${args[0]}\``
    }
  };
    message.channel.send(prefixEmbed);
  }
};
