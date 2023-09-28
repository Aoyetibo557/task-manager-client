import React, { useEffect, useContext } from "react";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useAuth } from "@/lib/hooks/useAuth";
import HelpBoard from "@/components/_help/helpboard";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import { AuthType } from "@/lib/utils/types";

const Help = () => {
  const router = useRouter();
  const { user, loading, isLoggedIn } = useAuth() as AuthType;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!loading) {
      if (!user || !isLoggedIn) {
        router.push("/loginform");
      }
    }
  }, [user, loading, isLoggedIn, router]);
  return (
    <div
      className={`w-full h-screen overflow-auto
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <div>
        <HelpBoard />
      </div>
    </div>
  );
};

Help.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Help;
