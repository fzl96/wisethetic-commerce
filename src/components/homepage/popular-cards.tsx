import { SearchFilter } from "../search-filter";
import Link from "next/link";
import { getPopularPackages } from "@/lib/queries/package.queries";
import { PopularCard } from "./popular-card";
import { PopularPackagePagination } from "./popular-page-pagination";

export async function PopularPackageCards({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const data = await getPopularPackages(query, page);

  return (
    <div className="mt-20 space-y-8">
      <div className="flex items-center justify-between">
        <div className="md:w-[20rem]">
          <SearchFilter placeholder="Search..." />
        </div>
        <PopularPackagePagination totalPages={data.totalPages} page={page} />
      </div>
      <div className="grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
        {data.packages.map((pkg) => {
          const link = `@${pkg.studio.username}/${pkg.id}`;
          return (
            <Link href={`/studio/${link}`} key={pkg.id}>
              <PopularCard pkg={pkg} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
