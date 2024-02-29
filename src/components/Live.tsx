"use client";

import {
  useBroadcastEvent,
  useEventListener,
  useMyPresence,
  useOthers,
} from "@root/liveblocks.config";
import LiveCursors from "./cursor/LiveCursors";
import { useCallback, useEffect, useState } from "react";
import CursorChat from "./cursor/CursorChat";
import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import useInterval from "@/hooks/useInterval";
import ReactionSelector from "./reaction/ReactionSelector";
import FlyingReaction from "./reaction/FlyingReaction";
import Reactions from "./Reactions";

export default function Live() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence();
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const [reactions, setReactions] = useState<Reaction[]>([]);

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

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
    // ARREGLAR LO DE PRESIONAR E Y /, DESDE CURSORCHAT
    // e.key === "/" && cursorState.mode !== CursorMode.Chat;
    // e.key === "Escape" && cursorState.mode !== CursorMode.Hidden;
    // e.key === "e" && cursorState.mode === CursorMode.Hidden
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [updateMyPresence]);

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent;
    setReactions((reactions) =>
      reactions.concat([
        {
          point: { x: event.x, y: event.y },
          value: event.value,
          timestamp: Date.now(),
        },
      ]),
    );
  });

  // DE AQUI A ABAJO ES LO QUE DEBO DEJAR EN ESTE COMPONENTE
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

    // if (cursorState.mode === CursorMode.Chat) {
    //   console.log("Cerraste el chat con clic");
    //   updateMyPresence({ message: "" });
    //   setCursorState({
    //     mode: CursorMode.Hidden,
    //   });
    // }

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
      <Reactions cursor={cursor} cursorState={cursorState} />
      <h1>...</h1>
      {cursor && (
        <>
          <CursorChat
            cursor={cursor}
            cursorState={cursorState}
            setCursorState={setCursorState}
            updateMyPresence={updateMyPresence}
          />
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
        </>
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector setReaction={(reaction) => setReaction(reaction)} />
      )}

      <LiveCursors others={others} />
    </div>
  );
}
