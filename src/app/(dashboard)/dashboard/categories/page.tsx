import { CategoriesDataTable } from "@/components/dashboard/categories/data-table";
import { redirect } from "next/navigation";
import { getStudioId } from "@/server/user";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const studio = await getStudioId();

  if (!studio?.id) redirect("/");

  const page = parseInt((await searchParams).page as string) || 1;

  return (
    <div className="px-4 lg:px-6">
      <h1>Categories Page</h1>
      <CategoriesDataTable studioId={studio.id} page={page} />
    </div>
  );
}
