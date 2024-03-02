"use client";

import { CursorMode, CursorState } from "@/types/type";
import { useCallback, useState } from "react";
import LiveCursors from "./cursor/LiveCursors";
import LiveChat from "./cursor/LiveChat";

import LiveContainer from "./LiveContainer";
import ReactionSelector from "./reaction/ReactionSelector";
import LiveReactions from "./reaction/LiveReactions";

export default function Workspace() {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  return (
    <LiveContainer cursorState={cursorState} setCursorState={setCursorState}>
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={(reaction) => setReaction(reaction)} />
      )}

      <LiveReactions
        cursorState={cursorState}
        setCursorState={setCursorState}
      />
      <LiveChat cursorState={cursorState} setCursorState={setCursorState} />
      <LiveCursors />
    </LiveContainer>
  );
}

// {cursorState.mode === CursorMode.Reaction && (
//             <div
//               className="pointer-events-none absolute left-3 top-5 select-none"
//               style={{
//                 transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
//               }}
//             >
//               {cursorState.reaction}
//             </div>
//           )}
