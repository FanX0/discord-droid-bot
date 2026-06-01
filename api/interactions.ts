import { IncomingMessage, ServerResponse } from 'http';
import { verifyDiscordSignature } from '../src/security/verify';
import { handlePing } from '../src/handlers/ping';
import { handleSetupRolesCommand } from '../src/handlers/commands';
import { handleComponentInteraction } from '../src/handlers/components';
import { DiscordInteraction } from '../src/types/discord';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper to get raw request body from Node.js IncomingMessage
async function getRawBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      resolve(body);
    });
    req.on('error', err => {
      reject(err);
    });
  });
}

// Helper to send JSON responses
function sendJSON(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    return res.end('Method Not Allowed');
  }

  try {
    const signature = req.headers['x-signature-ed25519'] as string | undefined;
    const timestamp = req.headers['x-signature-timestamp'] as string | undefined;

    const rawBody = await getRawBody(req);

    const isValid = await verifyDiscordSignature(rawBody, signature || null, timestamp || null);
    if (!isValid) {
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      return res.end('Invalid request signature');
    }

    const interaction = JSON.parse(rawBody) as DiscordInteraction;

    // Interaction Type 1: PING (Verification challenge)
    if (interaction.type === 1) {
      const response = handlePing();
      return sendJSON(res, 200, response);
    }

    // Interaction Type 2: APPLICATION_COMMAND (Slash commands)
    if (interaction.type === 2) {
      const commandName = interaction.data?.name;
      if (commandName === 'setup-roles') {
        const response = handleSetupRolesCommand(interaction);
        return sendJSON(res, 200, response);
      }

      return sendJSON(res, 400, { error: 'Unknown command' });
    }

    // Interaction Type 3: MESSAGE_COMPONENT (Buttons, Select Menus, Dropdowns)
    if (interaction.type === 3) {
      const response = await handleComponentInteraction(interaction);
      return sendJSON(res, 200, response);
    }

    return sendJSON(res, 400, { error: 'Unsupported interaction type' });
  } catch (error) {
    console.error('Error handling interaction:', error);
    return sendJSON(res, 500, { error: 'Internal Server Error' });
  }
}
