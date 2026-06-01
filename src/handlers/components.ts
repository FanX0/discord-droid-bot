import { DiscordInteraction, DiscordResponse } from '../types/discord';
import { GENDER_ROLES, MOBILE_GAME_ROLES, PC_GAME_ROLES } from '../config/roles';
import { addRoleToMember, removeRoleFromMember } from '../services/discord-api';

export async function handleComponentInteraction(interaction: DiscordInteraction): Promise<DiscordResponse> {
  const customId = interaction.data?.custom_id;

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
  } catch (error) {
    console.error('Error modifying member roles:', error);
    return {
      type: 4,
      data: {
        flags: 64,
        content: `❌ An error occurred while updating your roles. Please contact an administrator.`,
      },
    };
  }
}
