import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";

const Dashboard = () => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) router.push("/loginform");
    }
  }, [user, loading, isLoggedIn]);
  return (
    <div>
      <div className="flex flex-col items-center mt-10">
        This is the dashboard {isLoggedIn ? "logged in" : "not logged in"}{" "}
        {user?.email}
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
