/* eslint-disable import/no-anonymous-default-export */
import { gql } from "@apollo/client";

export default {
  Queries: {
  },
  Mutations: {
    createConversation: gql`
      mutation createConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {},
};
