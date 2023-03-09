import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import { AiFillSetting } from "react-icons/ai";
import { SettingsTab } from "@/components/_setting/settingstab";

const AccountSetting = () => {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`w-full h-screen overflow-auto
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <DashboardHeader />

      <div className="p-8">
        <div className="flex flex-row items-center gap-4">
          <AiFillSetting
            className={`text-3xl ${
              theme === "light"
                ? "text-task-sidebar-dark"
                : "text-task-light-white"
            }`}
          />
          <div
            className={`text-2xl golos-font font-medium ${
              theme === "light"
                ? "text-task-sidebar-dark"
                : "text-task-light-white"
            }`}>
            Account Setting
          </div>
        </div>

        <div className="m-10">
          <SettingsTab theme={theme} userId={id} />
        </div>
      </div>
    </div>
  );
};

AccountSetting.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AccountSetting;
