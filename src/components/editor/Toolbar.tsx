"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRef, useState } from "react";
import {
  Circle,
  MousePointer2,
  Move,
  PenTool,
  Shapes,
  Slash,
  Square,
  Triangle,
  Type,
  Image as Img,
  ChevronRight,
} from "lucide-react";
import {
  Modes,
  ShapeToDraw,
  Tools,
  useEditorState,
} from "@/hooks/useEditorState";
import { handleImageUpload } from "@/lib/shapes";
import { ActiveTool } from "@/types/type";

const shapeElements = [
  {
    icon: <Square className="size-4 md:size-6" />,
    name: "Rectangle",
    value: Tools.rect,
  },
  {
    icon: <Circle className="size-4 md:size-6" />,
    name: "Circle",
    value: Tools.circle,
  },
  {
    icon: <Triangle className="size-4 md:size-6" />,
    name: "Triangle",
    value: Tools.triangle,
  },
  {
    icon: <Slash className="size-4 md:size-6" />,
    name: "Line",
    value: Tools.line,
  },
];

const toolElements = [
  {
    icon: <MousePointer2 className="size-4 md:size-6" />,
    name: "Select",
    value: Tools.select,
  },
  { icon: <Move className="size-4 md:size-6" />, name: "Move", value: "move" },
  {
    icon: <Shapes className="size-4 md:size-6" />,
    name: "Shapes",
    value: shapeElements,
  },
  {
    icon: <Type className="size-4 md:size-6" />,
    name: "Text",
    value: Tools.text,
  },
  {
    icon: <Img className="size-4 md:size-6" />,
    name: "Image",
    value: Tools.image,
  },
  {
    icon: <PenTool className="size-4 md:size-6" />,
    name: "Freeform",
    value: Tools.freeform,
  },
  // {
  //   icon: <MessageSquareMore />,
  //   name: "Comments",
  //   value: Tools.comments
  // },
];

type ShapeProps = {
  icon: JSX.Element;
  name: string;
  value: "rect" | "circle" | "triangle" | "line";
};

export default function Toolbar({
  syncShapeInStorage,
}: {
  syncShapeInStorage: any;
}) {
  const { toast } = useToast();
  const {
    activeTool,
    setActiveTool,
    fabricRef,
    modeRef,
    activeObjectRef,
    shapeToDrawRef,
  } = useEditorState();
  const [activeShape, setActiveShape] = useState<ShapeProps | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleToolClick = (tool: any, e: any) => {
    if (tool.value !== Tools.freeform) {
      if (fabricRef.current) {
        fabricRef.current.isDrawingMode = false;
      }
    } else {
      modeRef.current = Modes.isFreeForm;
      if (fabricRef.current && modeRef.current === Modes.isFreeForm) {
        activeObjectRef.current = null;
        fabricRef.current.discardActiveObject();
        fabricRef.current.isDrawingMode = true;
      }
    }

    if (tool.value === Tools.select) {
      modeRef.current = Modes.isSelecting;
      if (fabricRef.current) {
        fabricRef.current.selection = true;
      }
    }

    if (tool.value === Tools.move) {
      modeRef.current = Modes.isMoving;
      if (fabricRef.current) {
        fabricRef.current.discardActiveObject();
        fabricRef.current.selection = false;
        fabricRef.current.forEachObject((obj) => (obj.selectable = false));
      }
    }

    if (tool.value === Tools.text) {
      modeRef.current = Modes.isDrawing;
      shapeToDrawRef.current = "text";
    }

    if (tool.value === Tools.image) {
      modeRef.current = Modes.isSelecting; // Maybe isUploading?
      setActiveTool(ActiveTool.Select);
      imageInputRef.current?.click();
    }

    setActiveTool(tool.value as string);
    fabricRef.current?.requestRenderAll();
  };

  return (
    <RadioGroup
      defaultValue="select"
      className="bg-borde relative flex h-fit w-full flex-col items-center justify-center gap-1 rounded-md border-b bg-background p-1 shadow-sm"
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
                className="flex cursor-pointer flex-col items-center justify-center  rounded-md text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
              >
                <DropdownMenu modal={false}>
                  <span
                    className="p-2"
                    onClick={() => {
                      if (activeShape) {
                        if (fabricRef.current) {
                          fabricRef.current.isDrawingMode = false;
                        }
                        modeRef.current = Modes.isDrawing;
                        shapeToDrawRef.current =
                          activeShape.value as ShapeToDraw;
                        setActiveTool(activeShape.value);
                      } else {
                        toast({
                          title: "Debes seleccionar una forma primero.",
                          description:
                            "Presiona el icono de flecha para ver las opciones.",
                          duration: 2000,
                        });
                      }
                    }}
                  >
                    {activeShape?.icon ?? tool.icon}
                  </span>
                  <DropdownMenuTrigger className="flex w-full items-center justify-center ">
                    <ChevronRight className="mb-1 size-4 md:size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" className="ml-4">
                    <DropdownMenuLabel>Formas</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {tool.value.map((shape) => (
                      <DropdownMenuItem
                        key={shape.name}
                        className="flex items-center rounded-md p-2 hover:bg-border"
                        onClick={() => {
                          if (fabricRef.current) {
                            fabricRef.current.isDrawingMode = false;
                          }
                          shapeToDrawRef.current = shape.value as ShapeToDraw;
                          modeRef.current = Modes.isDrawing;
                          setActiveShape(shape as ShapeProps);
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
                className="cursor-pointer rounded-md p-2 text-foreground transition-colors peer-hover:bg-accent peer-hover:text-muted-foreground peer-aria-checked:bg-border hover:peer-aria-checked:text-foreground"
                onClick={(e) => handleToolClick(tool, e)}
              >
                {tool.icon}
              </Label>
            </div>
          );
        }
      })}
      <input
        type="file"
        className="hidden"
        ref={imageInputRef}
        accept="image/*"
        onChange={(e) => {
          e.stopPropagation();

          handleImageUpload({
            //@ts-ignore
            file: e.target.files[0],
            fabricCanvas: fabricRef,
            activeObjectRef,
            modeRef,
            syncShapeInStorage,
            setActiveTool,
          });
        }}
      />
    </RadioGroup>
  );
}

// FALTA ARREGLAR QUE CUANDO NO SE SELECCIONE UNA IMAGEN SE CAMBIE A SELECT EL ESTADO Y EL MODO
