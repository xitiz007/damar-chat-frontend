import { useState } from "react";
import Modal from "../../../Modal";
import userOperations from "@/graphql/operations/users";
import conversationOpertaions from "@/graphql/operations/conversations";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  SearchUsersData,
  SearchUsersInput,
  SearchedUserData,
  CreateConversationInput,
  CreateConversationData,
} from "../../../../util/types";
import SearchUserList from "./SearchUserList";
import ParticpantList from "./ParticpantList";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

interface Props {
  onClose: () => void;
}

const ConversationModal: React.FC<Props> = ({ onClose }) => {
  const router = useRouter();
  const [participants, setParticipants] = useState<Array<SearchedUserData>>([]);
  const [username, setUsername] = useState("");
  const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] =
    useLazyQuery<SearchUsersData, SearchUsersInput>(
      userOperations.Queries.searchUsers
    );
  const [createConversation, { loading: createConversationLoading }] =
    useMutation<CreateConversationData, CreateConversationInput>(
      conversationOpertaions.Mutations.createConversation
    );

  const searchUser = (event: React.FormEvent) => {
    event.preventDefault();
    searchUsers({ variables: { username } });
  };

  const addParticipant = (participant: SearchedUserData) => {
    const particpantExist =
      participants.find((user) => user.id === participant.id) !== undefined;
    if (particpantExist) return;
    setParticipants((participants) => [...participants, participant]);
  };

  const removeParticipant = (userId: string) => {
    setParticipants((participants) =>
      participants.filter((participant) => participant.id !== userId)
    );
  };

  const onCreateConversation = async () => {
    const participantIds = participants.map((participant) => participant.id);
    try {
      const { data } = await createConversation({
        variables: { participantIds },
      });
      if (!data?.createConversation) {
        throw new Error("failed to create conversation");
      }
      router.push({
        query: { conversationId: data.createConversation.conversationId },
      });
      setParticipants([]);
      setUsername("");
      onClose();
    } catch (error: any) {
      toast.error(error?.message);
    }
  };

  return (
    <Modal title="Create a Conversation" onClose={onClose}>
      <form onSubmit={searchUser} className="flex flex-col space-y-4">
        <input
          required
          className="p-2"
          type="text"
          placeholder="username..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          disabled={searchUsersLoading}
          className="bg-gray-800 text-white text-base font-medium tracking-wide py-2 hover:bg-gray-700 transition-colors duration-300 ease-in-out"
          type="submit"
        >
          {searchUsersLoading ? "Searching..." : "Search"}
        </button>
      </form>
      <div className="space-y-4">
        {searchUsersData?.searchUsers && (
          <SearchUserList
            addParticipant={addParticipant}
            users={searchUsersData.searchUsers}
          />
        )}
        <div className="bg-gray-100 h-[2px] my-4" />
        <ParticpantList
          participants={participants}
          removeParticipant={removeParticipant}
        />
        {participants.length > 0 && (
          <button
            onClick={onCreateConversation}
            disabled={createConversationLoading}
            className="w-full bg-blue-700 hover:bg-blue-800 transition-colors duration-200 ease-in-out text-white py-2 tracking-wide font-medium text-base"
          >
            {createConversationLoading
              ? "Creating Conversation"
              : "Create Conversation"}
          </button>
        )}
      </div>
    </Modal>
  );
};

export default ConversationModal;
