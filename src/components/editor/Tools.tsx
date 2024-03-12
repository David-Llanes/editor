"use client";
import { cn } from "@/lib/utils";
import {
  Hand,
  Layers,
  MessageCircle,
  MousePointer2,
  Pencil,
  Redo,
  RotateCcw,
  Save,
  Scaling,
  Shapes,
  Trash2,
  Type,
  Undo,
} from "lucide-react";
import { useState } from "react";

const tools = [
  { icon: <MousePointer2 />, label: "Seleccionar" },
  { icon: <Scaling />, label: "Escalar" },
  { icon: <Hand />, label: "Mover" },
  { icon: <Shapes />, label: "Formas" },
  { icon: <Type />, label: "Texto" },
  { icon: <Pencil />, label: "Pincel" },
  { icon: <MessageCircle />, label: "Comentario" },
];

const options = [
  // { icon: <Layers />, label: "Capas" },
  { icon: <Undo />, label: "Deshacer" },
  { icon: <Redo />, label: "Rehacer" },
  // { icon: <Save />, label: "Guardar" },
  { icon: <Trash2 />, label: "Eliminar" },
  { icon: <RotateCcw />, label: "Restablecer" },
];

export default function Tools() {
  const [activeToolIndex, setActiveToolIndex] = useState<number | null>(null);

  const handleSelectTool = (index: number) => {
    setActiveToolIndex(index);
  };

  return (
    <ul className="absolute bottom-4 z-50 flex h-fit w-fit items-center justify-center gap-1 rounded-lg bg-primary-foreground shadow-md ring-1 ring-foreground/10 max-md:inset-x-0 max-md:mx-auto md:left-4 md:top-4 md:flex-col">
      {tools.map((tool, index) => (
        <li
          key={index}
          className="group relative flex items-center justify-center"
        >
          <button
            className={cn("rounded-lg p-3 hover:bg-border ", {
              "bg-muted-foreground/50 hover:bg-muted-foreground/50":
                activeToolIndex === index,
            })}
            onClick={() => handleSelectTool(index)}
          >
            {tool.icon}
          </button>
          <span className="absolute scale-0 rounded-lg bg-border text-xs transition-transform before:absolute before:-bottom-1 before:-z-10 before:size-3 before:rotate-45 before:bg-border group-hover:scale-100 group-hover:delay-500 max-md:bottom-14 max-md:px-2 max-md:py-1 max-md:before:inset-x-0 max-md:before:mx-auto md:left-14 md:px-2 md:py-1 md:before:inset-y-0 md:before:-left-1 md:before:my-auto">
            {tool.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Options() {
  const handleClick = () => {};

  return (
    <ul className="relative z-20 mx-auto flex h-fit w-fit items-center justify-center gap-1 rounded-lg">
      {options.map((tool, index) => (
        <li
          key={index}
          className="group flex items-center justify-center rounded-lg"
          onClick={() => handleClick()}
        >
          <button className="rounded-lg p-2 hover:bg-foreground/10 active:bg-foreground/5">
            {tool.icon}
          </button>
          <span className="absolute -bottom-8 scale-0 rounded-lg bg-border px-2 py-1 text-xs transition-transform before:absolute before:inset-x-0 before:-top-1 before:-z-10 before:mx-auto before:size-3 before:rotate-45 before:bg-border group-hover:scale-100 group-hover:delay-500">
            {tool.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
