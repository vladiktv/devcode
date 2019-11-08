const Discord = require('discord.js')
const client = new Discord.Client();
const fs = require('fs')
client.login('NjQyMDM2NTI2MjUwODUyMzgy.XcRFPA.NyS133ygEARArugM4FnyaU6XPKY')
client.owner = '550325638821576734'
client.on('ready', () => {
})
client.on('guildMemberAdd', member => {
    var channel = member.guild.channels.get('642038353553915954')
    channel.send(`Поприветствуем нового участника ${member} на сервере ${member.guild.name}`)
    member.send(`Добро пожаловать на наш сервер!`)
})
client.on('guildMemberRemove', member => {
    var channel = member.guild.channels.get('642038378078142465')
    channel.send(`Прощай ${member.user.tag} с нашего сервера :(`)
})
client.on('messageDelete', message => {
    var channel = message.guild.channels.get('625622368089276426')
    var embed = new Discord.RichEmbed()
    .setAuthor(message.author.username, message.author.avatarURL)
    .setDescription(`**Удалено собщаение**\nСодержание: ${message.content}\nID: ${message.id}`)
    .setColor('RANDOM')
    .setFooter('DevCoding', client.user.avatarURL)
    channel.send(embed)
})
client.on('messageUpdate', (oldm, newm) => {
    if(oldm.author.bot) return;
    var channel = oldm.guild.channels.get('625622368089276426')
    var embed1 = new Discord.RichEmbed()
    .setAuthor(oldm.author.username, oldm.author.avatarURL)
    .setDescription(`**Собщение изменено**\nДо: ${oldm.content}\nПосле: ${newm.content}`)
    .setColor('RANDOM')
    .setFooter('DevCoding', client.user.avatarURL)
    channel.send(embed1)
})
client.prefix = '!'
client.commands = new Discord.Collection();
fs.readdir('./cmds/', (err, files) => {
    if(err) console.log(err)
    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if(jsfiles.length <= 0) {
        console.log('NO COMMANDS!')
        return
    }
    console.log(`[COMMANDS] Loaded ${files.length} commands!`)
    jsfiles.forEach(f => {
        let props = require(`./cmds/${f}`)
        client.commands.set(props.help.name, props);
    })
})
client.on('message', message => {
        let msg = message.content.toLowerCase() || message.content.toUpperCase()
        if(!msg.startsWith(prefix)) return;
        if(message.author.bot) return
        if(message.channel.type === 'dm') return;
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        let command = args.shift().toLowerCase()
        let cmd;
        if(client.commands.has(command)) {
            cmd = client.commands.get(command)
        }
        if(!cmd) return;
        if(cmd.help.owner && message.author.id !== client.owner) {
            message.reply('У вас нет прав!')
            return
        }
        if(cmd.help.enabled == false ) {
            return
        }
        cmd.run(client, message, args)
})