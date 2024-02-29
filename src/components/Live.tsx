"use client";

import LiveCursors from "./cursor/LiveCursors";
import { useCallback, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";

import Wrapper from "./Wrapper";
import ReactionSelector from "./reaction/ReactionSelector";
import Reactions from "./reaction/Reactions";

export default function Live() {
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  return (
    <Wrapper cursorState={cursorState} setCursorState={setCursorState}>
      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={(reaction) => setReaction(reaction)} />
      )}

      <Reactions cursorState={cursorState} setCursorState={setCursorState} />
      {/* <h1 className="m-16 h-full w-full bg-border"></h1> */}
      <CursorChat cursorState={cursorState} setCursorState={setCursorState} />
      <LiveCursors />
    </Wrapper>
  );
}

/* 

{cursorState.mode === CursorMode.Reaction && (
            <div
              className="pointer-events-none absolute left-3 top-5 select-none"
              style={{
                transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`,
              }}
            >
              {cursorState.reaction}
            </div>
          )}

*/
