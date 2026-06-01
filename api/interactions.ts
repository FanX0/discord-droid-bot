import { verifyDiscordSignature } from '../src/security/verify';
import { handlePing } from '../src/handlers/ping';
import { handleSetupGenderCommand, handleSetupMobileGamesCommand, handleSetupPcGamesCommand, handleSetupStartCommand } from '../src/handlers/commands';
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
      const member = interaction.member;
      const isAdmin = member && (
        member.roles.includes('634182258881986580') ||
        (member.permissions && (BigInt(member.permissions) & BigInt(8)) === BigInt(8))
      );

      if (!isAdmin) {
        return jsonResponse({
          type: 4,
          data: {
            flags: 64, // Ephemeral
            content: '❌ Kamu tidak memiliki izin (Role Admin/Staff) untuk menggunakan perintah setup ini!',
          },
        });
      }

      const commandName = interaction.data?.name;
      if (commandName === 'setup-gender') {
        const response = handleSetupGenderCommand(interaction);
        return jsonResponse(response);
      } else if (commandName === 'setup-mobile-games') {
        const response = handleSetupMobileGamesCommand(interaction);
        return jsonResponse(response);
      } else if (commandName === 'setup-pc-games') {
        const response = handleSetupPcGamesCommand(interaction);
        return jsonResponse(response);
      } else if (commandName === 'setup-start') {
        const response = handleSetupStartCommand(interaction);
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
