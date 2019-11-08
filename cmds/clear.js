exports.run = (client, message, args) => {
    const Discord = require('discord.js')
    var args1 = message.content.split(' ')
    var purge = args1[1]
    if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('У вас не достаточно прав!')
    if(!purge || isNaN(purge)) {
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription('Укажите Число !')
        .setColor('RANDOM')
        .setFooter('DevCoding', client.user.avatarURL)
        message.channel.send(embed)
    }
    message.channel.bulkDelete(purge).then(m => {
        var embed1 = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription(`Было Удалено **${purge}** собщений!`)
        .setColor('RANDOM')
        .setFooter('DevCoding', client.user.avatarURL)
        message.channel.send(embed).then(m => m.delete(10000))
    })
}
exports.help = {
    name: 'clear'
}