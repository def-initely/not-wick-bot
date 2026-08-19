import { fakeModerationResponses, randomItem } from "../responses";
import type { CommandDefinition } from "../types";

const fakeCommand = (
  name: keyof typeof fakeModerationResponses,
  description: string,
  usage?: string,
): CommandDefinition => ({
  name,
  category: "Fake moderation & security",
  description,
  usage,
  async execute({ args, send }) {
    if (["mute", "unmute", "ban", "unban", "kick", "warn"].includes(name) && args.length === 0) {
      await send(`${randomItem(fakeModerationResponses[name])} mention someone next time.`);
      return;
    }
    await send(randomItem(fakeModerationResponses[name]));
  },
});

export const fakeModerationCommands: CommandDefinition[] = [
  fakeCommand("mute", "Pretends to mute a user; intentionally does nothing.", "nw!mute @user"),
  fakeCommand("unmute", "Pretends to unmute a user; intentionally does nothing.", "nw!unmute @user"),
  fakeCommand("ban", "Pretends to ban a user; intentionally does nothing.", "nw!ban @user"),
  fakeCommand("unban", "Pretends to unban a user; intentionally does nothing.", "nw!unban @user"),
  fakeCommand("kick", "Pretends to kick a user; intentionally does nothing.", "nw!kick @user"),
  fakeCommand("warn", "Pretends to warn a user; intentionally does nothing.", "nw!warn @user"),
  fakeCommand("purge", "Pretends to purge messages; intentionally does nothing.", "nw!purge"),
  fakeCommand("lock", "Pretends to lock the channel; intentionally does nothing.", "nw!lock"),
  fakeCommand("unlock", "Pretends to unlock the channel; intentionally does nothing.", "nw!unlock"),
  fakeCommand("raidmode", "Pretends to enable raid mode; intentionally does nothing.", "nw!raidmode"),
  fakeCommand("antinuke", "Pretends to enable anti-nuke protection; intentionally does nothing.", "nw!antinuke"),
  fakeCommand("automod", "Pretends to enable automod; intentionally does nothing.", "nw!automod"),
  fakeCommand("antispam", "Pretends to enable anti-spam; intentionally does nothing.", "nw!antispam"),
  fakeCommand("verify", "Pretends to verify the server; intentionally does nothing.", "nw!verify"),
  fakeCommand("captcha", "Pretends to enable captcha; intentionally does nothing.", "nw!captcha"),
  fakeCommand("setup", "Pretends to set up the bot; intentionally does nothing.", "nw!setup"),
  fakeCommand("security", "Pretends to improve security; intentionally does nothing.", "nw!security"),
];