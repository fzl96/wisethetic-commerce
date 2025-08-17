import { Skeleton } from "../ui/skeleton";

export function PackageDetailLoader() {
  return (
    <div className="flex w-full flex-col gap-10 md:flex-row ">
      <div className="rounded-xl border border-home-border bg-home-card-background p-3 shadow-sm transition-all duration-200 hover:bg-home-card-background-hover">
        <div className="rounded-lg aspect-[4/5] w-full border">
          <Skeleton className="h-full md:w-120 w-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="w-60 h-6" />
        <Skeleton className="h-10 w-96" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-10 w-40" />
        <Skeleton className="mt-6 h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="mt-6 h-6 w-40" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
