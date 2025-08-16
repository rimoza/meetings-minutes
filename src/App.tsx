import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ClientOnly } from "@/components/client-only";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <ClientOnly fallback={
    <div className="min-h-screen flex w-full relative">
      <div className="flex-1 w-full">
        <header className="sticky top-0 z-40 h-14 md:h-16 flex items-center border-b bg-white px-3 md:px-6">
          <div className="flex items-center gap-2 md:gap-4 w-full">
            <h1 className="text-lg md:text-xl font-semibold">Tidy Meets</h1>
          </div>
        </header>
        <div className="w-full p-6">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    </div>
  }>
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
                  <Dashboard />
                </div>
              </main>
            </div>
          </SidebarProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </ClientOnly>
);

export default App;
