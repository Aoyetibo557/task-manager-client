import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`ml-80 pl-5 w-full h-screen
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <div>
        <DashboardHeader boardname={"Profile Page"} />
      </div>
    </div>
  );
};

ProfilePage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfilePage;
