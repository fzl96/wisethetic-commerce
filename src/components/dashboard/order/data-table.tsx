import { getOrders } from "@/lib/queries/order.queries";
import { DataTable } from "./data-table-client";
import { StatusSelect } from "./status-filter";

interface Props {
  studioId: string;
  page: number;
  status?: "PENDING" | "PROCESSING" | "SUCCESS" | "CANCEL" | "REFUNDED";
  query: string;
}

export async function OrderDataTable({ studioId, status, page, query }: Props) {
  const { totalPage, order } = await getOrders(studioId, page, query, status);

  return (
    <div className="px-6">
      <StatusSelect />
      <DataTable
        studioId={studioId}
        totalPages={totalPage}
        page={page}
        data={order}
      />
      {/* <pre> */}
      {/*   <code>{JSON.stringify(order, null, 2)}</code> */}
      {/*   <span>Total Page: {totalPage}</span> */}
      {/* </pre> */}
    </div>
  );
}
