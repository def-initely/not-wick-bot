import {
  Client,
  Events,
  GatewayIntentBits,
  type Message,
} from "discord.js";
import { logger } from "./logger";
import { randomItem, unsolicitedMessages } from "./responses";
import { commandMap } from "./registry";
import type { CommandContext } from "./types";

const PREFIX = "nw!";
const unsolicitedCooldownMs = 30 * 60 * 1000;
const unsolicitedProbability = 0.015;
const unsolicitedCooldowns = new Map<string, number>();

function parseCommand(content: string): { name: string; rawArgs: string; args: string[] } | null {
  if (!content.toLowerCase().startsWith(PREFIX)) return null;
  const remainder = content.slice(PREFIX.length).trim();
  if (!remainder) return null;
  const separator = remainder.search(/\s/);
  const name = (separator === -1 ? remainder : remainder.slice(0, separator)).toLowerCase();
  const rawArgs = separator === -1 ? "" : remainder.slice(separator).trim();
  return { name, rawArgs, args: rawArgs ? rawArgs.split(/\s+/) : [] };
}

async function handleMessage(client: Client, message: Message): Promise<void> {
  if (message.author.bot) return;

  const parsed = parseCommand(message.content);
  if (parsed) {
    const command = commandMap.get(parsed.name);
    if (!command) {
      await message.reply(`unknown command. try \`${PREFIX}help\` if you enjoy reading.`);
      return;
    }

    const context: CommandContext = {
      client,
      message,
      args: parsed.args,
      rawArgs: parsed.rawArgs,
      send: (content) => message.reply(content),
    };

    try {
      await command.execute(context);
    } catch (error) {
      logger.error({ err: error, command: command.name }, "Not Wick command failed");
      await message.reply("something broke. not my fault, probably. try again.").catch(() => undefined);
    }
    return;
  }

  if (!message.guild || Math.random() > unsolicitedProbability) return;
  const now = Date.now();
  const lastSentAt = unsolicitedCooldowns.get(message.channelId) ?? 0;
  if (now - lastSentAt < unsolicitedCooldownMs) return;

  if (!message.channel.isSendable()) return;
  unsolicitedCooldowns.set(message.channelId, now);
  await message.channel.send(randomItem(unsolicitedMessages)).catch((error: unknown) => {
    logger.debug({ err: error, channelId: message.channelId }, "Not Wick unsolicited message skipped");
  });
}

export function startNotWick(): Client | null {
  const token = process.env["DISCORD_BOT_TOKEN"];
  if (!token) {
    logger.warn("DISCORD_BOT_TOKEN is not configured; Not Wick will not connect to Discord");
    return null;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once(Events.ClientReady, (readyClient) => {
    logger.info(
      { username: readyClient.user.username, guilds: readyClient.guilds.cache.size },
      "Not Wick is online",
    );
  });

  client.on(Events.MessageCreate, (message) => {
    void handleMessage(client, message);
  });

  client.on(Events.Error, (error) => {
    logger.error({ err: error }, "Not Wick Discord client error");
  });

  void client.login(token).catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    if (message === "Used disallowed intents") {
      logger.error(
        "Not Wick needs the Message Content Intent enabled in the Discord Developer Portal before prefix commands can work",
      );
      return;
    }
    logger.error({ err: error }, "Not Wick failed to log in to Discord");
  });

  return client;
}