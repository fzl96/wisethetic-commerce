import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "../ui/button";
import { StudioCard } from "./studio-card";

export async function TopStudioSections() {
  const topStudios = await prisma.studio.findMany({
    take: 3,
  });

  return (
    <div className="space-y-10">
      <div className="mt-40 grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
        {topStudios.map((studio) => {
          const link = `@${studio.username}`;
          return (
            <Link href={`/studio/${link}`} key={studio.id}>
              <StudioCard studio={studio} />
            </Link>
          );
        })}
      </div>
      <Link
        href="/studio"
        className={buttonVariants({
          variant: "default",
        })}
      >
        Explroe more
      </Link>
    </div>
  );
}
