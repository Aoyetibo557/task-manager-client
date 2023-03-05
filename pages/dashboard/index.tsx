import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";

const Dashboard = () => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!loading) {
      if (!user || isLoggedIn === false) router.push("/loginform");
    }
  }, [user, loading, isLoggedIn]);
  return (
    <div
      className={`w-full
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <div className="flex flex-col items-center mt-10">
        This is the dashboard {isLoggedIn ? "logged in" : "not logged in"}{" "}
        {user?.email} {user.userid}
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
