import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { StudioCards } from "@/components/homepage/studio-cards";
import { Suspense } from "react";
import { StudioCardsLoader } from "@/components/homepage/studio-card-loader";

export default async function ProductCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const page = parseInt((await searchParams).page as string) || 1;
  const query = (await searchParams).query || "";

  return (
    <MaxWidthWrapper className="mt-28 flex flex-col items-center justify-center px-5 md:px-40">
      <h1 className="font-accent text-2xl">Studios</h1>
      <div className="w-full">
        <Suspense fallback={<StudioCardsLoader />}>
          <StudioCards page={page} query={query} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
