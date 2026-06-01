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

const server = http.createServer((req, res) => {
  // Delegate all requests to the Vercel handler
  handler(req, res);
});

server.listen(PORT, () => {
  console.log(`🚀 Local dev server running at http://localhost:${PORT}`);
  console.log(`👉 Expose this port (e.g., using ngrok) and set your Discord Interactions URL to:`);
  console.log(`   https://<your-tunnel-domain>/api/interactions`);
});
