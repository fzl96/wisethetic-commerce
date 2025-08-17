import { Skeleton } from "../ui/skeleton";
import { getStudioId } from "@/lib/queries/studio.queries";
import { SearchFilter } from "../search-filter";
import { PackageNavigationCategories } from "./package-navigation-categories";
import { PackageNavigationPagination } from "./package-navigation-pagination";
import { PackageNavigationSort } from "./package-navigation-sort";

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
    <div className="flex flex-col md:flex-row w-full md:items-center gap-4 justify-between">
      <div className="flex md:flex-row flex-col md:items-center gap-4">
        <div className="md:w-80 w-full">
          <SearchFilter placeholder="Search package..." />
        </div>
        <div className="flex items-center gap-4">
          <PackageNavigationCategories studioId={studioId} />
          <PackageNavigationSort />
        </div>
      </div>
      <PackageNavigationPagination
        studioId={studioId}
        categoryId={categoryId}
        page={page}
        query={query}
      />
    </div>
  );
}
