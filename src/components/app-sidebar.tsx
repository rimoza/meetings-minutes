import { PlusCircle, LayoutDashboard, LogOut, CalendarCheck, CalendarClock } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { CompactThemeToggle } from "@/components/theme-toggle";

const navigationItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Today's Meetings", url: "/today", icon: CalendarCheck },
  { title: "Upcoming", url: "/upcoming", icon: CalendarClock },
  { title: "New Meeting", url: "/create", icon: PlusCircle },
];

export function AppSidebar() {
  const { state, setOpenMobile } = useSidebar();
  const collapsed = state === "collapsed";
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    // For now, just navigate to login page
    // In the future, this would clear auth tokens, user data, etc.
    navigate("/login");
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when a navigation item is clicked
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="p-2 border-b">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md flex-shrink-0">
              <CalendarCheck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className={collapsed ? 'hidden' : 'block'}>
              <h2 className="font-bold text-xl tracking-tight text-foreground">
                Tidy Meets
              </h2>
              <p className="text-xs text-muted-foreground">Meeting Management</p>
            </div>
          </div>
        </div>
        
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? 'hidden' : 'block'}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      onClick={handleNavClick}
                      className={({ isActive }) =>
                        `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-muted ${
                          isActive 
                            ? 'bg-primary shadow-sm' 
                            : 'text-primary hover:text-primary hover:bg-primary/5'
                        }`
                      }
                    >
                      <item.icon className={`h-5 w-5 ${collapsed ? '' : 'flex-shrink-0'}`} />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <div className="border-t p-4 mt-auto">
        <div className="space-y-2">
          <CompactThemeToggle collapsed={collapsed} />
          <Button
            onClick={handleLogout}
            variant="ghost"
            className={`w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-muted ${
              collapsed ? 'px-2' : ''
            }`}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="font-medium">Logout</span>}
          </Button>
        </div>
      </div>
    </Sidebar>
  );
}