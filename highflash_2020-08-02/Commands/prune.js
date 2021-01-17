module.exports = {
	name: 'prune',
	description: 'Очищает сообщения',
	async execute(message, client) { 
    if (message.channel.type === "dm") return;
    var t_log = {
      embed: {
        color: 0xff3333,
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
      client.channels.cache.get("564022728143929370").send(t_log);
      let args = message.content.split(" ").slice(1);
      var deletemsg_embed = {
        embed: {
          color: 0xff3333,

          author: {
            name: "Пожалуйста, подождите...",
            icon_url: client.user.avatarURL()
          },
          description: ":hourglass_flowing_sand: Удаление сообщений..."
        }
      };

      var delmsgerr_o_embed = {
        embed: {
          color: 0xff3333,

          author: {
            name: "Внимание!",
            icon_url: client.user.avatarURL()
          },
          description:
            "⚠ Пожалуйста, укажите после этой команды любое число от 2 до 100 для удаления."
        }
      };

      var delmsgerr_t_embed = {
        embed: {
          color: 0xff0000,

          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Невозможно удалить сообщения, поскольку Вы или бот не имеет прав на управление сообщениями."
        }
      };

      const deleteCount = parseInt(args[0], 10) + 2;

      // Ooooh nice, combined conditions. <3
      if (!deleteCount || deleteCount < 4 || deleteCount > 100)
        return message.channel.send(delmsgerr_o_embed);

      // So we get our messages, and delete them. Simple enough, right?
      let delmsg = await message.channel.send(deletemsg_embed);
      const fetched = message.channel.messages
        .fetch({ limit: deleteCount })
        .then(
          function(fetched) {
            message.channel.bulkDelete(fetched);
          },
          function(err) {
            message.channel.send(delmsgerr_t_embed);
          }
        );
}};