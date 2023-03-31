import React, { useState } from "react";
import { message } from "antd";
import { Button } from "../base-components/button/button";
import { updateUserById } from "@/lib/queries/user";
import { useAuth } from "@/lib/hooks/useAuth";
import { ActionTypes } from "@/lib/utils/actions";
import { AuthType } from "@/lib/utils/types";
import { ConfirmationModal } from "@/components/_confirmationmodal/confirmationmodal";

type Props = {
  theme?: string;
};

export const CloseAccount = ({ theme }: Props) => {
  const { user, signOut, dispatch } = useAuth() as AuthType;
  const [isDeletedModal, setIsDeletedModal] = useState(false);

  const handleDeleteAccount = async () => {
    const res = await updateUserById(user?.userid, {
      isDeleted: true,
    });

    if (res.status === "success") {
      dispatch({
        type: ActionTypes.UPDATE_USER,
        payload: true,
      });
      signOut();
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

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
        <Button
          label="Close Account"
          size="sm"
          bgColor="other"
          onClick={() => setIsDeletedModal(true)}
        />
      </div>

      {isDeletedModal && (
        <ConfirmationModal
          open={isDeletedModal}
          setOpen={setIsDeletedModal}
          title="Close Account"
          subtitle="Are you sure you want to close your account? This action cannot be undone."
          onConfirm={handleDeleteAccount}
          primaryBtnLabel="Close Account"
          secondaryBtnLabel="Cancel"
        />
      )}
    </div>
  );
};
