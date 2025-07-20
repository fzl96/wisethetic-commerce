"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function SignOutButton({ className }: { className?: string }) {
  const router = useRouter();

  const logout = async () => {
    await signOut();
    router.refresh();
  };

  return (
    <p
      onClick={logout}
      className={cn(
        "cursor-pointer font-semibold text-muted-foreground hover:text-primary",
        className,
      )}
    >
      Sign Out
    </p>
  );
}
