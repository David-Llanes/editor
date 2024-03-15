"use client";

import LiveCursors from "./cursor/LiveCursors";
import LiveChat from "./cursor/LiveChat";
import LiveContainer from "./LiveContainer";
import ReactionSelector from "./reaction/ReactionSelector";
import LiveReactions from "./reaction/LiveReactions";
import LiveEditor from "./editor/LiveEditor";
import { useRef } from "react";
import EditorStateProvider from "@/hooks/useEditorState";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
};

export default function Workspace() {
  const isInteractingRef = useRef(false);

  return (
    <LiveContainer isInteractingRef={isInteractingRef}>
      <EditorStateProvider>
        <LiveEditor />
      </EditorStateProvider>
      <ReactionSelector />
      <LiveReactions />
      <LiveChat />
      <LiveCursors />
    </LiveContainer>
  );
}
