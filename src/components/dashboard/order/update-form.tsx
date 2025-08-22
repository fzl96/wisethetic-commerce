"use client";

import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateOrder } from "@/lib/actions/order.actions";
import { SubmitButton } from "./data-table-client";
import {
  type Order,
  updateOrderSchema as formSchema,
} from "@/lib/schema/order";
import { rupiah } from "@/lib/utils";

const statuses = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "PROCESSING",
    label: "Process",
  },
  {
    value: "SUCCESS",
    label: "Success",
  },
  {
    value: "CANCEL",
    label: "Cancel",
  },
  {
    value: "REFUNDED",
    label: "Refunded",
  },
];

const paymentStatus = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "SUCCESS",
    label: "Success",
  },
];

export function UpdateOrderForm({
  setOpen,
  order,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  order: Order;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: order.status,
      paymentStatus: order.paymentStatus,
      result: order.result ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updateOrder(order.id, values);
    if (res.success) {
      toast(res.message);
      router.refresh();
      setOpen(false);
      return;
    }

    toast(res.message);
    router.refresh();
    setOpen(false);
    return;
  }

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm pb-2">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span>Date: {format(order.createdAt, "MMM dd, yyyy")}</span>
            <span className="capitalize">
              Status: {order.status.toLowerCase()}
            </span>
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold">Order Details</h2>
            <div className="flex items-center justify-between">
              <div>{order.packageName}</div>
              <div>{rupiah(order.packagePrice)}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Location</div>
              <div>{order.locationName}</div>
            </div>
            <div className="flex items-center justify-between">
              <div>Payment Status</div>
              <div className="capitalize">
                {order.paymentStatus.toLowerCase()}
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <h2 className="font-semibold">Customer Information</h2>
            <div className="flex items-center justify-between">
              <div className="">Customer</div>
              <div>{order.customerName}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">Email</div>
              <div>{order.email}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="">Phone</div>
              <div>{order.phoneNumber}</div>
            </div>
          </div>
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id="update-order"
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select order status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className="capitalize"
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="capitalize Select payment status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {paymentStatus.map((status) => (
                        <SelectItem
                          key={status.value}
                          value={status.value}
                          className="capitalize"
                        >
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="result"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Result Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the link to the result"
                      type="text"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
      <SubmitButton
        isDirty={form.formState.isDirty}
        isSubmitting={form.formState.isSubmitting}
        formId="update-order"
      />
    </>
  );
}
