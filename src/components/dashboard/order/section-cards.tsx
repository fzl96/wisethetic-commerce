import {
  IconTrendingDown,
  IconTrendingUp,
  IconTransfer,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getOrderCountComparison,
  getTotalRevenue,
} from "@/lib/queries/order.queries";
import { cn } from "@/lib/utils";
import { rupiah } from "@/lib/utils";

function RevenueTrend({ percentChange }: { percentChange: number | null }) {
  if (percentChange === null) {
    return (
      <div className="line-clamp-1 flex gap-2 font-medium">
        No data from last month
      </div>
    );
  }

  if (percentChange > 0) {
    return (
      <div className="line-clamp-1 flex gap-2 font-medium">
        Trending up this month <IconTrendingUp className="size-4" />
      </div>
    );
  }

  if (percentChange < 0) {
    return (
      <div className="line-clamp-1 flex gap-2 font-medium">
        Trending down this month <IconTrendingDown className="size-4" />
      </div>
    );
  }

  return (
    <div className="line-clamp-1 flex gap-2 font-medium">
      No change from last month
    </div>
  );
}

function RevenueBadge({ percentChange }: { percentChange: number | null }) {
  if (percentChange === null) {
    return (
      <Badge variant="outline">
        <IconTransfer />
        {percentChange ?? 0}%
      </Badge>
    );
  }

  if (percentChange > 0) {
    return (
      <Badge variant="outline">
        <IconTrendingUp />+{percentChange.toFixed(1)}%
      </Badge>
    );
  }

  if (percentChange < 0) {
    return (
      <Badge variant="outline">
        <IconTrendingDown />-{percentChange.toFixed(1)}%
      </Badge>
    );
  }

  return (
    <Badge variant="outline">
      <IconTransfer />
      {percentChange ?? 0}%
    </Badge>
  );
}

function RevenueFooter({ percentChange }: { percentChange: number | null }) {
  if (percentChange === null) {
    return (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
          No data from last month
        </div>
      </>
    );
  }

  if (percentChange > 0) {
    return (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium text-green-600 dark:text-green-400">
          Up {percentChange.toFixed(1)}% this period
          <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          Acquisition is performing well
        </div>
      </>
    );
  }

  if (percentChange < 0) {
    return (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium text-red-600 dark:text-red-400">
          Down {Math.abs(percentChange).toFixed(1)}% this period
          <IconTrendingDown className="size-4" />
        </div>
        <div className="text-muted-foreground">Acquisition needs attention</div>
      </>
    );
  }

  return (
    <>
      <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
        No change from last month
      </div>
    </>
  );
}
type OrderFooterProps = {
  label: string;
  percentChange: number | null;
};

export function OrderFooter({ label, percentChange }: OrderFooterProps) {
  if (percentChange === null) {
    return (
      <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
        No data from last month
      </div>
    );
  }

  if (percentChange > 0) {
    return (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium text-green-600 dark:text-green-400">
          Up {percentChange.toFixed(1)}% this period
          <IconTrendingUp className="size-4" />
        </div>
        <div className="text-muted-foreground">
          {label} orders are increasing
        </div>
      </>
    );
  }

  if (percentChange < 0) {
    return (
      <>
        <div className="line-clamp-1 flex gap-2 font-medium text-red-600 dark:text-red-400">
          Down {Math.abs(percentChange).toFixed(1)}% this period
          <IconTrendingDown className="size-4" />
        </div>
        <div className="text-muted-foreground">
          {label} orders are decreasing
        </div>
      </>
    );
  }

  return (
    <div className="line-clamp-1 flex gap-2 font-medium text-muted-foreground">
      No change from last month
    </div>
  );
}

export async function SectionCards({ studioId }: { studioId: string }) {
  const { totalRevenue, thisRevenue, percentChange } =
    await getTotalRevenue(studioId);
  const orderCount = await getOrderCountComparison(studioId);

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle
            className={cn(
              "text-2xl font-semibold tabular-nums @[250px]/card:text-2xl",
            )}
          >
            {rupiah(totalRevenue)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <RevenueTrend percentChange={percentChange} />
          <div className="text-muted-foreground">
            Total revenue from signing up
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Revenue this month</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {rupiah(thisRevenue)}
          </CardTitle>
          <CardAction>
            <RevenueBadge percentChange={percentChange} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <RevenueFooter percentChange={percentChange} />
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pending orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orderCount.pending.thisMonth}
          </CardTitle>
          <CardAction>
            <RevenueBadge percentChange={orderCount.pending.percentChange} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <OrderFooter
            label="Pending"
            percentChange={orderCount.pending.percentChange}
          />
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Success Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {orderCount.success.thisMonth}
          </CardTitle>
          <CardAction>
            <RevenueBadge percentChange={orderCount.success.percentChange} />
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <OrderFooter
            label="Success"
            percentChange={orderCount.success.percentChange}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
