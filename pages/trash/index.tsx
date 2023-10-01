import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { Task } from "@/lib/utils/types";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import { message } from "antd";
import TrashGrid from "@/components/_trash/trashgrid";

const TrashPage = () => {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, dispatch } = useAuth() as AuthType;

  return (
    <div
      className={` w-full h-screen overflow-auto ${
        theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"
      } `}>
      <div className="sticky top-0">
        <DashboardHeader
          contentType="page"
          boardname="Deleted Tasks"
          hasSearchBar={false}
          hasboardMenu={false}
          breadcrumblist={[
            {
              href: "/dashboard",
              title: "Dashboard",
            },
            {
              href: "/dashboard/deletedtasks",
              title: "Deleted Tasks",
            },
          ]}
        />
      </div>

      <div className={`p-4`}>
        <TrashGrid />
      </div>
    </div>
  );
};

TrashPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default TrashPage;
