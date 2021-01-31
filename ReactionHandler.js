const Discord = require(`discord.js`);

class ReactionHandler {
  async handleReaction(Reaction, User) {
    // Fetch reaction if a partial
    if (Reaction.partial) await Reaction.fetch();

    // Ignore self-reacts
    if (Reaction.me) return;

    // Ignore reacts not in #mod-mail
    if (Reaction.message.channel.name !== `mod-mail`) return;

    // Ignore if not check_ani
    if (Reaction.emoji.name !== `check_ani`) return;

    const embed = Reaction.message.embeds[0];
    embed.setColor(`#808080`);

    Reaction.message.edit({embed: embed});
  }
}

module.exports = ReactionHandler;