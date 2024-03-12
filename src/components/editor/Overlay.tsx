import { Redo2Icon, RotateCcw, Trash2, Undo2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useMutation } from "@root/liveblocks.config";
import { handleDelete } from "@/lib/key-events";
import { CanvasActions } from "@/types/type";

export const options = [
  { icon: <Undo2Icon />, value: "undo", name: "Undo" },
  { icon: <Redo2Icon />, value: "redo", name: "Redo" },
  {
    icon: <Trash2 />,
    value: "delete",
    name: "Delete",
  },
  {
    icon: <RotateCcw />,
    value: "reset",
    name: "Reset",
  },
];

export default function Overlay({
  handleAction,
}: {
  handleAction: (element: string) => void;
}) {
  return (
    <ul className="border-border-50 absolute left-4 top-4 z-50 flex flex-col gap-2 rounded-md border bg-card p-1 shadow-sm">
      {options.map((option) => (
        <li key={option.name}>
          <Button
            variant="ghost"
            size="icon"
            className={cn("aspect-square", {
              "text-destructive hover:bg-destructive/30 hover:text-destructive":
                option.value === "delete",
            })}
            onClick={() => {
              console.log(option.value);
              handleAction(option.value);
            }}
          >
            {option.icon}
          </Button>
        </li>
      ))}
    </ul>
  );
}
