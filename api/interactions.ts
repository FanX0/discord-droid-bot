import { verifyDiscordSignature } from '../src/security/verify';
import { handlePing } from '../src/handlers/ping';
import { handleSetupRolesCommand } from '../src/handlers/commands';
import { handleComponentInteraction } from '../src/handlers/components';
import { DiscordInteraction } from '../src/types/discord';

export const config = {
  runtime: 'edge',
};

function jsonResponse(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const signature = req.headers.get('x-signature-ed25519');
    const timestamp = req.headers.get('x-signature-timestamp');

    // Edge runtime provides easy access to raw body text
    const rawBody = await req.text();

    const isValid = await verifyDiscordSignature(rawBody, signature, timestamp);
    if (!isValid) {
      return new Response('Invalid request signature', { status: 401 });
    }

    const interaction = JSON.parse(rawBody) as DiscordInteraction;

    // Interaction Type 1: PING
    if (interaction.type === 1) {
      const response = handlePing();
      return jsonResponse(response);
    }

    // Interaction Type 2: APPLICATION_COMMAND
    if (interaction.type === 2) {
      const commandName = interaction.data?.name;
      if (commandName === 'setup-roles') {
        const response = handleSetupRolesCommand(interaction);
        return jsonResponse(response);
      }
      return jsonResponse({ error: 'Unknown command' }, 400);
    }

    // Interaction Type 3: MESSAGE_COMPONENT
    if (interaction.type === 3) {
      const response = await handleComponentInteraction(interaction);
      return jsonResponse(response);
    }

    return jsonResponse({ error: 'Unsupported interaction type' }, 400);
  } catch (error) {
    console.error('Error handling interaction:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
