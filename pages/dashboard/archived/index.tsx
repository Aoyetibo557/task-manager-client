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
        <DashboardHeader
          boardname={"Archived Tasks"}
          contentType="page"
          hasboardMenu={false}
          breadcrumblist={[
            {
              href: "/dashboard",
              title: "Dashboard",
            },
            {
              href: "/dashboard/archived",
              title: "Archived Tasks",
            },
          ]}
        />
      </div>
      <div>
        <ArchivedTasks />
      </div>
    </div>
  );
}

ArchivedPage.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ArchivedPage;
