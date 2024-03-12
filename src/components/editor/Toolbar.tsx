"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import {
  ChevronDown,
  Circle,
  MessageSquareMore,
  MousePointer2,
  Move,
  PenTool,
  Shapes,
  Slash,
  Square,
  Triangle,
  Type,
  Image as Img,
} from "lucide-react";
import { useEditorState } from "@/hooks/useEditorState";

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
  { icon: <PenTool />, name: "Pen", value: "freeform" },
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

export default function Toolbar() {
  const { activeTool, setActiveTool, selectedShapeRef } = useEditorState();
  const [activeShape, setActiveShape] = useState<ShapeProps | null>(null);

  return (
    <RadioGroup
      defaultValue="select"
      className="bg-borde relative flex h-16 w-full items-center justify-center gap-1 border-b bg-background shadow-sm"
    >
      {toolElements.map((tool) => {
        if (Array.isArray(tool.value)) {
          return (
            <div key={tool.name} className="flex items-center">
              <RadioGroupItem
                checked={tool.value.some((shape) => shape.value === activeTool)}
                value={tool.name}
                id={tool.name}
                className="peer hidden"
              />
              <Label
                htmlFor={tool.name}
                className="flex cursor-pointer items-center rounded-md p-2 text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
              >
                <DropdownMenu modal={false}>
                  <span
                    onClick={() => {
                      if (activeShape) {
                        selectedShapeRef.current = activeShape.value;
                        setActiveTool(activeShape.value);
                      }

                      console.log(activeShape?.value);
                    }}
                  >
                    {activeShape?.icon ?? tool.icon}
                  </span>
                  <DropdownMenuTrigger>
                    <ChevronDown className="-mr-2 ml-2 size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Formas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {tool.value.map((shape) => (
                      <DropdownMenuItem
                        key={shape.name}
                        className="flex items-center rounded-md p-2 hover:bg-border"
                        onClick={() => {
                          console.log(shape.value);
                          selectedShapeRef.current = shape.value;
                          setActiveShape(shape);
                          setActiveTool(shape.value);
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
              </Label>
            </div>
          );
        } else {
          return (
            <div key={tool.name} className="flex items-center">
              <RadioGroupItem
                checked={tool.value === activeTool}
                value={tool.value}
                id={tool.value}
                className="peer hidden"
              />
              <Label
                htmlFor={tool.value}
                className="cursor-pointer rounded-md p-2 text-foreground transition-colors  peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
                onClick={() => {
                  console.log(tool.value);
                  selectedShapeRef.current = tool.value as string;
                  setActiveTool(tool.value as string);
                }}
              >
                {tool.icon}
              </Label>
            </div>
          );
        }
      })}
    </RadioGroup>
  );
}
