import { personalityResponses, randomItem } from "../responses";
import type { CommandDefinition } from "../types";

export const personalityCommands: CommandDefinition[] = Object.keys(personalityResponses).map((name) => ({
  name,
  category: "Not Wick personality",
  description: `A ${name} response from Not Wick.`,
  usage: `nw!${name}`,
  async execute({ send }) {
    await send(randomItem(personalityResponses[name as keyof typeof personalityResponses]));
  },
}));