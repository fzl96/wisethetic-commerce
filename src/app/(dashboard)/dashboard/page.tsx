import { redirect } from "next/navigation";
import { OrderDataTable } from "@/components/dashboard/order/data-table";
import { SectionCards } from "@/components/dashboard/order/section-cards";
import { getStudioId } from "@/server/user";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function DasbhoardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const studio = await getStudioId();
  const query = (await searchParams).query || "";
  const page = parseInt((await searchParams).page as string) || 1;
  const status =
    ((await searchParams).status as
      | "PENDING"
      | "PROCESSING"
      | "SUCCESS"
      | "CANCEL"
      | "REFUNDED") || "";

  if (!studio?.id) redirect("/");

  return (
    <>
      <Suspense
        fallback={
          <div className="px-6 grid lg:grid-cols-4 gap-4 md:grid-cols-2 grid-cols-1">
            <Skeleton className="w-full h-45" />
            <Skeleton className="w-full h-45" />
            <Skeleton className="w-full h-45" />
            <Skeleton className="w-full h-45" />
          </div>
        }
      >
        <SectionCards studioId={studio.id} />
      </Suspense>
      <Suspense
        fallback={
          <div className="space-y-4 px-6">
            <Skeleton className="w-40 h-8" />
            <Skeleton className="h-80 w-full" />
          </div>
        }
      >
        <OrderDataTable
          studioId={studio.id}
          status={status}
          page={page}
          query={query}
        />
      </Suspense>
    </>
  );
}
