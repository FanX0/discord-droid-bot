import { verifyKey } from 'discord-interactions';
import { DISCORD_CONFIG } from '../config/roles';

export async function verifyDiscordSignature(
  rawBody: string,
  signature: string | null,
  timestamp: string | null
): Promise<boolean> {
  if (!signature || !timestamp) {
    return false;
  }
  try {
    return await verifyKey(rawBody, signature, timestamp, DISCORD_CONFIG.publicKey);
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}
