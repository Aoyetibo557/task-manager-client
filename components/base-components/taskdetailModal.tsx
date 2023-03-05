import React, { useState, Dispatch, SetStateAction } from "react";
import Modal from "../Utility/Modal/modal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Task } from "@/lib/utils/types";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import { archiveTask, deleteTask } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { ActionTypes } from "@/lib/utils/actions";

type Props = {
  title: string;
  className?: string;
  loading?: boolean;
  error?: Error | null;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  theme?: string;
  task: Task;
  updateStatus?: (name: keyof Task, value: string) => void;
  onClick: () => void;
};

const TaskDetailModal = (props: Props) => {
  const [status, setStatus] = useState(props.task.status);
  const { dispatch } = useAuth();

  const handleUpdateStatus = (status: string) => {
    setStatus(status);

    if (props.task.status !== status) {
      props.updateStatus("status", status);
    }
  };

  const handleArchive = async () => {
    const res = await archiveTask(props.task.taskId);

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
    const res = await deleteTask(props.task.taskId);

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

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <button type="submit" onClick={handleDelete}>
          Delete
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button type="submit" onClick={handleArchive}>
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
          <div className="w-3/4">{props.task.name}</div>

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
            onChange={(e) => handleUpdateStatus(e.target.value)}>
            <option value="todo">ToDo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>

        {props.task.status !== status && (
          <div>
            <button
              className={`w-full p-3 rounded-full golos-font text-sm font-semibold
              ${
                props.theme === "light"
                  ? "bg-blue-400 text-task-light-white"
                  : "bg-blue-400 text-task-light-white"
              }
          `}
              onClick={props.onClick}>
              Update Status
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default TaskDetailModal;
