const Discord = require('discord.js');
exports.run = (client, message, args) => {

  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`sustur` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.sendEmbed(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  let muteRole = client.guilds.get(message.guild.id).roles.find('name', 'Muted');
  if (!modlog) return message.reply('`mod-log` kanalını bulamıyorum.').catch(console.error);
  if (!muteRole) return message.reply('`Muted` adlı bir rol bulamıyorum.').catch(console.error);
  if (reason.length < 1) return message.reply('Susturma sebebini yazmalısın.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('Kimi susturacağını yazmalısın.').catch(console.error);
  const embed = new Discord.RichEmbed()
  .setAuthor("♥ 2018 ♥ Black ♥ | Moderatör", "https://cdn.discordapp.com/icons/468369106555633665/14261f7727178da0d5523db5306edced.jpg")
  .setThumbnail("https://cdn.discordapp.com/avatars/334975384380506112/6f8f7f71850d24a1ead854f2cd3db016.png?size=2048d=2ahUKEwiO6p251KbcAhXDLFAKHb")
  .setColor(0x00AE86)
  .setTimestamp()
  .addField('》 Eylem:', 'Susturma')
  .addField('》 Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
  .addField('》 Yetkili:', `${message.author.username}#${message.author.discriminator}`)
  .addField('》 Sebep:', reason);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Gerekli izinlere sahip değilim.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      guild.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      guild.channels.get(modlog.id).sendEmbed(embed).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'sustur',
  description: '[Admin Komutu]',
  usage: 'sustur [kullanıcı] [sebep]'
};
