import React from "react";
import Modal from "../Utility/Modal/modal";
import { Button } from "../base-components/button/button";
import { message } from "antd";
import { Task } from "@/lib/utils/types";

type Props = {
  title: string;
  children?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  theme?: string;
  task: Task;
  onInputChange?: (name: keyof Task, value: string) => void;
  onClick?: () => void;
};

const AddTaskModal = (props: Props) => {
  const handleClick = () => {
    props.onClick && props.onClick();
    props.setOpen && props.setOpen(false);
    props.onInputChange && props.onInputChange("name", "");
    props.onInputChange && props.onInputChange("description", "");
    props.onInputChange && props.onInputChange("status", "");
  };
  return (
    <Modal
      title={
        <div
          className={`font-medium text-xl golos-font mb-4 p-3
            ${
              props.theme === "light"
                ? "text-task-dark"
                : "text-task-light-white"
            }
          `}>
          {props.title}
        </div>
      }
      open={props.open}
      setOpen={props.setOpen}
      theme={props.theme}>
      <div className="flex flex-col justify-center gap-4 p-3">
        <div>
          <label>
            <div
              className={`font-medium text-sm golos-font mb-2
              ${
                props.theme === "light"
                  ? "text-task-dark"
                  : "text-task-light-white"
              }
            `}>
              Task Name
            </div>
          </label>
          <input
            type="text"
            required
            placeholder="e.g Take coffee break"
            className={`w-full p-3 rounded-md border-[0.4px] golos-font text-sm font-light 
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                  : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
              }
            `}
            value={props.task.name}
            onChange={(e) =>
              props.onInputChange && props.onInputChange("name", e.target.value)
            }
          />
        </div>

        <div>
          <label>
            <div
              className={`font-medium text-sm golos-font mb-2
              ${
                props.theme === "light"
                  ? "text-task-dark"
                  : "text-task-light-white"
              }
            `}>
              Description
            </div>
          </label>
          <textarea
            rows={7}
            required
            placeholder="e.g It's always good to take a break. This will help you to be more productive"
            className={`w-full p-3 rounded-md border-[0.4px] golos-font text-sm font-light resize-none
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                  : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
              }
            `}
            value={props.task?.description}
            onChange={(e) =>
              props.onInputChange &&
              props.onInputChange("description", e.target.value)
            }></textarea>
        </div>

        <div>
          <label>
            <div
              className={`font-medium text-sm golos-font mb-2
              ${
                props.theme === "light"
                  ? "text-task-dark"
                  : "text-task-light-white"
              }
            `}>
              Status
            </div>
          </label>

          <select
            required
            className={`w-full p-3 rounded-md border-[0.4px] golos-font text-sm font-light
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                  : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
              }
            `}
            value={props.task?.status}
            onChange={(e) =>
              props.onInputChange &&
              props.onInputChange("status", e.target.value)
            }>
            <option value="">Select Status</option>
            <option value="todo">TODO</option>
            <option value="doing">DOING</option>
            <option value="done">DONE</option>
          </select>
        </div>

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
            Create Task
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AddTaskModal;
