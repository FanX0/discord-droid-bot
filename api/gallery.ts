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
  const channelId = process.env.GALLERY_CHANNEL_ID || process.env.ANNOUNCEMENTS_CHANNEL_ID;

  if (!botToken || !channelId) {
    return new Response(
      JSON.stringify({ error: 'Server misconfigured' }),
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages?limit=50`,
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

    const galleryItems: any[] = [];
    (messages as any[]).forEach((msg) => {
      // 1. Extract from attachments
      if (msg.attachments && msg.attachments.length > 0) {
        msg.attachments.forEach((att: any) => {
          if (att.width && att.height) { // Ensure it is an image/video
            galleryItems.push({
              id: att.id,
              img: att.url,
              url: att.url,
              text: msg.content || att.filename || 'Gallery Image',
              height: att.height,
              author: msg.author?.username || 'Unknown',
              timestamp: msg.timestamp
            });
          }
        });
      }

      // 2. Extract from embeds
      if (msg.embeds && msg.embeds.length > 0) {
        msg.embeds.forEach((embed: any, idx: number) => {
          if (embed.image && embed.image.url) {
            galleryItems.push({
              id: `${msg.id}-embed-${idx}`,
              img: embed.image.url,
              url: embed.url || embed.image.url,
              text: embed.title || msg.content || 'Embedded Image',
              height: embed.image.height || 450,
              author: msg.author?.username || 'Unknown',
              timestamp: msg.timestamp
            });
          }
        });
      }
    });

    return new Response(JSON.stringify(galleryItems), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error: any) {
    console.error('Failed to fetch gallery items:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch gallery items' }),
      { status: 500, headers: corsHeaders }
    );
  }
}
