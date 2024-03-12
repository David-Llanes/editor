"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";
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

type ShapeProps = {
  icon: JSX.Element;
  name: string;
  value: string;
};

export default function Herramientas() {
  const [activeShape, setActiveShape] = useState<ShapeProps | null>(null);

  return (
    <ToggleGroup
      type="single"
      className="bg-borde relative flex h-16 w-full items-center justify-center border-b shadow-sm"
    >
      {toolElements.map((tool, index) => {
        if (Array.isArray(tool.value)) {
          return (
            <ToggleGroupItem
              value={tool.name}
              key={tool.name}
              className="group relative flex items-center justify-center px-0"
            >
              <DropdownMenu>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => console.log(activeShape?.value)}
                >
                  {activeShape?.icon ?? tool.icon}
                </Button>

                <DropdownMenuTrigger asChild>
                  <ChevronDown />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Formas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {tool.value.map((shape) => (
                    <DropdownMenuItem
                      key={shape.name}
                      className="flex items-center rounded-md p-2 hover:bg-border"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log(shape.value);
                        setActiveShape(shape);
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span>{shape.icon}</span>
                        <span>{shape.name}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </ToggleGroupItem>
          );
        } else {
          return (
            <ToggleGroupItem
              asChild
              value={tool.value as string}
              key={tool.name}
              className="group relative flex items-center justify-center px-2"
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => console.log(tool.value)}
              >
                {tool.icon}
              </Button>
            </ToggleGroupItem>
          );
        }
      })}
    </ToggleGroup>
  );
}

//<button onClick={() => handleSelectTool(index)}>{tool.icon}</button>

{
  /* 
<ToggleGroupItem
  value={tool.value as string}
  key={tool.name}
  className="group relative flex items-center justify-center px-2"
>
  {Array.isArray(tool.value) ? (
    <Select>
      <SelectTrigger>{activeShape?.icon ?? tool.icon}</SelectTrigger>
      <SelectContent>
        {tool.value.map((shape) => (
          <SelectItem
            value={shape.value as string}
            key={shape.name}
            className="rounded-mdp-2 flex items-center gap-2 hover:bg-border"
          >
            <div className="flex gap-2 bg-red-500">
              <span>{shape.icon}</span>
              <span>{shape.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <span>{tool.icon}</span>
  )}
</ToggleGroupItem> 
      
      */
}
