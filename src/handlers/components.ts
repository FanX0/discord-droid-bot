import { DiscordInteraction, DiscordResponse } from '../types/discord';
import { ASSIGNABLE_ROLES } from '../config/roles';
import { addRoleToMember, removeRoleFromMember } from '../services/discord-api';

export async function handleComponentInteraction(interaction: DiscordInteraction): Promise<DiscordResponse> {
  const customId = interaction.data?.custom_id;

  if (customId !== 'role_select') {
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
  const assignableRoleIds: string[] = ASSIGNABLE_ROLES.map(role => role.value as string);

  // Determine roles to add: selected by user, but they don't already have
  const rolesToAdd = selectedRoleIds.filter(
    roleId => assignableRoleIds.includes(roleId) && !currentMemberRoleIds.includes(roleId)
  );

  // Determine roles to remove: not selected by user, but they currently have, and are managed by this bot
  const rolesToRemove = assignableRoleIds.filter(
    roleId => !selectedRoleIds.includes(roleId) && currentMemberRoleIds.includes(roleId)
  );

  // Run updates in background. Discord expects a response within 3 seconds.
  // We can respond immediately with a deferred message or execute quickly and respond.
  // Since serverless functions terminate when the response is sent, we should do the API calls BEFORE responding
  // or use Vercel's waitUntil.
  // For standard Vercel serverless functions, we should run them sequentially/parallelly, then respond.
  try {
    const addPromises = rolesToAdd.map(roleId => addRoleToMember(guildId, userId, roleId));
    const removePromises = rolesToRemove.map(roleId => removeRoleFromMember(guildId, userId, roleId));
    
    await Promise.all([...addPromises, ...removePromises]);

    // Construct response details
    const addedRoleLabels = ASSIGNABLE_ROLES.filter(r => rolesToAdd.includes(r.value)).map(r => r.label);
    const removedRoleLabels = ASSIGNABLE_ROLES.filter(r => rolesToRemove.includes(r.value)).map(r => r.label);

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
