import { OAuth2Scopes } from "discord.js";
import { randomItem } from "../responses";
import type { CommandDefinition } from "../types";

const categories = [
  "Fake moderation & security",
  "Fun",
  "Community",
  "Utility",
  "Not Wick personality",
] as const;

export function createUtilityCommands(allCommands: () => CommandDefinition[]): CommandDefinition[] {
  return [
    {
      name: "ping",
      category: "Utility",
      description: "Display bot latency.",
      usage: "nw!ping",
      async execute({ client, message, send }) {
        const latency = client.ws.ping;
        await send(`pong. websocket latency: **${latency >= 0 ? `${latency}ms` : "unknown"}**.`);
      },
    },
    {
      name: "uptime",
      category: "Utility",
      description: "Display how long Not Wick has been online.",
      usage: "nw!uptime",
      async execute({ client, send }) {
        const seconds = Math.floor((client.uptime ?? 0) / 1000);
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        await send(`online for **${days}d ${hours}h ${minutes}m ${remainingSeconds}s**. against my will.`);
      },
    },
    {
      name: "botinfo",
      category: "Utility",
      description: "Show information about Not Wick.",
      usage: "nw!botinfo",
      async execute({ client, send }) {
        await send(
          [
            `**${client.user?.username ?? "Not Wick"}**`,
            "a rude, lazy Discord bot that refuses to moderate your server.",
            `serving ${client.guilds.cache.size} server${client.guilds.cache.size === 1 ? "" : "s"}.`,
          ].join("\n"),
        );
      },
    },
    {
      name: "invite",
      category: "Utility",
      description: "Provide Not Wick's invite link.",
      usage: "nw!invite",
      async execute({ client, send }) {
        if (!client.user) {
          await send("I am still booting. try again in a moment.");
          return;
        }
        const invite = client.generateInvite({
          scopes: [OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],
          permissions: ["ViewChannel", "SendMessages", "EmbedLinks", "AddReactions"],
        });
        await send(`here. invite me somewhere else: ${invite}`);
      },
    },
    {
      name: "help",
      category: "Utility",
      description: "Display all available commands by category.",
      usage: "nw!help [category]",
      async execute({ args, send }) {
        const commands = allCommands();
        const requested = args.join(" ").toLowerCase();
        const matchingCategory = categories.find((category) => category.toLowerCase() === requested);
        if (requested && !matchingCategory) {
          await send(`unknown category. choose: ${categories.map((category) => `\`${category}\``).join(", ")}`);
          return;
        }
        const selected = matchingCategory ? [matchingCategory] : categories;
        const sections = selected.map((category) => {
          const lines = commands
            .filter((command) => command.category === category)
            .map((command) => `\`nw!${command.name}\``);
          return `**${category}**\n${lines.join(" · ") || "nothing here. tragic."}`;
        });
        await send(
          `**Not Wick commands**\nPrefix: \`nw!\` · use \`nw!help <category>\` for one category.\n\n${sections.join("\n\n")}`,
        );
      },
    },
    {
      name: "prefix",
      category: "Utility",
      description: "Explain the current command prefix.",
      usage: "nw!prefix",
      async execute({ send }) {
        await send("the prefix is `nw!`. lowercase, uppercase, I barely care.");
      },
    },
  ];
}