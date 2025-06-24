import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 10;

export async function getCategoriesPage(studioId: string) {
  const totalItems = await prisma.category.count({
    where: {
      studioId,
    },
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return totalPages;
}
