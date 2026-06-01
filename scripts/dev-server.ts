import fs from 'fs';
import path from 'path';
import http from 'http';

// Load .env manually if it exists
try {
  const envPath = path.resolve(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    for (const line of envContent.split(/\r?\n/)) {
      if (line.trim().startsWith('#') || !line.includes('=')) continue;
      const delimiterIndex = line.indexOf('=');
      const key = line.slice(0, delimiterIndex).trim();
      let value = line.slice(delimiterIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  }
} catch (error) {
  console.warn('Warning: Could not read .env file', error);
}

// Dynamically import the handler
import handler from '../api/interactions';

const PORT = process.env.PORT || 3001;

const server = http.createServer(async (req, res) => {
  // Convert Node.js IncomingMessage to Web Request for the Edge handler
  const url = `http://localhost:${PORT}${req.url}`;
  
  // Create a stream from the Node request
  const bodyStream = req.method !== 'GET' && req.method !== 'HEAD' ? new ReadableStream({
    start(controller) {
      req.on('data', chunk => controller.enqueue(chunk));
      req.on('end', () => controller.close());
      req.on('error', err => controller.error(err));
    }
  }) : undefined;

  const request = new Request(url, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: bodyStream,
    // @ts-ignore - Required for Node.js fetch with custom streams
    duplex: 'half'
  });

  try {
    const response = await handler(request);
    
    // Convert Web Response back to Node.js ServerResponse
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.statusCode = response.status;
    res.end(await response.text());
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(PORT, () => {
  console.log(`🚀 Local dev server running at http://localhost:${PORT}`);
  console.log(`👉 Expose this port (e.g., using ngrok) and set your Discord Interactions URL to:`);
  console.log(`   https://<your-tunnel-domain>/api/interactions`);
});
