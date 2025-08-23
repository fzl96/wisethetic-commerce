"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@/hooks/use-media-query";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { IconLoader } from "@tabler/icons-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { makeDeleteUserSchema } from "@/lib/schema/user";
import { useForm } from "react-hook-form";
import { deleteUser } from "@/lib/actions/user.actions";

function DisplayAlert() {
  return (
    <Alert variant="destructive">
      <AlertTitle className="font-normal">
        <span className="font-bold">Warning</span>: This action is not
        reversible. Please be certain
      </AlertTitle>
    </Alert>
  );
}

export function DeletePopup({ id, email }: { id: string; email: string }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="cursor-pointer">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 sm:max-w-[425px]">
          <DialogHeader className="px-5 pt-5">
            <DialogTitle className="text-2xl">Delete Account</DialogTitle>
            <DialogDescription className="text-base">
              This account will be permanently deleted, including its orders
              history. This action is irreversible and can not be undone
            </DialogDescription>
          </DialogHeader>
          <div className="px-5">
            <DisplayAlert />
          </div>
          <Separator />
          <DeleteUser id={id} email={email} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
          Delete
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-start text-2xl">
            Edit profile
          </DrawerTitle>
          <DrawerDescription className="text-start">
            This studio will be permanently deleted, including its orders
            history. This action is irreversible and can not be undone
          </DrawerDescription>
        </DrawerHeader>
        <DeleteUser id={id} email={email} />
      </DrawerContent>
    </Drawer>
  );
}

function DeleteUser({ id, email }: { id: string; email: string }) {
  const deleteStudioSchema = makeDeleteUserSchema(email);
  const router = useRouter();
  const form = useForm<z.infer<typeof deleteStudioSchema>>({
    resolver: zodResolver(deleteStudioSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: z.infer<typeof deleteStudioSchema>) {
    const result = await deleteUser(id, values);
    if (!result.success) {
      toast(result.message);
      return;
    }

    await signOut();
    router.push("/");
    toast.success(result.message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="px-4 pb-4 space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  Enter the account email{" "}
                  <span className="font-semibold">{email}</span> to continue:
                </FormDescription>
                <FormControl>
                  <Input
                    type=""
                    {...field}
                    className="py-5"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormDescription>
                  To verify, type{" "}
                  <span className="font-semibold">delete my account</span>{" "}
                  below:
                </FormDescription>
                <FormControl>
                  <Input
                    type=""
                    {...field}
                    className="py-5"
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="px-4 py-4 flex items-center justify-between">
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer rounded-sm py-5"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="destructive"
            className="cursor-pointer rounded-sm py-5"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            {form.formState.isSubmitting && (
              <span className="animate-spin">
                <IconLoader />
              </span>
            )}
            Delete
          </Button>
        </div>
      </form>
    </Form>
  );
}
