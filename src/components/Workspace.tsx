"use client";

import LiveCursors from "./cursor/LiveCursors";
import LiveChat from "./cursor/LiveChat";
import LiveContainer from "./LiveContainer";
import ReactionSelector from "./reaction/ReactionSelector";
import LiveReactions from "./reaction/LiveReactions";
import CursorStateXD from "./CursorStateXD";

export default function Workspace() {
  return (
    <LiveContainer>
      <CursorStateXD />
      <ReactionSelector />
      <LiveReactions />
      <LiveChat />
      <LiveCursors />
    </LiveContainer>
  );
}
