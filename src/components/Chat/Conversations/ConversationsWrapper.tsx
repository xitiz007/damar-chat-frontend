import { Session } from "next-auth";
import ConversationList from "./ConversationList";

interface Props {
  session: Session;
}

const ConversationsWrapper: React.FC<Props> = ({ session }) => {
  return (
    <div className="md:w-[400px] bg-gray-100 p-4">
      <ConversationList session={session} />
    </div>
  );
};

export default ConversationsWrapper;
