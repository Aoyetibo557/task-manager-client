import React, { useContext, useState, useEffect } from "react";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { getPinnedTasks } from "@/lib/queries/task";
import { Task } from "@/lib/utils/types";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import { PinnedTasks } from "@/components/_pinned/pinnedtasks";
import { message } from "antd";

const PinnedPage = () => {
  const { theme } = useContext(ThemeContext);
  const [tasks, setTasks] = useState<Task[]>([]);
  const { user, dispatch } = useAuth() as AuthType;

  const handleGetFilteredTasks = async () => {
    try {
      const res = await getPinnedTasks(user?.userid);
      if (res.status === "success") {
        setTasks(res.tasks);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    handleGetFilteredTasks();
  }, [user]);

  return (
    <div
      className={` w-full h-screen overflow-auto ${
        theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"
      } `}>
      <div className="sticky top-0">
        <DashboardHeader
          contentType="page"
          boardname="Pinned Tasks"
          hasSearchBar={false}
          hasboardMenu={false}
          breadcrumblist={[
            {
              href: "/dashboard",
              title: "Dashboard",
            },
            {
              href: "/dashboard/pinned",
              title: "Pinned Tasks",
            },
          ]}
        />
      </div>

      <div className={`p-4`}>
        <PinnedTasks tasks={tasks} theme={theme} />
      </div>
    </div>
  );
};

PinnedPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default PinnedPage;
