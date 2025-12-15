"use client";

import { Outfit } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
// import { store } from "./store/store";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <QueryClientProvider client={queryClient}>
          {/* <Provider store={store}> */}
          <Toaster position="top-right" richColors closeButton />
          {children}
          {/* </Provider> */}
        </QueryClientProvider>
      </body>
    </html>
  );
}
