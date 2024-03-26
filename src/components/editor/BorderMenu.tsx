import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "../ui/button";
import { Minus, MoreHorizontal, Tally4 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Borders, NoBorder } from "./icons/icons";
import { Slider } from "@/components/ui/slider";

import { Label } from "../ui/label";
import { useId, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { cn } from "@/lib/utils";
import ColorPicker from "./ColorPicker";

type HexColor = `#${string}`;

export default function BorderMenu() {
  const borderNoneId = useId();
  const borderSolidId = useId();
  const borderDashId = useId();
  const borderDotId = useId();

  const [borderStyle, setBorderStyle] = useState({
    borderWidth: 0,
    borderStyle: "none",
  });

  console.log(borderStyle.borderWidth);

  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex size-8 w-full items-center justify-center">
          <Button variant="ghost" size="icon" className="">
            <Borders className="size-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="flex flex-col items-center justify-between gap-2 p-4"
        >
          <div className="flex flex-col gap-4">
            <RadioGroup
              defaultValue="none"
              className="bg-borde relative flex h-fit w-full items-center justify-between gap-2 bg-background"
            >
              {/* None */}
              <div className="rounded-md ring-1 ring-border">
                <RadioGroupItem
                  id={borderNoneId}
                  value="none"
                  className="peer hidden"
                />
                <Label
                  htmlFor={borderNoneId}
                  className="flex size-8 cursor-pointer flex-col items-center  justify-center rounded-md text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
                  onClick={() =>
                    setBorderStyle({ borderWidth: 0, borderStyle: "none" })
                  }
                >
                  <div className="p-1">
                    <NoBorder className="size-4 text-destructive" />
                  </div>
                </Label>
              </div>

              {/* Solid */}
              <div className="rounded-md ring-1 ring-border">
                <RadioGroupItem
                  id={borderSolidId}
                  value="solid"
                  className="peer hidden"
                />
                <Label
                  htmlFor={borderSolidId}
                  className="flex size-8 cursor-pointer flex-col items-center  justify-center rounded-md text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
                  onClick={() =>
                    setBorderStyle({ borderWidth: 1, borderStyle: "solid" })
                  }
                >
                  <Minus />
                </Label>
              </div>

              {/* Dash */}
              <div className="rounded-md ring-1 ring-border">
                <RadioGroupItem
                  id={borderDashId}
                  value="dash"
                  className="peer hidden"
                />
                <Label
                  htmlFor={borderDashId}
                  className="flex size-8 cursor-pointer flex-col items-center  justify-center rounded-md text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
                  onClick={() =>
                    setBorderStyle({ borderWidth: 1, borderStyle: "dash" })
                  }
                >
                  <div className="flex size-6">
                    <Minus />
                    <Minus />
                  </div>
                </Label>
              </div>

              {/* Dot */}
              <div className="rounded-md ring-1 ring-border">
                <RadioGroupItem
                  id={borderDotId}
                  value="dot"
                  className="peer hidden"
                />
                <Label
                  htmlFor={borderDotId}
                  className="flex size-8 cursor-pointer flex-col items-center  justify-center rounded-md text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
                  onClick={() =>
                    setBorderStyle({ borderWidth: 1, borderStyle: "dot" })
                  }
                >
                  <MoreHorizontal />
                </Label>
              </div>
            </RadioGroup>
            <Separator />
            <div
              className={cn("flex flex-col gap-2", {
                "opacity-50": borderStyle.borderStyle === "none",
              })}
            >
              <div className="flex justify-between">
                <span className="text-sm">Grosor</span>
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
                <span className="select-none">{borderStyle.borderWidth}</span>
              </div>
              <Slider
                disabled={borderStyle.borderStyle === "none"}
                id="slider"
                min={0}
                max={20}
                step={1}
                defaultValue={[borderStyle.borderWidth]}
                value={
                  borderStyle.borderWidth > 20
                    ? [20]
                    : [borderStyle.borderWidth]
                }
                onValueChange={(value) =>
                  setBorderStyle((prev) => ({ ...prev, borderWidth: value[0] }))
                }
              />
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
