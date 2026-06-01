import { DiscordInteraction, DiscordResponse } from "../types/discord";
import {
  GENDER_ROLES,
  MOBILE_GAME_ROLES,
  PC_GAME_ROLES,
  AGE_ROLES,
  DOMICILE_ROLES,
  BANNERS,
} from "../config/roles";

export function handleSetupGenderCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  const options = GENDER_ROLES.map((role) => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji,
  }));

  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: "🙋‍♂️ Profile Gender Selection",
          description:
            "Silahkan pilih gender kamu dibawah ini untuk mendapatkan role gender!",
          color: 0x5865f2, // Discord Blurple
          image: {
            url: BANNERS.GENDER,
          },
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelect
              custom_id: "role_select_gender",
              placeholder: "Choose your gender...",
              min_values: 0,
              max_values: 1, // Single choice
              options: options,
            },
          ],
        },
      ],
    },
  };
}

export function handleSetupMobileGamesCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  const options = MOBILE_GAME_ROLES.map((role) => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji,
  }));

  return {
    type: 4,
    data: {
      embeds: [
        {
          title: "📱 Mobile Games Catalog",
          description:
            "Silahkan pilih roles sesuai dengan keinginan kamu untuk mengakses channel yang tersedia dibawah sini!",
          color: 0x2ecc71, // Green
          image: {
            url: BANNERS.MOBILE_GAMES,
          },
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: "role_select_mobile",
              placeholder: "Choose Mobile Games...",
              min_values: 0,
              max_values: options.length,
              options: options,
            },
          ],
        },
      ],
    },
  };
}

export function handleSetupPcGamesCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  const options = PC_GAME_ROLES.map((role) => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji,
  }));

  return {
    type: 4,
    data: {
      embeds: [
        {
          title: "🖥️ PC & Console Games Catalog",
          description:
            "Silahkan pilih roles sesuai dengan keinginan kamu untuk mengakses channel yang tersedia dibawah sini!",
          color: 0x9b59b6, // Purple
          image: {
            url: BANNERS.PC_GAMES,
          },
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: "role_select_pc",
              placeholder: "Choose PC Games...",
              min_values: 0,
              max_values: options.length,
              options: options,
            },
          ],
        },
      ],
    },
  };
}

export function handleSetupStartCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: "Get Started!",
          description:
            "Selamat datang di **Droid Server**!\n\n" +
            "Channel ini bertujuan untuk membantu para **Droids** untuk memahami lebih lanjut mengenai **Droid** dan menjawab pertanyaan yang sering diajukan!\n\n" +
            "**Let's get started!**\n" +
            "Untuk memilih role, Silahkan pilih Genre Catalog yang tersedia di sini: <#827508832041173042>\n\n" +
            "Jika kamu ingin check **Official Links** kita, mengetahui apa itu Droid, memahami lebih lanjut server **Droid** dan mendapatkan beberapa tips yang sangat berguna untuk **Mencegah Tindakan Penipuan**, maka kamu berada di channel yang tepat!\n\n" +
            "Silahkan gunakan tombol di bawah ini untuk mendapatkan informasi lebih lanjut mengenai subjek yang ingin kamu pelajari!",
          color: 0xe67e22, // Orange/Warm color matching the START HERE theme
          image: {
            url: BANNERS.START_HERE,
          },
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 2, // Button
              style: 1, // Primary (Blurple)
              custom_id: "welcome_droid",
              label: "Droid",
              emoji: { name: "🌌" },
            },
            {
              type: 2, // Button
              style: 3, // Success (Green)
              custom_id: "welcome_roles_info",
              label: "Roles Info",
              emoji: { name: "👤" },
            },
            {
              type: 2, // Button
              style: 3, // Success (Green)
              custom_id: "welcome_official_link",
              label: "Official Link",
              emoji: { name: "🔗" },
            },
            {
              type: 2, // Button
              style: 1, // Primary (Blurple)
              custom_id: "welcome_music_bot",
              label: "Bot Command",
              emoji: { name: "🎵" },
            },
          ],
        },
      ],
    },
  };
}

export function handleSetupRulesCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: "📜 SERVER RULES | DROID SERVER",
          description:
            "Selamat datang di **Droid Server**! Demi kenyamanan bersama seluruh anggota (**Droids**), harap patuhi peraturan resmi kami di bawah ini:\n\n" +
            "1. 🤝 **Saling Menghormati (Respect Each Other)**\n" +
            "Perlakukan seluruh anggota dengan hormat. Dilarang keras melakukan pelecehan, intimidasi, ujaran kebencian, diskriminasi (SARA), atau perundungan.\n\n" +
            "2. 🚫 **No Drama & Toxic Behavior**\n" +
            "Jaga atmosfer server agar tetap positif dan kondusif. Hindari memicu perdebatan yang tidak sehat atau drama antar anggota.\n\n" +
            "3. 🔞 **No NSFW Content**\n" +
            "Dilarang keras membagikan konten berbau pornografi, kekerasan (gore), atau konten sensitif lainnya dalam bentuk apa pun (teks, gambar, video, link).\n\n" +
            "4. 💬 **Gunakan Channel Sesuai Fungsinya**\n" +
            "Pastikan Anda mengirimkan pesan di channel yang tepat (misal: bot musik hanya di text channel musik, obrolan umum di #general).\n\n" +
            "5. 📢 **No Spamming & Self-Promotion**\n" +
            "Dilarang melakukan spamming (teks, emoji, mention massal) dan membagikan link promosi server Discord lain atau iklan pribadi tanpa izin staff.\n\n" +
            "6. 🛡️ **Pencegahan Scam & Keamanan**\n" +
            "Dilarang membagikan tautan mencurigakan (phishing, scam, gift Nitro palsu). Selalu jaga kerahasiaan data pribadi Anda!\n\n" +
            "---\n" +
            "*Pelanggaran terhadap peraturan di atas akan dikenakan tindakan tegas mulai dari **Mute, Kick, hingga Permanent Ban** oleh Moderator.*\n\n" +
            "Silahkan klik tombol **Saya Setuju** di bawah ini untuk menyetujui peraturan server kami!",
          color: 0xe74c3c, // Red for Rules
          image: {
            url: BANNERS.RULES,
          },
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 2, // Button
              style: 3, // Success (Green)
              custom_id: "rules_agree",
              label: "Saya Setuju",
              emoji: { name: "✅" },
            },
          ],
        },
      ],
    },
  };
}

export function handleSetupAgeCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  const options = AGE_ROLES.map((role) => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji,
  }));

  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: "Umur Catalog",
          description:
            "Silahkan pilih roles sesuai dengan range umur kamu!\n\n" +
            "👶 | **Teenager (<18)**\n" +
            "👦 | **Adult (18-35)**\n" +
            "👴 | **Elder (>35)**",
          color: 0x3498db, // Blue
          image: {
            url: BANNERS.AGE,
          },
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // String Select
              custom_id: "role_select_age",
              placeholder: "Click menu ini untuk memilih roles!",
              options,
            },
          ],
        },
      ],
    },
  };
}

export function handleSetupDomicileCommand(
  _interaction: DiscordInteraction,
): DiscordResponse {
  const options = DOMICILE_ROLES.map((role) => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji,
  }));

  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: "Domisili Catalog",
          description:
            "Silahkan pilih roles sesuai dengan domisili asal kamu!\n\n" +
            DOMICILE_ROLES.map(
              (role) => `${role.emoji.name} | **${role.label}**`,
            ).join("\n"),
          color: 0x2ecc71, // Green
          image: {
            url: BANNERS.DOMICILE,
          },
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // String Select
              custom_id: "role_select_domicile",
              placeholder: "Click menu ini untuk memilih roles!",
              options,
            },
          ],
        },
      ],
    },
  };
}
