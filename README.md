# Discord Serverless Role Bot

A lightweight, serverless Discord bot deployed on Vercel that allows users to self-assign roles using interactive select menus (dropdowns).

## Features
- **Serverless Endpoint:** Hosted on Vercel, utilizing Node.js serverless functions with zero websocket or polling requirements.
- **Secure:** Validates incoming payloads using Ed25519 signature verification (required by Discord).
- **Interactive UI:** Provides a beautiful dropdown selection component allowing multi-role assignment.
- **Fast Cold Starts:** Native implementation without heavy dependencies (e.g. no full `discord.js` bundle) ensures rapid serverless function execution.

---

## Setup & Deployment Guide

### 1. Create a Discord Bot Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give your bot a name.
3. In the **General Information** section:
   - Copy the **Application ID**.
   - Copy the **Public Key**.
4. In the **Bot** section:
   - Click **Reset Token** and copy the **Bot Token**.
   - Ensure the bot does not need any privileged gateway intents (they are not needed for serverless HTTP interactions).

### 2. Configure Local Project
1. Create a `.env` file in the root directory by copying the template:
   ```bash
   cp .env.example .env
   ```
2. Populate the `.env` variables:
   - `DISCORD_PUBLIC_KEY`: Your application's Public Key.
   - `DISCORD_BOT_TOKEN`: Your bot's Token.
   - `DISCORD_APPLICATION_ID`: Your application's ID.
   - `GUILD_ID`: (Highly recommended for testing) The ID of your test server.

3. Install dependencies:
   ```bash
   npm install
   ```

### 3. Setup Discord Roles Configuration
Open `src/config/roles.ts` and modify the `ASSIGNABLE_ROLES` array with your server's role labels, descriptions, emojis, and exact Role IDs.
- Ensure the Discord Bot's role in your server is ordered **above** all roles it is trying to assign. You can change this in **Server Settings > Roles** by dragging the bot's integration role to the top.
- Give the bot the **Manage Roles** permission.

### 4. Register Slash Commands
Run the command registration script to register `/setup-roles`:
```bash
npm run register
```
*Note: If `GUILD_ID` is defined in `.env`, the command registers instantly for that server. If omitted, it registers globally, which can take up to 1 hour to propagate.*

### 5. Deploy to Vercel
1. Install Vercel CLI locally if not already:
   ```bash
   npm install -g vercel
   ```
2. Run `vercel` in the project root to deploy a preview or `vercel --prod` to deploy to production:
   ```bash
   vercel --prod
   ```
3. Set your environment variables in the Vercel dashboard:
   - `DISCORD_PUBLIC_KEY`
   - `DISCORD_BOT_TOKEN`
   - `DISCORD_APPLICATION_ID`
4. Copy the deployment URL (e.g., `https://your-bot-domain.vercel.app`).

### 6. Connect Discord to Vercel
1. Go back to the [Discord Developer Portal](https://discord.com/developers/applications) for your bot.
2. In the **General Information** page, paste your Vercel deployment interactions endpoint into the **Interactions Endpoint URL** field:
   `https://your-bot-domain.vercel.app/api/interactions`
3. Click **Save Changes**. Discord will test your endpoint by sending a `PING` payload. Your serverless function will automatically reply with a `PONG`, validating the URL.

---

## Usage
1. Invite the bot to your server using the OAuth2 URL Generator (Select `bot` and `applications.commands` scopes, and `Manage Roles` permission).
2. Type `/setup-roles` in the target channel where you want the role picker message.
3. Users can now select and deselect roles dynamically!
