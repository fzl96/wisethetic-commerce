import { Suspense } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
// import { OrderDetails } from "./_components/order-details";
// import { OrderDetailsSkeleton } from "./_components/order-details-skeleton";
import { OrderDetailsSkeleton } from "@/components/account/order-details-skeleton";
import { OrderDetails } from "@/components/account/order-details";

export default async function OrderIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Card>
      <CardHeader className="">
        <CardTitle className="sr-only">Order Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<OrderDetailsSkeleton />}>
          <OrderDetails orderId={id} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
