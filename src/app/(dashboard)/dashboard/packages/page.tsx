import { Suspense } from "react";
// import { LocationDataTable } from "@/components/dashboard/locations/data-table";
import { PackagesDataTable } from "@/components/dashboard/packages/data-table";
import { redirect } from "next/navigation";
import { getStudioId } from "@/server/user";

export default async function LocationsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const studio = await getStudioId();

  if (!studio?.id) redirect("/");

  const page = parseInt((await searchParams).page as string) || 1;

  return (
    <div className="px-4 lg:px-6">
      <h1>Locations Page</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <PackagesDataTable studioId={studio.id} page={page} />
      </Suspense>
    </div>
  );
}
