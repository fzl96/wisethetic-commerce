import { prisma } from "@/lib/prisma";
import { DataTable } from "./data-table-client";
import { getLocationsPage } from "@/lib/queries/locations.queries";

interface Props {
  studioId: string;
  page: number;
}

export async function LocationDataTable({ studioId, page }: Props) {
  const itemsPerPage = 10;
  const locations = await prisma.location.findMany({
    skip: (Number(page) - 1) * itemsPerPage,
    take: itemsPerPage,
    where: {
      studioId: studioId,
    },
    select: {
      id: true,
      name: true,
      address: true,
      link: true,
      createdAt: true,
      updatedAt: true,
      studioId: true,
    },
  });
  const totalPages = await getLocationsPage(studioId);

  return (
    <div>
      <DataTable
        data={locations}
        studioId={studioId}
        totalPages={totalPages}
        page={page}
      />
    </div>
  );
}
