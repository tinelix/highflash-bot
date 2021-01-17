module.exports = {
	name: 'cat',
	description: 'Показывает случайные фото котов',
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

    const { body } = await request.get('https://nekos.life/api/v2/img/meow');

        var cat_embed = {
          embed: {
            color: 0x3399cc,
            author: {
              name: "Случайные фото кота",
              icon_url: client.user.avatarURL()
            },
            description: "[Источник](" + body.url + ")",
            image: {
              url: body.url
            },
          }
        };
        message.channel.send(cat_embed);
	}
}
