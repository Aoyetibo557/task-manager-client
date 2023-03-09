import React from "react";
import AppTour from "@/components/_tour/apptour";
import { GuideCheckList } from "@/components/_dashboard/guidechecklist";
import { User } from "@/lib/utils/types";

type Props = {
  theme?: string;
  user: User;
};

const GettingStarted = ({ theme, user }: Props) => {
  return (
    <div className={`flex flex-col gap-3`}>
      <div
        className={`flex flex-col gap-2 golos-font ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }`}>
        <div className={`text-xl font-semibold`}>Getting Started</div>
        <div className={`text-sm font-normal`}>
          We are glad you are here. Complete the following steps to get started
          with your first task.
        </div>
      </div>
      <div>
        <GuideCheckList theme={theme} user={user} />
      </div>

      {/* <AppTour /> */}
    </div>
  );
};

export default GettingStarted;
