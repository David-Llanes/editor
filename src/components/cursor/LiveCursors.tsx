import { LiveCursorProps } from "@/types/type";
import Cursor from "./Cursor";
import { COLORS } from "@/constants";
import { useOthers } from "@root/liveblocks.config";

export default function LiveCursors({ others }: LiveCursorProps) {
  // const others = useOthers();

  console.log("LiveCursors rerendered");
  return others.map(({ connectionId, presence }) => {
    if (presence.cursor === null) return null;

    return (
      <Cursor
        key={`cursor-${connectionId}`}
        color={COLORS[Number(connectionId) % COLORS.length]}
        x={presence.cursor.x}
        y={presence.cursor.y}
        message={presence.message}
      />
    );
  });
}

//export default function LiveCursors({ others }: LiveCursorProps) {
