import { z } from "zod";
import { StudioSchema } from "@/lib/schema/studio";
import Image from "next/image";

export function StudioCard({
  studio,
}: {
  studio: z.infer<typeof StudioSchema>;
}) {
  return (
    <div className="rounded-xl border border-home-border bg-home-card-background p-3 shadow-sm transition-all duration-200 hover:bg-home-card-background-hover">
      <div className="h-96 overflow-hidden rounded-lg lg:h-[35rem]">
        <Image
          src={studio.image ?? "/placeholder.jpg"}
          alt={studio.name}
          width={1000}
          height={800}
          className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
        />
      </div>
      <div className="space-y-2 px-2 py-5 text-left ">
        <h3 className="text-left font-accent text-2xl font-medium">
          {studio.name}
        </h3>
        <p className="font-light">{studio.description}</p>
      </div>
    </div>
  );
}
