"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Circle,
  MessageSquareMore,
  MousePointer2,
  Move,
  PenTool,
  Scaling,
  Shapes,
  Slash,
  Square,
  Triangle,
  Type,
  Image as Img,
} from "lucide-react";

const shapeElements = [
  {
    icon: <Square />,
    name: "Rectangle",
    value: "rectangle",
  },
  {
    icon: <Circle />,
    name: "Circle",
    value: "circle",
  },
  {
    icon: <Triangle />,
    name: "Triangle",
    value: "triangle",
  },
  {
    icon: <Slash />,
    name: "Line",
    value: "line",
  },
  {
    icon: <Img />,
    name: "Image",
    value: "image",
  },
];

const toolElements = [
  {
    icon: <MousePointer2 />,
    name: "Select",
    value: "select",
  },
  // { icon: <Scaling />, name: "Scale", value: "scale" },
  { icon: <Move />, name: "Move", value: "move" },
  {
    icon: <Shapes />,
    name: "Shapes",
    value: shapeElements,
  },
  {
    icon: <Type />,
    name: "Text",
    value: "text",
  },
  { icon: <PenTool />, name: "Pen", value: "pen" },
  {
    icon: <MessageSquareMore />,
    name: "Comments",
    value: "comments",
  },
];

export default function ToolsElements() {
  const [activeToolIndex, setActiveToolIndex] = useState<number | null>(null);

  const handleSelectTool = (index: number) => {
    setActiveToolIndex(index);
  };

  return (
    <ToggleGroup
      type="single"
      className="absolute inset-x-0 bottom-0 z-50 mx-auto flex h-20 gap-1 overflow-x-auto bg-background px-10 shadow-md ring-1 ring-foreground/10"
    >
      {toolElements.map((tool, index) => (
        <ToggleGroupItem
          value={tool.value as string}
          key={tool.name}
          className="group relative flex items-center justify-center"
        >
          {Array.isArray(tool.value) ? (
            <div className="flex gap-1">
              {tool.icon}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger>
                  <ChevronDown width={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {tool.value.map((shape) => (
                    <DropdownMenuItem
                      key={shape.name}
                      className="flex items-center gap-2 rounded-md p-2 hover:bg-border"
                      onClick={() => console.log(shape.name)}
                    >
                      <span>{shape.icon}</span>
                      <span>{shape.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <span>{tool.icon}</span>
          )}
          <span className="absolute scale-0 rounded-lg bg-border text-xs transition-transform before:absolute before:-bottom-1 before:-z-10 before:size-3 before:rotate-45 before:bg-border group-hover:scale-100 group-hover:delay-500 max-md:bottom-14 max-md:px-2 max-md:py-1 max-md:before:inset-x-0 max-md:before:mx-auto md:left-14 md:px-2 md:py-1 md:before:inset-y-0 md:before:-left-1 md:before:my-auto">
            {tool.name}
          </span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

//<button onClick={() => handleSelectTool(index)}>{tool.icon}</button>
