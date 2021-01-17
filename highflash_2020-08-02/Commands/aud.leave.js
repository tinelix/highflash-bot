module.exports = {
	name: 'aud.leave',
	description: 'Выйти из голосового канала.',
	execute(message, client, servers) { 
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
    var audpause_embed = {
      embed: {
        color: 0x7b50ff,

        author: {
          name: "Аудиоплеер",
          icon_url: client.user.avatarURL()
        },
        description:
          "⏹️ Прослушивание трека остановлено.\nДля воспроизведения трека введите `h.audio play`"
      }
    };
    var audpause2_embed = {
      embed: {
        color: 0x7b50ff,

        author: {
          name: "Аудиоплеер",
          icon_url: client.user.avatarURL()
        },
        description:
          "⏹️ Бот уже вышел с голосовых каналов."
      }
    };
    if (!message.guild.voice) return message.channel.send(audpause2_embed);
    message.channel.send(audpause_embed);
    var server = servers[message.guild.id];
    message.guild.voice.channel.leave();
	}
	};