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
import { COLORS } from "@/constants";

// enum CursorMode {
//   Hidden,
//   Chat,
//   ReactionSelector,
//   Reaction,
// }

// type CursorState =
//   | {
//       mode: CursorMode.Hidden;
//     }
//   | {
//       mode: CursorMode.Chat;
//       message: string;
//       previousMessage: string | null;
//     }
//   | {
//       mode: CursorMode.ReactionSelector;
//     }
//   | {
//       mode: CursorMode.Reaction;
//       reaction: string;
//       isPressed: boolean;
//     };

// type Reaction = {
//   value: string;
//   timestamp: number;
//   point: { x: number; y: number };
// };

// type ReactionEvent = {
//   x: number;
//   y: number;
//   value: string;
// };

export default function Live() {
  const others = useOthers();
  const [{ cursor }, updateMyPresence] = useMyPresence() as any;
  const [cursorState, setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden,
  });

  const broadcast = useBroadcastEvent();
  const [reactions, setReactions] = useState<Reaction[]>([]);

  const setReaction = useCallback((reaction: string) => {
    setCursorState({ mode: CursorMode.Reaction, reaction, isPressed: false });
  }, []);

  // Reactions
  // // Remove reactions that are not visible anymore (every 1 sec)
  // useInterval(() => {
  //   setReactions((reactions) =>
  //     reactions.filter((reaction) => reaction.timestamp > Date.now() - 4000),
  //   );
  // }, 1000);

  // useInterval(() => {
  //   if (
  //     cursorState.mode === CursorMode.Reaction &&
  //     cursorState.isPressed &&
  //     cursor
  //   ) {
  //     setReactions((reactions) =>
  //       reactions.concat([
  //         {
  //           point: { x: cursor.x, y: cursor.y },
  //           value: cursorState.reaction,
  //           timestamp: Date.now(),
  //         },
  //       ]),
  //     );
  //     broadcast({
  //       x: cursor.x,
  //       y: cursor.y,
  //       value: cursorState.reaction,
  //     });
  //   }
  // }, 100);

  useEffect(() => {
    function onKeyUp(e: KeyboardEvent) {
      if (e.key === "/" && cursorState.mode !== CursorMode.Chat) {
        console.log("Abriste el CHAT");
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: "",
        });
      } else if (e.key === "Escape" && cursorState.mode !== CursorMode.Hidden) {
        console.log("Cerraste el CHAT o las REACCIONES");
        setCursorState({ mode: CursorMode.Hidden });
      } else if (e.key === "e" && cursorState.mode === CursorMode.Hidden) {
        console.log("Abriste las REACCIONES");
        setCursorState({ mode: CursorMode.ReactionSelector });
      }
    }

    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [updateMyPresence, cursorState]);

  // useEventListener((eventData) => {
  //   const event = eventData.event as ReactionEvent;
  //   setReactions((reactions) =>
  //     reactions.concat([
  //       {
  //         point: { x: event.x, y: event.y },
  //         value: event.value,
  //         timestamp: Date.now(),
  //       },
  //     ]),
  //   );
  // });

  // DE AQUI A ABAJO ES LO QUE DEBO DEJAR EN ESTE COMPONENTE
  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });
  }, []);

  const handlePointerLeave = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    setCursorState({ mode: CursorMode.Hidden });
    updateMyPresence({ cursor: null, message: null });
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const x = e.clientX - e.currentTarget.getBoundingClientRect().x;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().y;
    updateMyPresence({ cursor: { x, y } });

    setCursorState((state) => {
      if (state.mode === CursorMode.Reaction) {
        return { ...state, isPressed: true };
      } else if (state.mode === CursorMode.Chat) {
        console.log("Cerraste el chat con clic");
        updateMyPresence({ message: "" });
        return { mode: CursorMode.Hidden };
      } else {
        return state;
      }
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
      <h1>Hola</h1>
      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
      <LiveCursors others={others} />
    </div>
  );
}
