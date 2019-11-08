exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    var embed = new Discord.RichEmbed()
    .setTitle('Pong!')
    .setDescription(`Пинг **${client.ping}ms**`)
    .setColor('RANDOM')
    .setFooter('DevCoding', client.user.avatarURL)
    message.channel.send(embed)
}
exports.help = {
    name: 'ping'
}