import React, { useContext } from "react";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import ArchivedTasks from "@/components/_archive/archivedtasks";

function ArchivedPage() {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={` w-full h-screen overflow-auto ${
        theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"
      } `}>
      <div className="sticky top-0">
        <DashboardHeader contentType="page" hasBoardMenue={false} />
      </div>
      <div>
        <div className="flex flex-col items-center gap-4 mt-10">
          <span
            className={`golos-font font-medium text-xl ${
              theme === "light" ? "text-task-dark" : "text-neutral-300"
            }`}>
            All archived tasks
          </span>
        </div>

        <div>
          <ArchivedTasks />
        </div>
      </div>
    </div>
  );
}

ArchivedPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ArchivedPage;
