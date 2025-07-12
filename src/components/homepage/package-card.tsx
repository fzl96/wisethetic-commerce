import { z } from "zod";
import { packageSchema } from "@/lib/schema/package";
import Image from "next/image";

const rupiah = (num: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "idr",
    minimumFractionDigits: 0,
  }).format(num);
};

export function PackageCard({ pkg }: { pkg: z.infer<typeof packageSchema> }) {
  return (
    <div className="rounded-xl border border-home-border bg-home-card-background p-3 shadow-sm transition-all duration-200 hover:bg-home-card-background-hover">
      <div className="h-96 overflow-hidden rounded-lg lg:h-[35rem]">
        <Image
          src={pkg.image ?? "/placeholder.jpg"}
          alt={pkg.name}
          width={1000}
          height={800}
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-2 px-2 py-5 text-left ">
        <h3 className="text-left font-accent text-2xl font-medium">
          {pkg.name}
        </h3>
        <p className="font-light">{rupiah(pkg.price)}</p>
        {/* <p className="font-light">{pkg.description}</p> */}
      </div>
    </div>
  );
}
