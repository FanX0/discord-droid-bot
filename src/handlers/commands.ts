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
