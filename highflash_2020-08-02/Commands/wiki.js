module.exports = {
	name: 'wiki',
	description: 'Поиск в Википедии',
	async execute(message, client, args, request) { 
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
	try {
    const query = args.join(' ');
    const { body } = await request.get('https://ru.wikipedia.org/w/api.php').query({
        action: 'query',
        prop: 'extracts',
        format: 'json',
        titles: query,
        exintro: '',
        explaintext: '',
        redirects: '',
        formatversion: 2
      });
	var wiki_err_embed = {
      embed: {
        color: 0xff0000, // цвет полоски слева в формате 0xRRGGBB, в данном случае указан оранжевый цвет
        author: {
          name: "Википедия", // заголовок встраиваемого (Embed) сообщения
          icon_url: client.user.avatarURL()
        },
        description: 'По Вашему запросу ничего не найдено.\n\nПопробуйте другой запрос.' // описание встраиваемого сообщения
      }
    };
    if (body.query.pages[0].missing) return message.channel.send(wiki_err_embed);
	  var wiki_embed = {
      embed: {
        color: 0xfffffe, // цвет полоски слева в формате 0xRRGGBB, в данном случае указан оранжевый цвет
        author: {
          name: "Википедия | " + body.query.pages[0].title, // заголовок встраиваемого (Embed) сообщения
          icon_url: client.user.avatarURL()
        },
        description: body.query.pages[0].extract.substr(0, 1980).replace(/[\n]/g, '\n\n') + ` [Подробнее](http://ru.wikipedia.org/wiki/${body.query.pages[0].title.replace(/ /g, "_")})` // описание встраиваемого сообщения
      }
    };
	console.log(body.query);
	message.channel.send(wiki_embed);
	} catch (err) {
	var wiki_err_embed = {
      embed: {
        color: 0xff0000, // цвет полоски слева в формате 0xRRGGBB, в данном случае указан оранжевый цвет
        author: {
          name: "Википедия", // заголовок встраиваемого (Embed) сообщения
          icon_url: client.user.avatarURL()
        },
        description: 'Не удается найти результаты.' // описание встраиваемого сообщения
      }
    };
    if (err.status === 404) return message.channel.send(wiki_err_embed);
    console.log(err);
    return message.channel.send(`При выполнении команды возникла ошибка: \`${err.message}\`. Повторите попытку позже.`);
}
    client.channels.cache.get("564022728143929370").send(t_log);
	}
};