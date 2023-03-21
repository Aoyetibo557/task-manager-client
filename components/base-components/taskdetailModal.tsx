import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "../Utility/Modal/modal";
import { BsThreeDotsVertical, BsFillPinFill, BsPin } from "react-icons/bs";
import { Task, AuthType } from "@/lib/utils/types";
import type { MenuProps } from "antd";
import { Dropdown, message, Spin, Tag } from "antd";
import {
  archiveTask,
  deleteTask,
  pinTask,
  unpinTask,
} from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { ActionTypes } from "@/lib/utils/actions";
import { formatDate } from "@/lib/utils/truncate";
import { ConfirmationModal } from "../_confirmationmodal/confirmationmodal";

type Props = {
  className?: string;
  loading?: boolean;
  error?: Error | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  theme?: string;
  task: Task;
  updateTask?: (name: keyof Task, value: string) => void;
  onClick: () => void;
};

const TaskDetailModal = (props: Props) => {
  const [status, setStatus] = useState(props.task.status);
  const [priority, setPriority] = useState(props.task.priority);
  const [pinLoading, setPinLoading] = useState(false);
  const { dispatch } = useAuth() as AuthType;
  const [isPinned, setIsPinned] = useState(props.task.pinned);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);

  const handleUpdateInput = (name: keyof Task, value: string) => {
    setStatus(
      name === "status" ? (value as Task["status"]) : props.task.status
    );
    setPriority(
      name === "priority" ? (value as Task["priority"]) : props.task.priority
    );

    props.updateTask && props.updateTask(name, value);
  };

  const handleClick = () => {
    props.onClick();

    // props.updateTask && props.updateTask("status", "");
    // props.updateTask && props.updateTask("priority", "");
  };

  const handleArchive = async () => {
    const res = await archiveTask(props.task?.taskId);

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(false);
      dispatch({
        type: ActionTypes.TASK_UPDATED,
        payload: true,
      });
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

  const handleDelete = async () => {
    const res = await deleteTask(props.task?.taskId);

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(false);
      dispatch({
        type: ActionTypes.TASK_UPDATED,
        payload: true,
      });
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

  const handlePin = async () => {
    setPinLoading(true);
    const res = await pinTask(props.task.taskId);

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(true);
      setIsPinned(true);
      dispatch({
        type: ActionTypes.TASK_PINACTION,
        payload: true,
      });
    } else {
      if (res.status === "error") {
        message.error(res.message);
        setPinLoading(false);
      }
    }
  };

  const handleUnpin = async () => {
    setPinLoading(true);
    const res = await unpinTask(props.task?.taskId);

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(true);
      setIsPinned(false);
      dispatch({
        type: ActionTypes.TASK_PINACTION,
        payload: true,
      });
      setPinLoading(false);
    } else {
      if (res.status === "error") {
        message.error(res.message);
        setPinLoading(false);
      }
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

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const openArchiveModal = () => {
    setIsArchiveModalOpen(true);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button type="submit" onClick={openDeleteModal}>
          Delete
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button type="submit" onClick={openArchiveModal}>
          Archive
        </button>
      ),
    },
  ];

  return (
    <Modal
      title={
        <div
          className={`flex flex-row p-3 justify-between font-medium text-lg golos-font mb-2 ${
            props.theme === "light" ? "text-task-dark" : "text-task-light-white"
          }`}>
          <div className="w-3/4 flex flex-row gap-2">
            {props.task.name}

            <div>
              <Tag
                title={
                  props.task?.priority
                    ? `${props.task?.priority} priority`
                    : "low priority"
                }
                color={getTagColor(
                  props.task?.priority ? props.task?.priority : "low"
                )}>
                {props?.task.priority ? props.task?.priority : "low"}
              </Tag>
            </div>
          </div>

          {props.task?.pinned || isPinned ? (
            <BsFillPinFill
              className="w-5 h-5 cursor-pointer"
              onClick={handleUnpin}
            />
          ) : (
            <BsPin className="w-5 h-5 cursor-pointer" onClick={handlePin} />
          )}

          <div>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              placement="bottomRight">
              <BsThreeDotsVertical className="cursor-pointer" />
            </Dropdown>
          </div>
        </div>
      }
      open={props.open}
      setOpen={props.setOpen}
      theme={props.theme}>
      <div className="flex flex-col p-3 justify-center gap-6 mt-4">
        <div
          className={`flex flex-row items-center justify-between font-medium text-sm golos-font mb-2 ${
            props.theme === "light" ? "text-neutral-600" : "text-neutral-400"
          }`}>
          {props.task.description}
        </div>

        {/* this will have a select, that would allow the status be updated */}
        <div>
          <select
            required
            className={`w-full p-3 rounded-md border-[0.4px] golos-font text-sm font-light
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                  : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
              }
            `}
            value={status}
            onChange={(e) => handleUpdateInput("status", e.target.value)}>
            <option value="todo">ToDo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        {/* this will have a select for priority update */}
        <div>
          <select
            required
            className={`w-full p-3 rounded-md border-[0.4px] golos-font text-sm font-light
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                  : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
              }
            `}
            value={priority}
            onChange={(e) => handleUpdateInput("priority", e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {(props.task.status !== status || props.task.priority !== priority) && (
          <div>
            <button
              className={`w-full p-3 rounded-full golos-font text-sm font-semibold
              ${
                props.theme === "light"
                  ? "bg-blue-400 text-task-light-white"
                  : "bg-blue-400 text-task-light-white"
              }
          `}
              onClick={handleClick}>
              Update Task
            </button>
          </div>
        )}

        <div
          className={`border-t-[0.6px] ${
            props.theme === "light"
              ? "border-neutral-400"
              : "border-neutral-600"
          }`}>
          <div
            className={`text-sm golos-font font-normal mt-2
          ${props.theme === "light" ? "text-neutral-500" : "text-neutral-400"}
          `}>
            This task was created on {formatDate(props.task?.timestamp || "")}
          </div>
        </div>

        {props.task.boardName && (
          <div
            className={`flex flex-row items-center justify-between font-medium text-xs golos-font ${
              props.theme === "light" ? "text-neutral-600" : "text-neutral-400"
            }`}>
            {`Board: ${props.task?.boardName}`}
          </div>
        )}

        <div>
          {isDeleteModalOpen && (
            <ConfirmationModal
              open={isDeleteModalOpen}
              setOpen={setIsDeleteModalOpen}
              theme={props.theme}
              title="Delete Task"
              subtitle="Are you sure you want to delete this task?"
              onConfirm={handleDelete}
              primaryBtnLabel="Delete"
              secondaryBtnLabel="Cancel"
            />
          )}

          {isArchiveModalOpen && (
            <ConfirmationModal
              open={isArchiveModalOpen}
              setOpen={setIsArchiveModalOpen}
              theme={props.theme}
              title="Archive Task"
              subtitle="Are you sure you want to archive this task?"
              onConfirm={handleArchive}
              primaryBtnLabel="Archive"
              secondaryBtnLabel="Cancel"
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
