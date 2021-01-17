module.exports = {
	name: 'ban',
	description: 'Забанить кого-либо',
	execute(message, client, botconfig) { 
    if (message.channel.type === "dm") return;
      var banerr1_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Для того, чтобы забанить участника, напишите `" + botconfig.prefix + "ban <упоминание> <причина>`"
        }
      };
      const user1 = message.mentions.users.first();
        if(!user1) return message.channel.send(banerr1_embed);
      const member = message.guild.member(user1);
      let args = message.content
        .split(" " + member + " ")
        .slice(1)
        .join(" ");
      console.log(args);
      var banerr3_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Невозможно выполнить действия, поскольку бот/Вы не имеете права администратора."
        }
      };
      var banerr2_embed = {
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
      var banerr4_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description: "🚫 Произошла неизвестная ошибка. Повторите еще раз."
        }
      };
      var bansucc_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Модерация | " + user1.tag,
            icon_url: client.user.avatarURL()
          },
          fields: [
            {
              name: "Забанен пользователем",
              value: message.author.tag
            },
            {
              name: "Причина",
              value: (args || "Не указано")
            }
          ]
        }
      };
      if (user1) {
        if (message.member.hasPermission("ADMINISTRATOR")) {
          if (member) {
            member
              .ban({
                reason: message.author.tag + ": " + (args || "Не указана причина")
              })
              .then(() => {
                message.channel.send(bansucc_embed);
                var ban_log = {
                  embed: {
                    color: 0xff8800,
                    author: {
                      name: message.author.tag,
                      icon_url: client.user.avatarURL()
                    },
                    description:
                      user1.tag + " banned by user " + message.author.tag,
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

                client.channels.cache.get(botconfig.logs_channel).send(ban_log);
              })
              .catch(err => {
                message.channel.send(banerr4_embed);
                console.error(err);
              });
          } else {
            message.channel.send(banerr4_embed);
          }
        } else {
          message.channel.send(banerr3_embed);
        }
      } else {
        message.channel.send(banerr1_embed);
      }
}
};
