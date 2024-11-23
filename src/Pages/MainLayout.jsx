import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

function MainLayout(name) {
  const [showsidebar, setshowsidebar] = useState(true);
  const location = useLocation();
  console.log(location);
  console.log(name);

  useEffect(() => {
    // Hide the sidebar on specific paths
    setshowsidebar(location.pathname !== "/verifyemail");
  }, [location]);

  return (
    <SidebarProvider>
      {showsidebar ? (
        <>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-36 shrink-0 items-start pt-4 gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    {/* <BreadcrumbItem>
                  <BreadcrumbPage>nothing</BreadcrumbPage>
                </BreadcrumbItem> */}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <Outlet />
          </SidebarInset>
        </>
      ) : (
        <Outlet />
      )}
    </SidebarProvider>
  );
}

export default MainLayout;
