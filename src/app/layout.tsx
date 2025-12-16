"use client";

import { Outfit } from "next/font/google";
import "../globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "@/store/store";
import { fetchCurrentUser } from "@/api/routes/auth";
import { useEffect } from "react";
import { SidebarProvider } from "@/context/SidebarContext";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  // fetch current user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await fetchCurrentUser();
        store.dispatch({
          type: "auth/login",
          payload: user,
        });
      } catch (error) {
        console.log("No current user");
      }
    };
    fetchUser();
  }, []);

  return (
    <html lang="en">
      <body className={`${outfit.className}`}>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <SidebarProvider>
              <Toaster position="top-right" richColors closeButton />
              {children}
            </SidebarProvider>
          </Provider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
