import { Metadata } from "next";
import { Suspense } from "react";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PackageDetail } from "@/components/homepage/package-detail";
import { PackageDetailLoader } from "@/components/homepage/package-detail-loader";
import { getPackage } from "@/lib/queries/package.queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ packageId: string }>;
}): Promise<Metadata> {
  const { packageId } = await params;

  const pkg = await getPackage(packageId);

  return {
    title: `${pkg?.name} - ${pkg?.category.name}`,
  };
}

export default async function PackagePage({
  params,
  searchParams,
}: {
  params: Promise<{ packageId: string }>;
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { packageId } = await params;
  const location = (await searchParams).location;

  return (
    <MaxWidthWrapper className="mt-10 flex flex-col items-center justify-center px-5 md:px-48 space-y-6">
      <div className="flex w-full flex-col gap-10 md:flex-row">
        <Suspense fallback={<PackageDetailLoader />}>
          <PackageDetail packageId={packageId} location={location} />
        </Suspense>
      </div>
    </MaxWidthWrapper>
  );
}
