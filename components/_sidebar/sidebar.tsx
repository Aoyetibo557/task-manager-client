import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import { BsSun, BsCloudMoon, BsPlus } from "react-icons/bs";
import Image from "next/image";
import CreateBoardModal from "../base-components/createboardModal";
import { RxDashboard } from "react-icons/rx";
import { getUserBoards, createBoard } from "@/lib/queries/board";
import { SidebarLink } from "../_sidebar/sidebarlink";
import { message } from "antd";

interface BoardLink {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
}

type Board = {
  name: string;
  description?: string;
  userid: string;
  boardId?: string;
};

const Sidebar = () => {
  const { user, loading, isLoggedIn } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const [userBoards, setUserBoards] = useState<BoardLink[]>([]);
  const [activeBoard, setActiveBoard] = useState<BoardLink>({
    title: "",
    url: "",
    isActive: false,
  });

  const [boardCount, setBoardCount] = useState(0);

  const router = useRouter();
  const path = router.pathname.toLowerCase();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e);
  };

  const handleClick = () => {
    console.log("clicked", input);
  };

  const handleCreateBoard = async () => {
    const newBoard = {
      name: input,
      description: "This is a new board",
      userid: user.userid,
    };

    const data = await createBoard(newBoard);
    console.log("Data:", data);
    if (data.status === "success") {
      getBoards();
      message.success(data.message);
      setOpenModal(false);
    } else {
      if (data.status === "error") {
        message.error(data.message);
        setError(data.message);
      }
    }
  };

  const getBoards = async () => {
    const data = await getUserBoards(user.userid);
    if (data.status === "success") {
      setUserBoards(data.boards);
      setBoardCount(data.boards?.length);
    } else {
      if (data.status === "error") setError(data.message);
    }
  };

  // use the getUserBoards hook to get the boards from the database
  useEffect(() => {
    if (!loading) {
      if (!user || isLoggedIn === false) setError("You are not logged in");
      else {
        getBoards();
      }
    }
  }, [isLoggedIn, loading, user]);

  return (
    <div
      className={`h-screen w-1/5 p-4 flex flex-col justify-between
      ${
        theme === "light"
          ? "bg-task-light-white border-r-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark border-r-[0.6px] border-neutral-500"
      }
    `}>
      <div className="flex flex-col gap-10">
        <div
          className={`flex flex-row items-center gap-3 font-bold text-2xl golos-font
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
        `}>
          <Image
            src="/static/images/logo.png"
            width={30}
            height={30}
            alt="Tassker Logo"
          />
          Tassker
        </div>

        <div className="flex flex-col gap-4">
          <div
            className={`font-light text-sm golos-font tracking-widest
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
        `}>
            ALL BOARDS ({boardCount || 0})
          </div>

          <div>
            {/* if there are no boards */}
            {(boardCount === 0 || userBoards?.length === 0) && (
              <div
                className={`
              font-light text-sm golos-font
              ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
              `}>
                You have no boards yet {error}
              </div>
            )}
            {userBoards?.map((board) => (
              <SidebarLink
                key={board.id}
                title={board.name}
                url={`/dashboard/${board.id}/?name=${board.name}`}
                isActive={
                  path === `/dashboard/${board.id}/?name=${board.name}`
                    ? true
                    : false
                }
                icon={<RxDashboard className="w-5 h-5" />}
              />
            ))}

            <div>
              <button
                className={`font-light text-sm golos-font flex flex-row items-center gap-2 p-2
              ${
                theme === "light"
                  ? "text-task-dark hover:text-task-blue hover:bg-task-sidebar-light-dark hover:bg-opacity-10"
                  : "text-task-light-white hover:text-blue-400 hover:bg-task-sidebar-light-dark hover:bg-opacity-10"
              }
              `}
                onClick={() => setOpenModal(true)}>
                <RxDashboard className="w-5 h-5" />
                <BsPlus className={`w-5 h-5 `} />
                Create New Board
              </button>
            </div>

            {openModal && (
              <CreateBoardModal
                title="Create New Board"
                open={openModal}
                setOpen={setOpenModal}
                theme={theme}
                btnLabel="Create Board"
                inputVal={input}
                setInputVal={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInput(e)
                }
                onClick={handleCreateBoard}
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {theme === "light" ? (
          <div
            className={`p-3 rounded-lg w-12
            ${theme === "light" ? "bg-task-sidebar-dark" : "bg-neutral-600"}
          `}>
            <BsSun
              className={`cursor-pointer w-6 h-6
            ${
              theme === "light"
                ? "text-white "
                : "text-task-light-white bg-neutral-600 "
            }
            `}
              onClick={toggleTheme}
            />
          </div>
        ) : (
          <div
            className={`p-3 rounded-lg w-12
            ${theme === "light" ? "bg-task-light" : "bg-neutral-600"}
          `}>
            <BsCloudMoon
              className={`cursor-pointer w-6 h-6
            ${
              theme === "light"
                ? "text-task-dark bg-neutral-200"
                : "text-task-light-white bg-neutral-600 "
            }
            `}
              onClick={toggleTheme}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
