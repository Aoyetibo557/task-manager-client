import { BsThreeDotsVertical, BsPlus } from "react-icons/bs";
import { Button } from "../../base-components/button/button";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../_contexts/themecontext";
import AddTaskModal from "../../base-components/addtaskModal";
import { createTask } from "@/lib/queries/task";
import { Task } from "@/lib/utils/types";
import type { MenuProps } from "antd";
import { Dropdown, message } from "antd";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { ActionTypes } from "@/lib/utils/actions";
import { SearchBar } from "@/components/base-components/searchbar/searchbar";

type Props = {
  boardname: string;
  boardId?: string;
  contentType?: "board" | "page";
  onSearch?: (query: string) => void;
};

const DashboardHeader = (props: Props) => {
  const router = useRouter();
  const { user, loading, isLoggedIn, dispatch, isTaskActionDispatched } =
    useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { theme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");
  const [taskObj, setTaskObj] = useState<Task>({
    name: "",
    description: "",
    status: "",
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    props.onSearch && props.onSearch(query);
  };

  const handleOpenModal = (query: string) => {
    setSearchQuery(query);
  };

  const handleInput = (name: keyof Task, value: string) => {
    setTaskObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          href={`/profile/${user?.userid}`}
          type="submit"
          onClick={() => {}}>
          {`${user?.firstName} ${user?.lastName}`}
          <div>
            <span className="text-xs text-gray-400">{user?.email}</span>
          </div>
        </Link>
      ),
      icon: <HiOutlineUserCircle className="mr-2 w-5 h-5" />,
    },
    {
      key: "2",
      type: "divider",
    },
    {
      key: "3",
      label: (
        <Link
          className="flex-flex-row items-center"
          href={`/setting/${user?.userid}`}
          type="submit"
          onClick={() => {}}>
          Account Settings
        </Link>
      ),
      icon: <IoSettingsOutline className="mr-2 w-5 h-5" />,
    },
    {
      key: "4",
      label: (
        <Link href="/hlep" type="submit" onClick={() => {}}>
          Help & Feedback
        </Link>
      ),
      icon: <IoMdHelpCircleOutline className="mr-2 w-5 h-5" />,
    },
    {
      key: "5",
      type: "divider",
    },
    {
      key: "6",
      label: <button type="submit">Log out</button>,
      icon: <MdLogout className="mr-2 w-5 h-5" />,
    },
  ];

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
    } catch (error) {
      message.error(`Something went wrong, ${error.message}`);
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
        <div>
          <SearchBar theme={theme} onSearch={handleSearch} />
        </div>
        {props.contentType === "board" && (
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

        <div>
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement="bottomRight">
            <button
              type="submit"
              className={`${
                theme === "light" ? "text-task-dark" : "text-task-light-white"
              }`}>
              <BsThreeDotsVertical className="cursor-pointer w-6 h-6" />
            </button>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
