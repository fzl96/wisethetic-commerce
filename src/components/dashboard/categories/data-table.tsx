import { prisma } from "@/lib/prisma";
import { getCategoriesPage } from "@/lib/queries/category.queries";
import { DataTable } from "./data-table-client";

interface Props {
  studioId: string;
  page: number;
}

export async function CategoriesDataTable({ studioId, page }: Props) {
  const itemsPerPage = 10;
  const categories = await prisma.category.findMany({
    skip: (Number(page) - 1) * itemsPerPage,
    take: itemsPerPage,
    where: {
      studioId: studioId,
    },
    select: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
      updatedAt: true,
      studioId: true,
    },
  });
  const totalPages = await getCategoriesPage(studioId);

  return (
    <div>
      <DataTable
        data={categories}
        studioId={studioId}
        totalPages={totalPages}
        page={page}
      />
    </div>
  );
}
