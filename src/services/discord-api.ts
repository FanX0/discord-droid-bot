import { DISCORD_CONFIG } from '../config/roles';

const BASE_URL = 'https://discord.com/api/v10';

async function discordRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    let errorDetails = '';
    try {
      errorDetails = await response.text();
    } catch {
      // Ignore
    }
    throw new Error(`Discord API error: ${response.status} ${response.statusText} - ${errorDetails}`);
  }

  return response;
}

export async function addRoleToMember(guildId: string, userId: string, roleId: string): Promise<void> {
  await discordRequest(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: 'PUT',
    headers: {
      'X-Audit-Log-Reason': 'Self-assigned role via select menu bot',
    },
  });
}

export async function removeRoleFromMember(guildId: string, userId: string, roleId: string): Promise<void> {
  await discordRequest(`/guilds/${guildId}/members/${userId}/roles/${roleId}`, {
    method: 'DELETE',
    headers: {
      'X-Audit-Log-Reason': 'Self-removed role via select menu bot',
    },
  });
}

export async function sendMessageToChannel(channelId: string, data: any): Promise<void> {
  await discordRequest(`/channels/${channelId}/messages`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
