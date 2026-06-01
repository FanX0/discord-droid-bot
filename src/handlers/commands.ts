import { DiscordInteraction, DiscordResponse } from '../types/discord';
import { GENDER_ROLES, MOBILE_GAME_ROLES, PC_GAME_ROLES, BANNERS } from '../config/roles';

export function handleSetupGenderCommand(_interaction: DiscordInteraction): DiscordResponse {
  const options = GENDER_ROLES.map(role => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji
  }));

  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: '🙋‍♂️ Profile Gender Selection',
          description: 'Silahkan pilih gender kamu dibawah ini untuk mendapatkan role gender!',
          color: 0x5865F2, // Discord Blurple
          image: {
            url: BANNERS.GENDER
          }
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelect
              custom_id: 'role_select_gender',
              placeholder: 'Choose your gender...',
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

export function handleSetupMobileGamesCommand(_interaction: DiscordInteraction): DiscordResponse {
  const options = MOBILE_GAME_ROLES.map(role => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji
  }));

  return {
    type: 4,
    data: {
      embeds: [
        {
          title: '📱 Mobile Games Catalog',
          description: 'Silahkan pilih roles sesuai dengan keinginan kamu untuk mengakses channel yang tersedia dibawah sini!',
          color: 0x2ECC71, // Green
          image: {
            url: BANNERS.MOBILE_GAMES
          }
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: 'role_select_mobile',
              placeholder: 'Choose Mobile Games...',
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

export function handleSetupPcGamesCommand(_interaction: DiscordInteraction): DiscordResponse {
  const options = PC_GAME_ROLES.map(role => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji
  }));

  return {
    type: 4,
    data: {
      embeds: [
        {
          title: '🖥️ PC & Console Games Catalog',
          description: 'Silahkan pilih roles sesuai dengan keinginan kamu untuk mengakses channel yang tersedia dibawah sini!',
          color: 0x9B59B6, // Purple
          image: {
            url: BANNERS.PC_GAMES
          }
        },
      ],
      components: [
        {
          type: 1,
          components: [
            {
              type: 3,
              custom_id: 'role_select_pc',
              placeholder: 'Choose PC Games...',
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

export function handleSetupStartCommand(_interaction: DiscordInteraction): DiscordResponse {
  return {
    type: 4, // CHANNEL_MESSAGE_WITH_SOURCE
    data: {
      embeds: [
        {
          title: 'Get Started!',
          description: 
            'Selamat datang di **Droid Server**!\n\n' +
            'Channel ini bertujuan untuk membantu para **Droids** untuk memahami lebih lanjut mengenai **Droid** dan menjawab pertanyaan yang sering diajukan!\n\n' +
            '**Let\'s get started!**\n' +
            'Jika kamu belum membaca **Rules** kami, silahkan kunjungi #📜 | rules\n\n' +
            'Silahkan pilih **Genre Catalog** yang tersedia di sini: <#827508832041173042>\n\n' +
            'Jika kamu ingin check **Official Links** kita, mengetahui apa itu Droid, memahami lebih lanjut server **Droid** dan mendapatkan beberapa tips yang sangat berguna untuk **Mencegah Tindakan Penipuan**, maka kamu berada di channel yang tepat!\n\n' +
            'Silahkan gunakan tombol di bawah ini untuk mendapatkan informasi lebih lanjut mengenai subjek yang ingin kamu pelajari!',
          color: 0xE67E22, // Orange/Warm color matching the START HERE theme
          image: {
            url: BANNERS.START_HERE
          }
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 2, // Button
              style: 1, // Primary (Blurple)
              custom_id: 'welcome_droid',
              label: 'Droid',
              emoji: { name: '🌌' }
            },
            {
              type: 2, // Button
              style: 3, // Success (Green)
              custom_id: 'welcome_roles_info',
              label: 'Roles Info',
              emoji: { name: '👤' }
            },
            {
              type: 2, // Button
              style: 3, // Success (Green)
              custom_id: 'welcome_official_link',
              label: 'Official Link',
              emoji: { name: '🔗' }
            },
            {
              type: 2, // Button
              style: 4, // Danger (Red)
              custom_id: 'welcome_anti_scam',
              label: 'Pencegahan Scam',
              emoji: { name: '🚨' }
            }
          ]
        }
      ],
    },
  };
}
