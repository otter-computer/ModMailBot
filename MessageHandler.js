const Discord = require(`discord.js`);

class MessageHandler {
  /**
   * Handles understanding an incoming message
   * @param {Message} Message The Discord message object
   */
  handleMessage(Message) {
    // Ignore system, bot messages
    if (Message.system || Message.author.bot) return;
    
    // Handle DMs
    if (Message.channel.type === `dm`) {
      this.handleDM(Message);
      return;
    }

    // Ignore if not mentioned
    if (!Message.mentions.has(Message.client.user)) return;

    Message.author.createDM().then(channel => {
      channel.send(`If you'd like to get in touch with the staff feel free to send me a DM here! Please try to keep it all in one message if you can. A staff member will read it and be in touch ASAP! :sparkles:`)

      // Can't open a DM, send message in chat.
      .catch(e => {
        console.error(`Unable to open DM channel.`, e);
  
        Message.reply(`It looks like I'm not able to send you a DM :pensive: If you'd like to get in touch with the server staff please temporarily enable DMs from server users from this server's privacy settings. (https://support.discord.com/hc/en-us/articles/217916488) Then DM me with the message you'd like to send. Please try to keep it all in one message if you can. A staff member will read it and be in touch ASAP! :sparkles:`);
      });
    });
  }

  async handleDM(Message) {
    const guild = await Message.client.guilds.cache.first();
    const modMailChannel = await guild.channels.cache.find(channel => channel.name === `mod-mail`);
    const checkEmoji = await guild.emojis.cache.find(emoji => emoji.name === `check_ani`);

    const embed = new Discord.MessageEmbed();

    embed.setColor(`#DC143C`);
    embed.setAuthor(Message.author.username, Message.author.displayAvatarURL({format:`png`}));
    if (Message.content) embed.setDescription(Message.content);
    if (Message.attachments.size) embed.attachFiles(Message.attachments.array());
    embed.setTimestamp(Message.createdTimestamp);

    const modMailMessage = `${Message.author.toString()} sent a message:`;

    modMailChannel.send(modMailMessage, {embed: embed}).then(guildMessage => {
      Message.react(checkEmoji);
      guildMessage.react(checkEmoji);
    });
  }
}

module.exports = MessageHandler;