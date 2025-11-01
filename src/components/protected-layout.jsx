"use client";
import { useEffect, useState } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import ReduduxProvider from "@/lib/redux/ReduxProvider";
import ClientToaster from "@/components/navbar/ClientToster";

export default function ProtectedLayout({ children }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ReduduxProvider>
      <ClientToaster />
      <SidebarProvider> 
        <AppSidebar variant="inset" /> 
        <SidebarInset> 
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider> 
    </ReduduxProvider>
  );
}