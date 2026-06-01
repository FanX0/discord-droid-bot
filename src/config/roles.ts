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
    value: "1510978678065074207", // Replace with your actual Mobile Legends Role ID
    description: "Play Mobile Legends: Bang Bang",
    emoji: { name: "⚔️" },
  },
  {
    label: "Free Fire",
    value: "1510978813327311062", // Replace with your actual Free Fire Role ID
    description: "Play Garena Free Fire",
    emoji: { name: "🔫" },
  },
  {
    label: "PUBG Mobile",
    value: "1510978954738008196", // Replace with your actual PUBG Mobile Role ID
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
  GENDER:
    "https://res.cloudinary.com/dmdbork5l/image/upload/v1780316666/429c98cd-ef8b-4f74-9a21-be0028504816_zjdwkw.png", // Elegant community/profile banner
  MOBILE_GAMES:
    "https://res.cloudinary.com/dmdbork5l/image/upload/v1780316883/1261b8f2-6f69-4986-93f5-a8d25f2ed794_hlfuhd.png", // Mobile/General gaming banner
  PC_GAMES:
    "https://res.cloudinary.com/dmdbork5l/image/upload/v1780316991/84073775-d173-4677-8722-b5d1470c4516_a226aa.png", // PC gaming banner
  START_HERE:
    "https://res.cloudinary.com/dmdbork5l/image/upload/v1780318031/43610608-c8db-4dd4-8db2-f8d2eb597eb5_bgaopy.png", // Default beautiful Start Here banner
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
