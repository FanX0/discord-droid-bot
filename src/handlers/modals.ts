import { DiscordInteraction, DiscordResponse } from "../types/discord";
import { DISCORD_CONFIG } from "../config/roles";
import { sendMessageToChannel } from "../services/discord-api";

function getInputValue(interaction: DiscordInteraction, customId: string): string | undefined {
  const rows = interaction.data?.components || [];
  for (const row of rows) {
    const input = row.components?.find((c) => c.custom_id === customId);
    if (input) return input.value;
  }
  return undefined;
}

export async function handleModalInteraction(
  interaction: DiscordInteraction,
): Promise<DiscordResponse> {
  const customId = interaction.data?.custom_id;

  if (customId === "modal_confess") {
    const confessMessage = getInputValue(interaction, "confess_message");
    const confessChannelId = DISCORD_CONFIG.confessChannelId;

    if (!confessChannelId || confessChannelId === "YOUR_CONFESS_CHANNEL_ID_HERE") {
      return {
        type: 4,
        data: {
          flags: 64, // Ephemeral
          content: "❌ **Gagal mengirim confess:** Channel Confess belum dikonfigurasi oleh Admin (CONFESS_CHANNEL_ID belum diset di Vercel).",
        },
      };
    }

    if (!confessMessage) {
      return {
        type: 4,
        data: {
          flags: 64,
          content: "❌ Pesan confess tidak boleh kosong.",
        },
      };
    }

    try {
      // Send the confession to the public confess channel
      await sendMessageToChannel(confessChannelId, {
        embeds: [
          {
            title: "🤫 Anonymous Confession",
            description: confessMessage,
            color: 0x9B59B6, // Amethyst purple
            timestamp: new Date().toISOString(),
            footer: {
              text: "Ingin curhat/confess secara rahasia? Ketik /confess di server ini!",
            },
          },
        ],
      });

      return {
        type: 4,
        data: {
          flags: 64,
          content: "✅ **Sukses!** Pesan rahasiamu berhasil dikirim ke channel confess secara 100% anonim. 🤫",
        },
      };
    } catch (error: any) {
      console.error("Failed to post confession:", error);
      return {
        type: 4,
        data: {
          flags: 64,
          content: `❌ **Gagal mengirim confess:**\n\`${error?.message || error}\``,
        },
      };
    }
  }

  if (customId === "modal_embed") {
    const title = getInputValue(interaction, "embed_title") || "Pengumuman";
    const description = getInputValue(interaction, "embed_description") || "";
    const colorInput = getInputValue(interaction, "embed_color") || "";
    const imageInput = getInputValue(interaction, "embed_image") || "";
    const currentChannelId = interaction.channel_id;

    if (!currentChannelId) {
      return {
        type: 4,
        data: {
          flags: 64,
          content: "❌ Gagal mendeteksi channel aktif tempat command dijalankan.",
        },
      };
    }

    // Parse hex color to integer
    let colorHex = colorInput.replace("#", "").trim();
    let colorDec = 0x3498DB; // Default blue
    if (colorHex && /^[0-9A-F]{6}$/i.test(colorHex)) {
      colorDec = parseInt(colorHex, 16);
    }

    const embed: any = {
      title,
      description,
      color: colorDec,
      timestamp: new Date().toISOString(),
    };

    if (imageInput && imageInput.startsWith("http")) {
      embed.image = { url: imageInput };
    }

    try {
      // Send the announcement embed to the current channel
      await sendMessageToChannel(currentChannelId, { embeds: [embed] });

      return {
        type: 4,
        data: {
          flags: 64,
          content: "✅ **Sukses!** Pengumuman Rich Embed berhasil dibuat dan dikirim ke channel ini!",
        },
      };
    } catch (error: any) {
      console.error("Failed to post announcement embed:", error);
      return {
        type: 4,
        data: {
          flags: 64,
          content: `❌ **Gagal membuat embed:**\n\`${error?.message || error}\``,
        },
      };
    }
  }

  return {
    type: 4,
    data: {
      flags: 64,
      content: "Unknown modal interaction.",
    },
  };
}
