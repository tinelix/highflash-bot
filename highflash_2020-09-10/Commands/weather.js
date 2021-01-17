module.exports = {
	name: 'weather',
	description: 'Погода',
	async execute(message, client, weather, args, botconfig) { 
    var t_log = {
      embed: {
        color: 0x007700,
        author: {
          name: "Commands Log"
        },
        description:
          message.author.tag +
          " looking for the weather in `" +
          args +
          "` on " +
          message.guild.name +
          "/" +
          message.channel.name + " (`" + message.content + "`)",
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
	weather.find({search: args, degreeType: 'C', lang: 'ru-RU'}, function(err, result) {
	var weather_err2_embed = {
      	embed: {
        color: 0xff0000, // цвет полоски слева в формате 0xRRGGBB, в данном случае указан оранжевый цвет
        author: {
          name: "Ошибка", // заголовок встраиваемого (Embed) сообщения
          icon_url: client.user.avatarURL()
        },
        description: '🚫 Cначала укажите свой город или населенный пункт.' // описание встраиваемого сообщения
      }
    };
  		if(err) return message.channel.send(weather_err2_embed);
	try {
 	var weather_embed = {
        embed: {
          color: 0x0088ff,
          author: {
            name: "Погода | " + result[0].location.name,
            icon_url: client.user.avatarURL(),
	    description: result[0].current.skytext
          },
          thumbnail: {
            url: result[0].current.imageUrl
          },
          fields: [
            {
              name: "Сегодня",
              value: "**Температура:** " + result[0].current.temperature + "°С (ощущается как " + result[0].current.feelslike + "°С)\n**Скорость ветра:** " + result[0].current.winddisplay + "\n**Влажность:** " + result[0].current.humidity + "%\n**Состояние: ** " + result[0].current.skytext,
	      inline: true
            },
            {
              name: "Завтра",
              value: "**Температура:** " + result[0].forecast[0].low + "°С / " + result[0].forecast[0].high + "°С\n**Состояние: ** " + result[0].forecast[0].skytextday,
	      inline: true
            },
          ],
            footer: {
              text: "Данные получены сегодня в " + result[0].current.observationtime
            }
        }
      };
  			message.channel.send(weather_embed);
	} catch(e) {
	var weather_err_embed = {
      	embed: {
        color: 0xff0000, // цвет полоски слева в формате 0xRRGGBB, в данном случае указан оранжевый цвет
        author: {
          name: "Ошибка", // заголовок встраиваемого (Embed) сообщения
          icon_url: client.user.avatarURL()
        },
        description: '🚫 Не удается найти результаты. Повторите попытку позже.```' + e + '```' // описание встраиваемого сообщения
      }
    };
		message.channel.send(weather_err_embed);
	}
		});
	}
}
