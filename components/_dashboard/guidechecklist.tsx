import React, { useState, useEffect } from "react";
import { User } from "@/lib/utils/types";
import { getUserBoards } from "@/lib/queries/board";
import { getUserTasks } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { updateUserById } from "@/lib/queries/user";
import { message } from "antd";
import { Button } from "@/components/base-components/button/button";
import { AuthType } from "@/lib/utils/types";

type Props = {
  theme?: string;
  user: User;
};

export const GuideCheckList = ({ theme, user }: Props) => {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [isBoardCreated, setIsBoardCreated] = useState(false);
  const [isTaskCreated, setIsTaskCreated] = useState(false);
  const [isTourTaken, setIsTourTaken] = useState(user?.tourtaken);
  const [completedSteps, setCompletedSteps] = useState(false);

  const { isUserActionDispatched, handleSetUser, dispatch } =
    useAuth() as AuthType;

  const handleIsProfileComplete = () => {
    if (
      user?.firstName &&
      user?.lastName &&
      user?.email &&
      user?.bio &&
      user?.username
    ) {
      setIsProfileComplete(true);
    } else {
      setIsProfileComplete(false);
    }
  };

  const handleIsBoardCreated = async () => {
    const res = await getUserBoards(user?.userid);
    if (res?.status === "success") {
      if (res?.boards.length > 0) {
        setIsBoardCreated(true);
      }
    }
  };

  const handleIsTaskCreated = async () => {
    const tasks = await getUserTasks(user?.userid);
    if (tasks.status === "success") {
      if (tasks?.tasks.length > 0) {
        setIsTaskCreated(true);
      }
    }
  };

  const handleHideChecklist = async () => {
    try {
      const res = await updateUserById(user?.userid, {
        tourtaken: true,
      });
      if (res.status === "success") {
        setIsTourTaken(true);
        dispatch({ type: "UPDATE_USER", payload: true });
        handleSetUser(res.user as User);
      } else {
        message.error(res.message);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isUserActionDispatched || user) {
      handleIsProfileComplete();
      handleIsBoardCreated();
      handleIsTaskCreated();
      setIsTourTaken(user?.tourtaken);
    }

    return () => {
      dispatch({ type: "UPDATE_USER", payload: false });
    };
  }, [user, isUserActionDispatched]);

  return (
    <div className={`flex flex-col gap-3`}>
      <div>
        <label
          className={`flex items-center cursor-pointer golos-font text-base font-light
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"} 
          ${isProfileComplete && "line-through"} 
          `}>
          <input
            type="checkbox"
            readOnly
            checked={isProfileComplete}
            className="w-4 h-4"
          />
          <span className={`ml-2`}>
            Complete your profile by updating your account settings
          </span>
        </label>
      </div>

      <div>
        <label
          className={`flex items-center cursor-pointer golos-font text-base font-light
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"} 
          ${isBoardCreated && "line-through"} 
          `}>
          <input
            type="checkbox"
            readOnly
            checked={isBoardCreated}
            className="w-4 h-4"
          />
          <span className={`ml-2`}>
            Create a board to organize your tasks and projects
          </span>
        </label>
      </div>

      <div>
        <label
          className={`flex items-center cursor-pointer golos-font text-base font-light
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"} 
          ${isTaskCreated && "line-through"} 
          `}>
          <input
            type="checkbox"
            readOnly
            checked={isTaskCreated}
            className="w-4 h-4"
          />
          <span className={`ml-2`}>
            Create a task in your board to get started with your first project
            or task.
          </span>
        </label>
      </div>

      {isProfileComplete && isBoardCreated && isTaskCreated && (
        <div>
          <Button
            label="hide checklist"
            size="sm"
            onClick={handleHideChecklist}
          />
        </div>
      )}

      {/* <div>
        <label
          className={`flex items-center cursor-pointer golos-font text-base font-light
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"} 
          ${isTourTaken && "line-through"} 
          `}>
          <input type="checkbox" checked={isTourTaken} className="w-4 h-4" />
          <span className={`ml-2`}>
            Take a tour of the app to learn more about how to use it.
          </span>
        </label>
      </div> */}
    </div>
  );
};
