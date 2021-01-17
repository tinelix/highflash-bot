module.exports = {
	name: 'ascii',
	description: 'Показывает текст в виде ASCII-графики',
	execute(message, client, strftime, botconfig, figlet) {
      var asciierr1_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            `🚫 Пожалуйста, укажите текст для форматирования в ASCII-формате. Поддерживается только для латинских букв.`,
          fields: [
            {
              name: "Пример",
              value: "`" + botconfig.prefix + "ascii Hello!`"
            }
          ]
        }
      };
      var asciierr2_embed = {
        embed: {
          color: 0xff0000,
          author: {
            name: "Ошибка",
            icon_url: client.user.avatarURL()
          },
          description:
            "🚫 Ваш текст не должен превышать 14 символов."
        }
      };
  let args = message.content.split(" ").slice(1).join(" ");
  if (!args) return message.channel.send(asciierr1_embed); 
  if(args.length > 14) return message.channel.send(asciierr2_embed) 
    figlet(args, (err, data) => {
      let ascii = "";
      if(data) {
        ascii = '```' + data + '```';
      } else {
        ascii = "<@" + message.author + ">, вывод текста в формате ASCII не поддерживается для кириллицы."
      }
      var ascii_embed = {
        embed: {
          color: 0xfffffe,
          author: {
            name: "Форматирование в ASCII",
            icon_url: client.user.avatarURL()
          },
          description:
            `${ascii}`,
        }
      };
      message.channel.send(ascii_embed)
    })
  }
} 