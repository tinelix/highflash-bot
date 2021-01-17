module.exports = {
	name: 'avatar',
	description: 'Показывает ваш аватар.',
	execute(message, client, botconfig) { 
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

      client.channels.cache.get(botconfig.logs_channel).send(t_log);
      var myavatar_embed = {
        embed: {
          color: 0xff3333,

          author: {
            name: "Аватар пользователя " + message.author.tag,
            icon_url: client.user.avatarURL()
          },
          image: {
            url: message.author.avatarURL()
          }
        }
      };
      message.channel.send(myavatar_embed);	
}};
