"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updatePhone } from "@/lib/actions/user.actions";
import { Input } from "../ui/input";
import type { User } from "@/lib/schema/user";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { IconLoader } from "@tabler/icons-react";

const formSchema = z.object({
  phone: z.string(),
});

export function UpdateForm({ user }: { user: User }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: user.phone ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updatePhone(values);
    if (!res.success) {
      toast.error(res.message);
      return;
    }

    router.refresh();
    toast.success(res.message);
    return;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter phone number linked to whatsapp"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <Button
          className="cursor-pointer"
          disabled={form.formState.isSubmitting || !form.formState.isDirty}
        >
          {form.formState.isSubmitting && (
            <span className="animate-spin">
              <IconLoader />
            </span>
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
