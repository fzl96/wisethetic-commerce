import Link from "next/link";
import { PackageCard } from "./package-card";
import {
  getPackagesStore,
  getPackagesPageStore,
} from "@/lib/queries/package.queries";
import { SearchFilter } from "../search-filter";

export async function PackageCards({
  page,
  query,
  categoryId,
  username,
}: {
  page: number;
  query: string;
  categoryId: string;
  username: string;
}) {
  const packages = await getPackagesStore({
    page,
    query,
    categoryId,
  });
  return (
    <div className="mt-20 space-y-8">
      <div className="flex items-center justify-between">
        <div className="md:w-[20rem]">
          <SearchFilter placeholder="Search..." />
        </div>
        {/* <StudioPagination totalPages={studiosPage} page={page} /> */}
      </div>
      <div className="grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
        {packages.map((pkg) => {
          const link = `@${username}/${pkg.id}`;
          return (
            <Link href={`/studio/${link}`} key={pkg.id}>
              <PackageCard pkg={pkg} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
