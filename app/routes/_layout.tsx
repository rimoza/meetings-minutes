import type { Route } from "./+types/_layout";
import { Outlet } from "react-router";
import { Toaster as Sonner } from "../../src/components/ui/sonner";
import { TooltipProvider } from "../../src/components/ui/tooltip";
import { ThemeProvider } from "../../src/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "../../src/components/ui/sidebar";
import { AppSidebar } from "../../src/components/app-sidebar";

const queryClient = new QueryClient();

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Meeting Management App" },
    { name: "description", content: "Manage your meetings efficiently" },
  ];
}

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="tidy-meets-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Sonner />
          <SidebarProvider defaultOpen={false}>
            <div className="min-h-screen flex w-full relative">
              <AppSidebar />
              <main className="flex-1 w-full">
                <header className="sticky top-0 z-40 h-14 md:h-16 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3 md:px-6">
                  <div className="flex items-center gap-2 md:gap-4 w-full">
                    <SidebarTrigger className="md:hidden" />
                    <div className="flex-1 flex items-center justify-between">
                      <h1 className="text-lg md:text-xl font-semibold md:hidden">Tidy Meets</h1>
                      <div className="hidden md:block">
                        <SidebarTrigger />
                      </div>
                    </div>
                  </div>
                </header>
                <div className="w-full overflow-x-hidden">
                  <Outlet />
                </div>
              </main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}