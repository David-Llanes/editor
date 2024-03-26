import { HexColor } from "@/types/editorTypes";
import React from "react";

export default function BorderColor() {
  const [borderColor, setBorderColor] = React.useState<HexColor>("#000000");

  return (
    <div className="relative size-8 ">
      <label
        htmlFor="borderColor"
        className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full ring-1 ring-foreground/15"
        style={{ backgroundColor: borderColor }}
      >
        <div className="size-6 rounded-full bg-background ring-1 ring-foreground/15" />
      </label>

      <input
        id="borderColor"
        type="color"
        className="size-8 cursor-pointer appearance-none border-none bg-transparent opacity-0"
        onChange={(e) => setBorderColor(e.target.value as HexColor)}
      />
    </div>
  );
}
