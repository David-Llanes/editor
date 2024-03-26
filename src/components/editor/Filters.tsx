import React from "react";
import { Opacity } from "./icons/icons";
import { Button } from "../ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Slider } from "../ui/slider";

export default function Filters() {
  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex size-8 w-full items-center justify-center">
          <Button size="icon" variant="ghost">
            <Opacity className="size-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="flex flex-col items-center justify-between gap-2 p-4"
        >
          <div className="flex w-full justify-between">
            <span className="text-sm">Opacidad</span>
            {/* <input
                  disabled={borderStyle.borderStyle === "none"}
                  type="text"
                  defaultValue={0}
                  value={
                    borderStyle.borderWidth > 20
                      ? [20].toString()
                      : [borderStyle.borderWidth].toString()
                  }
                  onChange={(e) =>
                    setBorderStyle((prev) => ({
                      ...prev,
                      borderWidth: Number(e.target.value),
                    }))
                  }
                  className="w-10 min-w-0 px-2 text-right"
                /> */}
            <span className="select-none">{0}</span>
          </div>
          <Slider
            // disabled={borderStyle.borderStyle === "none"}
            id="slider"
            min={0}
            max={100}
            step={1}
            defaultValue={[100]}
            // value={
            //   borderStyle.borderWidth > 20 ? [20] : [borderStyle.borderWidth]
            // }
            // onValueChange={(value) =>
            //   setBorderStyle((prev) => ({ ...prev, borderWidth: value[0] }))
            // }
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
