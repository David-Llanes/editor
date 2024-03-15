import { Redo2Icon, RotateCcw, Trash2, Undo2Icon } from "lucide-react";
import { Button } from "../ui/button";
import {
  useRedo,
  useUndo,
  useCanRedo,
  useCanUndo,
} from "@root/liveblocks.config";
import useDeleteAll, { useCanDeleteAll } from "@/hooks/useDeleteAll";
import useDeleteObject from "@/hooks/useDeleteObject";
import { handleDelete } from "@/lib/key-events";
import { useEditorState } from "@/hooks/useEditorState";

export default function Overlay() {
  const undo = useUndo();
  const redo = useRedo();
  const deleteAll = useDeleteAll();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  const canDeleteAll = useCanDeleteAll();
  const deleteObject = useDeleteObject();
  const { fabricRef } = useEditorState();

  return (
    <>
      <div className="absolute left-4 top-4 z-50 flex rounded-md bg-card shadow-sm">
        <Button variant="ghost" size="icon" disabled={!canUndo} onClick={undo}>
          <Undo2Icon />
        </Button>
        <Button variant="ghost" size="icon" disabled={!canRedo} onClick={redo}>
          <Redo2Icon />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleDelete(fabricRef.current as fabric.Canvas, deleteObject)
          }
        >
          <Trash2 />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={deleteAll}
          disabled={!canDeleteAll}
        >
          <RotateCcw />
        </Button>
      </div>
    </>
  );
}
/* 


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
              disabled={
                (!canUndo && option.value === "undo") ||
                (!canRedo && option.value === "redo")
              }
            >
              {option.icon}
            </Button>
          </li>
        ))}
      </ul>

*/
