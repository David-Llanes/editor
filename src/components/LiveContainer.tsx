import { CursorState } from "@/types/type";
import { useMyPresence } from "@root/liveblocks.config";
import { useCallback, useEffect, useState } from "react";
import { CursorMode } from "@/types/type";

type WrapperProps = {
  children: React.ReactNode;
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
};

export default function LiveContainer({
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

  const handlePointerLeave = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      updateMyPresence({ cursor: null });
      // De esta manera no borramos el mensaje, solo lo ocultamos

      if (cursorState.mode === CursorMode.Reaction) {
        setCursorState({ ...cursorState, isPressed: false });
      }

      // setCursorState((state) =>
      //   state.mode === CursorMode.Reaction
      //     ? { ...state, isPressed: false }
      //     : state,
      // );
    },
    [cursorState, updateMyPresence],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
      const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
      updateMyPresence({ cursor: { x, y } });

      if (cursorState.mode === CursorMode.Reaction) {
        setCursorState({ ...cursorState, isPressed: true });
      }
      if (cursorState.mode === CursorMode.Chat) {
        updateMyPresence({ message: "" });
        setCursorState({ mode: CursorMode.Hidden });
      }
      if (cursorState.mode === CursorMode.ReactionSelector) {
        console.log("Cerraste selector de reaccion con clic");
        setCursorState({ mode: CursorMode.Hidden });
      }

      // setCursorState((state) => {
      //   if (state.mode === CursorMode.Reaction) {
      //     return { ...state, isPressed: true };
      //   }
      //   if (state.mode === CursorMode.Chat) {
      //     updateMyPresence({ message: "" });
      //     return { mode: CursorMode.Hidden };
      //   }

      //   if (state.mode === CursorMode.ReactionSelector) {
      //     console.log("Cerraste selector de reaccion con clic");
      //     return { mode: CursorMode.Hidden };
      //   }

      //   return state;
      // });
    },
    [cursorState, updateMyPresence],
  );

  const handlePointerUp = useCallback(() => {
    if (cursorState.mode === CursorMode.Reaction) {
      setCursorState({ ...cursorState, isPressed: false });
    }

    // setCursorState((state) =>
    //   state.mode === CursorMode.Reaction
    //     ? { ...state, isPressed: false }
    //     : state,
    // );
  }, [cursorState]);
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
