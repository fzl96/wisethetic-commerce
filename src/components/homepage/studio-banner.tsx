import Image from "next/image";
import { getStudioBanner } from "@/lib/queries/studio.queries";
import { Badge } from "../ui/badge";

export async function StudioBanner({ username }: { username: string }) {
  const studio = await getStudioBanner(username);

  if (!studio) {
    return <div>No studio Found</div>;
  }

  // Conditionally apply the background only if studio.banner exists
  const bannerStyle = studio.banner
    ? { backgroundImage: `url('${studio.banner}')` }
    : { backgroundColor: "#1c1c1c" }; // Fallback color

  return (
    <div className="relative w-full overflow-hidden rounded-lg border">
      {/* Layer 1: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={bannerStyle}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex items-start gap-4 p-4">
        <div className="h-30 w-30 overflow-hidden rounded-md border-2 border-white/80 shadow-lg">
          <Image
            src={studio.image ?? "/placeholder.jpg"}
            alt={studio.name}
            width={120}
            height={120}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <Badge variant="default" className="rounded-sm">
            @{studio.username}
          </Badge>
          <h1 className="text-2xl font-semibold text-white">{studio.name}</h1>
          <h2 className="text-white/90">{studio.description}</h2>
        </div>
      </div>
    </div>
  );
}
