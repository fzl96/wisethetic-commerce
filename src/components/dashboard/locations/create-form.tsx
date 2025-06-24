"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createLocationSchema as formSchema } from "@/lib/schema/location";
import { createLocation as createFunc } from "@/lib/actions/location.actions";
import { SubmitButton } from "./data-table-client";

export function CreateLocationForm({
  setOpen,
  studioId,
}: {
  studioId: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await createFunc(studioId, values);
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
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            id="create-location"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the location"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name of the location
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the address"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the address of the location.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Link</FormLabel>
                  <FormControl>
                    {/* @ts-expect-error expect-error*/}
                    <Input
                      placeholder="Enter the map address link"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the link to location (e.g. Google Maps).
                  </FormDescription>
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
        formId="create-location"
      />
    </>
  );
}
