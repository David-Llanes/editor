"use client";

import create from "zustand";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";
import { client } from "@root/liveblocks.config";

type State = {
  // Your Zustand state type will be defined here
};

const useLiveblocksStore = create<WithLiveblocks<State>>()(
  liveblocks(
    (set) => ({
      // Your state and actions will go here
    }),
    { client },
  ),
);

export default useLiveblocksStore;
