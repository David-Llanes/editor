import { CopyPlus, MoreHorizontal, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";

export default function OverlayOptions({
  optionsRef,
}: {
  optionsRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 z-50 flex gap-1 rounded-md border border-border/10 bg-background p-2 shadow-sm"
      ref={optionsRef}
      style={{}}
    >
      <Button variant="ghost" size="icon">
        <CopyPlus />
      </Button>
      <Button variant="ghost" size="icon">
        <Trash2Icon />
      </Button>
      <Button variant="ghost" size="icon">
        <MoreHorizontal />
      </Button>
    </div>
  );
}
