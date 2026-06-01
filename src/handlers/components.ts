import { DiscordInteraction, DiscordResponse } from "../types/discord";
import {
  GENDER_ROLES,
  MOBILE_GAME_ROLES,
  PC_GAME_ROLES,
  AGE_ROLES,
  DOMICILE_ROLES,
} from "../config/roles";
import { addRoleToMember, removeRoleFromMember } from "../services/discord-api";

export async function handleComponentInteraction(
  interaction: DiscordInteraction,
): Promise<DiscordResponse> {
  const customId = interaction.data?.custom_id;

  // Handle Tic-Tac-Toe Buttons
  if (customId?.startsWith('ttt_')) {
    const parts = customId.split('_');
    const moveIndex = parseInt(parts[1], 10);
    let boardState = parts[2];

    // If game is already over, don't do anything
    if (boardState.includes('W') || boardState.includes('D')) {
      return { type: 6 }; // DEFERRED_UPDATE_MESSAGE (do nothing)
    }

    let board = boardState.split('');

    // If cell is not empty, ignore
    if (board[moveIndex] !== '_') {
      return { type: 6 };
    }

    // User move (X)
    board[moveIndex] = 'X';

    // Check Win/Draw helper
    const checkWin = (b: string[]) => {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];
      for (const [x, y, z] of lines) {
        if (b[x] !== '_' && b[x] === b[y] && b[y] === b[z]) return b[x];
      }
      if (!b.includes('_')) return 'D'; // Draw
      return null;
    };

    let result = checkWin(board);
    
    // Bot move (O) if game not over
    if (!result) {
      const emptyIndices = board.map((v, i) => v === '_' ? i : -1).filter(i => i !== -1);
      if (emptyIndices.length > 0) {
        // Very simple random AI
        const botMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        board[botMove] = 'O';
        result = checkWin(board);
      }
    }

    const newBoardState = board.join('');
    
    let content = "🎮 **Tic-Tac-Toe Minigame**\nGiliranmu! Kamu adalah **❌** dan Droid adalah **⭕**.";
    if (result === 'X') content = "🏆 **Kamu Menang!** Hebat sekali!";
    else if (result === 'O') content = "🤖 **Droid Menang!** Coba lagi yuk!";
    else if (result === 'D') content = "🤝 **Seri!** Pertandingan yang sengit!";

    const createButton = (index: number) => {
      const val = board[index];
      let emoji = "⬜";
      let style = 2; // Secondary
      if (val === 'X') { emoji = "❌"; style = 4; } // Danger
      if (val === 'O') { emoji = "⭕"; style = 3; } // Success
      
      return {
        type: 2, // Button
        style,
        custom_id: `ttt_${index}_${newBoardState}${result ? 'W' : ''}`, // add 'W' to lock board if over
        emoji: { name: emoji },
        disabled: val !== '_' || !!result
      };
    };

    return {
      type: 7, // UPDATE_MESSAGE
      data: {
        content,
        components: [
          { type: 1, components: [createButton(0), createButton(1), createButton(2)] },
          { type: 1, components: [createButton(3), createButton(4), createButton(5)] },
          { type: 1, components: [createButton(6), createButton(7), createButton(8)] }
        ]
      }
    };
  }

  // Handle Welcome Embed Button Interactions
  if (customId === "welcome_droid") {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `🌌 **Tentang Droid:**\nDroid adalah server komunitas luar biasa tempat berkumpulnya kreator, gamer, seniman, dan penggemar anime! Di sini kamu bisa berdiskusi, berbagi hobi, dan bertemu teman baru dengan minat yang sama.`,
      },
    };
  }
  if (customId === "welcome_roles_info") {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `👤 **Panduan Roles Info:**\nUntuk memilih role, Silahkan pilih Role Catalog yang tersedia di sini: <#827508832041173042>`,
      },
    };
  }
  if (customId === "welcome_official_link") {
    return {
      type: 4,
      data: {
        flags: 64,
        content: `🔗 **Official Links:**\n- 🌐 Website: [Droid](https://droid.com)`,
      },
    };
  }
  if (customId === "welcome_music_bot") {
    return {
      type: 4,
      data: {
        flags: 64,
        content:
          `🎵 **Cara Memutar Musik di Droid Server:**\n\n` +
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
  if (customId === 'rules_agree') {
    const guildId = interaction.guild_id;
    const member = interaction.member;
    const verifiedRoleId = process.env.VERIFIED_ROLE_ID;

    if (!guildId || !member) {
      return {
        type: 4,
        data: {
          flags: 64,
          content: '❌ Interaksi ini hanya bisa digunakan di dalam server.',
        },
      };
    }

    // Check if user already has the verified role
    if (verifiedRoleId && member.roles.includes(verifiedRoleId)) {
      return {
        type: 4,
        data: {
          flags: 64,
          content: '✅ Kamu sudah terverifikasi sebelumnya! Selamat menikmati server **Droid**! 🎉',
        },
      };
    }

    if (verifiedRoleId) {
      try {
        await addRoleToMember(guildId, member.user.id, verifiedRoleId);
      } catch (error: any) {
        console.error('Error assigning verified role:', error);
        return {
          type: 4,
          data: {
            flags: 64,
            content: `❌ **Gagal memberikan role Verified:**\n\`${error?.message || error}\`\n\nPastikan role Bot berada di atas role Verified di Server Settings > Roles.`,
          },
        };
      }
    }

    return {
      type: 4,
      data: {
        flags: 64,
        content: `🎉 **Terima kasih telah membaca dan menyetujui Rules!**\nKamu telah mendapatkan role **Verified** ✅\n\nSelamat datang secara resmi di **Droid Server**! Silahkan jelajahi server, ikuti diskusi, patuhi peraturan, dan bersenang-senanglah bersama anggota lainnya! 🚀`,
      },
    };
  }

  let selectedRolesConfig: readonly {
    label: string;
    value: string;
    description: string;
    emoji: { name: string };
  }[] = [];

  if (customId === "role_select_gender") {
    selectedRolesConfig = GENDER_ROLES;
  } else if (customId === "role_select_mobile") {
    selectedRolesConfig = MOBILE_GAME_ROLES;
  } else if (customId === "role_select_pc") {
    selectedRolesConfig = PC_GAME_ROLES;
  } else if (customId === "role_select_age") {
    selectedRolesConfig = AGE_ROLES;
  } else if (customId === "role_select_domicile") {
    selectedRolesConfig = DOMICILE_ROLES;
  } else {
    return {
      type: 4,
      data: {
        flags: 64, // Ephemeral
        content: "Unknown component interaction.",
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
        content: "This interaction can only be used in a Discord Server.",
      },
    };
  }

  const userId = member.user.id;
  const selectedRoleIds = interaction.data?.values || [];
  const currentMemberRoleIds = member.roles || [];

  // Filter out assignable roles list to prevent illegal role manipulation
  const assignableRoleIds: string[] = selectedRolesConfig.map(
    (role) => role.value as string,
  );

  // Determine roles to add: selected by user, but they don't already have
  const rolesToAdd = selectedRoleIds.filter(
    (roleId) =>
      assignableRoleIds.includes(roleId) &&
      !currentMemberRoleIds.includes(roleId),
  );

  // Determine roles to remove: not selected by user, but they currently have, and are managed by this select category
  const rolesToRemove = assignableRoleIds.filter(
    (roleId) =>
      !selectedRoleIds.includes(roleId) &&
      currentMemberRoleIds.includes(roleId),
  );

  try {
    const addPromises = rolesToAdd.map((roleId) =>
      addRoleToMember(guildId, userId, roleId),
    );
    const removePromises = rolesToRemove.map((roleId) =>
      removeRoleFromMember(guildId, userId, roleId),
    );

    await Promise.all([...addPromises, ...removePromises]);

    // Construct response details
    const addedRoleLabels = selectedRolesConfig
      .filter((r) => rolesToAdd.includes(r.value))
      .map((r) => r.label);
    const removedRoleLabels = selectedRolesConfig
      .filter((r) => rolesToRemove.includes(r.value))
      .map((r) => r.label);

    let content = "No roles were modified.";
    if (addedRoleLabels.length > 0 && removedRoleLabels.length > 0) {
      content = `Added: **${addedRoleLabels.join(", ")}**\nRemoved: **${removedRoleLabels.join(", ")}**`;
    } else if (addedRoleLabels.length > 0) {
      content = `Added: **${addedRoleLabels.join(", ")}**`;
    } else if (removedRoleLabels.length > 0) {
      content = `Removed: **${removedRoleLabels.join(", ")}**`;
    }

    return {
      type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
      data: {
        flags: 64, // EPHEMERAL
        content: `✅ Roles updated successfully!\n\n${content}`,
      },
    };
  } catch (error: any) {
    console.error("Error modifying member roles:", error);
    return {
      type: 4,
      data: {
        flags: 64,
        content: `❌ **Failed to update roles:**\n\`${error?.message || error}\`\n\n**Common Solutions:**\n1. Go to **Server Settings > Roles** and drag your Bot's role to the **very top** (above the roles it is assigning).\n2. Ensure Vercel Environment Variables (\`DISCORD_BOT_TOKEN\`) are configured correctly in Vercel Dashboard.\n3. Make sure the role IDs in \`src/config/roles.ts\` are completely correct and match your server roles.`,
      },
    };
  }
}
