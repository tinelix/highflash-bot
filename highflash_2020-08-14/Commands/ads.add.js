module.exports = {
	name: 'ads.add',
	description: 'Добавить рекламу бота',
	execute(message, client) { 
    var t_log = {
      embed: {
        color: 0xffff00,
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
    if (message.author.id === "484921597015359488") {
      let args = message.content.split(" + ").slice(1);
      client.channels.cache
        .get("543748248012193792")
        .send(args.join(" "))
        .catch(console.error);
    } else {
      client.channels.cache.get("564022728143929370").send(t_log);
      var ads_err_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Команда будет доступна только, если Вы сделаете пожертвование.\n\nПодробнее: `h.donate` + ввод."
        }
      };
      message.channel.send(ads_err_embed);
    }
}}