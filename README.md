# 🤖 Droid Discord Bot (Serverless)

A highly advanced, ultra-fast, and **100% Free** serverless Discord Bot deployed on Vercel Edge Runtime. It handles interactive UI components, auto-roles, mini-games, and custom embeds without requiring a 24/7 server or database.

## ✨ Premium Features

- **⚡ Serverless Architecture:** Runs on Vercel Edge Functions. Zero downtime, zero hosting costs, and instant cold starts using native Web APIs.
- **🛡️ Secure Verification:** Validates Discord Ed25519 webhook signatures securely.
- **🎨 Custom Embed Builder (`/embed`):** An exclusive Admin tool to build and post rich announcement embeds via an interactive popup form (Discord Modals).
- **🤫 Anonymous Confess (`/confess`):** Allows members to submit anonymous confessions/messages which are securely forwarded to a public channel via beautiful embeds.
- **🎮 Stateless Tic-Tac-Toe (`/tictactoe`):** An interactive minigame played against the Bot directly in chat using Button components (no database required!).
- **🎭 Advanced Auto-Role Catalogs:** 
  - Welcome Banner (`/setup-start`)
  - Server Rules & Auto-Verification (`/setup-rules`)
  - Gender Roles (`/setup-gender`)
  - PC Games Roles (`/setup-pc-games`)
  - Mobile Games Roles (`/setup-mobile-games`)
  - Age Roles (`/setup-age`)
  - Domicile Roles (`/setup-domicile`)

---

## 🚀 Setup & Deployment Guide

### 1. Create a Discord Bot Application
1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give your bot a name (e.g., "Droid").
3. In the **General Information** section:
   - Copy the **Application ID**.
   - Copy the **Public Key**.
4. In the **Bot** section:
   - Click **Reset Token** and copy the **Bot Token**.
   - Ensure the bot does not need any privileged gateway intents (they are not needed for serverless HTTP interactions).

### 2. Configure Environment Variables
1. Clone the repository and create a `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Populate the `.env` variables with your Discord Server details:
   - `DISCORD_PUBLIC_KEY`: Your application's Public Key.
   - `DISCORD_BOT_TOKEN`: Your bot's Token.
   - `DISCORD_APPLICATION_ID`: Your application's ID.
   - `GUILD_ID`: The ID of your Discord server.
   - `ADMIN_ROLE_ID`: The Role ID for server Staff/Admins (required to run `/setup-*` and `/embed` commands).
   - `VERIFIED_ROLE_ID`: The Role ID given automatically when a user agrees to the Rules.
   - `CONFESS_CHANNEL_ID`: The Text Channel ID where Anonymous Confessions will be posted.

### 3. Setup Discord Roles Configuration
1. Open `src/config/roles.ts` and modify the arrays (`GENDER_ROLES`, `PC_GAMES_ROLES`, etc.) to match the exact **Role IDs** of your server.
2. In your Discord Server Settings > Roles, ensure the **Bot's integration role is dragged to the very top** of the role list, or it will not have permission to assign roles to users.

### 4. Register Slash Commands
Run the command registration script to sync all slash commands to your server:
```bash
npm install
npm run register
```
*Note: Ensure `GUILD_ID` is set in your `.env` so commands register instantly.*

### 5. Deploy to Vercel (100% Free)
1. Install Vercel CLI locally:
   ```bash
   npm install -g vercel
   ```
2. Run `vercel --prod` in the project root to deploy to production.
3. **CRITICAL:** Add all your `.env` variables to the **Vercel Dashboard > Settings > Environment Variables** and redeploy.
4. Copy your production deployment URL (e.g., `https://droid-bot.vercel.app`).

### 6. Connect Discord to Vercel Webhook
1. Go back to the [Discord Developer Portal](https://discord.com/developers/applications).
2. In the **General Information** page, paste your Vercel URL with `/api/interactions` at the end into the **Interactions Endpoint URL** field:
   `https://droid-bot.vercel.app/api/interactions`
3. Click **Save Changes**. Discord will test your endpoint. If configured correctly, it will show a success message!

---

## 🛠️ Usage Commands

| Command | Permission | Description |
|---------|------------|-------------|
| `/setup-start` | Admin | Spawns the main Welcome embed. |
| `/setup-rules` | Admin | Spawns the Rules panel with the Verify button. |
| `/setup-gender`, `/setup-age`, dll | Admin | Spawns role selection dropdown menus. |
| `/embed` | Admin | Opens a modal to create a custom rich embed. |
| `/confess` | Public | Opens a modal to submit an anonymous confession. |
| `/tictactoe` | Public | Spawns a Tic-Tac-Toe minigame board. |
