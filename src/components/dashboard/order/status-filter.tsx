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

const statuses = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "PROCESSING",
    label: "Process",
  },
  {
    value: "SUCCESS",
    label: "Success",
  },
  {
    value: "CANCEL",
    label: "Cancel",
  },
  {
    value: "REFUNDED",
    label: "Refunded",
  },
];

export function StatusSelect() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelect} defaultValue="all">
      <SelectTrigger className="md:w-60">
        <SelectValue placeholder="Select a Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Status</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {statuses.map((status) => (
            <SelectItem value={status.value} key={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
