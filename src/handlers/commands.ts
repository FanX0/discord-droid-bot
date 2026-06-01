import { DiscordInteraction, DiscordResponse } from '../types/discord';
import { GENDER_ROLES, MOBILE_GAME_ROLES, PC_GAME_ROLES } from '../config/roles';

export function handleSetupRolesCommand(_interaction: DiscordInteraction): DiscordResponse {
  // Construct options for each group
  const genderOptions = GENDER_ROLES.map(role => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji
  }));

  const mobileOptions = MOBILE_GAME_ROLES.map(role => ({
    label: role.label,
    value: role.value,
    description: role.description,
    emoji: role.emoji
  }));

  const pcOptions = PC_GAME_ROLES.map(role => ({
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
          title: '🎭 Server Role Directory',
          description: 'Customize your profile by selecting the roles that match you! Choose from the dropdown menus below.',
          color: 0x5865F2, // Discord Blurple
          fields: [
            {
              name: '🙋‍♂️ Gender Roles',
              value: 'Select your preferred gender identity.',
              inline: false
            },
            {
              name: '📱 Mobile Games',
              value: 'Select the mobile games you play.',
              inline: false
            },
            {
              name: '🖥️ PC & Console Games',
              value: 'Select the PC or Console games you play.',
              inline: false
            }
          ]
        },
      ],
      components: [
        // Dropdown 1: Gender
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelect
              custom_id: 'role_select_gender',
              placeholder: '🙋‍♂️ Choose Gender...',
              min_values: 0,
              max_values: 1, // Enforce single selection maximum
              options: genderOptions,
            },
          ],
        },
        // Dropdown 2: Mobile Games
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelect
              custom_id: 'role_select_mobile',
              placeholder: '📱 Choose Mobile Games...',
              min_values: 0,
              max_values: mobileOptions.length,
              options: mobileOptions,
            },
          ],
        },
        // Dropdown 3: PC Games
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelect
              custom_id: 'role_select_pc',
              placeholder: '🖥️ Choose PC Games...',
              min_values: 0,
              max_values: pcOptions.length,
              options: pcOptions,
            },
          ],
        },
      ],
    },
  };
}
