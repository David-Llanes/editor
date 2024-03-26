import {
  ArrowLeft,
  ArrowRight,
  CopyPlus,
  Redo2Icon,
  RotateCcw,
  Trash2,
  Undo2Icon,
} from "lucide-react";
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

export default function Controls({ handleClone }: { handleClone: any }) {
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
      <div className="flex flex-col items-center justify-center rounded-md bg-card p-1 shadow-sm">
        <Button
          variant="ghost"
          size="icon"
          disabled={!canUndo}
          onClick={undo}
          className="size-8 rounded-md text-foreground transition-colors hover:bg-accent hover:text-muted-foreground md:size-10"
        >
          <ArrowLeft className="size-4 md:size-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          disabled={!canRedo}
          onClick={redo}
          className="size-8 rounded-md text-foreground transition-colors hover:bg-accent hover:text-muted-foreground md:size-10"
        >
          <ArrowRight className="size-4 md:size-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            handleDelete(fabricRef.current as fabric.Canvas, deleteObject)
          }
          className="size-8 rounded-md text-foreground  transition-colors hover:bg-accent hover:text-destructive md:size-10"
        >
          <Trash2 className="size-4 md:size-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={deleteAll}
          disabled={!canDeleteAll}
          className="size-8 rounded-md text-foreground transition-colors hover:bg-accent hover:text-muted-foreground md:size-10"
        >
          <RotateCcw className="size-4 md:size-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClone}
          className="size-8 rounded-md text-foreground transition-colors hover:bg-accent hover:text-muted-foreground md:size-10"
        >
          <CopyPlus className="size-4 md:size-6" />
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
