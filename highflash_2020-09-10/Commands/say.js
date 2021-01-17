module.exports = {
	name: 'say',
	description: 'Написать сообщение от имени бота (с автором)',
	execute(message, client, strftime, botconfig) { 
    var t_log = {
      embed: {
        color: 0x008800,
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
    let args = message.content.split(" ").slice(1);
    const sayMessage = args.join(" ");
	var sayerr_msg = {
      embed: {
        color: 0xff0000,
        author: {
          name: "Ошибка",
	  icon_url: client.user.avatarURL()
        },
        description:
         "<@" + message.author.id + ">, пожалуйста, введите после команды `" + botconfig.prefix +"say` любое слово или фразу.\n\n**Но будьте осторожны**, каждый раз, когда Вы напишете эту команду, будет высвечиваться тег автора.",
        fields: [
          {
            name: "Пример",
            value: "`" + botconfig.prefix + "say Привет!`"
          },
        ]
      }
    };
    if(sayMessage === '' || sayMessage === ' ' || sayMessage === '  ' || sayMessage === '   ') return message.channel.send(sayerr_msg);
    message
      .delete()
      .catch(
        console.log(
          "\n\nError! I can not manage messages.\n\nReason\n" +
            message.author.tag +
            ": " +
            message.content
        )
      );
    // And we get the bot to say the thing:
     var say_embed = {
        embed: {
          color: 0xffefff,
	  description: sayMessage,
	  footer: {
            text: "Написал " + message.author.tag
          }	
        }
      };
    // And we get the bot to say the thing:
    message.channel.send(say_embed);
}}
