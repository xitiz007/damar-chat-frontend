export interface CreateUsernameData {
  createUsername: {
    success: boolean;
    error: string;
  };
}

export interface CreateUsernameVariables {
  username: string;
}

export interface SearchUsersInput {
  username: string;
}

export interface SearchedUserData {
  id: string;
  username: string;
  image: string;
}

export interface SearchUsersData {
  searchUsers: Array<SearchedUserData>;
}

// Conversations

export interface CreateConversationInput {
  participantIds: string[];
}

export interface CreateConversationData {
  createConversation: {
    conversationId: string;
  };
}
