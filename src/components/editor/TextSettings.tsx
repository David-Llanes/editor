"use client";

import { CaseSensitive, MinusIcon, PlusIcon, Type } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { fontSizeOptions } from "@/constants";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { TextBold, TextItalic, TextUnderline } from "./icons/icons";
import ColorPicker from "./ColorPicker";
import { useState } from "react";
import { HexColor } from "@/types/editorTypes";

const tipografias = [
  {
    value: "arial",
    label: "Arial",
  },
  {
    value: "calibri",
    label: "Calibri",
  },
  {
    value: "timesNewRoman",
    label: "Times New Roman",
  },
  {
    value: "helvetica",
    label: "Helvetica",
  },
  {
    value: "verdana",
    label: "Verdana",
  },
  {
    value: "courierNew",
    label: "Courier New",
  },
  {
    value: "garamond",
    label: "Garamond",
  },
  {
    value: "georgia",
    label: "Georgia",
  },
  {
    value: "comicSansMS",
    label: "Comic Sans MS",
  },
  {
    value: "trebuchetMS",
    label: "Trebuchet MS",
  },
];

export default function TextSettings() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-16 w-fit flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
        <FontSelect />
        <span className="w-fit truncate text-center text-xs text-muted-foreground">
          Tipografia
        </span>
      </div>

      <div className="flex h-16 w-fit flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
        <FontSize />
        <span className="w-fit truncate text-center text-xs text-muted-foreground">
          Tamaño
        </span>
      </div>

      <div className="flex h-16 w-12 max-w-12 flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
        <FontColor />
        <span className="w-12 truncate text-center text-xs text-muted-foreground">
          Color
        </span>
      </div>
      <div className="flex h-16 w-fit flex-col items-center justify-center gap-2 overflow-hidden rounded-md p-1">
        <FontStyle />
        <span className="w-fit truncate text-center text-xs text-muted-foreground">
          Estilos de texto
        </span>
      </div>
    </div>
  );
}

export function FontSelect() {
  return (
    <Select>
      <SelectTrigger className="h-8 w-[180px]">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent className="">
        <ScrollArea className="h-60">
          {tipografias.map((tipografia) => (
            <SelectItem
              key={tipografia.value}
              value={tipografia.value}
              className="truncate"
            >
              {tipografia.label}
            </SelectItem>
          ))}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}

export function FontSize() {
  return (
    <div className="flex rounded-md ring-1 ring-border">
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded-r-none"
      >
        <MinusIcon className="size-4 group-hover:text-muted-foreground group-hover:transition-colors" />
      </Button>
      <Select>
        <SelectTrigger className="h-8 w-16 truncate rounded-none border-b-0 border-l border-r border-t-0">
          <SelectValue placeholder="16" />
        </SelectTrigger>
        <SelectContent className="min-w-24 rounded-md">
          <ScrollArea className="h-60">
            {fontSizeOptions.map((fontsize) => (
              <SelectItem
                key={fontsize.value}
                value={fontsize.value}
                className="w-16"
              >
                {fontsize.label}
              </SelectItem>
            ))}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </SelectContent>
      </Select>
      <Button
        variant="ghost"
        size="icon"
        className="group size-8 rounded-l-none"
      >
        <PlusIcon className="size-4 group-hover:text-muted-foreground group-hover:transition-colors" />
      </Button>
    </div>
  );
}

export function FontStyle() {
  return (
    <ToggleGroup type="multiple" variant="default" className="gap-2">
      <ToggleGroupItem
        value="bold"
        aria-label="Toggle bold"
        className="gap1 aspect-square size-8 p-1"
      >
        <TextBold className="size-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        aria-label="Toggle italic"
        className="aspect-square size-8 p-1"
      >
        <TextItalic className="size-5" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="strikethrough"
        aria-label="Toggle strikethrough"
        className="aspect-square size-8 p-1"
      >
        <TextUnderline className="size-5" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

export function FontColor() {
  const [fontColor, setFontColor] = useState<HexColor>("#000000");
  return (
    <div className="relative size-8">
      <label
        htmlFor="fontColor"
        className="absolute inset-0 z-10 cursor-pointer rounded-full  opacity-0 ring-1 ring-foreground/40"
        style={{ backgroundColor: fontColor }}
      />

      <input
        id="fontColor"
        type="color"
        className="size-8 cursor-pointer appearance-none border-none bg-transparent opacity-0"
        onChange={(e) => setFontColor(e.target.value as HexColor)}
      />

      <div className="pointer-events-none absolute top-0 flex w-full select-none flex-col items-center justify-center">
        <CaseSensitive />
        <div
          className="h-1 w-6 rounded-full ring-1 ring-foreground/20"
          style={{ backgroundColor: fontColor }}
        />
      </div>
    </div>
  );
}
