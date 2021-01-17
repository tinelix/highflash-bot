module.exports = {
	name: 'donate',
	description: 'Поддержка создателя бота',
	execute(message, client, args, botconfig) { 
	var t_log = {
      embed: {
        color: 0x00aa00,
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
      var donate_embed = {
        embed: {
          color: 0x44aa44,
          author: {
            name: "Пожертвование",
            icon_url: client.user.avatarURL()
          },
          description:
            "💵 https://donationalerts.com/r/dmitryevpc"
        }
      };
      message.channel.send(donate_embed);
    }
}
	
