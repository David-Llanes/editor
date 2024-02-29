import React from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";

const IMAGE_SIZE = 42;

export function Avatar({ name }: { src?: string; name: string }) {
  return (
    <div className={`${styles.avatar} size-9`} data-tooltip={name}>
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
