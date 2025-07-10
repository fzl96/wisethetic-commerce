"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { type User } from "@/lib/schema/user";
import { CreateStudioSchema as formSchema } from "@/lib/schema/studio";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import { IconLoader } from "@tabler/icons-react";
import { createStudio } from "@/lib/actions/studio.actions";

export function RegisterStudioForm({ user }: { user: User }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      username: "",
      email: "",
      phoneNumber: "",
      userId: user.id,
    },
  });

  const disabled =
    !form.formState.isDirty || form.formState.isSubmitting || isPending;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const studio = await createStudio(values);
      if (!studio.success) {
        toast(studio.message);
        return;
      }
      toast(studio.message);
      router.push("/dashboard");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Register your studio</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your studio detail below to register
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Wisethetic studio" type="text" {...field} />
              </FormControl>

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
                <Input
                  placeholder="Wisethetic is a studo with magic"
                  type="text"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="wisethetic" type="text" {...field} />
              </FormControl>
              <FormDescription>
                @{form.watch("username") ?? "wisethetic"}
              </FormDescription>
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
                  placeholder="wisethetic@studio.com"
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="085155559898" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabled} className="cursor-pointer">
          {isPending && (
            <span>
              <IconLoader className="animate-spin" />
            </span>
          )}
          Submit
        </Button>
      </form>
    </Form>
  );
}
