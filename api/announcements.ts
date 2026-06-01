export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const botToken = process.env.DISCORD_BOT_TOKEN;
  const channelId = process.env.ANNOUNCEMENTS_CHANNEL_ID;

  if (!botToken || !channelId) {
    return new Response(
      JSON.stringify({ error: 'Server misconfigured' }),
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages?limit=10`,
      {
        headers: {
          Authorization: `Bot ${botToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Discord API returned ${response.status}`);
    }

    const messages = await response.json();

    // Filter messages that contain embeds and map to a clean shape
    const announcements = (messages as any[])
      .filter((msg) => msg.embeds && msg.embeds.length > 0)
      .map((msg) => {
        const embed = msg.embeds[0];
        return {
          id: msg.id,
          title: embed.title || 'Announcement',
          description: embed.description || '',
          color: embed.color || 0x3498db,
          image_url: embed.image?.url || null,
          timestamp: embed.timestamp || msg.timestamp,
        };
      });

    return new Response(JSON.stringify(announcements), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error('Failed to fetch announcements:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch announcements' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
