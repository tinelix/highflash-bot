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
const botconfig = require('./JSON/botconfig.json');
const math = require('mathjs');
const strftime = require('strftime')
const bot = new vk(process.env.TOKENVK);


module.exports = {
	start() {
	bot.command('Старт', (ctx) => {
try{
  ctx.reply('Приветствую, бот Highflash теперь и во ВКонтакте! На данный момент он немного сырой, поэтому мы постараемся хотя бы портировать часть кода с Discord.js.\n\nДля выполнения команды нажмите на одну из клавиш или напишите имя команды.\nВерсия ' + botconfig.vkversion + ' от ' + botconfig.vkdate + '.', null, Markup
    .keyboard([
    [
      Markup.button('Состояние бота', 'primary'),
      Markup.button('Мемы Reddit'),
	  ],
	  [
	    Markup.button('Мир фоток Reddit'),
	    Markup.button('Игра "Шар судьбы"'),
	  ],
	  [
	    Markup.button('Калькулятор'),
		  Markup.button('Еще'),
	  ],
    ]).inline()
	);
} catch(ex) {  console.error(ex);}
});

	bot.command('Начать', (ctx) => {
try{
  ctx.reply('Приветствую, бот Highflash теперь и во ВКонтакте! На данный момент он немного сырой, поэтому мы постараемся хотя бы портировать часть кода с Discord.js.\n\nДля выполнения команды нажмите на одну из клавиш или напишите имя команды.\nВерсия ' + botconfig.vkversion + ' от ' + botconfig.vkdate + '. Страница 1 из 2.', null, Markup
    .keyboard([
    [
      Markup.button('Состояние бота', 'primary'),
      Markup.button('Мемы Reddit'),
	  ],
	  [
	    Markup.button('Мир фоток Reddit'),
	    Markup.button('Игра "Шар судьбы"'),
	  ],
	  [
	    Markup.button('Калькулятор'),
		  Markup.button('Еще'),
	  ],
    ]).inline()
	);
} catch(ex) {  console.error(ex);}
});

	bot.command('Еще', (ctx) => {
try{
  ctx.reply('Для выполнения команды нажмите на одну из клавиш или напишите имя команды. Страница 2 из 2.', null, Markup
    .keyboard([
      [
        Markup.button('О пользователе'),
        Markup.button('О беседе'),
	  ],
    ]).inline()
	);
} catch(ex) {  console.error(ex);}
});

	bot.command('[club197493648|@highflash] Еще', (ctx) => {
try{
  ctx.reply('Для выполнения команды нажмите на одну из клавиш или напишите имя команды. Страница 2 из 2.', null, Markup
    .keyboard([
    [
        Markup.button('О пользователе'),
        Markup.button('О беседе'),
	  ],
    ]).inline()
	);
} catch(ex) {  console.error(ex);}
});

	bot.command('О пользователе', (ctx) => {
try{
  let online_friends = "";
  let platform_client = "";
  let isClosed = "";

    var ru_RU = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        shortMonths: ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
        AM: 'ДП',
        PM: 'ПП',
        am: 'дп',
        pm: 'пп',
            formats: {
                c: '%a %d %b %Y %X',
                D: '%d.%m.%y',
                F: '%Y-%m-%d',
                R: '%H:%M',
                r: '%I:%M:%S %p',
                T: '%H:%M:%S',
                v: '%e-%b-%Y',
                X: '%T',
                x: '%D'
            }
    }
    var strftimeRU = strftime.localize(ru_RU)

  const response = bot.execute('users.get', {user_ids: ctx.message.from_id, fields: 'online, nickname, city, last_seen, screen_name, bdate, counters', name_case: "gen"}).then(rns => {console.log(rns)
  if(rns[0].last_seen.platform < 6) {
      platform_client = " 📱"
  } else {
      platform_client = " 🖥️"
  };
  if(rns[0].counters.online_friends === 0) {
    online_friends = ""
  } else {
    online_friends = " (" + rns[0].counters.online_friends + " онлайн)"
  };
  if(rns[0].is_closed === true) {
    isClosed = "Да" 
  } else { isClosed = "Нет" }
    ctx.reply('О пользователе ' + rns[0].first_name + ' ' + rns[0].last_name + '\n\nДата рождения: ' + (rns[0].bdate || '(Скрыто)') + '\nАдрес профиля: ' + rns[0].screen_name + "\nДрузей: " + rns[0].counters.friends + online_friends + "\nПоследнее посещение: " + (strftimeRU("%d %B %Y г. в %H:%M МСК", new Date((rns[0].last_seen.time * 1000) + 10800000)
    ) || "неизвестно") + platform_client + "\nЗакрытый профиль: " + isClosed);
    });
} catch(ex) {  console.error(ex);}
});


	bot.command('[club197493648|@highflash] О пользователе', (ctx) => {
try{
  let online_friends = "";
  let platform_client = "";
  let isClosed = "";

    var ru_RU = {
        days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        shortDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
        shortMonths: ['янв.', 'фев.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'],
        AM: 'ДП',
        PM: 'ПП',
        am: 'дп',
        pm: 'пп',
            formats: {
                c: '%a %d %b %Y %X',
                D: '%d.%m.%y',
                F: '%Y-%m-%d',
                R: '%H:%M',
                r: '%I:%M:%S %p',
                T: '%H:%M:%S',
                v: '%e-%b-%Y',
                X: '%T',
                x: '%D'
            }
    }
    var strftimeRU = strftime.localize(ru_RU)

  const response = bot.execute('users.get', {user_ids: ctx.message.from_id, fields: 'online, nickname, city, last_seen, screen_name, bdate, counters', name_case: "gen"}).then(rns => {console.log(rns)
  if(rns[0].last_seen.platform < 6) {
      platform_client = " 📱"
  } else {
      platform_client = " 🖥️"
  };
  if(rns[0].counters.online_friends === 0) {
    online_friends = ""
  } else {
    online_friends = " (" + rns[0].counters.online_friends + " онлайн)"
  };
  if(rns[0].is_closed === true) {
    isClosed = "Да" 
  } else { isClosed = "Нет" }

    ctx.reply('О пользователе ' + rns[0].first_name + ' ' + rns[0].last_name + '\n\nДата рождения: ' + (rns[0].bdate || '(Скрыто)') + '\nАдрес профиля: ' + rns[0].screen_name + "\nДрузей: " + rns[0].counters.friends + online_friends + "\nПоследнее посещение: " + (strftimeRU("%d %B %Y г. в %H:%M МСК", new Date((rns[0].last_seen.time * 1000) + 10800000)
    ) || "неизвестно") + platform_client + "\nЗакрытый профиль: " + isClosed);
    });
} catch(ex) {  console.error(ex);}
});

bot.command('О беседе', (ctx) => {
try {
  let conv_name = "";
  let owner_id = "";
  let firstmsg = "";

  const firstMsgRns = bot.execute('messages.getByConversationMessageId', {peer_id: ctx.message.peer_id, conversation_message_ids: 1, fields: "name", group_id: 197493648}).then(fmsg => {
    console.log(fmsg.items)
    firstmsg = strftime("%D.%m.%Y в %H:%M МСК", new Date((fmsg.items[0].date * 1000) + 10800000));
  });  

  const response = bot.execute('messages.getConversationsById', {peer_ids: ctx.message.peer_id, extended: 1, fields: "name", group_id: 197493648}).then(rns => {
    try {
          console.log(rns.items[0].chat_settings);
  const responce2 = bot.execute('users.get', {user_ids: rns.items[0].chat_settings.owner_id, fields: 'online, nickname, city, last_seen, screen_name, bdate, counters', name_case: "nom"}).then(rns2 => {
    if(!rns.items[0].chat_settings.title) {
      conv_name = " "
    } else {
      conv_name = " \"" + rns.items[0].chat_settings.title + "\""
    }
    ctx.reply('О беседе' + conv_name + '\n\nВладелец: ' + (rns2[0].first_name + " " + rns2[0].last_name || "неизвестно") + '\nКол-во участников: ' + rns.items[0].chat_settings.members_count + " (" + rns.items[0].chat_settings.active_ids.length + " онлайн)\nАдминистраторов: " + rns.items[0].chat_settings.admin_ids.length)
  });
  } catch(ex) {
    if(ex.message === "Cannot read property 'chat_settings' of undefined") {
        ctx.reply("Сначала дайте боту права администратора, поскольку эта информации берется в настройках беседы.")
    } else if(ex.message === "Cannot read property 'owner_id' of undefined") {
        ctx.reply("Эта команда недоступна в личных сообщениях.")
        } else {
        ctx.reply("При выполнении команды произошла ошибка. Код ошибки: " + ex.message)
    }
  }
});
  } catch(ex) {
        ctx.reply("При выполнении команды произошла ошибка. Код ошибки: " + ex.message)
  }
  let i = 0
process.on('warning', (warning) => {
        if(i < 1) {
            const response = bot.execute('messages.getConversationsById', {peer_ids: ctx.message.peer_id, extended: 1, fields: "name", group_id: 197493648}).then(rns => {
    if(!rns.items[0].chat_settings.title) {
      conv_name = " "
    } else {
      conv_name = " \"" + rns.items[0].chat_settings.title + "\""
    }
    ctx.reply('О беседе' + conv_name + '\n\nКол-во участников: ' + rns.items[0].chat_settings.members_count + " (" + rns.items[0].chat_settings.active_ids.length + " онлайн)\nАдминистраторов: " + rns.items[0].chat_settings.admin_ids.length);
            });
          i = i + 1
        }
})
});

bot.command('[club197493648|@highflash] О беседе', (ctx) => {
try {
  let conv_name = "";
  let owner_id = "";
  let firstmsg = "";

  const firstMsgRns = bot.execute('messages.getByConversationMessageId', {peer_id: ctx.message.peer_id, conversation_message_ids: 1, fields: "name", group_id: 197493648}).then(fmsg => {
    console.log(fmsg.items)
    firstmsg = strftime("%D.%m.%Y в %H:%M МСК", new Date((fmsg.items[0].date * 1000) + 10800000));
  });  

  const response = bot.execute('messages.getConversationsById', {peer_ids: ctx.message.peer_id, extended: 1, fields: "name", group_id: 197493648}).then(rns => {
    try {
          console.log(rns.items[0].chat_settings);
  const responce2 = bot.execute('users.get', {user_ids: rns.items[0].chat_settings.owner_id, fields: 'online, nickname, city, last_seen, screen_name, bdate, counters', name_case: "nom"}).then(rns2 => {
    if(!rns.items[0].chat_settings.title) {
      conv_name = " "
    } else {
      conv_name = " \"" + rns.items[0].chat_settings.title + "\""
    }
    ctx.reply('О беседе' + conv_name + '\n\nВладелец: ' + (rns2[0].first_name + " " + rns2[0].last_name || "неизвестно") + '\nКол-во участников: ' + rns.items[0].chat_settings.members_count + " (" + rns.items[0].chat_settings.active_ids.length + " онлайн)\nАдминистраторов: " + rns.items[0].chat_settings.admin_ids.length)
  });
  } catch(ex) {
    if(ex.message === "Cannot read property 'chat_settings' of undefined") {
        ctx.reply("Сначала дайте боту права администратора, поскольку эта информации берется в настройках беседы.")
    } else if(ex.message === "Cannot read property 'owner_id' of undefined") {
        ctx.reply("Эта команда недоступна в личных сообщениях.")
        } else {
        ctx.reply("При выполнении команды произошла ошибка. Код ошибки: " + ex.message)
    }
  }
});
  } catch(ex) {
        ctx.reply("При выполнении команды произошла ошибка. Код ошибки: " + ex.message)
  }
  let i = 0
process.on('warning', (warning) => {
        if(i < 1) {
            const response = bot.execute('messages.getConversationsById', {peer_ids: ctx.message.peer_id, extended: 1, fields: "name", group_id: 197493648}).then(rns => {
    if(!rns.items[0].chat_settings.title) {
      conv_name = " "
    } else {
      conv_name = " \"" + rns.items[0].chat_settings.title + "\""
    }
    ctx.reply('О беседе' + conv_name + '\n\nКол-во участников: ' + rns.items[0].chat_settings.members_count + " (" + rns.items[0].chat_settings.active_ids.length + " онлайн)\nАдминистраторов: " + rns.items[0].chat_settings.admin_ids.length);
            });
          i = i + 1
        }
})
});

bot.command('Состояние бота', (ctx) => {
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
  ctx.reply(`💻 Сведения о хосте, на котором запущен бот\n\nИспользуемая память: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} МБ (${Math.round(process.memoryUsage().heapUsed / 1024)} кБ)\nПрограммная платформа: ${platform}\nПроцессор: ${os.cpus()[0].model}\nАптайм: ${Math.floor((process.uptime() * 1000) / 86400000) + strftime(":%H:%M:%S", new Date(process.uptime() * 1000))}\n\nБот Highflash использует Node.js версии ${process.version} и компонент node-vk-bot-api`);
});

bot.command('[club197493648|@highflash] Состояние бота', (ctx) => {
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
});

bot.command('Мемы Reddit', (ctx) => {
	const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
		ctx.reply(`Ссылка на изображение: ` + url + `\n\nИсточник: r/${random}`);
      });
    };
    imgaddr();
});

bot.command('[club197493648|@highflash] Мемы Reddit', (ctx) => {
	const subReddits = ["dankmeme", "meme", "me_irl"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];

    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
		ctx.reply(`Ссылка на изображение: ` + url + `\n\nИсточник: r/${random}`);
      });
    };
    imgaddr();
});

bot.command('Мир фоток Reddit', async (ctx) => { //код команды "Мир фоток в Reddit"
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

bot.command('[club197493648|@highflash] Мир фоток Reddit', async (ctx) => { //код команды "Мир фоток в Reddit"
    const subReddits = ["pic", "analog"];
    const random = subReddits[Math.floor(Math.random() * subReddits.length)];
    const imgaddr = async function(a, b) {
      await randomPuppy(random).then(url => {
	    const vkccjson = {};
const response = bot.execute('users.get', {
  user_ids: 1,
}).then(rns => {console.log(rns)});
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
    ctx.session.content = ctx.message.text;
	console.log('ctx.message.body content: ' + ctx.message.text); //в консоль
  try{
    let result = math.evaluate(ctx.session.content).toString();
    ctx.scene.leave();
    ctx.reply(`Ответ: ${result}.`);
    } catch(ex) {
      ctx.scene.leave();
      ctx.reply(`Ошибка вычисления.`);}
	}
);

const reverseSc = new Scene('reverse',
  (ctx) => {
    ctx.scene.next();
    ctx.reply('Введите любой текст для вывода в обратном порядке.');
  },
  (ctx) => {
    ctx.session.content = ctx.message.text;
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
    console.log('Tinelix Highflash bot (VK) started!\n\n');
  if (err) {
    console.log(err);
  }
});
}
}