import Image from "next/image";
import { getPackageStore } from "@/lib/queries/package.queries";
import { PackageOrderForm } from "./package-order-form";
import { getUser } from "@/server/user";
import { rupiah } from "@/lib/utils";

interface Props {
  packageId: string;
}

export async function PackageDetail({ packageId }: Props) {
  const user = await getUser();
  const pkg = await getPackageStore(packageId);

  return (
    <>
      <div className="rounded-xl border border-home-border bg-home-card-background p-3 shadow-sm transition-all duration-200 hover:bg-home-card-background-hover">
        <div className="overflow-hidden rounded-lg aspect-[4/5] w-full border">
          <Image
            src={
              pkg?.image && pkg.image.trim() !== ""
                ? pkg.image
                : "/placeholder.webp"
            }
            alt={pkg?.name ?? "image"}
            width={1000}
            height={800}
            className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <h2 className="text-xl text-muted-foreground">
            {pkg?.category.name}
          </h2>
          <h1 className="font-accent text-4xl">{pkg?.name}</h1>
        </div>
        <p className="text-lg text-muted-foreground">{pkg?.description}</p>
        <p className="text-xl ">{rupiah(pkg?.price || 0)}</p>
        {pkg && <PackageOrderForm pkg={pkg} user={user} />}
      </div>
    </>
  );
}
