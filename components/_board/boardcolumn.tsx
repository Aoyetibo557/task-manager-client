import React, { useState } from "react";
import { RxDotFilled as Dot } from "react-icons/rx";
import { BsPlusCircle } from "react-icons/bs";
import { HiOutlinePlus } from "react-icons/hi";
import { TaskCard } from "../_task/task";
import { Task } from "@/lib/utils/types";
import { createTask } from "@/lib/queries/task";
import AddTaskModal from "@/components/base-components/addtaskModal";
import { useAuth } from "@/lib/hooks/useAuth";
import { Task, AuthType } from "@/lib/utils/types";
import { ActionTypes } from "@/lib/utils/actions";
import { message } from "antd";

type BoardColumnProps = {
  boardId: string;
  columntype: "done" | "doing" | "todo";
  tasks: Task[];
  theme: string;
};

const BoardColumn = ({
  columntype,
  tasks,
  theme,
  boardId,
}: BoardColumnProps) => {
  const { user, dispatch } = useAuth() as AuthType;
  const [openModal, setOpenModal] = useState(false);
  const [taskObj, setTaskObj] = useState<Task | any>({
    name: "",
    description: "",
    status: "",
    priority: "",
  });

  const handleCreateTask = async () => {
    const newTask = {
      name: taskObj.name,
      description: taskObj.description,
      status: taskObj.status,
      priority: taskObj.priority,
      boardId: boardId,
      userId: user?.userid,
    };

    try {
      const res = await createTask(newTask);
      if (res.status === "success") {
        message.success("Task created successfully");
        setOpenModal(false);
        dispatch({
          type: ActionTypes.TASK_CREATED,
          payload: true,
        });
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (error: any) {
      message.error(`Something went wrong, ${error.message}`);
      setError(error.message);
    }
  };

  const handleInput = (name: keyof Task, value: string) => {
    setTaskObj((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const getDot = () => {
    switch (columntype) {
      case "done":
        return <Dot className="w-10 h-10 text-green-400" />;
      case "doing":
        return <Dot className="w-10 h-10 text-blue-500" />;
      case "todo":
        return <Dot className="w-10 h-10 text-red-600" />;
      default:
        return <Dot className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <div>
      <div
        className={`flex flex-row items-center golos-font font-light text-sm ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }
        `}>
        <div>{getDot()}</div>

        <div className={`w-full flex flex-row items-center justify-between `}>
          <div>
            <span className={`font-normal text-base`}>
              {`${columntype.charAt(0).toUpperCase() + columntype.slice(1)} `}
            </span>
            <span className="text-xs font-normal text-neutral-400">
              ({tasks.length})
            </span>
          </div>
          <BsPlusCircle
            title="Add new task"
            className="w-4 h-4 cursor-pointer hover:scale-125"
            onClick={() => setOpenModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-rows-3 gap-4">
        {/* update the key to taskid later */}
        {tasks.map((task, idx) => (
          <TaskCard key={idx} task={task} theme={theme} />
        ))}
      </div>

      <div>
        <button
          className={`w-full mt-5 golos-font text-sm border-dashed border-[1px] p-3 rounded-md border-blue-400 
          ${
            theme === "light"
              ? "text-task-dark bg-task-white"
              : "text-task-light-white bg-task-sidebar-light-dark"
          }`}
          onClick={() => setOpenModal(true)}>
          <HiOutlinePlus className="w-4 h-4 inline-block mr-2" />
          Add New Task
        </button>
      </div>

      {openModal && (
        <AddTaskModal
          title="Add New Task"
          open={openModal}
          setOpen={setOpenModal}
          theme={theme}
          task={taskObj}
          onInputChange={handleInput}
          onClick={handleCreateTask}
        />
      )}
    </div>
  );
};

export default BoardColumn;
