import React, { useState, useEffect } from "react";
import Link from "next/link";
import TaskDetailModal from "../base-components/taskdetailModal";
import { truncate, formatRelativeTime } from "@/lib/utils/util";
import { Task, AuthType } from "@/lib/utils/types";
import { updateTask } from "@/lib/queries/task";
import { message, Tag, Avatar } from "antd";
import { BsStar, BsFillStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateTaskOnBoard } from "@/redux/features/board-slice";

type Props = {
  task: Task;
  theme: string | undefined;
};

export const TaskCard = ({ task, theme }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [updateValues, setUpdateValues] = useState({
    status: "",
    priority: "",
    description: "",
  });

  const updateTaskInput = (name: keyof Task, value: string) => {
    setUpdateValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateTask = async () => {
    const taskValues = {
      status: updateValues.status || task?.status,
      priority: updateValues.priority || task?.priority,
      description: updateValues.description || task?.description,
    };

    try {
      const res = await updateTask(task?.taskId, taskValues);

      if (res.status === "success") {
        message.success(res.message);
        setIsModalOpen(false);
        dispatch(updateTaskOnBoard(task?.boardId, task?.taskId, taskValues));
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (error: any) {
      console.log(error);
      message.error(`Something went wrong, ${error.message}`);
    }
  };

  const getTagColor = (proiority: string) => {
    switch (proiority) {
      case "high":
        return "#f50";
      case "medium":
        return "#FF4366";
      case "low":
        return "#4D5ACE";
      default:
        return "#2db7f5";
    }
  };

  return (
    <div
      className={`flex flex-col justify-between gap-2 w-80 p-4 rounded-lg cursor-pointer hover:transform hover:scale-105 transition-all duration-300
      ${
        theme === "light"
          ? "bg-task-light-white shadow-slate-300 shadow-sm"
          : "bg-task-sidebar-light-dark shadow-md "
      }`}
      onClick={() => setIsModalOpen(true)}>
      <div className="flex flex-row gap-3">
        <div
          className={`font-light text-xs golos-font ${
            theme === "light" ? "text-neutral-500" : "text-neutral-400"
          }`}>
          {formatRelativeTime(task?.timestamp)}
        </div>
      </div>
      <div
        className={` font-normal text-base golos-font flex flex-row justify-between  ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }`}>
        {truncate(task?.name, 25)}
      </div>
      <div>
        <Tag
          title={task?.priority ? `${task?.priority} priority` : "low priority"}
          color={getTagColor(task?.priority ? task?.priority : "low")}
          className="font-medium rounded-sm">
          {task?.priority ? task?.priority : "low"}
        </Tag>
      </div>
      <div
        className={` font-light text-sm golos-font ${
          theme === "light" ? "text-neutral-700" : "text-neutral-400"
        }`}>
        {task?.subtasks && task?.subtasks?.length > 0
          ? `${task?.subtasks && task?.subtasks?.length} subtasks`
          : `${(task?.subtasks && task?.subtasks?.length) || 0} subtask`}
      </div>
      <div>
        {task?.isStarred ? (
          <BsFillStarFill
            className={`w-5 h-5 cursor-pointer fill-yellow-400 ${
              theme === "light" ? "text-task-dark" : "text-task-light-white"
            } `}
          />
        ) : (
          <BsStar
            className={`w-4 h-4 cursor-pointer 
            ${theme === "light" ? "text-neutral-900" : "text-white"}
          `}
          />
        )}
      </div>

      {isModalOpen && (
        <TaskDetailModal
          task={task}
          theme={theme}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          updateTask={updateTaskInput}
          onClick={handleUpdateTask}
        />
      )}
    </div>
  );
};
