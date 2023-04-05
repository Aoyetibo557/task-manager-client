import React from "react";
import Modal from "../Utility/Modal/modal";
import { Button } from "../base-components/button/button";
import { message } from "antd";
import { Task } from "@/lib/utils/types";
import Image from "next/image";

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
    props.onInputChange && props.onInputChange("priority", "");
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
            className={`w-full p-3 rounded-md border-[1.5px] golos-font text-sm font-light border-blue-400  focus:border-blue-500 focus:outline-none
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark "
                  : "bg-task-sidebar-dark text-task-light-white "
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
            className={`w-full p-3 rounded-md border-[1.5px] golos-font text-sm font-light resize-none border-blue-400  focus:border-blue-500 focus:outline-none
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark "
                  : "bg-task-sidebar-dark text-task-light-white"
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
            className={`w-full p-3 rounded-md border-[1.5px] golos-font text-sm font-light border-blue-400  focus:border-blue-500 focus:outline-none
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark"
                  : "bg-task-sidebar-dark text-task-light-white"
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
          <label>
            <div
              className={`font-medium text-sm golos-font mb-2 
              ${
                props.theme === "light"
                  ? "text-task-dark"
                  : "text-task-light-white"
              }
            `}>
              Priority
            </div>
          </label>

          <select
            required
            className={`w-full p-3 rounded-md border-[1.5px] golos-font text-sm font-light border-blue-400  focus:border-blue-500 focus:outline-none
              ${
                props.theme === "light"
                  ? "bg-task-light-white text-task-sidebar-dark "
                  : "bg-task-sidebar-dark text-task-light-white"
              }
            `}
            value={props.task?.priority}
            onChange={(e) =>
              props.onInputChange &&
              props.onInputChange("priority", e.target.value)
            }>
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <button
            className={`w-full p-3 rounded-sm golos-font text-sm font-semibold opacity-80 hover:opacity-100
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
