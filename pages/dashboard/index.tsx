import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useRouter } from "next/router";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import Image from "next/image";
import { Divider } from "antd";
import { RecentActivity } from "@/components/_dashboard/recentactivity";
import AppTour from "@/components/_tour/apptour";
import GettingStarted from "@/components/_dashboard/gettingstarted";
import DropdownMenu from "@/components/_menu/dropdownmenu";
import { AuthType } from "@/lib/utils/types";
import { StatsOverview } from "@/components/_stats/statsoverview";

const Dashboard = () => {
  const router = useRouter();
  const { user, isTaskActionDispatched, isLoggedIn } = useAuth() as AuthType;
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!user) {
      router.push("/loginform");
    }
  }, [user]);

  return (
    <div
      className={` w-full h-screen overflow-auto ${
        theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"
      }
    `}>
      <div className="flex flex-col p-10">
        <div className="flex flex-row items-center justify-between">
          <div
            className={`golos-font flex flex-col gap-3 ${
              theme === "light" ? "text-task-dark" : "text-task-light-white"
            }`}>
            <span
              className={`inline-flex gap-3 items-center text-4xl font-light mobile-large-text`}>
              Welcome {user?.tourtaken ? "back" : "aboard"},
              <span className={`font-semibold`}>{user?.firstName}</span>
              <Image
                src="/static/images/party.png"
                alt="Party Popper"
                width={50}
                height={50}
              />{" "}
            </span>
            <span
              className={`text-base ${
                theme === "light" ? "text-neutral-600" : "text-neutral-400"
              }`}>
              {user?.tourtaken ? (
                <span>
                  {/* {`Let's get to work! You can always take the tour again by
                  clicking the help icon on the top right corner.`} */}
                  {`Let's get to work! Here's a quick overview of your stats.`}
                </span>
              ) : (
                <span>
                  {`Let's start by taking a`}
                  <span
                    className={`font-medium hover:underline cursor-pointer
              ${theme === "light" ? "text-neutral-700" : "text-neutral-200"}
            `}>
                    {" "}
                    quick tour{" "}
                  </span>
                  of the app. 🚀
                </span>
              )}
            </span>
          </div>

          <div className={`hide-dropdown`}>
            <DropdownMenu theme={theme} />
          </div>
        </div>

        <div>
          <Divider
            className={`${
              theme === "light" ? "border-neutral-200" : "border-neutral-600"
            }`}
          />
        </div>

        <div>
          <StatsOverview />
        </div>

        <div>
          {user?.tourtaken ? (
            <RecentActivity theme={theme} />
          ) : (
            <GettingStarted theme={theme} user={user} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
