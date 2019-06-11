const { Client, RichEmbed } = require('discord.js');
const client = new Client();
const player = require('../index');
const Player = new player(client,`AIzaSyC47u9iM3B72Jx-trbZ27xDjEI560i4d44`,`585256314410631277`,`https://www.youtube.com/watch?v=a9Busw9eBeg&list=RDRUWxPoli4Fk&index=3`);
client.login(process.env.TOKEN);
const staff = ['356355452407119873', '512625982751113216'];

client.on('ready', () => {
	Player.play();
});

client.on('error', error => console.error(error));

client.on('message', message => {
	const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
	const prefix = message.content.match(prefixMention) ? message.content.match(prefixMention)[0] : 'os!';
	if (message.channel.id === '585256314410631277' || '514155011056467971') {
		if (message.content === `${prefix}np`) {
			return message.channel.send(new RichEmbed().setDescription(`🎵 Now Playing:\n**[${Player.queue[0].title}](${Player.queue[0].url})**`).setThumbnail(Player.queue[0].thumbnails.high.url)
				.setColor(`BLUE`));
		} else if (message.content === `${prefix}queue`) {
			let i = 0;
			return message.channel.send(new RichEmbed()
				.setDescription(`🎵 Now Playing:\n**[${Player.queue[0].title}](${Player.queue[0].url})** \n\n🎵 Queue\n${Player.queue.slice(1, 10).map(item => `${++i}. [${item.title}](${item.url})`).join('\n')}`)
				.setFooter(`Only displaying the first 10 items in the queue`)
				.setColor('RANDOM')
				.setThumbnail(Player.queue[0].thumbnails.high.url));
		} else if (staff.includes(message.author.id) && message.content === `${prefix}skip`) {
			message.channel.send(`تخطي الاغنية:\n**${Player.queue[0].title}**`);
			return Player.dispatcher.end();
		}
	}
});
