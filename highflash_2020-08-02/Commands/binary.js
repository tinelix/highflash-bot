module.exports = {
	name: 'binary',
	description: 'Преобразование текста в двоичный код',
	execute(message, client) { 

    if (message.channel.type === "dm") return;
        var colour_array = ["1211996", "3447003", "13089792", "16711858", "1088163", "16098851", "6150962"]
        var randomNumber = getRandomNumber(0, colour_array.length - 1);
        var randomColour = colour_array[randomNumber];
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                        "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я", "А", "Б", "В", "Г", "Д", "Е", "Ё", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С",
                        "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я", "?", ",", "!", ".", " ", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

        var fmt_array = message.content.slice(9);

        var binaryMessage = translateMessage(fmt_array, "binary", alphabet)
        console.log(binaryMessage)
          var binary_embed = {
        embed: {
          color: 0x00c289,

          author: {
            name: "Конвертация в двоичный код",
            icon_url: client.user.avatarURL()
          },
          description: "```" + binaryMessage + "```",
        }
      };
      message.channel.send(binary_embed)

        function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function translateMessage(fmt_array, fontList, alphabet) {
            var convertedFontMessage = "";
            var translatedLetter = "";
        
            // EXTRACTING THE APPROPRIATE CHARACTER LIST.
            var font_cmds_object = require('../JSON/font_lists.json');
            var characterList = font_cmds_object[fontList];
        
            for (var i = 0; i < fmt_array.length; i += 1) {
                var letter = fmt_array[i];
        
                if (alphabet.indexOf(letter) >= 0) {
                    translatedLetter = characterList[letter] // Need the list where the converted characters are.
                }
                else {
                    translatedLetter = letter
                }
                convertedFontMessage += translatedLetter;
            }
            console.log(`Before: ${fmt_array} After: ${convertedFontMessage}`);
            return convertedFontMessage;
        
        }
}};