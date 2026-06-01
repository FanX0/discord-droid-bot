export const ASSIGNABLE_ROLES = [
  {
    label: 'Developer',
    value: '123456789012345678', // Replace with your actual Discord Role ID
    description: 'Access to developer channels and updates',
    emoji: { name: '💻' }
  },
  {
    label: 'Designer',
    value: '876543210987654321', // Replace with your actual Discord Role ID
    description: 'Access to design channels and UI discussions',
    emoji: { name: '🎨' }
  },
  {
    label: 'Community Specialist',
    value: '112233445566778899', // Replace with your actual Discord Role ID
    description: 'Access to community events and announcements',
    emoji: { name: '📢' }
  }
] as const;

export const DISCORD_CONFIG = {
  get publicKey() {
    const val = process.env.DISCORD_PUBLIC_KEY;
    if (!val) throw new Error('DISCORD_PUBLIC_KEY environment variable is not defined.');
    return val;
  },
  get botToken() {
    const val = process.env.DISCORD_BOT_TOKEN;
    if (!val) throw new Error('DISCORD_BOT_TOKEN environment variable is not defined.');
    return val;
  },
  get applicationId() {
    const val = process.env.DISCORD_APPLICATION_ID;
    if (!val) throw new Error('DISCORD_APPLICATION_ID environment variable is not defined.');
    return val;
  },
  get guildId() {
    return process.env.GUILD_ID; // Optional (mainly for registering guild command locally)
  }
};
