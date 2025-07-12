import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/server/user";
import { UpdateStudioForm } from "@/components/dashboard/studio/update-form";
import { Banner } from "@/components/dashboard/studio/banner";
import { ImagePreview } from "@/components/dashboard/studio/img";

export default async function StudioPage() {
  const user = await getUser();
  if (!user) {
    redirect("/");
  }
  const studio = await prisma.studio.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!studio) {
    redirect("/");
  }

  return (
    <div className="px-4 lg:px-6 flex flex-col gap-5">
      <Banner imgUrl={studio.banner} />
      <div className="flex md:flex-row flex-col gap-4">
        <div>
          <ImagePreview imgUrl={studio.image} />
        </div>
        <div className=" max-w-[30rem] w-full">
          <UpdateStudioForm studio={studio} />
        </div>
      </div>
    </div>
  );
}
