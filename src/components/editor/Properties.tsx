import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ColorPicker from "./ColorPicker";
import BorderMenu from "./BorderMenu";
import { Separator } from "../ui/separator";
import Filters from "./Filters";
import TextSettings from "./TextSettings";
import BorderColor from "./BorderColor";
import LayersControls from "./LayersControls";

export default function Properties() {
  const type = "text";
  return (
    <div
      className="absolute inset-x-0 bottom-4 z-50 mx-auto flex px-2 
      "
    >
      <ScrollArea className="relative w-full whitespace-nowrap rounded-md border border-border/50 bg-background px-4 shadow-md">
        <div className="flex h-[5.5rem] items-center justify-center gap-4 px-2">
          {/* Colors */}
          <div className="flex w-12 max-w-12 flex-col items-center justify-center gap-2 rounded-md p-1">
            <ColorPicker />
            <span className="w-12 truncate text-center text-xs text-muted-foreground">
              Color
            </span>
          </div>

          {/* Color de borde */}
          <div className="flex w-12 max-w-12 flex-col items-center justify-center gap-2 rounded-md p-1">
            <BorderColor />
            <span className="w-12 truncate text-center text-xs text-muted-foreground">
              Color
            </span>
          </div>

          {/* Bordes */}
          <div className="flex h-16 w-12 max-w-12 flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
            <BorderMenu />
            <span className="w-12 truncate text-center text-xs text-muted-foreground">
              Bordes
            </span>
          </div>

          {/* Text */}
          {type === "text" && (
            <>
              <TextSettings />
            </>
          )}

          {/* Filters */}
          <div className="flex h-16 w-12 max-w-12 flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
            <Filters />
            <span className="w-12 truncate text-center text-xs text-muted-foreground">
              Filtros
            </span>
          </div>

          {/* Capas */}
          <div className="flex h-16 w-fit flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
            <LayersControls />
            <span className="w-12 truncate text-center text-xs text-muted-foreground">
              Capas
            </span>
          </div>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
