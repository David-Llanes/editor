"use client";

import { RefObject } from "react";

export default function Canvas({
  canvasRef,
}: {
  canvasRef: RefObject<HTMLCanvasElement>;
}) {
  return (
    <div id="canvas" className="h-full w-full select-none bg-yellow-500">
      <canvas className="" ref={canvasRef} />
    </div>
  );
}
