"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProfileImage({ name }: { name: string }) {
  const [src, setSrc] = useState("/profile.png");
  return (
    <div className="relative mx-auto sm:mx-0 h-60 w-60 sm:h-72 sm:w-72 shrink-0 overflow-hidden rounded-full border border-line dark:border-dk-line bg-navy shadow-sm">
      <Image
        src={src}
        alt={name}
        fill
        sizes="288px"
        className="object-cover"
        priority
        onError={() => setSrc("/profile-placeholder.svg")}
        unoptimized={src.endsWith(".svg")}
      />
    </div>
  );
}
