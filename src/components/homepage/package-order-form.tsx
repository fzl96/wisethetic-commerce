"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { z } from "zod";
import { packageStoreSchema } from "@/lib/schema/package";
import { type User } from "@/server/user";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { IconLocation, IconLoader } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { DateTimePicker24h } from "./date-time-picker";
import { createOrderSchema as formSchema } from "@/lib/schema/order";
import { createOrder } from "@/lib/actions/order.actions";

interface Props {
  pkg: z.infer<typeof packageStoreSchema>;
  user?: User;
  reserved: { date: Date }[];
  locationId: string | undefined;
}

export function PackageOrderForm({ pkg, user, reserved, locationId }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerName: user?.name ?? "",
      email: user?.email,
      packageId: pkg.id,
      locationId: "",
      phoneNumber: user?.phone ?? "",
      userId: user?.id,
      studioId: pkg.studioId,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (!date) {
      toast.error("Please select a date and time");
      return;
    }
    const res = await createOrder(date, data);
    if (res.success) {
      toast.error(res.message);
      router.refresh();
      return;
    }

    toast.success(res.message);
    router.refresh();
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {step === 1 && (
          <>
            <div className="my-5 space-y-2">
              <h3>Select a location</h3>
              <FormField
                control={form.control}
                name="locationId"
                render={({ field }) => (
                  <RadioGroup
                    className=""
                    value={field.value}
                    onValueChange={field.onChange}
                    onClick={() => {
                      const params = new URLSearchParams(
                        searchParams.toString(),
                      );
                      params.set("location", field.value);
                      router.push(`?${params.toString()}`, { scroll: false });
                    }}
                  >
                    {pkg?.locations.map((location) => (
                      <div className="" key={location.id}>
                        <RadioGroupItem
                          value={location.id}
                          id={location.id}
                          className={cn(`sr-only peer/${location.id}`)}
                        />
                        <Label
                          htmlFor={location.id}
                          className={cn(
                            "px-4 py-2 flex justify-between w-full rounded-md border bg-transparent text-base shadow-xs outline-none transition-[color,box-shadow] font-normal cursor-pointer",
                            "border-input dark:bg-input/30",
                            // When selected (mimics focus ring effect)
                            field.value === location.id &&
                              "border-ring ring-ring/50 ring-[3px]",
                          )}
                        >
                          <span>{location.name}</span>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Link href={location.link ?? "#"} target="_blank">
                                <Badge
                                  variant="outline"
                                  className="group text-muted-foreground px-1.5 flex items-center"
                                >
                                  <IconLocation className="group-hover:rotate-[45deg] transition-transform" />
                                  Open map
                                </Badge>
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>{location.address}</TooltipContent>
                          </Tooltip>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
            </div>
            <div className="my-5 space-y-2">
              <h3>Date and Time</h3>
              <DateTimePicker24h
                date={date}
                setDate={setDate}
                reserved={reserved}
                locationId={locationId}
              />
            </div>
            <Button
              className="w-full cursor-pointer"
              onClick={() => setStep(2)}
              disabled={!date || !user || !form.watch("locationId")}
              type="button"
            >
              Order
            </Button>
            {!user && (
              <div className="mt-5 text-center text-sm">
                Please sign in first
              </div>
            )}
          </>
        )}
        {step === 2 && (
          <div className="space-y-4 my-4">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your email"
                      type="email"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your whatsapp number"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-5 gap-5 w-full justify-between flex items-center md:flex-row flex-col">
              <Button
                type="button"
                variant="secondary"
                className="flex-1 cursor-pointer"
                onClick={() => setStep(1)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="cursor-pointer flex-1"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting && (
                  <span>
                    <IconLoader className="animate-spin" />
                  </span>
                )}
                Book
              </Button>
            </div>
          </div>
        )}
      </form>
    </Form>
  );
}
