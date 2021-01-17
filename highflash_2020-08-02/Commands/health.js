const Discord = require(`discord.js`);
const client = new Discord.Client();
const os = require("os");
const strftime = require("strftime");

module.exports = {
	name: 'health',
	description: 'Состояние бота',
	execute(message, client, args) {
    var t_log = {
      embed: {
        color: 0xff8800,
        author: {
          name: "Commands Log"
        },
        description:
          message.author.tag +
          " typing `" +
          message.content +
          "` on " +
          message.guild.name +
          "/" +
          message.channel.name,
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
          }
        ]
      }
    };
    let platform = "";
    const plaform = os.platform();
    if (os.platform() === "win32") {
      platform = "<:windows:670835960254169118> Windows (" + os.release() + ")";
    } else {
      if (os.platform() === "android") {
        platform =
          "<:android:670837143467458560> Android с Termux (" +
          os.release() +
          ")";
      } else {
        if (os.platform() === "linux") {
          platform = "<:linux:670836734447190016> Linux (" + os.release() + ")";
        }
      }
    }

    var bothealth = "";
    if (client.ws.ping > 1500) {
      bothealth = "Бот работает в онлайне, но ответит с большой задержкой.";
    } else {
      bothealth = "Бот работает в онлайне, оптимальная задержка.";
    }
  var str = 0;
  var membc = "0";
  var onlinecount = 0;
  var ar = client.guilds.cache.array();
  for (let i = 0; i < ar.length; i++) {
    str += ar[i].presences.cache.size;
  }
    var test_embed = {
      embed: {
        color: 0xff9900, // цвет полоски слева в формате 0xRRGGBB, в данном случае указан оранжевый цвет
        author: {
          name: "Состояние бота", // заголовок встраиваемого (Embed) сообщения
          icon_url: client.user.avatarURL()
        },
        description: bothealth, // описание встраиваемого сообщения
        fields: [
          {
            name: "💻 Сведения о хосте, на котором запущен бот", // имя поля
            value: "**Используемая память:** " + Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " МБ (" + Math.round(process.memoryUsage().heapUsed / 1024) + " кБ)\n**Программная платформа:** " + platform + "\n**Процессор:** " + os.cpus()[0].model,
            inline: true
          },
          {
            name: "🏓 Сетевая статистика",
            value: "**Местный пинг:** " + client.ws.ping.toFixed(2) + " мсек\n**Время работы:** " + (parseInt(strftime(
              "%d",
              new Date(client.uptime)
            )) - 1) + strftime(
              " дн. %H ч. %M мин. %S сек.",
              new Date(client.uptime)
            ),
            inline: true
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: true
          },
          {
            name: "🏘 Статистика бота",
            value: client.guilds.cache.size + " сервер(ов)\n" + client.users.cache.size + " пользователей\n" + str + " активных польз.",
            inline: true
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: true
          },
          {
            name: "\u200b",
            value: "\u200b",
            inline: true
          },
        ],
	  footer: {
            text:
              "XStep использует Node.js версии " + process.version + " и Discord.js версии " + Discord.version,
          }
      }
    };
    client.channels.cache.get("564022728143929370").send(t_log);
	return message.channel.send(test_embed);
}
};