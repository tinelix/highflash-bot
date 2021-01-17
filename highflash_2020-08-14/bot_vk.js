const vk = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const Session = require('node-vk-bot-api/lib/session');
const Stage = require('node-vk-bot-api/lib/stage');
const Scene = require('node-vk-bot-api/lib/scene');
const session = new Session();
const session2 = new Session();

const os = require("os");
const { promptMessage } = require("./functions.js");
const randomPuppy = require("random-puppy");
const botconfig = require('./json/botconfig.json');
const math = require('mathjs');
const bot = new vk(botconfig.token);



bot.command('Старт', (ctx) => {
try {
  ctx.reply('Приветствую, бот Highflash теперь и во ВКонтакте! На данный момент он немного сырой, поэтому мы постараемся хотя бы портировать часть кода с Discord.js.\n\nДля выполнения команды нажмите на одну из клавиш или напишите имя команды.', null, Markup
    .keyboard([
      [
        Markup.button('Состояние бота', 'primary'),
        Markup.button('Мемы в Reddit'),
	  ],
	  [
	    Markup.button('Мир фоток в Reddit'),
	    Markup.button('Игра "Шар судьбы"'),
	  ],
	  [
	    Markup.button('Калькулятор'),
		Markup.button('Реверс'),
	  ],
    ]).inline()
	);
} catch(ex) {  console.error(ex);}
});

bot.command('Состояние бота', (ctx) => {
try { 
    const plaform = os.platform();
    if (os.platform() === "win32") {
      platform = "Windows (" + os.release() + ")";
    } else {
      if (os.platform() === "android") {
        platform =
          "Android с Termux (" +
          os.release() +
          ")";
      } else {
        if (os.platform() === "linux") {
          platform = "Linux (" + os.release() + ")";
        }
      }
    }
  ctx.reply(`💻 Сведения о хосте, на котором запущен бот\n\nИспользуемая память: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} МБ (${Math.round(process.memoryUsage().heapUsed / 1024)} кБ)\nПрограммная платформа: ${platform}\nПроцессор: ${os.cpus()[0].model}\n\nБот Highflash использует Node.js версии ${process.version} и компонент node-vk-bot-api`);
} catch(ex) {  console.error(ex);}
});

bot.command('[club197493648|@highflash] Состояние бота', (ctx) => {
try {
    const plaform = os.platform();
    if (os.platform() === "win32") {
      platform = "Windows (" + os.release() + ")";
    } else {
      if (os.platform() === "android") {
        platform =
          "Android с Termux (" +
          os.release() +
          ")";
      } else {
        if (os.platform() === "linux") {
          platform = "Linux (" + os.release() + ")";
        }
      }
    }
  ctx.reply(`💻 Сведения о хосте, на котором запущен бот\n\nИспользуемая память: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} МБ (${Math.round(process.memoryUsage().heapUsed / 1024)} кБ)\nПрограммная платформа: ${platform}\nПроцессор: ${os.cpus()[0].model}\n\nБот XStep использует Node.js версии ${process.version} и компонент node-vk-bot-api`);
} catch(ex) {  console.error(ex);}
});

bot.command('Мемы в Reddit', (ctx) => {
try {
	const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
		ctx.reply(`Ссылка на изображение: ` + url + `\n\nИсточник: r/${random}`);
      });
    };
    imgaddr();
} catch(ex) {  console.error(ex);}
});

bot.command('[club197493648|@highflash] Мемы в Reddit', (ctx) => {
try {
	const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
		ctx.reply(`Ссылка на изображение: ` + url + `\n\nИсточник: r/${random}`);
      });
    };
    imgaddr();
	} catch(ex) {  console.error(ex);}
});

bot.command('Мир фоток в Reddit', async (ctx) => { //код команды "Мир фоток в Reddit"
    const subReddits = ["pic", "analog"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
	    const vkccjson = {};
		const vkccreq = bot.execute(`utils.getShortLink`, {url: url, private: 1}).then(response => {
			JSON.parse
		});
			ctx.reply(`Ссылка на изображение: ` + url + `\n\nИсточник: r/${random}`);
      });
    };
    imgaddr();
});

bot.command('[club197493648|@highflash] Мир фоток в Reddit', async (ctx) => { //код команды "Мир фоток в Reddit"
    const subReddits = ["pic", "analog"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
	    const vkccjson = {};
		const vkccreq = bot.execute(`utils.getShortLink`, {url: url, private: 1}).then(response => {
			JSON.parse
		});
			ctx.reply(`Ссылка на изображение: ` + url + `\n\nИсточник: r/${random}`);
      });
    };
    imgaddr();
});

const scene = new Scene('8ball',
  (ctx) => {
    ctx.scene.next();
    ctx.reply('Для начала напишите любой вопрос, затем Вы получите случайный ответ.');
  },
  (ctx) => {
    ctx.session.content = ctx.message.text;
      let answers = [
        "Да.",
        "Нет.",
        "Естественно.",
        "Безусловно.",
        "Согласен.",
        "Возможно.",
        "Конечно.",
		"Я не знаю.",
        "Отрицаю.",
		"Конечно, нет.",
        "Не могу ответить на этот вопрос",
        "Похоже, Вы задаете слишком много вопросов. Пожалуйста, повторите попытку позже.",
        "Cомневаюсь.",
        "Это маловероятно.",
        "Не знаю как вы, но считаю, что нет.",
      ]; //массив ответов
      let rand = Math.floor(Math.random() * answers.length);
    ctx.scene.leave();
    ctx.reply(`${answers[rand]}`);
  });

const calcSc = new Scene('calc',
  (ctx) => {
    ctx.scene.next();
    ctx.reply('Сначала напишите любое выражение для вычисления.');
  },
  (ctx) => {
    ctx.session.content = ctx.message.body;
	console.log('ctx.message.body content: ' + ctx.message.body); //в консоль
    let result = math.evaluate(ctx.session.content).toString();
    ctx.scene.leave();
    ctx.reply(`Ответ: ${result}.`);
	}
);

const reverseSc = new Scene('reverse',
  (ctx) => {
    ctx.scene.next();
    ctx.reply('Введите любой текст для вывода в обратном порядке.');
  },
  (ctx) => {
    ctx.session.content = ctx.message.body;
        var msg_array = ctx.session.content;

        var msg_string = ctx.session.content;
        var reverse_string = "";
        var word;
        var split_word;
        for (var i = msg_string.length - 1; i >= 0; i -= 1) {

            reverse_string += msg_string[i];
        }
    ctx.scene.leave();
    ctx.reply(`${reverse_string}`);
	    function getRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
	}
);  

const stage = new Stage(scene, calcSc, reverseSc);

bot.use(session.middleware());
bot.use(stage.middleware());
  
bot.command('Игра "Шар судьбы"', (ctx) => {
  ctx.scene.enter('8ball');
});

bot.command('Калькулятор', (ctx) => {
  console.log(bot + "\n\n\n");
  console.log(bot.api + "\n\n\n");
  ctx.scene.enter('calc');
});

bot.command('[club197493648|@highflash] Калькулятор', (ctx) => {
  console.log(bot + "\n\n\n");
  console.log(bot.api + "\n\n\n");
  ctx.scene.enter('calc');
});

bot.command('Реверс', (ctx) => {
  ctx.scene.enter('reverse');
});

bot.command('[club197493648|@highflash] Реверс', (ctx) => {
  ctx.scene.enter('reverse');
});

bot.command('[club197493648|@highflash] Игра "Шар судьбы"', (ctx) => {
  ctx.scene.enter('8ball');
});

bot.startPolling((err) => {
    console.log('Tinelix XStep bot started!\n\n');
  if (err) {
    console.error(err);
  }
});
