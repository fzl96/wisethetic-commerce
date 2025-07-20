import { Suspense } from "react";
import { OrdersTable } from "@/components/account/table";

export default async function OrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersTable />
    </Suspense>
  );
}
