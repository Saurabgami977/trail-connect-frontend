"use client";

import AdminDashboard from "@/components/dashboard/Admin";
import GuideDashboard from "@/components/dashboard/Guide";
import TouristDashboard from "@/components/dashboard/Traveller";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      {user?.role === "admin" ? (
        <AdminDashboard />
      ) : user?.role === "user" ? (
        <TouristDashboard />
      ) : (
        <GuideDashboard />
      )}
    </div>
  );
};

export default DashboardPage;
