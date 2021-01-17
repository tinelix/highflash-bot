module.exports = {
	name: 'remoji',
	description: 'Случайно-генерируемые эмоции',
	execute(message, client, args) {
	  var t_log = {
      embed: {
        color: 0x558800,
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
      let emoji = [
        ":joy:",
        ":thinking:",
        ":grin:",
        ":slight_smile:",
        ":grimacing:",
        ":wink:",
        ":slight_smile:",
        ":worried:",
        ":angry:",
        ":rage:",
        ":hushed:",
        ":scream:",
        ":cry:",
        ":sob:",
        ":zipper_mouth:",
        ":raised_hands:",
        ":thumbsup:",
        ":thumbsdown:",
        ":frowning2:",
        ":ok_hand:",
	":nerd:",
	":poop:",
	":face_vomiting:",
	":face_with_symbols_over_mouth:",
	":partying_face:",
	":clown:",
	":exploding_head:",
	":zany_face:",
	":cold_face:",
	":hot_face:",
      ];
      let rand = Math.floor(Math.random() * emoji.length);
      var emoji_embed = {
        embed: {
          color: 0x7b50ff,
          author: {
            name: "Рандомные эмоджи",
            icon_url: client.user.avatarURL()
          },
          description: emoji[rand]
        }
      };
      message.channel.send(emoji_embed);
}
};