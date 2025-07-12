import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 6;

export async function getStudiosPage(query: string) {
  const totalItems = await prisma.studio.count({
    where: {
      name: {
        equals: `%${query}%`,
        mode: "insensitive",
      },
    },
  });

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

export async function getStudioBanner(username: string) {
  const studio = await prisma.studio.findFirst({
    where: {
      username,
    },
  });

  return studio;
}

export async function getStudioCategories(studioId: string) {
  const categories = await prisma.studio.findFirst({
    select: {
      categories: true,
    },
    where: {
      id: studioId,
    },
  });

  return categories?.categories;
}

export async function getStudioId(username: string) {
  const res = await prisma.studio.findFirst({
    select: {
      id: true,
    },
    where: {
      username,
    },
  });

  return res?.id;
}
