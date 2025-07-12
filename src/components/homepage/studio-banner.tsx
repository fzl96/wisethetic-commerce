import Image from "next/image";
import { getStudioBanner } from "@/lib/queries/studio.queries";
import { Badge } from "../ui/badge";

export async function StudioBanner({ username }: { username: string }) {
  const studio = await getStudioBanner(username);

  if (!studio) {
    return <div>No studio Found</div>;
  }

  return (
    <div className="w-full p-4 border rounded-lg">
      <div className="flex items-start gap-4">
        <div className="h-30 w-30 overflow-hidden rounded-md border">
          <Image
            src={studio.image ?? "/placeholder.jpg"}
            alt={studio.name}
            width={1000}
            height={800}
            className="h-full w-full object-cover transition-all duration-500 hover:scale-105"
          />
        </div>
        <div>
          <Badge variant="default" className="rounded-sm">
            @{studio.username}
          </Badge>
          <h1 className="text-2xl font-semibold">{studio.name}</h1>
          <h2>{studio.description}</h2>
        </div>
      </div>
    </div>
  );
}
