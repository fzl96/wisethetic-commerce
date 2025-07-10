import Image from "next/image";
import { GalleryVerticalEnd } from "lucide-react";

import { RegisterStudioForm } from "@/components/register-studio-form";
import Link from "next/link";

import { getUser } from "@/server/user";

export default async function LoginPage() {
  const user = await getUser();

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Wisethetic.
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full md:max-w-sm max-w-xs">
            {user && <RegisterStudioForm user={user} />}
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/auth-2.webp"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={1000}
          height={1000}
        />
      </div>
    </div>
  );
}
