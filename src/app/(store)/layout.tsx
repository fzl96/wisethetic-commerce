import { NavServer } from "@/components/homepage/header/nav-server";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-home-background text-home-foreground">
      <NavServer />
      <main className="flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
