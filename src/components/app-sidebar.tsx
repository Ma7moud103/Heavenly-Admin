import React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { LayoutDashboard, Settings, Building2, DoorOpen } from 'lucide-react';

const data = {
  user: {
    name: 'Admin User',
    email: 'admin@heavenlyhotel.com',
    avatar: '/avatars/admin.jpg',
  },

  teams: [
    {
      name: 'Heavenly Hotel',
      logo: <Building2 className="w-5 h-5" />,
      plan: 'Luxury',
    },
  ],
  navMain: [
    {
      title: 'Overview',
      url: '/',
      icon: <LayoutDashboard className="w-5 h-5" />,
      isActive: true,
      items: [
        {
          title: 'Dashboard',
          url: '/',
        },
      ],
    },
    {
      title: 'Rooms Management',
      url: '/rooms',
      icon: <Building2 className="w-5 h-5" />,
      items: [
        {
          title: 'Rooms',
          url: '/rooms',
        },
        {
          title: 'Room Types',
          url: '/room-types',
        },
      ],
    },
    {
      title: 'Bookings & Reservations',
      url: '#',
      icon: <DoorOpen className="w-5 h-5" />,
      items: [
        {
          title: 'Bookings',
          url: '/bookings',
        },
        {
          title: 'Check-in/out',
          url: '/checkin',
        },
        {
          title: 'Reservations',
          url: '/reservations',
        },
      ],
    },

    {
      title: 'Settings',
      url: '/settings',
      icon: <Settings className="w-5 h-5" />,
      items: [
        {
          title: 'General',
          url: '/settings',
        },
        {
          title: 'Hotel Profile',
          url: '/settings/hotel',
        },
        {
          title: 'Users',
          url: '/settings/users',
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
