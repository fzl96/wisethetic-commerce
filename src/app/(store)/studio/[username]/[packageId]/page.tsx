import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PackageDetail } from "@/components/homepage/package-detail";

export default async function PackagePage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <MaxWidthWrapper className="mt-10 flex flex-col items-center justify-center px-5 md:px-48 space-y-6">
      <div className="flex w-full flex-col gap-10 md:flex-row">
        <Suspense fallback={"Loading..."}>
          <PackageDetail packageId={packageId} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
