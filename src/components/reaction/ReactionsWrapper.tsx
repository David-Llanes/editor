import React, { Dispatch, SetStateAction } from "react";

import { CursorMode, CursorState, Reaction, ReactionEvent } from "@/types/type";
import { useCallback, useState } from "react";
import FlyingReaction from "./FlyingReaction";
import useInterval from "@/hooks/useInterval";
import {
  useBroadcastEvent,
  useEventListener,
  useSelf,
} from "@root/liveblocks.config";

type Props = {
  cursorState: CursorState;
  reactions: Reaction[];
  setReactions: Dispatch<SetStateAction<Reaction[]>>;
  children: React.ReactNode;
};

export default function ReactionsWrapper({
  cursorState,
  reactions,
  setReactions,
  children,
}: Props) {
  const cursor = useSelf((me) => me.presence.cursor);
  const broadcast = useBroadcastEvent();

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

  // Remove reactions that are not visible anymore (every 1 sec)
  useInterval(() => {
    if (reactions.length === 0) return;
    setReactions((reactions) =>
      reactions.filter((reaction) => reaction.timestamp > Date.now() - 3000),
    );
  }, 1000);

  useInterval(() => {
    if (
      cursorState.mode === CursorMode.Reaction &&
      cursorState.isPressed &&
      cursor
    ) {
      setReactions((reactions) =>
        reactions.concat([
          {
            point: { x: cursor.x, y: cursor.y },
            value: cursorState.reaction,
            timestamp: Date.now(),
          },
        ]),
      );
      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      });
    }
  }, 150);

  if (reactions.length === 0) return null;
  return <>{children}</>;
}
