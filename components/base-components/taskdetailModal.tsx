import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import Modal from "../Utility/Modal/modal";
import {
  BsThreeDotsVertical,
  BsFillPinFill,
  BsPin,
  BsPencil,
  BsTrash,
  BsArchive,
  BsStar,
  BsFillStarFill,
} from "react-icons/bs";
import { Task, AuthType } from "@/lib/utils/types";
import type { MenuProps } from "antd";
import { Dropdown, message, Spin, Tag } from "antd";
import {
  archiveTask,
  deleteTask,
  pinTask,
  unpinTask,
  setStarTask,
} from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { ActionTypes } from "@/lib/utils/actions";
import { formatDate } from "@/lib/utils/util";
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
  const { dispatch, isTaskPinned } = useAuth() as AuthType;
  const [isPinned, setIsPinned] = useState(props.task.pinned);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [description, setDescription] = useState(props.task.description);

  const handleUpdateInput = (name: keyof Task, value: string) => {
    setStatus(
      name === "status" ? (value as Task["status"]) : props.task.status
    );
    setPriority(
      name === "priority" ? (value as Task["priority"]) : props.task.priority
    );
    setDescription(
      name === "description"
        ? (value as Task["description"])
        : props.task.description
    );

    props.updateTask && props.updateTask(name, value);
  };

  const handleClick = () => {
    props.onClick();

    // props.updateTask && props.updateTask("status", "");
    // props.updateTask && props.updateTask("priority", "");
    // props.updateTask && props.updateTask("description", "");
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

  const handleStarTask = async () => {
    const res = await setStarTask(
      props.task?.taskId as any,
      props.task?.isStarred === true ? false : true
    );

    if (res.status === "success") {
      message.success(res.message);
      props.setOpen(true);
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
        <button
          type="submit"
          onClick={openDeleteModal}
          className={`flex flex-row items-center`}>
          <BsTrash className="mr-2 w-3 h-3" />
          Delete
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button
          type="submit"
          onClick={openArchiveModal}
          className={`flex flex-row items-center`}>
          <BsArchive className="mr-2 w-3 h-3" />
          Archive
        </button>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: ActionTypes.TASK_PINACTION || ActionTypes.TASK_UPDATED,
      payload: false,
    });
  }, [isTaskPinned]);

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
            {props.task?.isStarred ? (
              <BsFillStarFill
                className={`w-5 h-5 cursor-pointer fill-yellow-400 ${
                  props.theme === "light"
                    ? "text-task-dark"
                    : "text-task-light-white"
                } `}
                onClick={handleStarTask}
              />
            ) : (
              <BsStar
                className="w-5 h-5 cursor-pointer"
                onClick={handleStarTask}
              />
            )}
          </div>

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
          className={`flex flex-row justify-between font-medium text-sm golos-font mb-2 ${
            props.theme === "light" ? "text-neutral-600" : "text-neutral-400"
          }`}>
          {editDescription ? (
            <textarea
              name="description"
              className={`w-full p-3 rounded-md border-[0.4px] golos-font text-sm font-light resize-none h-32
                ${
                  props.theme === "light"
                    ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                    : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
                }`}
              value={description}
              onChange={(e) => handleUpdateInput("description", e.target.value)}
            />
          ) : (
            <div className="w-full">{props.task?.description}</div>
          )}
          <BsPencil
            className="w-5 h-5 ml-1 cursor-pointer"
            onClick={() => setEditDescription(!editDescription)}
          />
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

        {(props.task.status !== status ||
          props.task.priority !== priority ||
          props.task.description !== description) && (
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
