import {
  EmbedBuilder,
  PermissionFlagsBits,
  type Guild,
  type Message,
  type User,
} from "discord.js";
import type { CommandDefinition } from "../types";

async function resolveUser(message: Message, input?: string): Promise<User | null> {
  const mentioned = message.mentions.users.first();
  if (mentioned) return mentioned;
  const id = input?.replace(/[<@!>]/g, "");
  if (!id || !/^\d{15,25}$/.test(id)) return message.author;
  try {
    return await message.client.users.fetch(id);
  } catch {
    return null;
  }
}

function guildOnly(guild: Guild | null, send: (content: string) => Promise<unknown>): guild is Guild {
  if (!guild) {
    void send("that command needs a server. DMs are not a community.");
    return false;
  }
  return true;
}

export const communityCommands: CommandDefinition[] = [
  {
    name: "userinfo",
    category: "Community",
    description: "Show basic information about a user.",
    usage: "nw!userinfo [@user]",
    async execute({ message, args, send }) {
      const user = await resolveUser(message, args[0]);
      if (!user) {
        await send("I couldn't find that user. impressive.");
        return;
      }
      const member = message.guild ? await message.guild.members.fetch(user.id).catch(() => null) : null;
      await send(
        [
          `**${user.tag}**`,
          `id: \`${user.id}\``,
          `created: <t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
          member ? `joined: <t:${Math.floor(member.joinedTimestamp! / 1000)}:R>` : null,
        ].filter(Boolean).join("\n"),
      );
    },
  },
  {
    name: "whois",
    category: "Community",
    description: "Show simple information about a user.",
    usage: "nw!whois [@user]",
    async execute(context) {
      await communityCommands[0]!.execute(context);
    },
  },
  {
    name: "serverinfo",
    category: "Community",
    description: "Show basic information about this server.",
    usage: "nw!serverinfo",
    async execute({ message, send }) {
      if (!guildOnly(message.guild, send)) return;
      const guild = message.guild;
      await send(
        [
          `**${guild.name}**`,
          `owner: <@${guild.ownerId}>`,
          `members: ${guild.memberCount}`,
          `channels: ${guild.channels.cache.size}`,
          `created: <t:${Math.floor(guild.createdTimestamp / 1000)}:R>`,
        ].join("\n"),
      );
    },
  },
  {
    name: "avatar",
    category: "Community",
    description: "Display a user's avatar.",
    usage: "nw!avatar [@user]",
    async execute({ message, args, send }) {
      const user = await resolveUser(message, args[0]);
      if (!user) {
        await send("I couldn't find that user.");
        return;
      }
      await send(`${user.username}'s avatar: ${user.displayAvatarURL({ size: 1024 })}`);
    },
  },
  {
    name: "membercount",
    category: "Community",
    description: "Display the current member count.",
    usage: "nw!membercount",
    async execute({ message, send }) {
      if (!guildOnly(message.guild, send)) return;
      await send(`**${message.guild.memberCount}** members. somehow.`);
    },
  },
  {
    name: "poll",
    category: "Community",
    description: "Create a simple poll with up to ten options.",
    usage: "nw!poll question | option 1 | option 2",
    async execute({ rawArgs, send }) {
      const parts = rawArgs.split("|").map((part) => part.trim()).filter(Boolean);
      if (parts.length < 3) {
        await send("use `nw!poll question | option 1 | option 2`.");
        return;
      }
      const [question, ...options] = parts;
      if (options.length > 10) {
        await send("ten options maximum. this is a poll, not a census.");
        return;
      }
      const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];
      const poll = await send(
        `**${question}**\n${options.map((option, index) => `${emojis[index]} ${option}`).join("\n")}`,
      );
      for (const emoji of emojis.slice(0, options.length)) {
        await poll.react(emoji).catch(() => undefined);
      }
    },
  },
  {
    name: "say",
    category: "Community",
    description: "Repeat text when the member has Manage Messages.",
    usage: "nw!say <text>",
    async execute({ message, rawArgs, send }) {
      if (!message.guild || !message.member?.permissions.has(PermissionFlagsBits.ManageMessages)) {
        await send("you need Manage Messages to make me repeat things.");
        return;
      }
      if (!rawArgs.trim()) {
        await send("say something after the command. I am not psychic.");
        return;
      }
      await message.delete().catch(() => undefined);
      await send(rawArgs.trim());
    },
  },
  {
    name: "announce",
    category: "Community",
    description: "Create a formatted announcement with Manage Guild.",
    usage: "nw!announce <title> | <message>",
    async execute({ message, rawArgs, send }) {
      if (!message.guild || !message.member?.permissions.has(PermissionFlagsBits.ManageGuild)) {
        await send("you need Manage Server to make announcements.");
        return;
      }
      const [title, body] = rawArgs.split("|").map((part) => part.trim());
      if (!title || !body) {
        await send("use `nw!announce title | message`.");
        return;
      }
      const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(body)
        .setColor(0x5865f2)
        .setFooter({ text: `Announced by ${message.author.username}` })
        .setTimestamp();
      if (!message.channel.isSendable()) {
        await send("this channel is not sendable. even I can't announce into the void.");
        return;
      }
      await message.channel.send({ embeds: [embed] });
    },
  },
];