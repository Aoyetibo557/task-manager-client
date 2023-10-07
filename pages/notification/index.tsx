import React, { useEffect, useContext } from "react";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import NotificationList from "@/components/_notification/notificationlist";

const NotificationPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full h-screen overflow-auto
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <NotificationList />
    </div>
  );
};

NotificationPage.getLayout = (page: React.ReactNode) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default NotificationPage;
