import React, { useState, useEffect } from "react";
import { Button } from "../base-components/button/button";
import { useAuth } from "@/lib/hooks/useAuth";
import ResetModal from "@/components/_resetmodal/resetmodal";

import { AuthType } from "@/lib/utils/types";

type Props = {
  theme?: string;
};

export const PasswordReset = ({ theme }: Props) => {
  const [resetModal, setResetModal] = useState(false);
  const { user, dispatch } = useAuth() as AuthType;

  return (
    <div
      className={`p-4 h-full md:w-96 flex flex-col justify-between gap-4 rounded-md golos-font ${
        theme === "light"
          ? "bg-task-light-white text-task-dark"
          : "bg-task-sidebar-light-dark text-task-light-white"
      }`}>
      <div className={`flex flex-col gap-4`}>
        <div
          className={`font-medium text-base golos-font ${
            theme === "light"
              ? "text-task-dark font-semibold"
              : "text-task-light-white"
          }`}>
          Change password
        </div>

        <div
          className={`text-sm golos-font ${
            theme === "light" ? "text-task-dark" : "text-neutral-300"
          }`}>
          You can change your password here and it will be updated across all of
          your devices.
        </div>
      </div>

      <div>
        <Button
          label="Change Password"
          size="sm"
          bgColor="secondary"
          onClick={() => setResetModal(true)}
        />
      </div>

      {resetModal && (
        <ResetModal
          title="Change Password"
          subtitle="Password must containe at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character."
          open={resetModal}
          setOpen={setResetModal}
        />
      )}
    </div>
  );
};
