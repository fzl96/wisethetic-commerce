import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 10;

export async function getLocationsPage(studioId: string) {
  const totalItems = await prisma.location.count({
    where: {
      studioId,
    },
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return totalPages;
}
