import React from "react";
import { Button } from "../base-components/button/button";

type Props = {
  theme?: string;
};

export const CloseAccount = ({ theme }: Props) => {
  return (
    <div
      className={`p-4 h-full flex flex-col gap-4 rounded-md golos-font ${
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
        Close account
      </div>

      <div
        className={`text-sm golos-font ${
          theme === "light" ? "text-task-dark" : "text-neutral-300"
        }`}>
        You can close permanently delete or freeze your account.
      </div>

      <div>
        <Button label="Close Account" size="sm" bgColor="other" />
      </div>
    </div>
  );
};
