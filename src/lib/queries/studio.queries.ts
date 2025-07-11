import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 6;

export async function getStudiosPage() {
  const totalItems = await prisma.studio.count();

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return totalPages;
}

export async function getStudios({
  page,
  query,
}: {
  page: number;
  query: string;
}) {
  const studios = await prisma.studio.findMany({
    skip: (page - 1) * 6,
    take: 6,
    where: {
      name: {
        equals: `%${query}%`,
        mode: "insensitive",
      },
    },
  });

  return studios;
}
