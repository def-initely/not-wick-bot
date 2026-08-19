import type { Client, Message, MessageReplyOptions } from "discord.js";

export type CommandCategory =
  | "Fake moderation & security"
  | "Fun"
  | "Community"
  | "Utility"
  | "Not Wick personality";

export type CommandContext = {
  client: Client;
  message: Message;
  args: string[];
  rawArgs: string;
  send: (content: string | MessageReplyOptions) => Promise<Message>;
};

export type CommandDefinition = {
  name: string;
  category: CommandCategory;
  description: string;
  usage?: string;
  execute: (context: CommandContext) => Promise<void>;
};