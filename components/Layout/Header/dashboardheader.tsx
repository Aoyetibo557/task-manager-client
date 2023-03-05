import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { Button } from "../../base-components/button/button";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../_contexts/themecontext";
import AddTaskModal from "../../base-components/addtaskModal";
import { message } from "antd";
import { createTask } from "@/lib/queries/task";
import { AuthActionTypes } from "@/components/Layout/_contexts/authcontext";

type Props = {
  boardname: string;
  boardId?: string;
};

interface Task {
  name: string;
  description: string;
  taskid?: string;
  status: string;
  boardId?: string;
  userId?: string;
  subtasks: Task[];
  timestamp?: string;
}

const DashboardHeader = (props: Props) => {
  const router = useRouter();
  const { user, loading, isLoggedIn, dispatch, isTaskCreated } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [taskObj, setTaskObj] = useState<Task>({
    name: "",
    description: "",
    status: "",
  });

  const handleInput = (name: keyof Task, value: string) => {
    setTaskObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTask = async () => {
    const newTask = {
      name: taskObj.name,
      description: taskObj.description,
      status: taskObj.status,
      boardId: props.boardId,
      userId: user?.userid,
    };

    try {
      const res = await createTask(newTask);
      console.log(res);
      if (res.status === "success") {
        message.success("Task created successfully");
        setOpenModal(false);
        dispatch({
          type: AuthActionTypes.TASK_CREATED,
          payload: true,
        });
      } else {
        if (res.status === "error") {
          message.error(res.message);
        }
      }
    } catch (error) {
      message.error("Something went wrong");
      setError(error.message);
    }
  };

  return (
    <div
      className={`flex flex-row justify-between items-center p-4
      ${
        theme === "light"
          ? "bg-task-light-white border-b-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark  border-b-[0.6px] border-neutral-500"
      }
    `}>
      <div
        className={`golos-font font-medium text-lg
        ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
      `}>
        {props.boardname}
      </div>

      <div className={`flex flex-row gap-4`}>
        <button
          className={`flex flex-row items-center justify-center gap-1 p-2  w-40 center rounded-full golos-font text-sm font-light 
        ${
          theme === "light"
            ? "bg-task-sidebar-light-dark text-task-light-white hover:bg-opacity-100 bg-opacity-75"
            : "bg-task-sidebar-dark text-task-light-white hover:border-neutral-200 border-[0.5px] border-neutral-400"
        }
        `}
          onClick={() => setOpenModal(true)}>
          <BsPlus className="w-5 h-5" />
          Add New Task
        </button>

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

        <button>
          <BsThreeDotsVertical className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
