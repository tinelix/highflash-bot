module.exports = {
	name: '8ball',
	description: 'Игра "Шар судьбы"',
	execute(message, client) { 
    var t_log = {
      embed: {
        color: 0x2200ff,
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
      let answers = [
        "Да.",
        "Нет.",
        "Естественно.",
        "Безусловно.",
        "Возможно.",
        "Конечно.",
	    "Хз.",
		"Абсолютно.",
        "Не могу ответить на этот вопрос",
        "Похоже, Вы задаете слишком много вопросов. Пожалуйста, повторите попытку позже.",
        "Cомневаюсь.",
        "Это маловероятно.",
        "Не знаю, как вы, но я скажу, что нет.",
      ]; //массив ответов
      let rand = Math.floor(Math.random() * answers.length);
      var eightball_embed = {
        embed: {
          color: 0xaa88ff,
          author: {
            name: "Шар судьбы",
            icon_url: client.user.avatarURL()
          },
          fields: [
            {
              name: "💬 Ответ",
              value: answers[rand]
            }
          ]
        }
      };
      message.channel.send(eightball_embed);
}}