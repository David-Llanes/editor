import { CursorMode, Reaction, ReactionEvent } from "@/types/type";
import { useCallback, useState } from "react";
import FlyingReaction from "./FlyingReaction";
import useInterval from "@/hooks/useInterval";
import {
  useBroadcastEvent,
  useEventListener,
  useSelf,
} from "@root/liveblocks.config";
import { CursorState } from "@/types/type";
import ReactionsWrapper from "./ReactionsWrapper";
import Reactions from "./Reactions";

type Props = {
  cursorState: CursorState;
  setCursorState: (cursorState: CursorState) => void;
};

export default function LiveReactions({ cursorState, setCursorState }: Props) {
  const [reactions, setReactions] = useState<Reaction[]>([]);

  return (
    <ReactionsWrapper
      cursorState={cursorState}
      reactions={reactions}
      setReactions={setReactions}
    >
      <Reactions reactions={reactions} />
    </ReactionsWrapper>
  );
}

// Falta tener el estado manejado con zustand para que Flying reacion renderice las reacciones basadas en el store.
