import { DiscordResponse } from '../types/discord';

export function handlePing(): DiscordResponse {
  return {
    type: 1, // PONG
  };
}
