import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "./pages/Dashboard";
import TodayMeetings from "./pages/TodayMeetings";
import UpcomingMeetings from "./pages/UpcomingMeetings";
import CreateMeeting from "@/pages/CreatingMeeting";
import MeetingDetails from "./pages/MeetingDetails";
import EditMeeting from "./pages/EditMeeting";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (isLoginPage) {
    return <Outlet />;
  }

  return (
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
  );
};

const App = () => (
  <ThemeProvider defaultTheme="system" storageKey="tidy-meets-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="today" element={<TodayMeetings />} />
              <Route path="upcoming" element={<UpcomingMeetings />} />
              <Route path="create" element={<CreateMeeting />} />
              <Route path="meeting/:id" element={<MeetingDetails />} />
              <Route path="edit/:id" element={<EditMeeting />} />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
