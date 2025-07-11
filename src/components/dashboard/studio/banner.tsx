"use client";

import Image from "next/image";
import { useStudioPreview } from "@/store/image";

export function Banner({ imgUrl }: { imgUrl?: string | null }) {
  const { bannerPreview } = useStudioPreview();

  return (
    <div className="p-1 bg-[#f4f4f4] border w-full md:h-[15rem] h-20 overflow-hidden rounded-lg">
      <Image
        src={bannerPreview ?? imgUrl ?? "/banner-placeholder.webp"}
        alt={"Preview image"}
        width={1920}
        height={600}
        className="h-full rounded-sm w-full object-cover transition-all duration-500 hover:scale-105 dark:brightness-[0.5] dark:grayscale hover:dark:grayscale-0"
      />
    </div>
  );
}
