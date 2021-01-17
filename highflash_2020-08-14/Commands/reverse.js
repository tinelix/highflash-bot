module.exports = {
	name: 'reverse',
	description: 'Перевод текста в обратном порядке',
	async execute(message, client) { 
    if (message.channel.type === "dm") return;
        var msg_array = message.content.split(" ").slice(11);

        var msg_string = message.content.split("").slice(11);
        var reverse_string = "";
        var word;
        var split_word;
        for (var i = msg_string.length - 1; i >= 0; i -= 1) {

            reverse_string += msg_string[i];
        }
          var reverse_embed = {
        embed: {
          color: 0x00c289,

          author: {
            name: "Реверс",
            icon_url: client.user.avatarURL()
          },
          description: (reverse_string || "<@" + message.author.id + ">, пожалуйста, введите любой текст для вывода в обратном порядке."),
        }
      };
        message.channel.send(reverse_embed);


        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
}};