import React, { useContext, useEffect } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import HelpList from "@/components/_help/helplist";

const HelpBoard = () => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="">
      <div className="flex flex-col items-center gap-4 mt-10">
        <span
          className={`golos-font font-light text-sm
        ${theme === "light" ? "text-task-dark" : "text-neutral-300"}
        `}>
          FAQs
        </span>
        <span
          className={`golos-font font-medium text-3xl
        ${theme === "light" ? "text-task-dark" : "text-neutral-300"}
        `}>
          Ask us anything
        </span>
        <span
          className={`golos-font font-light text-sm
        ${theme === "light" ? "text-task-dark" : "text-neutral-300"}
        `}>
          {`Have any questions? We're here to assist you.`}
        </span>
      </div>
      <div className=" mt-5 p-2 ">
        <HelpList theme={theme} />
      </div>
    </div>
  );
};

export default HelpBoard;
