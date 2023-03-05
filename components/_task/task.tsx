import React, { useState, useEffect } from "react";
import Link from "next/link";
import TaskDetailModal from "../base-components/taskdetailModal";
import { truncate } from "@/lib/utils/truncate";
import { Task } from "@/lib/utils/task";
import { updateTaskStatus } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { message } from "antd";
import { ActionTypes } from "@/lib/utils/actions";
type Props = {
  task: Task;
  theme: string;
};

export const TaskCard = ({ task, theme }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const { dispatch, isTaskActionDispatched } = useAuth();

  const updateStatus = (name: keyof Task, value: string) => {
    setStatus(value);
  };

  const handleUpdateStatus = async () => {
    try {
      const res = await updateTaskStatus(task.taskId, status);

      if (res.status === "success") {
        message.success(res.message);
        setIsModalOpen(false);
        dispatch({
          type: ActionTypes.TASK_UPDATED,
          payload: true,
        });
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (error) {
      console.log(error);
      message.error(`Something went wrong, ${error.message}`);
    }
  };

  return (
    <div
      className={`flex flex-col justify-between w-80 p-4 rounded-lg cursor-pointer hover:border-[0.6px]
      ${
        theme === "light"
          ? "bg-task-light-white shadow-slate-300 shadow-sm hover:border-task-light-dark"
          : "bg-task-sidebar-light-dark shadow-md hover:border-task-light-white"
      }
    `}
      onClick={() => setIsModalOpen(true)}>
      <div
        className={` font-medium text-base golos-font  ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }
      `}>
        {truncate(task.name, 55)}
      </div>
      <div
        className={` font-medium text-sm golos-font ${
          theme === "light" ? "text-task-dark" : "text-neutral-400"
        }
      `}>
        {task.subtasks?.length > 0
          ? `${task.subtasks?.length} subtasks`
          : `${task.subtasks?.length || 0} subtask`}
      </div>

      {isModalOpen && (
        <TaskDetailModal
          task={task}
          theme={theme}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          updateStatus={updateStatus}
          onClick={handleUpdateStatus}
        />
      )}
    </div>
  );
};
