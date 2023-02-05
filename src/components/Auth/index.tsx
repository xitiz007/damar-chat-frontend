import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/legacy/image";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import userOperations from "../../graphql/operations/users";
import { CreateUsernameData, CreateUsernameVariables } from "../../util/types";
import { toast } from "react-hot-toast";

interface Props {
  session: Session | null;
  reloadSession: () => void;
}

const Auth: React.FC<Props> = ({ session, reloadSession }) => {
  const [username, setUsername] = useState("");
  const [createUsername, { error, loading }] = useMutation<
    CreateUsernameData,
    CreateUsernameVariables
  >(userOperations.Mutations.createUsername);
  const createUsernameHandler = async (event: React.FormEvent) => {
    if (!username.trim()) return;
    event.preventDefault();
    try {
      const { data } = await createUsername({ variables: { username } });
      if (!data?.createUsername) throw new Error("failed to create username");
      if (data.createUsername.error) throw new Error(data.createUsername.error);
      // reloading session to get username
      toast.success("successfully created username");
      reloadSession();
    } catch (err: any) {
      toast.error(err?.message);
    }
  };
  return (
    <section className="h-screen flex items-center justify-center">
      {session ? (
        <div>
          <form
            className="flex flex-col space-y-6 items-center"
            onSubmit={createUsernameHandler}
          >
            <h1 className="tracking-wide font-semibold text-xl md:text-2xl lg:text-3xl">
              Create a Username
            </h1>
            <input
              required
              type="text"
              className="border border-gray-700 p-3 placeholder:tracking-wide"
              placeholder="username..."
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <button
              disabled={loading}
              className="bg-black hover:bg-gray-700 transition-colors duration-300 ease-in-out font-semibold text-lg md:text-xl text-white px-6 py-2 rounded-sm"
              type="submit"
            >
              {loading ? "Saving" : "Save"}
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="tracking-wide font-semibold text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Damar Chat
          </h1>
          <div className="w-[150px] h-[250px] md:w-[200px] md:h-[300px] relative">
            <Image
              src="/icons/chat.png"
              className=""
              alt="icon"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <button
            onClick={() => signIn("google")}
            className="flex items-center space-x-2 bg-gray-100 rounded-sm px-4 py-2 hover:bg-gray-200 transition-colors duration-200 ease-in-out"
          >
            <div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] relative">
              <Image
                src="/icons/google.png"
                className=""
                alt="icon"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-gray-800 font-semibold text-base">
              Login with Google
            </span>
          </button>
        </div>
      )}
    </section>
  );
};

export default Auth;
