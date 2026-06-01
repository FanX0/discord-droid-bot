import { DiscordInteraction, DiscordResponse } from '../types/discord';
import { GENDER_ROLES, MOBILE_GAME_ROLES, PC_GAME_ROLES } from '../config/roles';
import { addRoleToMember, removeRoleFromMember } from '../services/discord-api';

export async function handleComponentInteraction(interaction: DiscordInteraction): Promise<DiscordResponse> {
  const customId = interaction.data?.custom_id;

  // Handle Welcome Embed Button Interactions
  if (customId === 'welcome_droid') {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `🌌 **Tentang Droid:**\nDroid adalah server komunitas luar biasa tempat berkumpulnya kreator, gamer, seniman, dan penggemar anime! Di sini kamu bisa berdiskusi, berbagi hobi, dan bertemu teman baru dengan minat yang sama.`,
      },
    };
  }
  if (customId === 'welcome_roles_info') {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `👤 **Panduan Roles Info:**\nKamu bisa menyesuaikan profile kamu dengan mengambil roles di channel khusus kami di sini: <#827508832041173042>.\n\nSilahkan kunjungi channel tersebut untuk memilih gender role dan gaming role yang kamu inginkan!`,
      },
    };
  }
  if (customId === 'welcome_official_link') {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `🔗 **Official Links:**\n- 🌐 Website: [Droid](https://droid.com)`,
      },
    };
  }
  if (customId === 'welcome_music_bot') {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `🎵 **Cara Memutar Musik di Droid Server:**\n\n` +
                 `Kami menyediakan berbagai pilihan Music Bot menarik untuk menemani kamu:\n\n` +
                 `🥞 **1. Pancake Bot (Prefix: \`p!\`)**\n` +
                 `- 🎶 **Play Lagu:** \`p!play [Nama Lagu / Link YouTube]\` *(Contoh: \`p!play Lathi\`)*\n` +
                 `- ⏭️ **Skip Lagu:** \`p!skip\` (Melompati lagu)\n` +
                 `- ⏹️ **Stop Musik:** \`p!stop\` (Mengeluarkan bot)\n\n` +
                 `🎧 **2. Jockie Music (Prefix: \`m!\`)**\n` +
                 `- 🎶 **Play Lagu:** \`m!play [Nama Lagu / Link Spotify]\` *(Contoh: \`m!play Starboy\`)*\n` +
                 `- ⏭️ **Skip Lagu:** \`m!skip\` (Melompati lagu)\n` +
                 `- ⏹️ **Stop Musik:** \`m!stop\` (Mengeluarkan bot)\n\n` +
                 `📻 **3. Lofi Radio (Slash Commands)**\n` +
                 `- 🎶 **Start Radio:** \`/play\` (Memulai siaran Lofi Radio 24/7)\n` +
                 `- ⏹️ **Stop Radio:** \`/stop\` (Menghentikan radio)\n\n` +
                 `☁️ **4. Soundcloud Bot (Slash Commands)**\n` +
                 `- 🎶 **Play Lagu:** \`/play [Nama Lagu / Link Soundcloud]\`\n` +
                 `- ⏭️ **Skip Lagu:** \`/skip\` (Melompati lagu)\n` +
                 `- ⏹️ **Stop Musik:** \`/stop\` (Mengeluarkan bot)\n\n` +
                 `⚠️ *Catatan: Anda harus bergabung ke salah satu Voice Channel terlebih dahulu sebelum memanggil bot musik di atas!*`,
      },
    };
  }

  let selectedRolesConfig: readonly { label: string; value: string; description: string; emoji: { name: string } }[] = [];

  if (customId === 'role_select_gender') {
    selectedRolesConfig = GENDER_ROLES;
  } else if (customId === 'role_select_mobile') {
    selectedRolesConfig = MOBILE_GAME_ROLES;
  } else if (customId === 'role_select_pc') {
    selectedRolesConfig = PC_GAME_ROLES;
  } else {
    return {
      type: 4,
      data: {
        flags: 64, // Ephemeral
        content: 'Unknown component interaction.',
      },
    };
  }

  const guildId = interaction.guild_id;
  const member = interaction.member;

  if (!guildId || !member) {
    return {
      type: 4,
      data: {
        flags: 64, // Ephemeral
        content: 'This interaction can only be used in a Discord Server.',
      },
    };
  }

  const userId = member.user.id;
  const selectedRoleIds = interaction.data?.values || [];
  const currentMemberRoleIds = member.roles || [];

  // Filter out assignable roles list to prevent illegal role manipulation
  const assignableRoleIds: string[] = selectedRolesConfig.map(role => role.value as string);

  // Determine roles to add: selected by user, but they don't already have
  const rolesToAdd = selectedRoleIds.filter(
    roleId => assignableRoleIds.includes(roleId) && !currentMemberRoleIds.includes(roleId)
  );

  // Determine roles to remove: not selected by user, but they currently have, and are managed by this select category
  const rolesToRemove = assignableRoleIds.filter(
    roleId => !selectedRoleIds.includes(roleId) && currentMemberRoleIds.includes(roleId)
  );

  try {
    const addPromises = rolesToAdd.map(roleId => addRoleToMember(guildId, userId, roleId));
    const removePromises = rolesToRemove.map(roleId => removeRoleFromMember(guildId, userId, roleId));
    
    await Promise.all([...addPromises, ...removePromises]);

    // Construct response details
    const addedRoleLabels = selectedRolesConfig.filter(r => rolesToAdd.includes(r.value)).map(r => r.label);
    const removedRoleLabels = selectedRolesConfig.filter(r => rolesToRemove.includes(r.value)).map(r => r.label);

    let content = 'No roles were modified.';
    if (addedRoleLabels.length > 0 && removedRoleLabels.length > 0) {
      content = `Added: **${addedRoleLabels.join(', ')}**\nRemoved: **${removedRoleLabels.join(', ')}**`;
    } else if (addedRoleLabels.length > 0) {
      content = `Added: **${addedRoleLabels.join(', ')}**`;
    } else if (removedRoleLabels.length > 0) {
      content = `Removed: **${removedRoleLabels.join(', ')}**`;
    }

    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        flags: 64, // EPHEMERAL
        content: `✅ Roles updated successfully!\n\n${content}`,
      },
    };
  } catch (error: any) {
    console.error('Error modifying member roles:', error);
    return {
      type: 4,
      data: {
        flags: 64,
        content: `❌ **Failed to update roles:**\n\`${error?.message || error}\`\n\n**Common Solutions:**\n1. Go to **Server Settings > Roles** and drag your Bot's role to the **very top** (above the roles it is assigning).\n2. Ensure Vercel Environment Variables (\`DISCORD_BOT_TOKEN\`) are configured correctly in Vercel Dashboard.\n3. Make sure the role IDs in \`src/config/roles.ts\` are completely correct and match your server roles.`,
      },
    };
  }
}
