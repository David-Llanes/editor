import { useMemo } from "react";
import { Reaction } from "@/types/type";
import FlyingReaction from "./FlyingReaction";

export default function Reactions({ reactions }: { reactions: Reaction[] }) {
  const mappedReactions = useMemo(() => {
    return reactions.map((reaction) => {
      return (
        <FlyingReaction
          key={reaction.timestamp}
          x={reaction.point.x}
          y={reaction.point.y}
          timestamp={reaction.timestamp}
          value={reaction.value}
        />
      );
    });
  }, [reactions]);
  return <>{mappedReactions}</>;
}
