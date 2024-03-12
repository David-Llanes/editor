import React from "react";
import LiveAvatars from "../avatars/LiveAvatars";
import { ThemeToggle } from "../ThemeToggle";
import Image from "next/image";
import Container from "../Container";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function EditorHeader() {
  return (
    <nav className="w-full px-6">
      <div className="relative flex h-16 items-center justify-between gap-6">
        {/* Lado izquierdo */}
        <div className="flex flex-1 items-center gap-6">
          <Link href="/" className="min-w-32 shrink">
            <Image
              src="/assets/brand/logotipo.png"
              alt="Logo"
              width={156}
              height={78}
              className="max-lg:w-32"
            />
          </Link>
        </div>

        {/* Lado derecho */}
        <div className="flex shrink-0 items-center gap-6">
          <div className="flex gap-4">
            <LiveAvatars />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
