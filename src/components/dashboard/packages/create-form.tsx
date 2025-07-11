"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { CloudUpload, Paperclip } from "lucide-react";
// import {
//   FileInput,
//   FileUploader,
//   FileUploaderContent,
//   FileUploaderItem,
// } from "@/components/ui/file-upload";
import { FileUploader } from "./file-uploader";
import { useUploadThing } from "@/lib/utils/uploadthing";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { createPackageSchema as formSchema } from "@/lib/schema/package";
import { createPackage as createFunc } from "@/lib/actions/package.actions";
import { SubmitButton } from "./data-table-client";
import { CategorySchema } from "@/lib/schema/category";
import { locationSchema } from "@/lib/schema/location";
import { PackagePreviewCard } from "./package-preview-card";

export function CreatePackageForm({
  setOpen,
  studioId,
  categories,
  locations,
}: {
  studioId: string;
  categories: z.infer<typeof CategorySchema>[];
  locations: z.infer<typeof locationSchema>[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [files, setFiles] = React.useState<File[]>([]);
  const previewUrl = files[0] ? URL.createObjectURL(files[0]) : null;
  const [progress, setProgress] = React.useState<number>(0);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      locationsId: [],
      categoryId: "",
      image: "",
      studioId: studioId,
    },
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onUploadProgress: (progress) => {
      setProgress(progress);
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      let imageUrl;
      if (files.length > 0) {
        const uploadedImage = await startUpload(files);

        if (uploadedImage) {
          imageUrl = uploadedImage[0]?.ufsUrl;
          console.log(imageUrl);
        }
      }
      const res = await createFunc(studioId, {
        ...values,
        image: imageUrl ?? "",
      });

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
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm pb-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
            id="create-package"
          >
            {<PackagePreviewCard imgUrl={previewUrl} />}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the package"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the description"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the price"
                      type="number"
                      {...field}
                      // onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="locationsId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Available Locations</FormLabel>
                  <FormControl>
                    <MultiSelector
                      values={field.value ?? []}
                      onValuesChange={field.onChange}
                      loop={false}
                    >
                      <MultiSelectorTrigger
                        options={locations}
                        className="w-full"
                      >
                        <MultiSelectorInput placeholder="Select locations" />
                      </MultiSelectorTrigger>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {locations.map((item) => (
                            <MultiSelectorItem value={item.id} key={item.id}>
                              {item.name}
                            </MultiSelectorItem>
                          ))}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
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
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={field.name}>Image</FormLabel>
                  <FormControl>
                    <FileUploader
                      disabled={isPending}
                      onFieldChange={field.onChange}
                      files={files}
                      imgUrl={field.value ?? ""}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage {...field} />
                </FormItem>
              )}
            />
            {isUploading && <Progress value={progress} className="w-full" />}
          </form>
        </Form>
      </div>
      <SubmitButton
        isPending={isPending}
        isDirty={form.formState.isDirty}
        isSubmitting={form.formState.isSubmitting}
        isValid={form.formState.isValid}
        formId="create-package"
      />
    </>
  );
}
