"use client";

import * as React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/useMobile";
import { TooltipProvider } from "@/components/ui/tooltip";

const SIDEBAR_WIDTH_MOBILE = "18rem";

type SidebarContextProps = {
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  toggleSidebar: () => void;
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [openMobile, setOpenMobile] = React.useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = React.useCallback(() => {
    setOpenMobile((prev) => !prev);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      openMobile,
      setOpenMobile,
      isMobile,
      toggleSidebar,
      state: "expanded" as const,
      open: true,
      setOpen: () => {},
    }),
    [openMobile, isMobile, toggleSidebar]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider>{children}</TooltipProvider>
    </SidebarContext.Provider>
  );
}

function Sidebar({ className, children }: React.ComponentProps<"div">) {
  const { openMobile, setOpenMobile } = useSidebar();

  return (
    <Sheet open={openMobile} onOpenChange={setOpenMobile}>
      <SheetContent
        dir="rtl"
        className="bg-sidebar text-sidebar-foreground w-[18rem] p-0 [&>button]:hidden"
        side="right"
        style={
          {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
          } as React.CSSProperties
        }
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Sidebar</SheetTitle>
        </SheetHeader>
        <div className="flex h-full w-full flex-col">{children}</div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn("flex min-h-0 flex-1 flex-col overflow-auto", className)}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn(
        "relative flex w-full min-w-0 flex-col p-4 border-b border-b-[#d3d8e4]",
        className
      )}
      {...props}
    />
  );
}













function SidebarTrigger({
  className,
  ...props
}: React.ComponentProps<"button">) {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      className={cn("size-8", className)}
      onClick={toggleSidebar}
      {...props}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    </button>
  );
}

export {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarTrigger,
  useSidebar,
};
