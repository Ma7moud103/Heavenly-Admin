import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet, useLocation } from "react-router-dom"

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/rooms": "Rooms",
  "/guests": "Guests",
  "/bookings": "Bookings",
  "/checkin": "Check-in/out",
  "/reservations": "Reservations",
  "/settings": "Settings",
  "/room-types": "Room Types",
  "/floor-plan": "Floor Plans",
}

export default function MainLayout() {
  const location = useLocation()
  const currentTitle = routeTitles[location.pathname] || "Not Found"

  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <main className="flex min-h-screen flex-1 flex-col gap-4 p-4 md:min-h-min">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
