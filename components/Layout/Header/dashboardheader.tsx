import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { Button } from "../../base-components/button/button";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../_contexts/themecontext";
import AddTaskModal from "../../base-components/addtaskModal";
import { createTask } from "@/lib/queries/task";
import { Task, AuthType } from "@/lib/utils/types";
import { message } from "antd";
import { ActionTypes } from "@/lib/utils/actions";
import { SearchBar } from "@/components/base-components/searchbar/searchbar";
import DropdownMenu from "@/components/_menu/dropdownmenu";
import BoardMenu from "@/components/_menu/boardmenu";

type Props = {
  boardname?: string;
  boardId?: string;
  contentType?: "board" | "page";
  hasboardMenu?: boolean;
  hasSearchBar?: boolean;
  onSearch?: (query: string) => void;
};

const DashboardHeader = (props: Props) => {
  const router = useRouter();
  const {
    user,
    signOut,
    loading,
    isLoggedIn,
    dispatch,
    isTaskActionDispatched,
  } = useAuth() as AuthType;
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [taskObj, setTaskObj] = useState<Task | any>({
    name: "",
    description: "",
    status: "",
    priority: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    props.onSearch && props.onSearch(query);
  };

  const handleOpenModal = (query: string) => {
    setSearchQuery(query);
  };

  const handleInput = (name: keyof Task, value: string) => {
    setTaskObj((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateTask = async () => {
    const newTask = {
      name: taskObj.name,
      description: taskObj.description,
      status: taskObj.status,
      priority: taskObj.priority,
      boardId: props.boardId,
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

  return (
    <div
      className={`flex flex-row justify-between items-center p-4 dashboard-header
      ${
        theme === "light"
          ? "bg-task-light-white border-b-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark  border-b-[0.6px] border-neutral-500"
      }
    `}>
      <div
        className={`flex flex-row items-center gap-3 golos-font font-medium text-lg
        ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
      `}>
        {props.boardname}

        <div>
          {props.hasboardMenu && (
            <BoardMenu theme={theme} boardid={props.boardId} />
          )}
        </div>
      </div>

      <div className={`flex flex-row gap-4 dashboard-header-div`}>
        <div>
          {props.hasSearchBar && (
            <SearchBar theme={theme} onSearch={handleSearch} />
          )}
        </div>
        {props.contentType === "board" && (
          <button
            className={`add-btn flex flex-row items-center justify-center gap-1 p-2  w-40 center rounded-full golos-font text-sm font-light ${
              theme === "light"
                ? "bg-task-sidebar-light-dark text-task-light-white hover:bg-opacity-100 bg-opacity-75"
                : "bg-task-sidebar-dark text-task-light-white hover:border-neutral-200 border-[1.5px] border-neutral-400"
            }`}
            onClick={() => setOpenModal(true)}>
            <BsPlus className="w-5 h-5" />
            Add New Task
          </button>
        )}

        {props.contentType === "board" && (
          <button
            className={`mobile-add-btn p-3 rounded-full shadow-sm ${
              theme === "light"
                ? "bg-task-sidebar-light-dark text-task-light-white hover:bg-opacity-100 bg-opacity-75"
                : "bg-task-sidebar-dark text-task-light-white hover:border-neutral-200 border-[1.5px] border-neutral-400"
            }`}
            onClick={() => setOpenModal(true)}>
            <BsPlus className="w-6 h-6" />
          </button>
        )}

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

        <div className={`hide-dropdown`}>
          <DropdownMenu theme={theme} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
