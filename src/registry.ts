import { communityCommands } from "./commands/community";
import { fakeModerationCommands } from "./commands/fake-moderation";
import { funCommands } from "./commands/fun";
import { personalityCommands } from "./commands/personality";
import { createUtilityCommands } from "./commands/utility";
import type { CommandDefinition } from "./types";

const commands: CommandDefinition[] = [
  ...fakeModerationCommands,
  ...funCommands,
  ...communityCommands,
  ...personalityCommands,
];

commands.push(...createUtilityCommands(() => commands));

export const commandList = commands;
export const commandMap = new Map(commands.map((command) => [command.name.toLowerCase(), command]));