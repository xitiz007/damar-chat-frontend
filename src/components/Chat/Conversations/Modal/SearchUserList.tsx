import { SearchedUserData } from "../../../../util/types";
import Image from "next/image";

interface Props {
  users: Array<SearchedUserData>;
  addParticipant: (user: SearchedUserData) => void;
}

const SearchUserList: React.FC<Props> = ({ users, addParticipant }) => {
  return (
    <div className="mt-4">
      {!users.length ? (
        <h2>No users found</h2>
      ) : (
        <ul className="space-y-2">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between bg-gray-300 p-2 rounded-md hover:bg-gray-200 transition-colors duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex items-center space-x-2">
                <Image
                  src={user.image}
                  alt={user.username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <h6 className="text-base font-medium">{user.username}</h6>
              </div>
              <button
                onClick={() => addParticipant(user)}
                className="bg-blue-700 px-4 py-2 rounded-sm text-white font-medium tracking-wide text-sm"
              >
                Select
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUserList;
