import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  Receipt, 
  BarChart3, 
  Settings,
  Building2,
  Wrench,
  DoorOpen
} from "lucide-react"

const data = {
  user: {
    name: "Admin User",
    email: "admin@heavenlyhotel.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    {
      name: "Heavenly Hotel",
      logo: <Building2 className="w-5 h-5" />,
      plan: "Luxury",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Analytics",
          url: "/analytics",
        },
      ],
    },
    {
      title: "Property",
      url: "#",
      icon: <Building2 className="w-5 h-5" />,
      items: [
        {
          title: "Rooms",
          url: "/rooms",
        },
        {
          title: "Room Types",
          url: "/room-types",
        },
        {
          title: "Floor Plan",
          url: "/floor-plan",
        },
      ],
    },
    {
      title: "Front Desk",
      url: "#",
      icon: <DoorOpen className="w-5 h-5" />,
      items: [
        {
          title: "Bookings",
          url: "/bookings",
        },
        {
          title: "Check-in/out",
          url: "/checkin",
        },
        {
          title: "Reservations",
          url: "/reservations",
        },
      ],
    },
    {
      title: "Guests",
      url: "#",
      icon: <Users className="w-5 h-5" />,
      items: [
        {
          title: "All Guests",
          url: "/guests",
        },
        {
          title: "VIP Guests",
          url: "/vip-guests",
        },
        {
          title: "Groups",
          url: "/groups",
        },
      ],
    },
    {
      title: "Finance",
      url: "#",
      icon: <Receipt className="w-5 h-5" />,
      items: [
        {
          title: "Invoices",
          url: "/invoices",
        },
        {
          title: "Payments",
          url: "/payments",
        },
        {
          title: "Revenue",
          url: "/revenue",
        },
      ],
    },
    {
      title: "Maintenance",
      url: "#",
      icon: <Wrench className="w-5 h-5" />,
      items: [
        {
          title: "Work Orders",
          url: "/maintenance",
        },
        {
          title: "Reports",
          url: "/maintenance-reports",
        },
      ],
    },
    {
      title: "Settings",
      url: "/settings",
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          title: "General",
          url: "/settings",
        },
        {
          title: "Hotel Profile",
          url: "/settings/hotel",
        },
        {
          title: "Users",
          url: "/settings/users",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Today's Check-ins",
      url: "/checkin?tab=today",
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      name: "Revenue Report",
      url: "/revenue",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
