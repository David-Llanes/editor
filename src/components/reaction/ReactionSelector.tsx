import { useCursorState } from "@/store/Provider";
import { CursorMode } from "@/types/type";
import React from "react";

export default function ReactionSelector() {
  const cursorState = useCursorState()((state) => state.cursorState);

  if (cursorState.mode !== CursorMode.ReactionSelector) return null;
  return (
    <div
      className="ring-inset-2 absolute bottom-20 left-0 right-0 z-10 mx-auto flex w-fit flex-wrap items-center justify-center rounded-full bg-background px-4 py-2 align-middle shadow-sm shadow-foreground/10 ring-1 ring-inset ring-foreground/5 dark:shadow-foreground/10"
      onPointerMove={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <ReactionButton reaction="👍" />
      <ReactionButton reaction="🔥" />
      <ReactionButton reaction="😍" />
      <ReactionButton reaction="👀" />
      <ReactionButton reaction="😱" />
      <ReactionButton reaction="🙁" />
      <ReactionButton reaction="💩" />
    </div>
  );
}

function ReactionButton({ reaction }: { reaction: string }) {
  const setCursorState = useCursorState()((state) => state.setCursosState);

  const handleSelect = (reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  };

  return (
    <button
      className="transform select-none p-2 text-xl transition-transform hover:scale-150 focus:scale-150 focus:outline-none"
      onPointerDown={() => handleSelect(reaction)}
    >
      {reaction}
    </button>
  );
}
