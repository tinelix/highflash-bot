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
    try {	
	  var calc_err1_embed = {
      embed: {
        color: 0xff0000,
          author: {
            name: "Калькулятор",
            icon_url: client.user.avatarURL()
          },
          description: "Вы должны после команды `h.calc` указать математическое выражение.",
          fields: [
            {
              name: "Пример",
              value: "`h.calc 12 * 18`, `h.calc -468 + 212`, `h.calc 16 / 2`"
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
              value: "Ошибка вычисления"
            },
          ]
        }
      };
	  console.log(e);
      return message.channel.send(calc_err3_embed)
    }
    client.channels.cache.get("564022728143929370").send(t_log);
}
};