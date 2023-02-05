import { Session } from "next-auth";
import { signOut } from "next-auth/react";

interface Props {
  session: Session;
}

const FeedWrapper: React.FC<Props> = ({}) => {
  return (
    <div className="w-full">
      <button
        className="bg-black text-white text-lg px-8 py-4 absolute top-0 right-0"
        onClick={() => signOut()}
      >
        Logout
      </button>
    </div>
  );
};

export default FeedWrapper;
