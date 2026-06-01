import fs from 'fs';
import path from 'path';

// Load .env manually if it exists
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split(/\r?\n/)) {
      // Ignore comments and empty lines
      if (line.trim().startsWith('#') || !line.includes('=')) continue;
      const delimiterIndex = line.indexOf('=');
      const key = line.slice(0, delimiterIndex).trim();
      let value = line.slice(delimiterIndex + 1).trim();
      
      // Strip quotes if present
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
} catch (error) {
  console.warn('Warning: Could not read .env file', error);
}

import { DISCORD_CONFIG } from '../src/config/roles';

const COMMANDS = [
  {
    name: 'setup-start',
    description: 'Spawns the welcome message embed with interactive info buttons',
    default_member_permissions: '8', // ADMINISTRATOR permission required to setup roles
    dm_permission: false,
  },
  {
    name: 'setup-gender',
    description: 'Spawns the dropdown select menu for self-assigning gender roles',
    default_member_permissions: '8',
    dm_permission: false,
  },
  {
    name: 'setup-mobile-games',
    description: 'Spawns the dropdown select menu for self-assigning mobile game roles',
    default_member_permissions: '8',
    dm_permission: false,
  },
  {
    name: 'setup-pc-games',
    description: 'Spawns the dropdown select menu for self-assigning PC game roles',
    default_member_permissions: '8',
    dm_permission: false,
  },
];

async function registerCommands() {
  const { applicationId, botToken, guildId } = DISCORD_CONFIG;

  // Bulk overwrite endpoint (PUT) cleanly registers all new commands and deletes old ones
  const endpoint = guildId
    ? `/applications/${applicationId}/guilds/${guildId}/commands`
    : `/applications/${applicationId}/commands`;

  const url = `https://discord.com/api/v10${endpoint}`;

  console.log(`Bulk registering commands to: ${url}...`);

  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(COMMANDS),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP Error ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('✅ Commands registered successfully!', data);
  } catch (error) {
    console.error('❌ Failed to register commands:', error);
    process.exit(1);
  }
}

// Ensure required environment variables are set before running
try {
  // Accessing getters to trigger check errors
  DISCORD_CONFIG.applicationId;
  DISCORD_CONFIG.botToken;
} catch (error: any) {
  console.error(`❌ Setup Error: ${error.message}`);
  console.log('\nMake sure you have created your .env file with the following variables:');
  console.log('DISCORD_APPLICATION_ID');
  console.log('DISCORD_BOT_TOKEN');
  console.log('DISCORD_PUBLIC_KEY');
  console.log('GUILD_ID (optional, but highly recommended for fast command testing)');
  process.exit(1);
}

registerCommands();
