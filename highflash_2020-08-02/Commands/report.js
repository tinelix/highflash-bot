module.exports = {
	name: 'report',
	description: 'Пожаловаться боту',
	execute(message, client) { 
	var reportmessage_embed = {
        embed: {
            color: 0xff0055,

            author: {
                name: "Служба безопасности Highflash",
                icon_url: client.user.avatarURL()
            },
  description: message.author.tag + " отправил жалобу: \"" + message.content.split(" ").slice(1) + "\"",
  	   fields: [
    {
           name: "Имя и ID сервера",
           value: message.guild.name + " | " + message.guild.id,
	},
    {
           name: "Имя и ID канала",
           value: message.channel.name + " | " + message.channel.id
    },
    {
        name: "ID пользователя",
        value: message.author.id
    },
    ]
}};

	var t_log = {
			embed: {
			color: 0x2255ff,
			author: {
			name: "Commands Log",
		},
    description: message.author.tag + " typing `" + message.content + "` on " + message.guild.name + "/" + message.channel.name,
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
		},
      ]
	}}
	var supportbug_embed = {
        embed: {
            color: 0xff0055,
            author: {
                name: "Служба безопасности Highflash",
                icon_url: client.user.avatarURL()
            },
			description: "❓ Автор бота ответит через некоторое время, дождитесь ответа."
		}
	};
    message.channel.send(supportbug_embed);
			client.channels.cache.get("564022728143929370").send(t_log);

let str = "<@484921597015359488>"; //Just assuming some random tag. 

//removing any sign of < @ ! >... 
//the exclamation symbol comes if the user has a nickname on the server. 
let id = str.replace(/[<@!>]/g, ''); 

client.users.fetch(id) 
    .then(user => {user.send(reportmessage_embed)})
}};
}};