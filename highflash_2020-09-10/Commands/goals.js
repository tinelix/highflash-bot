module.exports = {
	name: 'goals',
	description: 'Показывает цели сервера.',
	execute(message, client, ProgressBar, botconfig) { 
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
      var maxValue;
      var goalcompleted;
      var goalword;
      var goalcompletetedIcon;
      var goaluncompletetedIcon;
      var goalIcon;
      var goalIcon2;
      if (message.guild.memberCount <= 10) {
        maxValue = 10;
        goalcompleted = 0;
        goalword = " целей";
        goalcompletetedIcon = "**:arrow_right: 10 участников**\n";
        goaluncompletetedIcon =
          ":negative_squared_cross_mark: 50 участников\n:negative_squared_cross_mark: 100 участников\n:negative_squared_cross_mark: 200 участников\n:negative_squared_cross_mark: 500 участников\n:negative_squared_cross_mark: 1000 участников\n:negative_squared_cross_mark: 10000 участников";
        goalIcon = goaluncompletetedIcon;
      }
      if (message.guild.memberCount <= 50 && message.guild.memberCount > 10) {
        maxValue = 50;
        goalcompleted = 1;
        goalword = " цель";
        goalcompletetedIcon =
          ":white_check_mark: 10 участников\n**:arrow_right: 50 участников**\n";
        goaluncompletetedIcon =
          ":negative_squared_cross_mark: 100 участников\n:negative_squared_cross_mark: 200 участников\n:negative_squared_cross_mark: 500 участников\n:negative_squared_cross_mark: 1000 участников\n:negative_squared_cross_mark: 10000 участников";
        goalIcon = goalcompletetedIcon;
      }
      if (message.guild.memberCount <= 100 && message.guild.memberCount > 50) {
        maxValue = 100;
        goalcompleted = 2;
        goalword = " цели";
        goalcompletetedIcon =
          ":white_check_mark: 10 участников\n:white_check_mark: 50 участников\n**:arrow_right: 100 участников**";
        goaluncompletetedIcon =
          "\n:negative_squared_cross_mark: 200 участников\n:negative_squared_cross_mark: 500 участников\n:negative_squared_cross_mark: 1000 участников\n:negative_squared_cross_mark: 10000 участников";
        goalIcon = goalcompletetedIcon;
      }
      if (message.guild.memberCount <= 200 && message.guild.memberCount > 100) {
        maxValue = 200;
        goalcompleted = 3;
        goalword = " цели";
        goalcompletetedIcon =
          ":white_check_mark: 10 участников\n:white_check_mark: 50 участников\n:white_check_mark: 100 участников\n**:arrow_right: 200 участников**";
        goaluncompletetedIcon =
          "\n:negative_squared_cross_mark: 500 участников\n:negative_squared_cross_mark: 1000 участников\n:negative_squared_cross_mark: 10000 участников";
        goalIcon = goalcompletetedIcon;
      }
      if (message.guild.memberCount <= 500 && message.guild.memberCount > 200) {
        maxValue = 500;
        goalcompleted = 4;
        goalword = " цели";
        goalcompletetedIcon =
          ":white_check_mark: 10 участников\n:white_check_mark: 50 участников\n:white_check_mark: 100 участников\n:white_check_mark 200 участников\n**:arrow_right: 500 участников**";
        goaluncompletetedIcon =
          "\n:negative_squared_cross_mark: 1000 участников\n:negative_squared_cross_mark: 10000 участников";
        goalIcon = goalcompletetedIcon;
      }
      if (
        message.guild.memberCount <= 1000 &&
        message.guild.memberCount > 500
      ) {
        maxValue = 1000;
        goalcompleted = 5;
        goalword = " целей";
        goalcompletetedIcon =
          ":white_check_mark: 10 участников\n:white_check_mark: 50 участников\n:white_check_mark: 100 участников\n:white_check_mark 200 участников\n:white_check_mark 500 участников\n**:arrow_right: 1000 участников**";
        goaluncompletetedIcon =
          "\n:negative_squared_cross_mark: 10000 участников";
        goalIcon = goalcompletetedIcon;
      }
      if (
        message.guild.memberCount <= 10000 &&
        message.guild.memberCount > 1000
      ) {
        maxValue = 10000;
        goalcompleted = 6;
        goalword = " целей";
        goalcompletetedIcon =
          ":white_check_mark: 10 участников\n:white_check_mark: 50 участников\n:white_check_mark: 100 участников\n:white_check_mark 200 участников\n:negative_squared_cross_mark: 500 участников\n:negative_squared_cross_mark: 1000 участников\n**:arrow_right: 10000 участников**";
        goaluncompletetedIcon =
          "";
        goalIcon = goalcompletetedIcon;
      }
      var bar = new ProgressBar(
        "```Процесс: \n:bar│ :percent (:current из :total)```",
        {
          incomplete: " ",
          complete: "█",
          total: maxValue,
          curr: message.guild.memberCount - 1,
          width: 20
        }
      );
      bar.tick(1);
      var bar2 = new ProgressBar(
        "```Интенсивность: \n:bar│ :percent (:current из :total)```",
        {
          incomplete: " ",
          complete: "█",
          total: message.guild.memberCount,
          curr: message.guild.presences.cache.size,
          width: 20
        }
      );
      bar2.tick(1);
      var goal_embed = {
        embed: {
          color: 0x7b50ff,
          author: {
            name: "Цели сервера",
            icon_url: message.author.avatarURL()
          },
          description:
            bar.lastDraw +
            bar2.lastDraw +
            "\n**Текущая цель:** набрать " +
            maxValue +
            " участников (пройдено " +
            goalcompleted +
            goalword +
            " из " +
            "6" +
            ").",
          fields: [
            {
              name: "Цели",
              value: goalcompletetedIcon + goaluncompletetedIcon + "\n\nУчастников на сервере: " + message.guild.memberCount
            }
          ]
        }
      };
      message.channel.send(goal_embed);

	}
}
