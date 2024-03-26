import React from "react";
import { Button } from "../ui/button";
import { BringToFront, Layers, SendToBack } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LayersControls() {
  return (
    <div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className="flex size-8 w-full items-center justify-center">
          <Button size="icon" variant="ghost">
            <Layers />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          className="flex flex-col items-center justify-between gap-2 p-4"
        >
          <div className="flex gap-2">
            {/* Mover atras */}
            <div className="flex h-16 w-fit flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
              <Button size="icon" variant="ghost" className="group size-8">
                <SendToBack className="group-hover:text-muted-foreground group-hover:transition-colors" />
              </Button>
              <span className="w-12 truncate text-center text-xs text-muted-foreground">
                Atrás
              </span>
            </div>

            {/* Mover adelante */}
            <div className="flex h-16 w-fit flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
              <Button size="icon" variant="ghost" className="group size-8">
                <BringToFront className="group-hover:text-muted-foreground group-hover:transition-colors" />
              </Button>
              <span className="w-12 truncate text-center text-xs text-muted-foreground">
                Adelante
              </span>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
