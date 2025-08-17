"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sortOptions = [
  {
    label: "Latest",
    value: "latest",
  },
  {
    label: "Popular",
    value: "popular",
  },
];

export function PackageNavigationSort() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelectCategory = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", value);

    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectCategory}>
      <SelectTrigger className="w-full md:w-40">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          {sortOptions.map((sort) => (
            <SelectItem value={sort.value} key={sort.value}>
              {sort.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
