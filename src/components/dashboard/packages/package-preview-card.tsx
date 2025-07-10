"use client";

import Image from "next/image";

interface Props {
  imgUrl?: string | null;
}

export function PackagePreviewCard({ imgUrl }: Props) {
  return (
    <>
      <div className="p-1 bg-[#f4f4f4] border w-full h-96 overflow-hidden rounded-lg">
        {imgUrl ? (
          <Image
            src={imgUrl}
            alt={"Preview image"}
            width={300}
            height={500}
            className="h-full rounded-sm w-full object-cover transition-all duration-500 hover:scale-105 dark:brightness-[0.5] dark:grayscale hover:dark:grayscale-0"
          />
        ) : (
          <div className="h-full w-full rounded-sm bg-background"></div>
        )}
      </div>
      {/* {isMobile ? ( */}
      {/*   <div className="w-full h-80 overflow-hidden rounded-lg"> */}
      {/*     <Image */}
      {/*       src={imgUrl} */}
      {/*       alt={"Preview image"} */}
      {/*       width={300} */}
      {/*       height={200} */}
      {/*       className="h-full w-full object-cover transition-all duration-500 hover:scale-105 dark:brightness-[0.5] dark:grayscale hover:dark:grayscale-0" */}
      {/*     /> */}
      {/*   </div> */}
      {/* ) : ( */}
      {/*   <div></div> */}
      {/* )} */}
    </>
  );
}
