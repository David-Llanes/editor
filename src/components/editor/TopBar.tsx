import Image from "next/image";
import { Separator } from "../ui/separator";
import { Download } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";

export default function TopBar() {
  return (
    <div className="absolute inset-x-0 top-2 z-50 mx-auto w-full bg-transparent px-2">
      <div className="flex items-center justify-between gap-4 rounded-md border bg-background p-2 shadow-sm">
        <div className="flex w-fit flex-1 items-center gap-2">
          <div className="min-w-20 max-w-48">
            <Image
              src="/assets/brand/logotipo.png"
              alt="Logo"
              width={128}
              height={64}
              className="w-full"
            />
          </div>
          <Separator orientation="vertical" className="h-6" />
          <div>
            <input
              type="text"
              className="min-w-0 max-w-36 truncate rounded-md bg-transparent px-2 py-1 text-xs ring-1 ring-border/50 md:max-w-48 md:text-sm"
              defaultValue="Nombre del proyecto xd ajjaja"
            />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <div className="flex w-fit items-center gap-2">
            <Download />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
}
