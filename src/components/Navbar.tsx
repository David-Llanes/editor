"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import LiveAvatars from "./avatars/LiveAvatars";
import { memo } from "react";
import Image from "next/image";
import { NavbarProps } from "@/types/type";

function Navbar({ activeElement }: NavbarProps) {
  console.log("Navbar rerendered");
  // const isActive = (value: string | Array<ActiveElement>) =>
  //   (activeElement && activeElement.value === value) ||
  //   (Array.isArray(value) &&
  //     value.some((val) => val?.value === activeElement?.value));

  return (
    <nav className="flex max-h-20 select-none items-center justify-between gap-4 bg-red-900 px-5 text-foreground">
      <Image src="/assets/logo.svg" alt="Logo" width={58} height={20} />
      <LiveAvatars />
      <ThemeToggle />
    </nav>
  );
}

export default memo(Navbar, (prevProps, nextProps) => false);

// export default memo(
//   Navbar,
//   (prevProps, nextProps) => prevProps.activeElement === nextProps.activeElement,
// );
