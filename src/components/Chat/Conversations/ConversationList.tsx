import { Session } from "next-auth";
import { useState } from "react";
import ConversationModal from "./Modal";

interface Props {
  session: Session;
}

const ConversationList: React.FC<Props> = ({ session }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <ConversationModal onClose={() => setShowModal(false)} />}
      <div>
        <div
          onClick={() => setShowModal(true)}
          className="text-center cursor-pointer hover:bg-gray-200 transition duration-200 ease-in-out p-2"
        >
          <p className="text-lg font-medium tracking-wide">
            Find or start a conversation
          </p>
        </div>
      </div>
    </>
  );
};

export default ConversationList;
