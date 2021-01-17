module.exports = {
	name: 'kick',
	description: 'Выгоняет кого-нибудь из сервера.',
	execute(message, client) { 
    if (message.channel.type === "dm") return;
      const user1 = message.mentions.users.first();
      const member = message.guild.member(user1);
      var kickerr1_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Невозможно выполнить действие, поскольку бот/Вы не имеете права администратора."
        }
      };
      var kickerr2_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Невозможно выполнить действие, поскольку в Вашем сервере нет этого участника, либо этот участник покинул Ваш сервер."
        }
      };
      var kickerr3_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Для того, чтобы кикнуть участника, напишите `h.kick <упоминание>`"
        }
      };
      var kickerr4_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description: "🚫 Произошла неизвестная ошибка. Повторите еще раз."
        }
      };
      if (user1) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          if (member) {
            var kick_log = {
              embed: {
                color: 0xff8800,
                author: {
                  name: message.author.tag,
                  icon_url: client.user.avatarURL()
                },
                description:
                  user1.tag +
                  " kicked by user " +
                  message.author.tag +
                  " on **" +
                  message.guild.name +
                  "**",
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
            var kicksucc_embed = {
              embed: {
                color: 0xff0000,
                author: {
                  name: "Модерация | " + user1.tag,
                  icon_url: client.user.avatarURL()
                },
                fields: [
                  {
                    name: "🚪 Кикнут пользователем",
                    value: message.author.tag
                  }
                ]
              }
            };
            client.channels.cache.get("564022728143929370").send(kick_log);
            member
              .kick("Optional reason that will display in the audit logs")
              .then(() => {
                message.channel.send(kicksucc_embed);
              })
              .catch(err => {
                message.channel.send(kickerr4_embed);
                console.error(err);
              });
          } else {
            message.channel.send(kickerr2_embed);
          }
        } else {
          message.channel.send(kickerr1_embed);
        }
      } else {
        message.channel.send(kickerr3_embed);
      }
    }
}