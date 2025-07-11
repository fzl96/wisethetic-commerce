import Link from "next/link";
import { getStudios, getStudiosPage } from "@/lib/queries/studio.queries";
import { StudioCard } from "./studio-card";
import { StudioPagination } from "./studio-pagination";
import { SearchFilter } from "../search-filter";

export async function StudioCards({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const studios = await getStudios({ page, query });
  const studiosPage = await getStudiosPage();
  return (
    <div className="mt-20 space-y-8">
      <div className="flex items-center justify-between">
        <div className="md:w-[20rem]">
          <SearchFilter placeholder="Search..." />
        </div>
        <StudioPagination totalPages={studiosPage} page={page} />
      </div>
      <div className="grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
        {studios.map((studio) => {
          const link = `@${studio.username}`;
          return (
            <Link href={`/studio/${link}`} key={studio.id}>
              <StudioCard studio={studio} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
