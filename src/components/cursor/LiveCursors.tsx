import { LiveCursorProps } from "@/types/type";
import Cursor from "./Cursor";
import { COLORS } from "@/constants";

export default function LiveCursors({ others }: LiveCursorProps) {
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
