import { Metadata } from "next";
import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PackagesCardsLoader } from "@/components/homepage/packages-loader";
import { PopularPackageCards } from "@/components/homepage/popular-cards";

export const metadata: Metadata = {
  title: "Popular Packages | Wisethetic",
};

export default async function PopularPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = parseInt((await searchParams).page as string) || 1;
  const query = (await searchParams).query || "";

  return (
    <MaxWidthWrapper className="mt-28 flex flex-col items-center justify-center px-5 md:px-48">
      <h1 className="font-accent text-2xl">Popular Packages</h1>
      <div className="w-full">
        <Suspense fallback={<PackagesCardsLoader className="mt-20" />}>
          <PopularPackageCards page={page} query={query} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
