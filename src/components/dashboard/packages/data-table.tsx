import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table-client";
import { getAllCategories } from "@/lib/queries/category.queries";
import { getAllLocations } from "@/lib/queries/locations.queries";
import { getPackagesPage } from "@/lib/queries/package.queries";

interface Props {
  studioId: string;
  page: number;
}

export async function PackagesDataTable({ studioId, page }: Props) {
  const itemsPerPage = 10;
  const packages = await prisma.package.findMany({
    skip: (Number(page) - 1) * itemsPerPage,
    take: itemsPerPage,
    where: {
      studioId: studioId,
    },
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      locations: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  const totalPages = await getPackagesPage(studioId);
  const categories = await getAllCategories(studioId);
  const locations = await getAllLocations(studioId);

  return (
    <div>
      <DataTable
        data={packages}
        categories={categories}
        locations={locations}
        studioId={studioId}
        totalPages={totalPages}
        page={page}
      />
    </div>
  );
}
