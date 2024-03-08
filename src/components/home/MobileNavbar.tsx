"use client";

import { useMediaQuery } from "usehooks-ts";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Toggle } from "../ui/toggle";
import { Button } from "../ui/button";
import { ChevronRight, MenuIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import { ThemeToggle } from "../ThemeToggle";

export default function MobileNavbar({
  navLinks,
}: {
  navLinks: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  console.log(`Is desktop: ${isDesktop}`);
  if (isDesktop) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Toggle asChild>
          <Button size="icon" className="group">
            <MenuIcon className="size-6 text-foreground transition-transform group-hover:scale-90" />
          </Button>
        </Toggle>
      </SheetTrigger>
      <SheetContent
        side={"right"}
        className="flex w-80 flex-col justify-between gap-6 overflow-y-auto"
      >
        <Image
          src="/assets/brand/logo.png"
          alt="Grafiko svg logo"
          width={32}
          height={32}
        />

        <div className="flex flex-col justify-center gap-6">
          {navLinks}
          <Separator className="" orientation="horizontal" />
          <Button
            variant="default"
            size="sm"
            className="group flex w-full items-center justify-center gap-2 font-bold"
          >
            <span>Crea un diseño</span>

            <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="mt-36 flex justify-between">
            <ThemeToggle />
            <Button
              variant="link"
              size="sm"
              className="group flex  items-center justify-center gap-2 font-bold text-destructive"
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
