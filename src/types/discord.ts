export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
}

export interface DiscordMember {
  user: DiscordUser;
  roles: string[];
  premium_since: string | null;
  pending: boolean;
  nick: string | null;
  mute: boolean;
  deaf: boolean;
}

export interface DiscordInteractionData {
  id: string;
  name: string;
  type: number;
  custom_id?: string;
  component_type?: number;
  values?: string[];
}

export interface DiscordInteraction {
  id: string;
  application_id: string;
  type: number; // 1 = PING, 2 = APPLICATION_COMMAND, 3 = MESSAGE_COMPONENT
  data?: DiscordInteractionData;
  guild_id?: string;
  channel_id?: string;
  member?: DiscordMember;
  user?: DiscordUser; // Present if interaction is in DM
  token: string;
  version: number;
}

export interface DiscordResponse {
  type: number; // 1 = PONG, 4 = CHANNEL_MESSAGE_WITH_SOURCE, 5 = DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE, 6 = DEFERRED_UPDATE_MESSAGE, 7 = UPDATE_MESSAGE
  data?: {
    tts?: boolean;
    content?: string;
    embeds?: Array<{
      title?: string;
      description?: string;
      color?: number;
      fields?: Array<{ name: string; value: string; inline?: boolean }>;
      image?: { url: string };
    }>;
    allowed_mentions?: { parse: string[] };
    flags?: number; // 64 = EPHEMERAL
    components?: Array<{
      type: number; // 1 = ActionRow
      components: Array<{
        type: number; // 2 = Button, 3 = StringSelect
        custom_id: string;
        options?: Array<{
          label: string;
          value: string;
          description?: string;
          emoji?: { id?: string; name?: string; animated?: boolean };
          default?: boolean;
        }>;
        placeholder?: string;
        min_values?: number;
        max_values?: number;
        disabled?: boolean;
        style?: number; // 1 = Primary, 2 = Secondary, 3 = Success, 4 = Danger, 5 = Link
        label?: string;
        emoji?: { id?: string; name?: string; animated?: boolean };
        url?: string;
      }>;
    }>;
  };
}
