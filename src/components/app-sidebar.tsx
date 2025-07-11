import * as React from "react";
import type { User } from "@/server/user";
import {
  IconChartBar,
  IconDashboard,
  IconInnerShadowTop,
  IconListDetails,
  IconSettings,
  IconMapPin,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: IconListDetails,
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: IconMapPin,
    },
    {
      title: "Packages",
      url: "/dashboard/packages",
      icon: IconChartBar,
    },
    {
      title: "Studio",
      url: "/dashboard/studio",
      icon: IconSettings,
    },
  ],
};

interface Props extends React.ComponentProps<typeof Sidebar> {
  user: User;
}

export function AppSidebar({ user, ...props }: Props) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Wisethetic.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <NavUser user={user} />
        </React.Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
