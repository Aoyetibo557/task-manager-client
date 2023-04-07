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
    const res = await getPinnedTasks(user?.userid);

    if (res.status === "success") {
      setTasks(res.tasks);
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
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
          hasSearchBar={false}
          hasboardMenu={false}
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
