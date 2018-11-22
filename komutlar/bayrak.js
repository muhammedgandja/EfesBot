const Discord = require('discord.js');
const client = new Discord.Client();

exports.run = (client, message) => {
 message.channel.send({embed: {
      file:"javascript:void(0);",
          color: 0xD97634,
		  description: "**Türkiyem!**"
            }});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['b'],
  permLevel: 0
};

exports.help = {
  name: 'bayrak',
  description: 'Bayrağımızı Gösterir.',
  usage: 'bayrak'
};
