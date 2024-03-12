import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";
import {
  Avatar as AvatarCN,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const IMAGE_SIZE = 42;

export function Avatar({ name }: { src?: string; name: string }) {
  return (
    <div className={`${styles.avatar} size-10`} data-tooltip={name}>
      <Image
        src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
        alt="Avatar Picture"
        fill
        className={styles.avatar_picture}
      />
    </div>
  );
}

//relative -ml-3 flex size-14 place-content-center rounded-full border-4 border-white bg-slate-400

export function Avatar2({ name }: { src?: string; name: string }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <AvatarCN className="border-2 border-background">
            <AvatarImage
              src={`https://liveblocks.io/avatars/avatar-${Math.floor(Math.random() * 30)}.png`}
            />
            <AvatarFallback className="size-14 animate-pulse bg-foreground/40"></AvatarFallback>
          </AvatarCN>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
