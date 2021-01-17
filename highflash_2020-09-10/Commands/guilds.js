module.exports = {
	name: 'guilds',
	description: 'Список входящих серверов',
	execute(message, client, args, intformat, botconfig) {
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

    if(message.content.slice(10) === "hide") {
      var hidesrvreq_embed = {
      embed: {
        color: 0x7b50ff,
        author: {
          name:
            "Запрос на скрытие Вашего сервера",
          icon_url: message.author.avatarURL()
        },
        description: "Пожалуйста, подождите, пока обновят код бота...\n\nВозможно, все зависит от свободного времени автора бота."
      }
    };
   message.channel.send(hidesrvreq_embed);
       var reportmsg_embed = {
      embed: {
        color: 0x008be9,

        author: {
          name: "Служба безопасности " + botconfig.name,
          icon_url: client.user.avatarURL()
        },
        description:
          message.author.tag +
          ' отправил запрос на скрытие сервера из публичного списка',
        fields: [
          {
            name: "Имя и ID сервера",
            value: message.guild.name + " | " + message.guild.id
          },
          {
            name: "Имя и ID канала",
            value: message.channel.name + " | " + message.channel.id
          },
          {
            name: "ID пользователя",
            value: message.author.id
          }
        ]
      }
    };
      
      let str = "<@484921597015359488>"; 

      let id = str.replace(/[<@!>]/g, "");

      client.users.fetch(id).then(user => {
        user.send(reportmsg_embed);
      });
   } else {
    var str = "";
    var membc = "0";
    var onlinecount = "0";
    var ar = client.guilds.cache.array();
    for (let i = 0; i < ar.length; i++) {
      if (ar[i].memberCount > 100) membc = ar[i].memberCount;
      if (ar[i].memberCount < 100 && ar[i].memberCount > 10)
        membc = " " + ar[i].memberCount;
      if (ar[i].memberCount < 10) membc = "  " + ar[i].memberCount;
      if (ar[i].presences.cache.size > 100)
        onlinecount = ar[i].presences.cache.size;
      if (ar[i].presences.cache.size < 100 && ar[i].presences.size > 10)
        onlinecount = " " + ar[i].presences.cache.size;
      if (ar[i].presences.cache.size < 10)
        onlinecount = "  " + ar[i].presences.cache.size;
      var name = "";
      if(ar[i].id == "566913404468723744" || ar[i].id == "713291763644760094"
         || ar[i].id == "436098246696501250" || ar[i].id == "704698294403596470" || ar[i].id == "731361519085944882" || ar[i] == "716943234982740018") 
      {name = "[Скрытый сервер]"} else {name = ar[i].name}
      str +=
        i +
        1 +
        ". " +
        name +
        "\n    Участников: " +
        intformat.sprf("%3d", ar[i].memberCount) +
        " | Онлайн: " +
        intformat.sprf("%3d", ar[i].presences.cache.size) +
        " | Регион: " +
        ar[i].region[0].toUpperCase() +
        ar[i].region.slice(1) +
        "\r\n";
    }
    var srvlist_embed = {
      embed: {
        color: 0x7b50ff,
        author: {
          name:
            "Список входящих серверов (всего " + client.guilds.cache.size + ")",
          icon_url: message.author.avatarURL()
        },
        description: "```" + str + "```Не хотите, что Ваш сервер отображался в публичном списке серверов бота " + botconfig.name + "? Отправьте запрос нам командой `" + botconfig.prefix + "guilds hide` (для этого требуется время)",
      }
    };
    message.channel.send(srvlist_embed);
   }
}
}
