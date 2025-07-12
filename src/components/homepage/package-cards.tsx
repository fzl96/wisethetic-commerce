import Link from "next/link";
import { PackageCard } from "./package-card";
import { getStudioId } from "@/lib/queries/studio.queries";
import { getPackagesStore } from "@/lib/queries/package.queries";
import { PackagesCardsLoader } from "./packages-loader";

export async function PackageCards({
  page,
  query,
  categoryId,
  username,
}: {
  page: number;
  query: string;
  categoryId: string;
  username: string;
}) {
  const studioId = await getStudioId(username);
  if (!studioId) {
    return <PackagesCardsLoader />;
  }

  const packages = await getPackagesStore({
    page,
    query,
    categoryId,
    studioId,
  });

  return (
    <div className="grid w-full gap-5 lg:grid-cols-3 lg:gap-8">
      {packages.map((pkg) => {
        const link = `@${username}/${pkg.id}`;
        return (
          <Link href={`/studio/${link}`} key={pkg.id}>
            <PackageCard pkg={pkg} />
          </Link>
        );
      })}
    </div>
  );
}
