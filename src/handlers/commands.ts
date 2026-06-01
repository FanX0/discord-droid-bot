import { DiscordInteraction, DiscordResponse } from '../types/discord';
import { ASSIGNABLE_ROLES } from '../config/roles';

export function handleSetupRolesCommand(_interaction: DiscordInteraction): DiscordResponse {
  // Construct the select menu options from the configuration
  const options = ASSIGNABLE_ROLES.map(role => ({
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
          title: '🎭 Server Role Selection',
          description: 'Use the dropdown menu below to self-assign or remove your roles. You can select multiple roles at once! Deselecting a role will remove it from your profile.',
          color: 0x5865F2, // Discord Blurple
        },
      ],
      components: [
        {
          type: 1, // ActionRow
          components: [
            {
              type: 3, // StringSelect
              custom_id: 'role_select',
              placeholder: 'Choose your roles...',
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
