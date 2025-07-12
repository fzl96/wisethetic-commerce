import { Skeleton } from "../ui/skeleton";
import { getStudioId } from "@/lib/queries/studio.queries";
import { SearchFilter } from "../search-filter";
import { PackageNavigationCategories } from "./package-navigation-categories";
import { PackageNavigationPagination } from "./package-navigation-pagination";

interface Props {
  page: number;
  query: string;
  username: string;
  categoryId: string;
}

export async function PackageNavigation({
  page,
  query,
  username,
  categoryId,
}: Props) {
  const studioId = await getStudioId(username);
  if (!studioId) return <Skeleton className="w-full h-6" />;

  return (
    <div className="flex w-full items-center gap-8 justify-between">
      <div className="md:w-96">
        <SearchFilter placeholder="Search package..." />
      </div>
      <div className="flex items-center">
        <PackageNavigationCategories studioId={studioId} />
        <PackageNavigationPagination
          studioId={studioId}
          categoryId={categoryId}
          page={page}
          query={query}
        />
      </div>
    </div>
  );
}
