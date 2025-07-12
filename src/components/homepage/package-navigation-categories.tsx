import { getStudioCategories } from "@/lib/queries/studio.queries";
import { PackageCategorySelect } from "./package-category-select";

export async function PackageNavigationCategories({
  studioId,
}: {
  studioId: string;
}) {
  const categories = await getStudioCategories(studioId);

  return <PackageCategorySelect categories={categories || []} />;
}
