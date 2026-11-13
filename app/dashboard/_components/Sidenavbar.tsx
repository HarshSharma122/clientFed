"use client";

import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard, UserRound,
  Settings,
  LogOut,
  ChevronRight, FolderKanban,
  Milestone,
  FileCheck,
  MessageSquareText,
  Users
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SideNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");


  const [isLogout, setIsLogout] = useState(false);

  const logout = async () => {
    try {
      setIsLogout(true);
      const response = await fetch("/api/Auth/logout");
      if (!response.ok) {
        throw new Error("Logout failed");
      }
      toast.success("Successfully logged out");
      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLogout(false);
    }
  };

  const navItems = [
    {
      name: "Overview",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      name: "Projects",
      icon: FolderKanban,
      href: "/dashboard/projects",
    },
    {
      name: "Milestones",
      icon: Milestone,
      href: "/dashboard/milestones",
    },
    {
      name: "Deliverables",
      icon: FileCheck,
      href: "/dashboard/deliverables",
    },
    {
      name: "Feedback",
      icon: MessageSquareText,
      href: "/dashboard/feedback",
    },
    {
      name: "Messages",
      icon: MessageSquareText,
      href: "/dashboard/messages",
    },
    {
      name: "Clients",
      icon: Users,
      href: "/dashboard/clients",
    }, {
      name: "Profile",
      icon: UserRound,
      href: "/dashboard/profile",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
  ];

  const handleNavigation = (item: any) => {
    setActiveItem(item.name);
    setIsOpen(false);
    window.location.href = item.href;
  };

  return (
    <>
      {/* Menu trigger */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="fixed left-5 top-5 z-40 flex h-11 w-11 items-center justify-center
        rounded-xl border border-neutral-200 bg-white text-neutral-800 shadow-sm
        transition-all duration-200 hover:border-[#85D91F] hover:bg-[#85D91F]/10"
      >
        <Menu size={21} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]
        transition-opacity duration-300 ${isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
          }`}
      />

      {/* Sidebar */}
      <aside
        id="baantlo-sidebar"
        aria-label="Main navigation"
        aria-hidden={!isOpen}
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col
        border-r border-white/10 bg-[#171717] px-5 py-6 text-white
        shadow-2xl transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">

            <Link href="/">
            <h1 className="text-xl">ClientFed</h1>
            </Link>


            <div>

            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

      
        {/* Navigation */}
        <div className="mt-9">
        

          <nav className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item)}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3
                  text-left text-sm font-medium transition-all duration-200
                  ${isActive
                      ? " shadow-[0_4px_18px_rgba(133,217,31,0.12)]"
                      : "text-neutral-400 hover:bg-white/[0.06] hover:text-white"
                    }`}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} />

                  <span className="flex-1">{item.name}</span>

                  <ChevronRight
                    size={16}
                    className={`transition-transform ${isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:translate-x-0.5 group-hover:opacity-70"
                      }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom section */}
        <div className="mt-auto">


          <div className="border-t border-white/10 pt-4">
            <button
              disabled={isLogout}
              onClick={() => {
                // Add your logout logic here.
                logout()
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3
              text-sm font-medium text-neutral-400 transition
              hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={19} />
              <span>Log out</span>
            </button>


          </div>
        </div>
      </aside>
    </>
  );
};

export default SideNavbar;