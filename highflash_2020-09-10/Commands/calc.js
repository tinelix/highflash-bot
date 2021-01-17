module.exports = {
	name: 'calc',
	description: 'Калькулятор',
	execute(message, client, args, math, botconfig) { 
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
client.channels.cache.get(botconfig.logs_channel).send(t_log);
    try {	
	  var calc_err1_embed = {
      embed: {
        color: 0xff0000,
          author: {
            name: "Калькулятор",
            icon_url: client.user.avatarURL()
          },
          description: "Вы должны после команды `" + botconfig.prefix + "calc` указать математическое выражение.",
          fields: [
            {
              name: "Пример",
              value: "`" + botconfig.prefix + "calc 12 * 18`, `" + botconfig.prefix + "h.calc -468 + 212`, `" + botconfig.prefix + "h.calc 16 / 2`"
            }
          ]
        }
      };
      let whatto = message.content.slice(botconfig.prefix.length + 5).replace(/,/gi, ' ');
      if (!whatto) return message.channel.send(calc_err1_embed);
      let result = math.evaluate(whatto).toString();
      var calc_embed = {
        embed: {
          color: 0x95c201,
          author: {
            name: "Калькулятор",
            icon_url: client.user.avatarURL()
          },
          fields: [
            {
              name: "Выражение",
              value: "```js\n" + whatto + "\n```"
            },
            {
              name: "Результат",
              value: "```js\n" + result + "\n```"
            },
          ]
        }
      };
      var calc_err2_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Калькулятор",
            icon_url: client.user.avatarURL()
          },
          fields: [
            {
              name: "Выражение",
              value: "```js\n" + whatto + "\n```"
            },
            {
              name: "Результат",
              value: "Ошибка вычисления"
            },
          ]
        }
      };
      message.channel.send(calc_embed).catch(() => message.channel.send(calc_err2_embed));
    } catch (e) {
      var calc_err3_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Калькулятор",
            icon_url: client.user.avatarURL()
          },
          fields: [
            {
              name: "Результат",
              value: "Ошибка вычисления. Неверное выражение."
            },
          ]
        }
      };
	  console.log(e);
      return message.channel.send(calc_err3_embed)
    }
}
};
