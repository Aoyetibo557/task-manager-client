import React from "react";
import { Button } from "../../base-components/button/button";
import { Tag } from "antd";
import { User } from "@/lib/utils/types";

type Props = {
  user: User | undefined;
  theme?: string;
};

export const SubscriptionDetails = ({ theme }: Props) => {
  return (
    <div
      className={`w-2/4 p-4 h-full flex flex-col gap-4 rounded-md golos-font ${
        theme === "light"
          ? "bg-task-light-white text-task-dark"
          : "bg-task-sidebar-light-dark text-task-light-white"
      }`}>
      <div
        className={`font-medium text-base golos-font ${
          theme === "light"
            ? "text-task-dark font-semibold"
            : "text-task-light-white"
        }`}>
        Subscription Details
      </div>

      <div>
        <Tag color="#87d068">
          <span className="text-xs">Active Subscription</span>
        </Tag>
      </div>

      <div
        className={`text-sm golos-font flex flex-col gap-2 ${
          theme === "light" ? "text-task-dark" : "text-neutral-300"
        }`}>
        <div className={`flex flex-row justify-between items-center`}>
          <span>Plan</span>
          <span
            className={`${
              theme === "light" ? "text-task-dark" : "text-white"
            }`}>
            Tassker Free <span className="text-xs">($0.00/month)</span>
          </span>
        </div>

        <div className={`flex flex-row justify-between items-center`}>
          <span>Billing Amount</span>
          <span
            className={`${
              theme === "light" ? "text-task-dark" : "text-white"
            }`}>
            $0.00 <span className="text-xs">/month</span>
          </span>
        </div>

        <div className={`flex flex-row justify-between items-center`}>
          <span>
            Next Billing Date <span className="text-xs">(UTC)</span>
          </span>
          <span
            className={`${
              theme === "light" ? "text-task-dark" : "text-white"
            }`}>
            N/A
          </span>
        </div>

        <div className={`flex flex-row justify-between items-center`}>
          <span>Plan Fetures</span>
          <span
            className={`${
              theme === "light" ? "text-task-dark" : "text-white"
            }`}>
            3 Boards - 15 Task - No follow-up Funcionality
          </span>
        </div>
      </div>

      <div className="flex flex-row  items-center justify-end gap-3">
        <Button label="Cancel Subscription" size="sm" bgColor="other" />
        <Button label="Change Plan" size="sm" />
      </div>
    </div>
  );
};
