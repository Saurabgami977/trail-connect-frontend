"use client";

import UserSidebar from "./UserSidebar";
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

  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <>
      <div className="min-h-screen xl:flex">
        <UserSidebar />
        <Backdrop />
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-4">
            <Header />
            {children}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
