module.exports = {
	name: 'server',
	description: 'Показывает информацию о текущем сервере',
	execute(message, client, strftime) { 
    var t_log = {
      embed: {
        color: 0x3333ff,
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
    if (message.channel.type === "dm") return;
      let afkCh = "Отсутствует";
      if (message.guild.afkChannel && message.guild.afkChannel.name) {
        afkCh =
          message.guild.afkChannel.name + " (" + message.guild.afkTimeout + " с.)";
      } else {
        afkCh = "Отсутствует";
      }
      client.channels.cache.get("564022728143929370").send(t_log);
      let verifLvl = "";
      if(message.guild.verificationLevel === "NONE") {
      verifLvl = "Без ограничений"
      }
      if(message.guild.verificationLevel === "LOW") {
      verifLvl = "Упрощенная проверка (1-я степень)"
      }	    
      if(message.guild.verificationLevel === "MEDIUM") {
      verifLvl = "Средняя проверка (2-я степень)"
      }	    
      if(message.guild.verificationLevel === "HIGH") {
      verifLvl = "Жесткая проверка (3-я степень)"
      }	    
      if(message.guild.verificationLevel === "VERY_HIGH") {
      verifLvl = "Строгая проверка (4-я степень)"
      }	
      message.guild.region =
        message.guild.region[0].toUpperCase() + message.guild.region.slice(1);
	var ar = message.guild.emojis.cache.array().slice(0, 10);
	var str = "";
      for (let i = 0; i < ar.length; i++) {
        str += "<:" + ar[i].name + ":" + ar[i].id + "> ";
      };
      var si_info = {
        embed: {
          color: 0x7b50ff,
          author: {
            name: 'О сервере "' + message.guild.name + '"',
            icon_url: client.user.avatarURL()
          },
          thumbnail: {
            url: message.guild.iconURL()
          },
          fields: [
            {
              name: "ID",
              value: message.guild.id,
	      inline: true
            },
            {
              name: "👑 Владелец",
              value:
                message.guild.owner.user.tag +
                " (" +
                message.guild.owner.id +
                ")",
		inline: true
            },
            {
               name: "\u200b",
               value: "\u200b",
               inline: true
            },
            {
              name: "🏡 Содержимое сервера",
              value:
                message.guild.channels.cache.size +
                " каналов\n" +
                message.guild.roles.cache.size +
                " ролей\n" +
                message.guild.memberCount +
                " участников\n" +
                message.guild.presences.cache.size +
                " онлайн",
		inline: true
            },
            {
              name: "🔕 AFK-канал",
              value: afkCh,
	      inline: true
            },
            {
               name: "\u200b",
               value: "\u200b",
               inline: true
            },
            {
              name: "🏙 Регион",
              value: message.guild.region,
	      inline: true
            },
            {
              name: "🛠 Степень модерации",
              value: (verifLvl || "Неизвестно"),
	      inline: true
            },
            {
               name: "\u200b",
               value: "\u200b",
               inline: true
            },
            {
              name: "🙂 Эмоджи (" + message.guild.emojis.cache.size + ")",
              value: ((str + "...") || "Отсутствуют"),
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
            }
          ],
          footer: {
            text:
              "Сервер создан " +
              strftime(
                "%d.%m.%Y в %H:%M МСК",
                new Date(
                  new Date(message.guild.createdTimestamp).toLocaleString(
                    "en-US",
                    { timeZone: "Europe/Moscow" }
                  )
                )
              )
          }
        }
      };
      message.channel.send(si_info);
    }
}