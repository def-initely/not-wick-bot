import { randomItem, eightBallResponses, roastResponses, complimentResponses, fortunes, jokes, facts } from "../responses";
import type { CommandDefinition } from "../types";

function requireText(rawArgs: string, send: (content: string) => Promise<unknown>, usage: string): string | null {
  const text = rawArgs.trim();
  if (!text) {
    void send(`use it like this: ${usage}`);
    return null;
  }
  return text;
}

export const funCommands: CommandDefinition[] = [
  {
    name: "8ball",
    category: "Fun",
    description: "Ask the eight ball a question.",
    usage: "nw!8ball will I win?",
    async execute({ rawArgs, send }) {
      if (!requireText(rawArgs, send, "nw!8ball <question>")) return;
      await send(randomItem(eightBallResponses));
    },
  },
  {
    name: "coinflip",
    category: "Fun",
    description: "Flip a coin.",
    usage: "nw!coinflip",
    async execute({ send }) {
      await send(Math.random() < 0.5 ? "heads." : "tails.");
    },
  },
  {
    name: "dice",
    category: "Fun",
    description: "Roll a die, defaulting to a six-sided die.",
    usage: "nw!dice [sides]",
    async execute({ args, send }) {
      const sides = args[0] ? Number(args[0]) : 6;
      if (!Number.isInteger(sides) || sides < 2 || sides > 1000) {
        await send("give me a whole number of sides between 2 and 1000.");
        return;
      }
      await send(`you rolled **${Math.floor(Math.random() * sides) + 1}** on a d${sides}.`);
    },
  },
  {
    name: "choose",
    category: "Fun",
    description: "Choose one option separated by |.",
    usage: "nw!choose pizza | tacos | regret",
    async execute({ rawArgs, send }) {
      const options = rawArgs.split("|").map((option) => option.trim()).filter(Boolean);
      if (options.length < 2) {
        await send("give me at least two choices separated by `|`.");
        return;
      }
      await send(`I choose **${randomItem(options)}**. obviously.`);
    },
  },
  {
    name: "rate",
    category: "Fun",
    description: "Give something an aggressively arbitrary rating.",
    usage: "nw!rate my playlist",
    async execute({ rawArgs, send }) {
      const subject = requireText(rawArgs, send, "nw!rate <something>");
      if (!subject) return;
      const rating = Math.floor(Math.random() * 101);
      await send(`**${subject}** gets **${rating}/100**. my expert analysis is complete.`);
    },
  },
  {
    name: "ship",
    category: "Fun",
    description: "Give two users a completely unserious compatibility percentage.",
    usage: "nw!ship @user1 @user2",
    async execute({ message, send }) {
      const users = [...message.mentions.users.values()];
      if (users.length < 2) {
        await send("mention two users. I refuse to ship vague concepts.");
        return;
      }
      const percentage = Math.floor(Math.random() * 101);
      await send(`${users[0]!.username} + ${users[1]!.username}: **${percentage}%** compatible. scientifically questionable.`);
    },
  },
  {
    name: "roast",
    category: "Fun",
    description: "Give a playful, non-hateful roast.",
    usage: "nw!roast @user",
    async execute({ message, send }) {
      const target = message.mentions.users.first()?.username ?? message.author.username;
      await send(`**${target}**, ${randomItem(roastResponses)}`);
    },
  },
  {
    name: "compliment",
    category: "Fun",
    description: "Receive an unexpectedly nice compliment.",
    usage: "nw!compliment @user",
    async execute({ message, send }) {
      const target = message.mentions.users.first()?.username ?? message.author.username;
      await send(`**${target}**, ${randomItem(complimentResponses)}`);
    },
  },
  {
    name: "fortune",
    category: "Fun",
    description: "Receive a mildly suspicious fortune.",
    usage: "nw!fortune",
    async execute({ send }) {
      await send(randomItem(fortunes));
    },
  },
  {
    name: "joke",
    category: "Fun",
    description: "Tell a joke of questionable quality.",
    usage: "nw!joke",
    async execute({ send }) {
      await send(randomItem(jokes));
    },
  },
  {
    name: "fact",
    category: "Fun",
    description: "Share an interesting fact.",
    usage: "nw!fact",
    async execute({ send }) {
      await send(randomItem(facts));
    },
  },
];