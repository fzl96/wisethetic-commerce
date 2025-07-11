"use client";

import * as React from "react";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { UpdateStudioSchema as formSchema } from "@/lib/schema/studio";
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
import { FileUploader } from "@/components/dashboard/packages/file-uploader";
import { IconLoader } from "@tabler/icons-react";
import { updateStudio } from "@/lib/actions/studio.actions";
import { StudioSchema } from "@/lib/schema/studio";
import { useStudioPreview } from "@/store/image";

export function UpdateStudioForm({
  studio,
}: {
  studio: z.infer<typeof StudioSchema>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [bannerImg, setBannerImg] = React.useState<File[]>([]);
  const [img, setImg] = React.useState<File[]>([]);
  const { setBannerPreview, setImagePreview } = useStudioPreview();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: studio.name,
      description: studio.description,
      username: studio.username,
      email: studio.email,
      phoneNumber: studio.phoneNumber,
      image: studio.image,
      banner: studio.banner,
      // userId: user.id,
    },
  });

  const disabled =
    !form.formState.isDirty || form.formState.isSubmitting || isPending;

  React.useEffect(() => {
    if (bannerImg[0]) {
      const url = URL.createObjectURL(bannerImg[0]);
      setBannerPreview(url);
    }
  }, [bannerImg]);

  React.useEffect(() => {
    if (img[0]) {
      const url = URL.createObjectURL(img[0]);
      setImagePreview(url);
    }
  }, [img]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (progress) => {},
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      let bannerUrl = studio.banner;
      let imgUrl = studio.image;

      if (bannerImg.length > 0) {
        const uploadedImage = await startUpload(bannerImg);
        console.log(uploadedImage);

        if (uploadedImage) {
          bannerUrl = uploadedImage[0]?.ufsUrl;
        }
      }
      if (img.length > 0) {
        const uploadedImage = await startUpload(img);

        if (uploadedImage) {
          imgUrl = uploadedImage[0]?.ufsUrl;
        }
      }
      const update = await updateStudio(studio.id, {
        ...values,
        banner: bannerUrl,
        image: imgUrl,
      });
      if (!update.success) {
        toast(update.message);
        return;
      }
      toast(update.message);
      router.push("/dashboard/studio");
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2 ">
          <h1 className="text-2xl font-bold">Update your studio</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your studio detail
          </p>
        </div>

        <FormField
          control={form.control}
          name="banner"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Banner Image</FormLabel>
              <FormControl>
                <FileUploader
                  disabled={isPending}
                  onFieldChange={field.onChange}
                  files={bannerImg}
                  imgUrl={field.value ?? ""}
                  setFiles={setBannerImg}
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor={field.name}>Image</FormLabel>
              <FormControl>
                <FileUploader
                  disabled={isPending}
                  onFieldChange={field.onChange}
                  files={img}
                  imgUrl={field.value ?? ""}
                  setFiles={setImg}
                />
              </FormControl>
              <FormMessage {...field} />
            </FormItem>
          )}
        />
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
