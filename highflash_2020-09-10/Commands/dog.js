module.exports = {
	name: 'dog',
	description: 'Показывает случайные фото собаки',
	async execute(message, client, args, request, botconfig) { 
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

    const { body } = await request.get('https://dog.ceo/api/breeds/image/random');

        var dog_embed = {
          embed: {
            color: 0x3399cc,
            author: {
              name: "Случайные фото собаки",
              icon_url: client.user.avatarURL()
            },
            description: "[Источник](" + body.message + ")",
            image: {
              url: body.message
            },
          }
        };
        message.channel.send(dog_embed);
	}
}
