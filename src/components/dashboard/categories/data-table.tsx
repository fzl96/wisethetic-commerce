import { prisma } from "@/lib/prisma";
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
  });

  return (
    <div>
      <DataTable data={categories} />
      {/* <pre> */}
      {/*   <code>{JSON.stringify(categories, null, 2)}</code> */}
      {/* </pre> */}
    </div>
  );
}
