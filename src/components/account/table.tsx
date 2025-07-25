import { getUserOrders } from "@/lib/queries/order.queries";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export async function OrdersTable() {
  const orders = await getUserOrders();

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-home-foreground">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow className="border-home-border">
              <TableHead className="hidden md:table-cell">Order</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="sr-only hidden md:table-cell">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id} className="border-home-border">
                <TableCell className="hidden py-5 font-accent text-sm uppercase text-muted-foreground md:table-cell">
                  {order.id}
                </TableCell>
                <TableCell>
                  <Link href={`/account/orders/${order.id}`}>
                    {format(new Date(order.createdAt), "MMM dd, yyyy")}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="capitalize"
                  >
                    <Badge className="text-xs capitalize">
                      {order.status.toLowerCase()}
                    </Badge>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link href={`/account/orders/${order.id}`}>
                    {currencyFormatter.format(order.packagePrice)}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className={buttonVariants({
                      size: "sm",
                      variant: "secondary",
                    })}
                  >
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
