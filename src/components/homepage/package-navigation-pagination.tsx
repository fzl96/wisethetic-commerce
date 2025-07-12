import { getPackagesPageStore } from "@/lib/queries/package.queries";
import { StudioPagination } from "./studio-pagination";

interface Props {
  query: string;
  page: number;
  studioId: string;
  categoryId: string;
}

export async function PackageNavigationPagination({
  query,
  page,
  studioId,
  categoryId,
}: Props) {
  const totalPages = await getPackagesPageStore(studioId, categoryId, query);

  return <StudioPagination page={page} totalPages={totalPages} />;
}
