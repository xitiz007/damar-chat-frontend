import { Session } from "next-auth";
import ConversationsWrapper from "./Conversations/ConversationsWrapper";
import FeedWrapper from "./Feed/FeedWrapper";

interface Props {
  session: Session;
}

const Chat: React.FC<Props> = ({ session }) => {
  return (
    <main className="relative">
      <div className="flex min-h-screen">
        <ConversationsWrapper session={session} />
        <FeedWrapper session={session} />
      </div>
    </main>
  );
};

export default Chat;
