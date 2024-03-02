"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import LiveAvatars from "./avatars/LiveAvatars";
import { memo } from "react";
import Image from "next/image";
import { NavbarProps } from "@/types/type";

// { activeElement }: NavbarProps
function Navbar() {
  console.log("Navbar rerendered");
  // const isActive = (value: string | Array<ActiveElement>) =>
  //   (activeElement && activeElement.value === value) ||
  //   (Array.isArray(value) &&
  //     value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className="bg-border shadow-md">
      <div className="mx-auto flex h-16 max-w-7xl select-none items-center justify-between gap-4 p-2 text-foreground sm:px-6 lg:px-8">
        <Image src="/assets/logo.svg" alt="Logo" width={58} height={20} />
        <div className="flex items-center justify-center gap-2">
          <LiveAvatars />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default memo(Navbar, (prevProps, nextProps) => false);

// export default memo(
//   Navbar,
//   (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement,
// );
