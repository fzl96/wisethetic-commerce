import { prisma } from "../prisma";
import { subMonths, startOfMonth, endOfMonth } from "date-fns";

const ITEMS_PER_PAGE = 10;

export async function getOrders(
  studioId: string,
  page: number,
  query: string,
  status?: "PENDING" | "PROCESSING" | "SUCCESS" | "CANCEL" | "REFUNDED",
) {
  const totalPageQuery = prisma.order.count({
    where: {
      studioId,
      ...(status && { status }),
      packageName: {
        contains: query,
      },
    },
  });

  const orderQuery = prisma.order.findMany({
    skip: (page - 1) * ITEMS_PER_PAGE,
    take: ITEMS_PER_PAGE,
    where: {
      studioId,
      ...(status && { status }),
      packageName: {
        contains: query,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const [totalItems, order] = await prisma.$transaction([
    totalPageQuery,
    orderQuery,
  ]);

  const totalPage = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return {
    totalPage,
    order,
  };
}

export async function getTotalRevenue(studioId: string) {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);

  const lastMonth = subMonths(now, 1);
  const lastMonthStart = startOfMonth(lastMonth);
  const lastMonthEnd = endOfMonth(lastMonth);
  // Current month revenue
  const thisMonth = await prisma.order.aggregate({
    _sum: {
      packagePrice: true,
    },
    where: {
      studioId,
      status: "SUCCESS",
      paymentStatus: "SUCCESS",
      createdAt: {
        gte: thisMonthStart,
        lte: thisMonthEnd,
      },
    },
  });

  // Last month revenue
  const lastMonthResult = await prisma.order.aggregate({
    _sum: {
      packagePrice: true,
    },
    where: {
      studioId,
      status: "SUCCESS",
      paymentStatus: "SUCCESS",
      createdAt: {
        gte: lastMonthStart,
        lte: lastMonthEnd,
      },
    },
  });

  const thisRevenue = thisMonth._sum.packagePrice ?? 0;
  const lastRevenue = lastMonthResult._sum.packagePrice ?? 0;

  const percentChange =
    lastRevenue === 0
      ? null
      : ((thisRevenue - lastRevenue) / lastRevenue) * 100;

  const result = await prisma.order.aggregate({
    _sum: {
      packagePrice: true,
    },
    where: {
      studioId,
      status: "SUCCESS",
      paymentStatus: "SUCCESS",
    },
  });

  // return result._sum.packagePrice ?? 0;
  return {
    totalRevenue: result._sum.packagePrice ?? 0,
    thisRevenue,
    percentChange,
  };
}

export async function getOrderCountComparison(studioId: string) {
  const now = new Date();
  const thisMonthStart = startOfMonth(now);
  const thisMonthEnd = endOfMonth(now);

  const lastMonth = subMonths(now, 1);
  const lastMonthStart = startOfMonth(lastMonth);
  const lastMonthEnd = endOfMonth(lastMonth);

  // Get this month's counts
  const [thisPending, thisSuccess] = await Promise.all([
    prisma.order.count({
      where: {
        studioId,
        status: "PENDING",
        createdAt: {
          gte: thisMonthStart,
          lte: thisMonthEnd,
        },
      },
    }),
    prisma.order.count({
      where: {
        studioId,
        status: "SUCCESS",
        createdAt: {
          gte: thisMonthStart,
          lte: thisMonthEnd,
        },
      },
    }),
  ]);

  // Get last month's counts
  const [lastPending, lastSuccess] = await Promise.all([
    prisma.order.count({
      where: {
        studioId,
        status: "PENDING",
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
      },
    }),
    prisma.order.count({
      where: {
        studioId,
        status: "SUCCESS",
        createdAt: {
          gte: lastMonthStart,
          lte: lastMonthEnd,
        },
      },
    }),
  ]);

  function calcChange(current: number, previous: number) {
    if (previous === 0) return null;
    return ((current - previous) / previous) * 100;
  }

  return {
    pending: {
      thisMonth: thisPending,
      lastMonth: lastPending,
      percentChange: calcChange(thisPending, lastPending),
    },
    success: {
      thisMonth: thisSuccess,
      lastMonth: lastSuccess,
      percentChange: calcChange(thisSuccess, lastSuccess),
    },
  };
}
