import { HexColor } from "@/types/editorTypes";
import React from "react";

export default function ColorPicker() {
  const [color, setColor] = React.useState<HexColor>("#000000");
  return (
    <div className="flex items-center justify-center gap-4">
      <div className="relative size-8">
        <label
          htmlFor="color"
          className="absolute inset-0 z-10 cursor-pointer rounded-full ring-1 ring-foreground/15"
          style={{ backgroundColor: color }}
        />

        <input
          id="color"
          type="color"
          className="size-8 cursor-pointer appearance-none border-none bg-transparent opacity-0"
          onChange={(e) => setColor(e.target.value as HexColor)}
        />
      </div>
    </div>
  );
}
