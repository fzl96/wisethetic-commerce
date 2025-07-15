import { prisma } from "../prisma";

const ITEMS_PER_PAGE = 10;

export async function getPackagesPage(studioId: string) {
  const totalItems = await prisma.package.count({
    where: {
      studioId,
    },
  });

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return totalPages;
}

export async function getPackagesPageStore(
  studioId: string,
  categoryId: string,
  query: string,
) {
  const totalItems = await prisma.package.count({
    where: {
      studioId,
      categoryId,
      name: {
        equals: `%${query}%`,
        mode: "insensitive",
      },
    },
  });

  const totalPages = Math.ceil(totalItems / 6);

  return totalPages;
}

export async function getPackagesStore({
  page,
  query,
  studioId,
  categoryId,
}: {
  page: number;
  query: string;
  studioId: string;
  categoryId: string;
}) {
  const packages = await prisma.package.findMany({
    skip: (page - 1) * 6,
    take: 6,
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      locations: true,
    },
    where: {
      ...(categoryId && { categoryId }),
      studioId,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return packages;
}

export async function getPackageStore(id: string) {
  const pkg = await prisma.package.findUnique({
    include: {
      locations: true,
      category: true,
    },
    where: {
      id,
    },
  });

  return pkg;
}
