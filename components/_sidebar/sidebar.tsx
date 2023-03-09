import React, { useState, useRef, useEffect, useContext } from "react";
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
import { Toggle } from "../base-components/toggle/toggle";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";
import { AuthType, Board } from "@/lib/utils/types";

interface BoardLink {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
}

const Sidebar = () => {
  const { user, loading, isLoggedIn, signOut } = useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);

  const [userBoards, setUserBoards] = useState<BoardLink[]>([]);
  const [activeBoard, setActiveBoard] = useState<BoardLink>({
    title: "",
    url: "",
    isActive: false,
  });

  const [boardCount, setBoardCount] = useState(0);

  const router = useRouter();
  const path = router.pathname.toLowerCase();

  const handleInput = (e: any) => {
    setInput(e);
  };

  const handleClick = () => {
    console.log("clicked", input);
  };

  const handleCreateBoard = async () => {
    const newBoard = {
      name: input,
      description: "This is a new board",
      userid: user?.userid,
    } as Board;

    const data = await createBoard(newBoard);
    console.log("Data:", data);
    if (data.status === "success") {
      getBoards();
      message.success(data.message);
      setOpenModal(false);
    } else {
      if (data.status === "error") {
        message.error(data.message);
        setError(data.message as string);
      }
    }
  };

  const getBoards = async () => {
    const data = await getUserBoards(user?.userid);
    if (data.status === "success") {
      setUserBoards(data.boards);
      setBoardCount(data.boards?.length);
    } else {
      if (data.status === "error") setError(data.message);
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
    toggleTheme();
  };

  // use the getUserBoards hook to get the boards from the database
  useEffect(() => {
    if (!loading) {
      if (!user || isLoggedIn === false) {
        router.push("/loginform");
        setError("You are not logged in");
      } else {
        getBoards();
      }
    }
  }, [isLoggedIn, loading, user, router]);

  return (
    <div
      className={` h-screen w-80 p-4 flex flex-col justify-between
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
          <Link href="/dashboard">Tassker</Link>
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
            {userBoards?.map((board: any, idx: any) => (
              <SidebarLink
                key={idx}
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
                id="create-board"
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
                setInputVal={(e: any) => handleInput(e)}
                onClick={handleCreateBoard}
              />
            )}
          </div>

          <div>
            <div
              className={`font-light text-sm golos-font tracking-widest ${
                theme === "light" ? "text-task-dark" : "text-task-light-white"
              }`}>
              ARCHIVED
            </div>

            <div>
              {/* this will have all tasks, tasks by board and others */}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Toggle
          checked={toggle}
          theme={theme}
          onChange={handleToggle}
          iconOff={<BsCloudMoon />}
          iconOn={<BsSun />}
          label="Task Mode"
        />
      </div>
    </div>
  );
};

export default Sidebar;
