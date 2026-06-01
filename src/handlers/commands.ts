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
            "Jika kamu belum membaca **Rules** kami, silahkan kunjungi <#1511010770580799618>\n\n" +
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
            "yo welcome to **Droid Server** 🚀\n\n" +
            "ini tempat buat santai aja sih. mau ngobrol, mabar, cari temen, ikut rame, atau cuma diem-diem baca chat juga bebas wkwk\n\n" +
            "gak usah terlalu kaku di sini. anggap aja kayak basecamp online buat nongkrong, bercanda, bahas game, atau random talk pas lagi gabut.\n\n" +
            "kalau baru masuk dan masih bingung mau mulai dari mana, santai aja. semua juga pernah jadi anak baru 😭\n\n" +
            "intinya enjoy aja, bawa vibes yang enak, dan jangan takut buat nyapa duluan.\n\n" +
            "klik **Saya Setuju** di bawah buat dapet role **Verified** terus langsung gas masuk ke server 🎉",
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

export function handleConfessCommand(_interaction: DiscordInteraction): DiscordResponse {
  return {
    type: 9, // MODAL
    data: {
      title: "Anonymous Confession",
      custom_id: "modal_confess",
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 4, // TextInput
              custom_id: "confess_message",
              style: 2, // Paragraph
              label: "Tulis pesan rahasiamu di sini...",
              placeholder: "Tulis sesuatu yang ingin kamu sampaikan secara anonim...",
              min_length: 5,
              max_length: 1000,
              required: true
            }
          ]
        }
      ]
    }
  };
}

export function handleEmbedBuilderCommand(_interaction: DiscordInteraction): DiscordResponse {
  return {
    type: 9, // MODAL
    data: {
      title: "Embed Announcement Builder",
      custom_id: "modal_embed",
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 4, // TextInput
              custom_id: "embed_title",
              style: 1, // Short
              label: "Judul Pengumuman",
              placeholder: "Masukkan judul pengumuman...",
              max_length: 256,
              required: true
            }
          ]
        },
        {
          type: 1, // ActionRow
          components: [
            {
              type: 4, // TextInput
              custom_id: "embed_description",
              style: 2, // Paragraph
              label: "Isi Pengumuman / Deskripsi",
              placeholder: "Masukkan isi pengumuman detail di sini...",
              max_length: 2000,
              required: true
            }
          ]
        },
        {
          type: 1, // ActionRow
          components: [
            {
              type: 4, // TextInput
              custom_id: "embed_color",
              style: 1, // Short
              label: "Warna Hex (misal: #3498db atau #e74c3c)",
              placeholder: "#3498db",
              max_length: 7,
              required: false
            }
          ]
        },
        {
          type: 1, // ActionRow
          components: [
            {
              type: 4, // TextInput
              custom_id: "embed_image",
              style: 1, // Short
              label: "URL Gambar Banner (opsional)",
              placeholder: "https://example.com/image.png",
              max_length: 1000,
              required: false
            }
          ]
        }
      ]
    }
  };
}

export function handleTicTacToeCommand(_interaction: DiscordInteraction): DiscordResponse {
  // Return a clean empty 3x3 Tic Tac Toe board using buttons.
  // We represent the board state encoded in the custom_id of the buttons:
  // ttt_[index]_[board_state]
  // index: 0 to 8
  // board_state: 9 characters, e.g. "_________" where _ is empty, X is player, O is bot.
  const emptyState = "_________";
  
  const createButton = (index: number) => ({
    type: 2, // Button
    style: 2, // Secondary (Grey)
    custom_id: `ttt_${index}_${emptyState}`,
    emoji: { name: "⬜" }
  });

  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      content: "🎮 **Tic-Tac-Toe Minigame**\nBermainlah melawan Droid Bot! Kamu adalah **❌** dan Droid adalah **⭕**.\nSilahkan klik salah satu tombol di bawah untuk memulai giliranmu!",
      components: [
        {
          type: 1, // ActionRow
          components: [createButton(0), createButton(1), createButton(2)]
        },
        {
          type: 1, // ActionRow
          components: [createButton(3), createButton(4), createButton(5)]
        },
        {
          type: 1, // ActionRow
          components: [createButton(6), createButton(7), createButton(8)]
        }
      ]
    }
  };
}
