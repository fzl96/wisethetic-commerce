import { getUserOrderDetails } from "@/lib/queries/order.queries";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
// import Link from "next/link";

export async function OrderDetails({ orderId }: { orderId: string }) {
  const order = await getUserOrderDetails(orderId);

  const currencyFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  return (
    <>
      {order && (
        <div className="space-y-10">
          <div className="space-y-5">
            <h2 className="text-sm leading-8 md:leading-5">
              Order #{" "}
              <span className="uppercase">
                <Badge className="rounded-sm">{order.id}</Badge>
              </span>{" "}
              was placed on{" "}
              <span>
                <Badge className="rounded-sm">
                  {format(order.createdAt, "MMM dd, yyyy")}
                </Badge>
              </span>{" "}
              and is currently{" "}
              <span>
                <Badge className="text-xs">{order.status}</Badge>
              </span>
            </h2>
            <h1 className="font-accent text-2xl">Order Details</h1>
            <div className="">
              <div className="grid w-full grid-cols-2 gap-4 text-sm">
                <span>Product(s)</span>
                <span>Price</span>
                <Separator className="col-span-2 " />
                <>
                  <div className="grid gap-0 text-sm">
                    <span>{order.packageName}</span>
                    <span className="text-muted-foreground">
                      {order.packageDescription}
                    </span>
                  </div>
                  <div>
                    <span>{currencyFormatter.format(order.packagePrice)}</span>
                  </div>
                </>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="font-accent text-2xl">Studio Information</h3>
            <div>
              <div className="text-muted-foreground">
                <span className="text-sm">Studio Name:</span>{" "}
                <span className="text-primary">{order.locationName}</span>
              </div>
              <div className="text-muted-foreground">
                <span className="text-sm">Meeting Date:</span>{" "}
                <span className="capitalize text-primary">
                  {format(order.date, "MMM dd, yyyy : HH:mm")}
                </span>
              </div>
            </div>
          </div>
          {order.paymentStatus === "SUCCESS" ? (
            <>
              <div className="flex flex-col gap-5">
                <h3 className="font-accent text-2xl">Content Result</h3>
                {!order.result ? (
                  <span className="text-sm text-muted-foreground">
                    In progress
                  </span>
                ) : (
                  <a
                    href={order.result}
                    className="text-wrap break-all text-sm text-primary-accent hover:underline"
                  >
                    {order.result}
                  </a>
                )}
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
}
