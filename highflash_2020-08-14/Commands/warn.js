module.exports = {
	name: 'warn',
	description: 'Выдать человеку предупреждение',
	execute(message, client, fs) { 
    try {
      let profile = require("./JSON/profile.json");
      var warnerr1_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Для того, чтобы выдать участнику предупреждение, напишите `h.warn <упоминание> <канал для отправки варнов> <причина>`"
        }
      };
      var warnerr2_embed = {
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
      var warnerr3_embed = {
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
      var warnerr4_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description: "🚫 Произошла неизвестная ошибка. Повторите еще раз."
        }
      };
      let member1 =
        message.guild.member(message.mentions.users.first()) ||
        message.guild.members.cache.get(args[0]);
      let gchannel = message.mentions.channels.first();
      let gchannel1 = message.guild.channels.find(t => t.id == gchannel.id);
      let args = message.content
        .split(" " + member1 + " " + gchannel1 + " ")
        .slice(1)
        .join(" ");
      const memberActions = message.guild.member(member1);
      if (message.member.hasPermission("ADMINISTRATOR")) {
        if (args) {
          if (member1) {
            if (gchannel1) {
              if (!profile[member1.id]) {
                profile[member1.id] = {
                  warns: 0
                };
              }
              fs.writeFile(
                "./JSON/profile.json",
                JSON.stringify(profile),
                err => {
                  if (err) console.log(err);
                }
              );

              profile[member1.id].warns++;
              fs.writeFile(
                "./JSON/profile.json",
                JSON.stringify(profile),
                err => {
                  if (err) console.log(err);
                }
              );
              var bansucc_embed = {
                embed: {
                  color: 0xff0000,
                  author: {
                    name: "Модерация | " + memberActions.user.tag,
                    icon_url: client.user.avatarURL()
                  },
                  fields: [
                    {
                      name: "Забанен пользователем",
                      value: client.user.tag
                    },
                    {
                      name: "Причина",
                      value:
                        "Предупреждений: " + profile[member1.id].warns + " из 3"
                    }
                  ]
                }
              };
              var warnsucc_embed = {
                embed: {
                  color: 0xff0000,
                  author: {
                    name: "Модерация | " + memberActions.user.tag,
                    icon_url: client.user.avatarURL()
                  },
                  fields: [
                    {
                      name: "Выдано предупреждение от",
                      value: message.author.tag
                    },
                    {
                      name: "Причина",
                      value: args
                    },
                    {
                      name: "Кол-во предупреждений",
                      value: profile[member1.id].warns + " из 3"
                    }
                  ]
                }
              };
              if (profile[member1.id].warns >= 3) {
                memberActions
                  .ban({
                    reason:
                      client.user.tag +
                      ": выдано предупреждений " +
                      profile[member1.id].warns +
                      " из 3"
                  })
                  .then(() => {
                    gchannel1.send(bansucc_embed);
                  });
              } else {
                gchannel1.send(warnsucc_embed);
              }
              var t_log = {
                embed: {
                  color: 0xff8800,
                  author: {
                    name: "Commands Log"
                  },
                  description:
                    "Member " +
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
            } else {
              message.channel.send(warnerr1_embed);
            }
          } else {
            message.channel.send(warnerr2_embed);
          }
        } else {
          message.channel.send(warnerr1_embed);
        }
      } else {
        message.channel.send(warnerr3_embed);
      }
    } catch (e) {
      if (e.name === "ReferenceError") {
        console.error(e);
      }
    }
	}}