"use client";

import { Outfit } from "next/font/google";
import AdminSidebar from "./AdminSidebar";
import Backdrop from "./Backdrop";
import { useSidebar } from "@/context/SidebarContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <AdminSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          {/* Page Content */}
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            <Header />
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
