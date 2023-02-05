import { SearchedUserData } from "../../../../util/types";
import { XMarkIcon } from "@heroicons/react/24/solid";

interface Props {
  participants: SearchedUserData[];
  removeParticipant: (userId: string) => void;
}

const ParticpantList: React.FC<Props> = ({
  participants,
  removeParticipant,
}) => {
  return (
    <ul className="flex gap-2 flex-wrap">
      {participants.map((participant) => (
        <li
          key={participant.id}
          className="relative px-5 py-3 rounded-sm bg-blue-600 text-white font-medium tracking-wide text-sm"
        >
          <span
            onClick={() => removeParticipant(participant.id)}
            className="absolute top-1 right-1 cursor-pointer bg-gray-500 rounded-full hover:scale-105 transition duration-200 ease-in-out"
          >
            <XMarkIcon className="w-4" />
          </span>
          <span>{participant.username}</span>
        </li>
      ))}
    </ul>
  );
};

export default ParticpantList;
