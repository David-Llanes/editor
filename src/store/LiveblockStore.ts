"use client";

import create from "zustand";
import { liveblocks } from "@liveblocks/zustand";
import type { WithLiveblocks } from "@liveblocks/zustand";
import { client } from "@root/liveblocks.config";
import {
  CursorChat,
  CursorHidden,
  CursorMode,
  CursorReaction,
  CursorReactionSelector,
  CursorState,
  Reaction,
} from "@/types/type";

type State = {
  cursorState: CursorState;
  reactions: Reaction[];
};

type Actions = {
  setCursorStateHidden: (state: CursorHidden) => void;
  setCursorStateChat: (state: CursorChat) => void;
  setCursorStateReaction: (state: CursorReaction) => void;
  setCursorStateReactionSelector: (state: CursorReactionSelector) => void;
  setReactions: (reactions: Reaction[]) => void;
};

const useLiveblocksStore = create<WithLiveblocks<State & Actions>>()(
  liveblocks(
    (set) => ({
      cursorState: { mode: CursorMode.Hidden },
      reactions: [],
      setCursorStateHidden: (state) => set({ cursorState: state }),
      setCursorStateChat: (state) => set({ cursorState: state }),
      setCursorStateReaction: (state) => set({ cursorState: state }),
      setCursorStateReactionSelector: (state) => set({ cursorState: state }),
      setReactions: (reactions) => set({ reactions }),
    }),
    { client },
  ),
);

export default useLiveblocksStore;
