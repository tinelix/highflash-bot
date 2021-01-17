module.exports = {
	name: 'aud.play',
	description: 'Воспроизвести трек',
	execute(message, client, YouTube, ytapi, yt, strftime, servers) { 
    if (!servers[message.guild.id])
      servers[message.guild.id] = {
        queue: []
      };
    var server = servers[message.guild.id];
    server.queue.push(
      message.content
        .split(" play ")
        .slice(1)
        .join(" ")
    );
    var t_log = {
      embed: {
        color: 0xff8800,
        author: {
          name: message.author.tag,
          icon_url: client.user.avatarURL()
        },
        description:
          message.author.tag +
          " listening to music from " +
          message.content
            .split(" play ")
            .slice(1)
            .join(" ") +
          " on **" +
          message.guild.name +
          "**",
        fields: [
          {
            name: "Server ID",
            value: message.guild.id
          },
          {
            name: "User ID",
            value: message.author.id
          }
        ]
      }
    };
    var auderr1_embed = {
      embed: {
        color: 0xff0000,

        author: {
          name: "Аудиоплеер",
          icon_url: client.user.avatarURL()
        },
        description:
          ":no_entry_sign: <@" +
          message.author +
          ">, прежде чем прослушать трек, обязательно войдите в любой голосовой канал!"
      }
    };
    var auderr2_embed = {
      embed: {
        color: 0xff0000,

        author: {
          name: "Аудиоплеер",
          icon_url: client.user.avatarURL()
        },
        description:
          ":no_entry_sign: Ошибка открытия ссылки " +
          message.content
            .split(" play ")
            .slice(1)
            .join(" ") +
          ". \nПроверьте адрес ссылки и повторите попытку позднее.\nЕсли до сих пор не удается получить доступ к ссылке, введите другой адрес."
      }
    };

    var auderr4_embed = {
      embed: {
        color: 0xff0000,

        author: {
          name: "Аудиоплеер",
          icon_url: client.user.avatarURL()
        },
        description:
          ":no_entry_sign: Видео (" +
          message.content
            .split(" play ")
            .slice(1)
            .join(" ") +
          ") не должно превышать 20 минут."
      }
    };
    var audload_embed = {
      embed: {
        color: 0x7b50ff,

        author: {
          name: "Аудиоплеер",
          icon_url: client.user.avatarURL()
        },
        description: ":hourglass_flowing_sand: Загрузка..."
      }
    };
    const streamOptions = { bitrate: 80000 };
    client.channels.cache.get("564022728143929370").send(t_log);
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.channel.send(auderr1_embed);
    }
    const valid = yt.validateURL(
      message.content
        .split(" play ")
        .slice(1)
        .join(" ")
    );
    var authorId = message.author;
    if (!valid) {
      return ytapi
        .searchVideos(
          message.content
            .split(" play ")
            .slice(1)
            .join(" "),
          4
        )
        .then(results => {
          let information = "(Нет информации)";
          let information_author = "-";
          let information_viewcount = "-";
          let information_published = "-";
          voiceChannel.join().then(connnection => {
            var server = servers[message.guild.id];
            message.channel
              .send(audload_embed)
              .then(function(message) {
                var timerId = setInterval(function() {
                  clearInterval(timerId);
                  message.delete();
				  try {
                  yt.getInfo(
                    "https://youtube.com/watch?v=" + results[0].id,
                    function(err, info) {
                      if (err) {
                        information = "(Нет информации)";
                        information_author = "-";
                        information_viewcount = "-";
                        information_published = "-";
                      } else {
                        var strftimeRU = strftime.localizeByIdentifier("ru_RU");
                        information = info.player_response.videoDetails.title;
                        information_author =
                          info.player_response.videoDetails.author;
                        if (
                          info.player_response.videoDetails.viewCount >=
                          1000000000
                        ) {
                          information_viewcount =
                            (
                              info.player_response.videoDetails.viewCount /
                              1000000000
                            ).toFixed(2) + " млрд.";
                        }
                        if (
                          info.player_response.videoDetails.viewCount >=
                            1000000 &&
                          info.player_response.videoDetails.viewCount <
                            1000000000
                        ) {
                          information_viewcount =
                            (
                              info.player_response.videoDetails.viewCount /
                              1000000
                            ).toFixed(2) + " млн.";
                        }
                        if (
                          info.player_response.videoDetails.viewCount >= 1000 &&
                          info.player_response.videoDetails.viewCount < 1000000
                        ) {
                          information_viewcount =
                            (
                              info.player_response.videoDetails.viewCount / 1000
                            ).toFixed(2) + " тысяч";
                        }
                        if (
                          info.player_response.videoDetails.viewCount < 1000
                        ) {
                          information_viewcount =
                            info.player_response.videoDetails.viewCount;
                        }
                        information_published = strftimeRU(
                          "%d.%m.%Y",
                          new Date(
                            new Date(info.published).toLocaleString("en-US", {
                              timeZone: "Europe/Moscow"
                            })
                          )
                        );
                      }
                      var audplay_embed = {
                        embed: {
                          color: 0x7b50ff,
                          author: {
                            name: "Аудиоплеер",
                            icon_url: client.user.avatarURL()
                          },
                          description:
                            "▶ <@" +
                            authorId +
                            ">: проигрывается **" +
                            results[0].title +
                            "** на " +
                            streamOptions.bitrate / 1000 +
                            " kbps",
                          fields: [
                            {
                              name: "Автор",
                              value: results[0].channel.title
                            },
                            {
                              name: "Просмотров",
                              value: information_viewcount
                            },
                            {
                              name: "Опубликовано",
                              value: information_published
                            }
                          ]
                        }
                      };
                      message.channel.send(audplay_embed);
                    }
                  );
				  } catch(err) {
					var audsrcerr_embed = {
                        embed: {
                          color: 0xff0000,
                          author: {
                            name: "Аудиоплеер",
                            icon_url: client.user.avatarURL()
                          },
                          description:
                            ":no_entry_sign: <@" +
                            authorId +
                            ">, по Вашему запросу либо ничего не найдено, либо с поиском произошла ошибка. Может, попробуете еще раз?",
                        }
                      };
					  message.channel.send(audsrcerr_embed);
				  };
                }, 10000);
              })
              .catch(function() {
                //Something
              });
            let stream = yt("https://youtube.com/watch?v=" + results[0].id, {
              format: "mp3",
              audioonly: true
            });
            server.queue.shift();
            const dispatcher = connnection.play(stream, streamOptions);
            dispatcher.on("end", () => {
              if (server.queue[0]) {
                server.dispatcher;
                return message.guild.voiceConnection.disconnect();
              }
            });
          });
        })
        .catch(console.log);
    }
    voiceChannel.join().then(connnection => {
      var server = servers[message.guild.id];
      message.channel
        .send(audload_embed)
        .then(function(message) {
          var timerId = setInterval(function() {
            clearInterval(timerId);
            message.delete();
          }, 10000);
        })
        .catch(function() {
          //Something
        });
      let stream = yt(server.queue[0], {
        format: "mp3",
        audioonly: true
      });
      server.queue.shift();
      const dispatcher = connnection.play(stream, streamOptions);
      dispatcher.on("end", () => {
        if (server.queue[0]) {
          server.dispatcher;
          return message.guild.voiceConnection.disconnect();
        }
      });
    });
    yt.getInfo(
      message.content
        .split(" ")
        .slice(1)
        .join(" "),
      function(err, info) {
        var auderr2_embed = {
          embed: {
            color: 0xff0000,

            author: {
              name: "Аудиоплеер",
              icon_url: client.user.avatarURL()
            },
            description:
              ":no_entry_sign: Ошибка открытия ссылки " +
              message.content
                .split(" play ")
                .slice(1)
                .join(" ") +
              ". \nПроверьте адрес ссылки и повторите попытку позднее.\nЕсли до сих пор не удается получить доступ к ссылке, введите другой адрес."
          }
        };
        let information = "(Нет информации)";
        let information_author = "(Нет информации)";
        let information_viewcount = "(Нет информации)";
        let information_published = "(Нет информации)";
        var timerId = setInterval(function() {
          clearInterval(timerId);
          if (err) {
            information = "(Нет информации)";
            information_author = "(Нет информации)";
            information_viewcount = "(Нет информации)";
            information_published = "(Нет информации)";
          } else {
            var strftimeRU = strftime.localizeByIdentifier("ru_RU");
            information = info.player_response.videoDetails.title;
            information_author = info.player_response.videoDetails.author;
            if (info.player_response.videoDetails.viewCount >= 1000000000) {
              information_viewcount =
                (
                  info.player_response.videoDetails.viewCount / 1000000000
                ).toFixed(2) + " млрд.";
            }
            if (
              info.player_response.videoDetails.viewCount >= 1000000 &&
              info.player_response.videoDetails.viewCount < 1000000000
            ) {
              information_viewcount =
                (info.player_response.videoDetails.viewCount / 1000000).toFixed(
                  2
                ) + " млн.";
            }
            if (
              info.player_response.videoDetails.viewCount >= 1000 &&
              info.player_response.videoDetails.viewCount < 1000000
            ) {
              information_viewcount =
                (info.player_response.videoDetails.viewCount / 1000).toFixed(
                  2
                ) + " тысяч";
            }
            if (info.player_response.videoDetails.viewCount < 1000) {
              information_viewcount =
                info.player_response.videoDetails.viewCount;
            }
            information_published = strftimeRU(
              "%d.%m.%Y",
              new Date(
                new Date(info.published).toLocaleString("en-US", {
                  timeZone: "Europe/Moscow"
                })
              )
            );
          }
          var audplay_embed = {
            embed: {
              color: 0x7b50ff,

              author: {
                name: "Аудиоплеер",
                icon_url: client.user.avatarURL()
              },
              description:
                "▶ <@" +
                message.author +
                ">: проигрывается **" +
                information +
                "** на " +
                streamOptions.bitrate / 1000 +
                " kbps",
              fields: [
                {
                  name: "Автор",
                  value: information_author
                },
                {
                  name: "Просмотров",
                  value: information_viewcount
                },
                {
                  name: "Опубликовано",
                  value: information_published
                }
              ]
            }
          };
          message.channel.send(audplay_embed);
        }, 11000);
      }
    );
    if (!voiceChannel) {
      return message.channel.send(auderr1_embed);
    }

    var urlyt = {
      url: message.content
        .split(" play ")
        .slice(1)
        .join(" ")
    };

    fs.writeFile("json/data.json", JSON.stringify(urlyt), function(err) {
      if (err) {
        return console.log(err);
      }
    });
	}
	};