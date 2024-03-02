import Cursor from "./Cursor";
import { useOthersConnectionIds } from "@root/liveblocks.config";
import { memo } from "react";

function LiveCursors() {
  const othersConnectionIds = useOthersConnectionIds();
  console.log(`Hay ${othersConnectionIds.length} personas conectadas`);

  return othersConnectionIds.map((id) => <Cursor key={id} connectionId={id} />);
}

export default memo(LiveCursors);

//https://liveblocks.io/docs/api-reference/liveblocks-react#useOther
