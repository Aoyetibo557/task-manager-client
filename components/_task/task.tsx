import React, { useState, useEffect } from "react";
import Link from "next/link";
import TaskDetailModal from "../base-components/taskdetailModal";
import { truncate } from "@/lib/utils/truncate";

type Props = {
  task: Task;
  theme: string;
};

interface Task {
  name: string;
  description: string;
  taskid?: string;
  status: string;
  boardId?: string;
  userId?: string;
  subtasks?: Task[];
  timestamp?: string;
}

export const TaskCard = ({ task, theme }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        />
      )}
    </div>
  );
};
