import { redirect } from "next/navigation";
import { OrderDataTable } from "@/components/dashboard/order/data-table";
import { SectionCards } from "@/components/dashboard/order/section-cards";
import { getStudioId } from "@/server/user";

export default async function DasbhoardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const studio = await getStudioId();
  const query = (await searchParams).query || "";
  const page = parseInt((await searchParams).page as string) || 1;
  const status =
    ((await searchParams).status as
      | "PENDING"
      | "PROCESSING"
      | "SUCCESS"
      | "CANCEL"
      | "REFUNDED") || "";

  if (!studio?.id) redirect("/");

  return (
    <>
      <SectionCards studioId={studio.id} />
      <OrderDataTable
        studioId={studio.id}
        status={status}
        page={page}
        query={query}
      />
    </>
  );
}
