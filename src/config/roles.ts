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

export const AGE_ROLES = [
  {
    label: "Teenager (<18)",
    value: "1510999936727122010", // Replace with actual role ID
    description: "Range umur di bawah 18 tahun",
    emoji: { name: "👶" },
  },
  {
    label: "Adult (18-35)",
    value: "1511000036857741312", // Replace with actual role ID
    description: "Range umur 18 hingga 35 tahun",
    emoji: { name: "👦" },
  },
  {
    label: "Elder (>35)",
    value: "1511000143548125275", // Replace with actual role ID
    description: "Range umur di atas 35 tahun",
    emoji: { name: "👴" },
  },
] as const;

export const DOMICILE_ROLES = [
  {
    label: "Bali",
    value: "1511000598739288207", // Replace with actual role ID
    description: "Asal domisili Bali",
    emoji: { name: "🏝️" },
  },
  {
    label: "Banten",
    value: "1511000633526714499", // Replace with actual role ID
    description: "Asal domisili Banten",
    emoji: { name: "🌊" },
  },
  {
    label: "Jakarta",
    value: "1511000650811707533", // Replace with actual role ID
    description: "Asal domisili DKI Jakarta",
    emoji: { name: "🏢" },
  },
  {
    label: "Jawa Barat",
    value: "1511000921910415410", // Replace with actual role ID
    description: "Asal domisili Jawa Barat",
    emoji: { name: "⛰️" },
  },
  {
    label: "Jawa Tengah",
    value: "1511000989816066119", // Replace with actual role ID
    description: "Asal domisili Jawa Tengah",
    emoji: { name: "🏛️" },
  },
  {
    label: "Jawa Timur",
    value: "1511004830812995585", // Replace with actual role ID
    description: "Asal domisili Jawa Timur",
    emoji: { name: "🌋" },
  },
  {
    label: "Kalimantan",
    value: "1511001067775594497", // Replace with actual role ID
    description: "Asal domisili Kalimantan",
    emoji: { name: "🌳" },
  },
  {
    label: "Nusa Tenggara",
    value: "1511001220712501268", // Replace with actual role ID
    description: "Asal domisili Nusa Tenggara (NTB/NTT)",
    emoji: { name: "🏖️" },
  },
  {
    label: "Papua",
    value: "1511001287288688800", // Replace with actual role ID
    description: "Asal domisili Papua",
    emoji: { name: "🏹" },
  },
  {
    label: "Sulawesi",
    value: "1511001362710659082", // Replace with actual role ID
    description: "Asal domisili Sulawesi",
    emoji: { name: "⛵" },
  },
  {
    label: "Sumatra",
    value: "1511001430410919996", // Replace with actual role ID
    description: "Asal domisili Sumatra",
    emoji: { name: "🐅" },
  },
  {
    label: "Yogyakarta",
    value: "1511001485478072532", // Replace with actual role ID
    description: "Asal domisili DI Yogyakarta",
    emoji: { name: "🏰" },
  },
  {
    label: "International",
    value: "1511001537231589546", // Replace with actual role ID
    description: "Asal domisili Luar Negeri (International)",
    emoji: { name: "🌐" },
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
  RULES:
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=1200", // Elegant dark gamer gradient banner for rules
  AGE: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=1200", // Elegant dark theme for age banner
  DOMICILE:
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200", // Elegant dark theme for domicile banner
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
  get adminRoleId() {
    return process.env.ADMIN_ROLE_ID;
  },
};
