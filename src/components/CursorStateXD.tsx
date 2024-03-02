import { useCursorState } from "@/store/Provider";
import React from "react";

export default function CursorStateXD() {
  const cursorState = useCursorState()((state) => state.cursorState);
  return <div className="fixed z-20 p-4">{cursorState.mode}</div>;
}
