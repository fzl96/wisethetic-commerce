"use client";

import Image from "next/image";
import { useStudioPreview } from "@/store/image";

export function ImagePreview({ imgUrl }: { imgUrl?: string | null }) {
  const { imagePreview } = useStudioPreview();

  return (
    <div className="p-1 bg-[#f4f4f4] border md:w-[28rem] md:h-[40rem] overflow-hidden rounded-lg">
      <Image
        src={imagePreview ?? imgUrl ?? "/studio-img-placeholder.webp"}
        alt={"Preview image"}
        width={1500}
        height={1500}
        className="h-full rounded-sm w-full object-cover transition-all duration-500 hover:scale-105 dark:brightness-[0.5] dark:grayscale hover:dark:grayscale-0"
      />
    </div>
  );
}
