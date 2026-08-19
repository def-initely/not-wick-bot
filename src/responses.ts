export function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)] ?? items[0]!;
}

export const fakeModerationResponses = {
  mute: [
    "no.",
    "they can keep talking.",
    "hell no.",
    "i'm not your moderator.",
    "why would I do that?",
  ],
  unmute: [
    "I didn't mute them.",
    "they were never muted. keep up.",
    "no action was taken, so congratulations.",
  ],
  ban: [
    "absolutely not.",
    "they live here now.",
    "sounds like a personal problem.",
    "1984 much?",
  ],
  unban: [
    "I didn't ban them, so this is awkward.",
    "ask the imaginary moderator who did it.",
    "no ban, no unban. incredible efficiency.",
  ],
  kick: [
    "they know where the door is.",
    "you have legs. go tell them yourself.",
    "I am not escorting anyone anywhere.",
  ],
  warn: [
    "consider this a warning against giving me warnings.",
    "warning received. enthusiasm declined.",
  ],
  purge: ["clean your own mess.", "I'm a bot, not a janitor."],
  lock: ["nope. doors are staying open.", "I refuse to close anything."],
  unlock: ["I didn't lock anything.", "the door was already open. try again."],
  raidmode: [
    "if they raid you, that's between you and god.",
    "raid mode? I can barely do regular mode.",
  ],
  antinuke: ["no.", "I could prevent it. I won't."],
  automod: ["imagine enforcing rules.", "rules are a lot of work."],
  antispam: ["let them spam.", "spam builds character. probably."],
  verify: ["I don't trust anybody.", "verification sounds like effort."],
  captcha: ["prove you're human yourself.", "I refuse to grade your little puzzle."],
  setup: ["you set it up.", "read the instructions. I believe in you, unfortunately."],
  security: ["security? In this economy?", "my security policy is looking away."],
} as const;

export const personalityResponses = {
  cope: ["cope.", "you'll survive.", "that's unfortunate.", "skill issue."],
  skillissue: ["skill issue.", "have you tried being better?", "tragic. absolutely tragic."],
  hellno: ["hell no.", "not a chance.", "ask again and the answer gets worse."],
  "1984": [
    "1984 much?",
    "literally 1984.",
    "who gave you permission to have rules",
    "no thanks, I enjoy freedom.",
  ],
  lazy: ["I am working very hard at doing nothing.", "ask someone with energy.", "later. maybe."],
  why: ["because I said so.", "why not?", "a question for someone who cares."],
  motivate: [
    "you can do it. I guess.",
    "be the problem you wish to see in the world.",
    "get up and disappoint your doubts.",
  ],
  insult: [
    "you have the confidence of someone who has not read the instructions.",
    "your plan has the structural integrity of wet cardboard.",
    "I would explain it, but I left my crayons at home.",
  ],
  ignore: ["message ignored.", "I saw that. I chose peace.", "no."],
} as const;

export const unsolicitedMessages = [
  "i have nothing useful to contribute.",
  "this conversation could have been an email.",
  "carry on. i'm ignoring all of you.",
  "someone here needs to make a better decision.",
  "i'm technically a bot. unfortunately.",
  "why am i here.",
  "I've reviewed the situation and decided not to care.",
  "everyone remain calm. I have no idea what's happening.",
];

export const eightBallResponses = [
  "yes, probably. don't make it weird.",
  "no. next question.",
  "ask again when you have a better question.",
  "the outlook is aggressively mediocre.",
  "absolutely, if you enjoy consequences.",
  "the answer is hidden because even it is embarrassed.",
  "signs point to skill issue.",
];

export const roastResponses = [
  "you bring tutorial-level confidence to boss-level problems.",
  "your greatest talent is making simple things need a meeting.",
  "I have seen loading screens with more direction.",
  "you are not a disaster. disasters at least make headlines.",
  "your decision-making process is a group project with no group.",
];

export const complimentResponses = [
  "you are surprisingly pleasant to have around. don't let it go to your head.",
  "you have excellent instincts, which is inconveniently impressive.",
  "you make this place slightly less exhausting.",
  "you are doing better than you think. yes, I said it.",
  "you have the rare skill of being useful without being unbearable.",
];

export const fortunes = [
  "a suspiciously good idea will find you soon.",
  "you will avoid one unnecessary meeting this week.",
  "someone will compliment you and you will pretend not to enjoy it.",
  "your next decision will be acceptable. aim higher.",
  "fortune favors the prepared, so maybe prepare something.",
];

export const jokes = [
  "Why did the developer go broke? They used up all their cache.",
  "I told my computer I needed a break. It said, 'No problem, I’ll go to sleep.'",
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "What is a bot's favorite snack? Bytes. I hate that joke too.",
];

export const facts = [
  "Octopuses have three hearts, and none of them want to moderate your server.",
  "Bananas are berries, but strawberries are not. Botany is committed to chaos.",
  "A group of flamingos is called a flamboyance. Finally, a useful collective noun.",
  "Honey never spoils when sealed properly. Unlike most group chats.",
  "The first computer mouse was made of wood. Technology has always been a little silly.",
];