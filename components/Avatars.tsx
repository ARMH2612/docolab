import { useOthers, useSelf } from "@liveblocks/react/suspense";
import React from "react";

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className="flex items-center justify-center relative border-2 border-white rounded-full w-11 h-11 bg-[#9ca3af] -ml-3 overflow-hidden">
      <p className="absolute text-white z-10 font-semibold">
        {name[0].toUpperCase()}
      </p>
      <img
        src={picture}
        data-tooltip={name}
        alt="avatar image"
        className="rounded-full w-full h-full object-cover"
      />
    </div>
  );
}

const Avatars = () => {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className="flex px-0 py-3">
      {users.map(({ connectionId, info }) => {
        return (
          <Avatar key={connectionId} picture={info.picture} name={info.name} />
        );
      })}
      {currentUser && (
        <div>
          <Avatar
            picture={currentUser.info.picture}
            name={currentUser.info.name}
          />
        </div>
      )}
    </div>
  );
};

export default Avatars;
