import { CursorState } from "@/types/type";
import { useMyPresence } from "@root/liveblocks.config";
import { useCallback, useEffect, useState } from "react";
import { CursorMode } from "@/types/type";

type WrapperProps = {
  children: React.ReactNode;
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
};

export default function Wrapper({
  children,
  cursorState,
  setCursorState,
}: WrapperProps) {
  const [{ cursor }, updateMyPresence] = useMyPresence();

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "/") {
        console.log("Abriste el CHAT");
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape") {
        console.log("Cerraste el CHAT o las REACCIONES");
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e") {
        console.log("Abriste las REACCIONES");
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    }
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [updateMyPresence]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    if (cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });
    }
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    // setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null });
    // De esta manera no borramos el mensaje, solo lo ocultamos

    setCursorState((state) =>
      state.mode === CursorMode.Reaction
        ? { ...state, isPressed: false }
        : state,
    );
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });

    setCursorState((state) => {
      if (state.mode === CursorMode.Reaction) {
        return { ...state, isPressed: true };
      }
      if (state.mode === CursorMode.Chat) {
        updateMyPresence({ message: "" });
        return { mode: CursorMode.Hidden };
      }

      if (state.mode === CursorMode.ReactionSelector) {
        console.log("Cerraste selector de reaccion con clic");
        return { mode: CursorMode.Hidden };
      }

      return state;
    });
  }, []);

  const handlePointerUp = useCallback(() => {
    setCursorState((state) =>
      state.mode === CursorMode.Reaction
        ? { ...state, isPressed: false }
        : state,
    );
  }, []);
  return (
    <div
      className="relative flex h-svh w-full items-center justify-center overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      {children}
    </div>
  );
}
