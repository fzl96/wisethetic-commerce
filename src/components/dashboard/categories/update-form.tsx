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
import {
  CategorySchema,
  UpdateCategorySchema as formSchema,
} from "@/lib/schema/category";
import { updateCategory } from "@/lib/actions/category.actions";
import { SubmitButton } from "./data-table-client";

export function UpdateCategoryForm({
  setOpen,
  category,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category: z.infer<typeof CategorySchema>;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name,
      description: category.description ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await updateCategory(category.id, values);
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
            id="update-category"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the category"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the name of the category
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* @ts-expect-error cannot read nullish */}
                    <Input
                      placeholder="Enter the description"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the description of the category.
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
        formId="update-category"
      />
    </>
  );
}
