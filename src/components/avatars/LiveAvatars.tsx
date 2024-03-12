import React, { useMemo } from "react";
import { Avatar, Avatar2 } from "./Avatar";
import { useOthers, useOthersMapped, useSelf } from "@root/liveblocks.config";
import { generateRandomName } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ChevronDown } from "lucide-react";

export default function LiveAvatars() {
  const users = useOthersMapped((other) => other.info);
  const currentUser = useSelf((me) => me.connectionId);
  const hasMoreUsers = users.length > 3;
  const hasOtherUsers = users.length >= 1;
  console.log(currentUser);

  const memoizedUsers = useMemo(() => {
    return (
      <div className="flex select-none items-center justify-center">
        <div className="hidden items-center sm:flex">
          {users.slice(0, 3).map(([connectionId, info]) => {
            return (
              <div key={connectionId} className="-mr-3">
                <Avatar2 name={generateRandomName()} />
              </div>
            );
          })}

          {hasMoreUsers && (
            <div className="relative z-10 mr-3 flex size-10 items-center justify-center rounded-full bg-border text-sm font-bold">
              + {users.length - 3}
            </div>
          )}
        </div>
        {hasOtherUsers && (
          <div className="sm:hidden">
            <TooltipProvider>
              <Tooltip delayDuration={200}>
                <TooltipTrigger className="-mr-3 size-10 rounded-full bg-border text-xs font-bold">
                  {users.length}+
                </TooltipTrigger>
                <TooltipContent>
                  {users.map(([connectionId, info]) => {
                    return (
                      <div
                        key={connectionId}
                        className="flex items-center gap-3"
                      >
                        <Avatar2 name={generateRandomName()} />
                        <p className="text-sm">Nombre</p>
                      </div>
                    );
                  })}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
        {currentUser && (
          <div className="relative ">
            <Avatar2 name="You" />
          </div>
        )}
      </div>
    );
  }, [users.length]);

  return memoizedUsers;
}

// Antes de mis cambios estaba como en el video de youtube.
