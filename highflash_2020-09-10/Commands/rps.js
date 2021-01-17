module.exports = {
	name: 'rps',
	description: 'Игра в "Камень, ножницы, бумага"',
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
    var resultg = "";
    var rpserr_embed = {
      embed: {
        color: 0x9933ff,
        author: {
          name: "Камень, ножницы, бумага",
          icon_url: client.user.avatarURL()
        },
        description: "Допустимые значения - `камень` `ножницы` `бумага`",
        fields: [
          {
            name: "Пример",
            value: botconfig.prefix + "`rps ножницы`"
          }
        ]
      }
    };
    let choice = args.join(" ").toLowerCase();
    if (choice === "" || choice === " ") message.channel.send(rpserr_embed);
    const choices = [
      "камень",
      "бумага",
      "ножницы",
      choice,
      "камень",
      "бумага",
      "ножницы"
    ];
    const response = choices[Math.floor(Math.random() * choices.length)];
    if (choice === "rock" || choice === "камень") {
      if (response === "rock" || response === "камень")
        resultg = "Я выбрал камень, и ты выбрал камень.\nУ нас ничья!";
      else if (response === "paper" || response === "бумага")
        resultg = "Я выбрал бумагу, и ты выбрал камень.\nВы проиграли.";
      else resultg = "Я выбрал ножницы и ты выбрал камень.\nВы выиграли!";
    } else if (choice === "paper" || choice === "бумага") {
      if (response === "rock" || response === "камень")
        resultg = "Я выбрал камень, и ты выбрал бумагу.\nВы выиграли!";
      else if (response === "paper" || response === "бумага")
        resultg = "Я выбрал бумагу, и ты выбрал бумагу.\nУ нас ничья!";
      else resultg = "Я выбрал ножницы и ты выбрал бумагу.\nВы проиграли.";
    } else if (choice === "scissors" || choice === "ножницы") {
      if (response === "rock" || response === "камень")
        resultg = "Я выбрал камень, и ты выбрал ножницы.\nВы проиграли.";
      else if (response === "paper" || response === "бумага")
        resultg = "Я выбрал бумагу, и ты выбрал ножницы.\nВы выиграли!";
      else resultg = "Я выбрал ножницы, и ты выбрал ножницы.\nУ нас ничья!";
    } else {
      if (choice !== "" || choice !== " ") {
        if (response === "rock" || response === "камень")
          resultg =
            "Я выбрал камень, и ты выбрал " + choice + "\nВы проиграли.";
        else if (response === "paper" || response === "бумага")
          resultg =
            "Я выбрал бумагу, и ты выбрал " + choice + "\nВы проиграли.";
        else if (response === "scissors" || choice === "ножницы")
          resultg = "Я выбрал ножницы, и ты выбрал " + choice + "Вы проиграли.";
        else if (response === choice)
          resultg =
            "Я выбрал " + choice + " и ты выбрал " + choice + "\nУ нас ничья!";
      }
    }
    var rps_embed = {
      embed: {
        color: 0x9933ff,
        author: {
          name: "Камень, ножницы, бумага",
          icon_url: client.user.avatarURL()
        },
        description: resultg || "Нет результата"
      }
    };
    message.channel.send(rps_embed);
}
};
