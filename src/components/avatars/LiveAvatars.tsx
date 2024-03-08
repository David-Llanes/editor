import React, { useMemo } from "react";
import { Avatar } from "./Avatar";
import { useOthers, useOthersMapped, useSelf } from "@root/liveblocks.config";
import { generateRandomName } from "@/lib/utils";

export default function LiveAvatars() {
  const users = useOthersMapped((other) => other.info);
  const currentUser = useSelf((me) => me.connectionId);
  const hasMoreUsers = users.length > 3;
  // console.log(currentUser);

  const memoizedUsers = useMemo(() => {
    return (
      <div className="flex max-h-10 w-full select-none items-center justify-center">
        <div className="flex h-full pl-3">
          {users.slice(0, 3).map(([connectionId, info]) => {
            return <Avatar key={connectionId} name={generateRandomName()} />;
          })}

          {hasMoreUsers && (
            <div className="-ml-3 flex h-14 w-14 min-w-14 items-center justify-center rounded-full border-4 border-foreground bg-red-600 text-white">
              +{users.length - 3}
            </div>
          )}

          {currentUser && (
            <div className="relative ml-8 first:ml-0">
              <Avatar name="You" />
            </div>
          )}
        </div>
      </div>
    );
  }, [users.length]);

  return memoizedUsers;
}

// Antes de mis cambios estaba como en el video de youtube.
