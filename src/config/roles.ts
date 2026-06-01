export const GENDER_ROLES = [
  {
    label: "Man",
    value: "1510928563145150665", // Replace with your actual Man Role ID
    description: "Assign the Man role to your profile",
    emoji: { name: "🙋‍♂️" },
  },
  {
    label: "Woman",
    value: "1510927073945059338", // Replace with your actual Woman Role ID
    description: "Assign the Woman role to your profile",
    emoji: { name: "🙋‍♀️" },
  },
] as const;

export const MOBILE_GAME_ROLES = [
  {
    label: "Mobile Legends",
    value: "445566778899001122", // Replace with your actual Mobile Legends Role ID
    description: "Play Mobile Legends: Bang Bang",
    emoji: { name: "⚔️" },
  },
  {
    label: "Free Fire",
    value: "445566778899001123", // Replace with your actual Free Fire Role ID
    description: "Play Garena Free Fire",
    emoji: { name: "🔫" },
  },
  {
    label: "PUBG Mobile",
    value: "445566778899001124", // Replace with your actual PUBG Mobile Role ID
    description: "Play PUBG Mobile",
    emoji: { name: "🪂" },
  },
] as const;

export const PC_GAME_ROLES = [
  {
    label: "Valorant",
    value: "556677889900112233", // Replace with your actual Valorant Role ID
    description: "Play Valorant tactical shooter",
    emoji: { name: "🎯" },
  },
  {
    label: "Minecraft",
    value: "556677889900112234", // Replace with your actual Minecraft Role ID
    description: "Play Minecraft sandbox game",
    emoji: { name: "🧱" },
  },
  {
    label: "CS2",
    value: "556677889900112235", // Replace with your actual CS2 Role ID
    description: "Play Counter-Strike 2",
    emoji: { name: "💣" },
  },
] as const;

export const BANNERS = {
  GENDER: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200', // Elegant community/profile banner
  MOBILE_GAMES: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=1200', // Mobile/General gaming banner
  PC_GAMES: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200', // PC gaming banner
} as const;

export const DISCORD_CONFIG = {
  get publicKey() {
    const val = process.env.DISCORD_PUBLIC_KEY;
    if (!val)
      throw new Error(
        "DISCORD_PUBLIC_KEY environment variable is not defined.",
      );
    return val;
  },
  get botToken() {
    const val = process.env.DISCORD_BOT_TOKEN;
    if (!val)
      throw new Error("DISCORD_BOT_TOKEN environment variable is not defined.");
    return val;
  },
  get applicationId() {
    const val = process.env.DISCORD_APPLICATION_ID;
    if (!val)
      throw new Error(
        "DISCORD_APPLICATION_ID environment variable is not defined.",
      );
    return val;
  },
  get guildId() {
    return process.env.GUILD_ID; // Optional (mainly for registering guild command locally)
  },
};
