module.exports = {
	name: 'user',
	description: 'Показывает информацию о текущем пользователе',
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
      let args = message.content.split(" ").slice(1);
      let search_un = client.users.cache.find(user => user.username == args);
      let member = message.guild.member(
        search_un ||
          message.mentions.users.first() ||
          message.guild.members.cache.get(args[0])
      );
      let argsUser = message.guild.member.user || message.author;
      if (message.guild.member(args[0])) {
        argsUser = message.guild.member(args[0]).user;
      } else {
        if (member) {
          argsUser = member.user;
        } else {
          argsUser = message.author;
        }
      }
      let statuses = {
        online: "Онлайн",
        idle: "Не активен",
        dnd: "Не беспокоить",
        offline: "Оффлайн"
      };
	    let custemoji = "";
	    let custstat = "";
	try {
		custemoji = "" + argsUser.presence.activities[0].emoji.name + " ";
	} catch(err) {
		custemoji = "";
	}
	try { 
		custstat = "(**" + argsUser.presence.activities[0].state + "**)";
	} catch(err) {
		custstat = "";
	}
      let game;
try {
      if (!argsUser.presence.activities[0].type) {
        game = `${statuses[argsUser.presence.status]}`}
      else if (argsUser.presence.activities[0].type == 'PLAYING')
        game = `Играет в **${argsUser.presence.activities[0].name}**`
      else if (argsUser.presence.activities[0].type == 'STREAMING')
        game = `Ведет стрим **${argsUser.presence.activities[0].name}**\n${argsUser.presence.activities[0].url}`
      else if (argsUser.presence.activities[0].type == 'LISTENING')
        game = `Слушает в Spotify **${argsUser.presence.activities[0].state} - ${argsUser.presence.activities[1].details}**`
      else if (argsUser.presence.activities[0].type == 'WATCHING')
        game = `Смотрит **${argsUser.presence.activities[0].name}**`
      else if (argsUser.presence.activities[0].type == 'CUSTOM_STATUS' && argsUser.presence.activities.length < 2)
        game = `Пользовательский ${custstat}`
      else if (argsUser.presence.activities[0].type == 'CUSTOM_STATUS' && argsUser.presence.activities[1].type == 'PLAYING')
        game = custemoji + `Играет **${argsUser.presence.activities[1].name}**`
      else if (argsUser.presence.activities[0].type == 'CUSTOM_STATUS' && argsUser.presence.activities[1].type == 'STREAMING')
        game = custemoji + `Ведет стрим **${argsUser.presence.activities[1].name}**`
      else if (argsUser.presence.activities[0].type == 'CUSTOM_STATUS' && argsUser.presence.activities[1].type == 'LISTENING')
        game = custemoji + `Слушает в Spotify **${argsUser.presence.activities[1].state} - ${argsUser.presence.activities[1].details}**`
      else if (argsUser.presence.activities[0].type == 'CUSTOM_STATUS' && argsUser.presence.activities[1].type == 'WATCHING')
        game = custemoji + `Смотрит **${argsUser.presence.activities[1].name}**`;
      } catch(ex) { game = `${statuses[argsUser.presence.status]}` }
      if (argsUser.nickname) {
        var nickname = argsUser.nickname;
      } else {
        var nickname = "Отсутствует";
      }
      let day = 1000 * 60 * 60 * 24;
      let month = 30;
      let date1 = new Date(
        new Date().toLocaleString("en-US", { timeZone: "Europe/Moscow" })
      );
      let date2 = new Date(
        new Date(argsUser.createdTimestamp).toLocaleString("en-US", {
          timeZone: "Europe/Moscow"
        })
      );
      let date3 = new Date(
        new Date(message.guild.member(argsUser).joinedTimestamp).toLocaleString(
          "en-US",
          { timeZone: "Europe/Moscow" }
        )
      );
      if (
        Math.round(Math.abs((date1.getTime() - date3.getTime()) / day)) > 30 &&
        Math.round(Math.abs((date1.getTime() - date2.getTime()) / day)) > 30
      ) {
        let diff1 = ((date1.getTime() - date2.getTime()) / day / month).toFixed(
          1
        );
        let diff2 = ((date1.getTime() - date3.getTime()) / day / month).toFixed(
          1
        );
        var ui_info = {
          embed: {
            color: 0x7b50ff,
            author: {
              name: argsUser.bot
                ? '[Bot] О пользователе "' + argsUser.tag + '"'
                : 'О пользователе "' + argsUser.tag + '" ',
              icon_url: client.user.avatarURL()
            },
            thumbnail: {
              url: argsUser.avatarURL()
            },
            fields: [
              {
                name: "О себе",
                value:
                  "**ID:** " +
                  argsUser.id +
                  "\n**Статус:** " +
                  game +
                  "\n**Дата регистрации:** " +
                  strftime(
                    "%d.%m.%Y в %H:%M МСК",
                    new Date(
                      new Date(argsUser.createdTimestamp).toLocaleString(
                        "en-US",
                        { timeZone: "Europe/Moscow" }
                      )
                    )
                  ) +
                  " (~" +
                  diff1 +
                  " мес. назад)"
              },
              {
                name: "🔑 Дата входа в сервер",
                value:
                  strftime(
                    "%d.%m.%Y в %H:%M МСК",
                    new Date(new Date(message.guild.member(argsUser).joinedTimestamp).toLocaleString(
                        "en-US",
                        { timeZone: "Europe/Moscow" }
                      )
                  )) +
                  " (~" +
                  diff2 + " мес. назад)" },
              {
                name:
                  "🗒 Роли (" +
                  (message.guild.member(argsUser).roles.cache.size - 1) +
                  ")",
                value:
                  message.guild
                    .member(argsUser)
                    .roles.cache.filter(r => r.id != message.guild.id)
                    .map(role => role.name)
                    .join(", ") || "Отсутствуют"
              }
            ]
          }
        };
        message.channel.send(ui_info);
      } else {
        let diff1 = Math.abs((date1.getTime() - date2.getTime()) / day).toFixed(
          1
        );
        let diff2 = Math.abs((date1.getTime() - date3.getTime()) / day).toFixed(
          1
        );

        client.channels.cache.get("564022728143929370").send(t_log);
        var ui_info = {
          embed: {
            color: 0x7b50ff,
            author: {
              name: argsUser.bot
                ? '[Bot] О пользователе "' + argsUser.tag + '"'
                : 'О пользователе "' + argsUser.tag + '" ',
              icon_url: client.user.avatarURL()
            },
            thumbnail: {
              url: argsUser.avatarURL()
            },
            fields: [
              {
                name: "О себе",
                value:
                  "**ID:** " +
                  argsUser.id +
                  "\n**Статус:** " +
                  game +
                  "\n**Дата регистрации:** " +
                  strftime(
                    "%d.%m.%Y в %H:%M МСК",
                    new Date(new Date(argsUser.createdTimestamp).toLocaleString(
                        "en-US",
                        { timeZone: "Europe/Moscow" }
                      )
                  )) +
                  " (" +
                  diff1 +
                  " дн. назад)"
              },
              {
                name: "🔑 Дата входа в сервер",
                value:
                  strftime(
                    "%d.%m.%Y в %H:%M МСК",
                    new Date(new Date(message.guild.member(argsUser).joinedTimestamp).toLocaleString(
                        "en-US",
                        { timeZone: "Europe/Moscow" }
                      )
                  )) +
                  " (" +
                  diff2 +
                  " дн. назад)",
              },
              {
                name:
                  "🗒 Роли (" +
                  (message.guild.member(argsUser).roles.cache.size - 1) +
                  ")",
                value:
                  message.guild
                    .member(argsUser)
                    .roles.cache.filter(r => r.id != message.guild.id)
                    .map(role => role.name)
                    .join(", ") || "Отсутствуют"
              }
            ]
          }
        };
        message.channel.send(ui_info);
      }
}}