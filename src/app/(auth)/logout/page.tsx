"use client";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { signout } from "@/api/routes/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { store } from "@/store/store";

const Logout: React.FC = () => {
  const router = useRouter();

  const { mutate: logoutHandler } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      store.dispatch({
        type: "auth/logout",
      });
      router.push("/login");
    },
    onError: (error: any) => {
      toast(error.response.data.message || "Logout failed", {
        duration: 4000,
      });
    },
  });

  React.useEffect(() => {
    logoutHandler();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* loggin out loader */}

      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
      <h2 className="text-center text-2xl font-semibold text-gray-700">
        Logging out...
      </h2>
    </div>
  );
};

export default Logout;
