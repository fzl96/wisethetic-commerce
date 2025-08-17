import { PackageCards } from "@/components/homepage/package-cards";
import { PackageNavigation } from "@/components/homepage/package-navigation";
import { PackagesCardsLoader } from "@/components/homepage/packages-loader";
import { StudioBanner } from "@/components/homepage/studio-banner";
import { StudioBannerLoader } from "@/components/homepage/studio-banner-loader";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

function decodeAndCleanUsername(username: string): string {
  const decoded = decodeURIComponent(username);
  return decoded.startsWith("@") ? decoded.slice(1) : decoded;
}

export default async function StudioPage({
  params,
  searchParams,
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { username } = await params;
  const cleanUsername = decodeAndCleanUsername(username);
  const page = parseInt((await searchParams).page as string) || 1;
  const query = (await searchParams).query || "";
  const categoryId = (await searchParams).category || "";
  const sort = (await searchParams).sort || "order";

  return (
    <MaxWidthWrapper className="mt-10 flex flex-col items-center justify-center px-5 md:px-48 space-y-6">
      <Suspense fallback={<StudioBannerLoader />}>
        <StudioBanner username={cleanUsername} />
      </Suspense>
      <Suspense fallback={<Skeleton className="w-full h-4" />}>
        <PackageNavigation
          page={page}
          query={query}
          categoryId={categoryId}
          username={cleanUsername}
        />
      </Suspense>
      <div className="w-full">
        <Suspense fallback={<PackagesCardsLoader className="" />}>
          <PackageCards
            page={page}
            query={query}
            username={cleanUsername}
            categoryId={categoryId}
            sort={sort}
          />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
