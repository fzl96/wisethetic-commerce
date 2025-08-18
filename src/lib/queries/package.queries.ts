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
      ...(categoryId && { categoryId }),
      name: {
        contains: query,
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
  sort,
}: {
  page: number;
  query: string;
  studioId: string;
  categoryId: string;
  sort: string;
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
      _count: {
        select: {
          orders: true,
        },
      },
    },
    where: {
      ...(categoryId && { categoryId }),
      studioId,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy:
      sort == "latest" ? { createdAt: "desc" } : { orders: { _count: "desc" } },
  });

  return packages;
}

export async function getPackageStore(
  id: string,
  location: string | undefined,
) {
  const reserved = await prisma.order.findMany({
    select: {
      date: true,
    },
    where: {
      packageId: id,
      locationId: location,
    },
  });
  const pkg = await prisma.package.findUnique({
    include: {
      locations: true,
      category: true,
    },
    where: {
      id,
    },
  });

  return { reserved, pkg };
}

// export async function getPopularPackagePage(query: string) {
//
//   const totalPages = Math.ceil(totalItems / 9);
//
//   return totalPages;
// }

export async function getPopularPackages(query: string, page: number) {
  const totalItems = prisma.package.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: {
      orders: { _count: "desc" },
    },
  });
  const pckgs = prisma.package.findMany({
    skip: (page - 1) * 9,
    take: 9,
    include: {
      studio: {
        select: {
          id: true,
          username: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      locations: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy: { orders: { _count: "desc" } },
  });

  const [total, packages] = await Promise.all([totalItems, pckgs]);

  return {
    totalPages: Math.ceil(total / 9),
    packages,
  };
}
