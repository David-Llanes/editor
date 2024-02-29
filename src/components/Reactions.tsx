import { CursorMode, Reaction, ReactionEvent } from "@/types/type";
import { useState } from "react";
import FlyingReaction from "./reaction/FlyingReaction";
import useInterval from "@/hooks/useInterval";
import { useBroadcastEvent, useEventListener } from "@root/liveblocks.config";
import { CursorState } from "@/types/type";

type Props = {
  cursor: { x: number; y: number } | null;
  cursorState: CursorState;
};

export default function Reactions({ cursor, cursorState }: Props) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const broadcast = useBroadcastEvent();
  console.log("Reactions rerender");

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
  return reactions.map((reaction) => {
    return (
      <FlyingReaction
        key={reaction.timestamp.toString()}
        x={reaction.point.x}
        y={reaction.point.y}
        timestamp={reaction.timestamp}
        value={reaction.value}
      />
    );
  });
}
