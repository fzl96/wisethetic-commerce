"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { CategorySchema } from "@/lib/schema/category";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: z.infer<typeof CategorySchema>[];
}

export function PackageCategorySelect({ categories }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelectCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="md:w-80">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {categories.map((category) => (
            <SelectItem value={category.id} key={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
