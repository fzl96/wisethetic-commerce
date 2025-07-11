import { Skeleton } from "../ui/skeleton";

export function DashboardLoader() {
  return (
    <div className="w-full flex flex-col gap-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-96 w-full" />
    </div>
  );
}
