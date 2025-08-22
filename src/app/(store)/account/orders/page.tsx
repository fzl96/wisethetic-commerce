import { Metadata } from "next";
import { Suspense } from "react";
import { OrdersTable } from "@/components/account/table";

export const metadata: Metadata = {
  title: "Orders | Wisethetic",
};

export default async function OrdersPage() {
  return (
    <Suspense fallback={null}>
      <OrdersTable />
    </Suspense>
  );
}
