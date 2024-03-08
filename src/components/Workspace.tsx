"use client";

import LiveCursors from "./cursor/LiveCursors";
import LiveChat from "./cursor/LiveChat";
import LiveContainer from "./LiveContainer";
import ReactionSelector from "./reaction/ReactionSelector";
import LiveReactions from "./reaction/LiveReactions";
import CursorStateXD from "./CursorStateXD";
import Canvas from "./editor/Canvas";

export default function Workspace() {
  return (
    <LiveContainer>
      <Canvas />
      <ReactionSelector />
      <LiveReactions />
      <LiveChat />
      <LiveCursors />
      {/* <CursorStateXD /> */}
    </LiveContainer>
  );
}
