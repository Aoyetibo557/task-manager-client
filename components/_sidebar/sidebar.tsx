import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import {
  BsSun,
  BsCloudMoon,
  BsPlus,
  BsPin,
  BsTrash,
  BsClipboard,
  BsChevronUp,
  BsChevronDown,
  BsBell,
} from "react-icons/bs";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { FiClipboard } from "react-icons/fi";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { BiHome } from "react-icons/bi";

import Image from "next/image";
import CreateBoardModal from "../base-components/createboardModal";
import { getUserBoards, createBoard } from "@/lib/queries/board";
import { SidebarLink } from "../_sidebar/sidebarlink";
import { message } from "antd";
import { Toggle } from "../base-components/toggle/toggle";
import Link from "next/link";
import { AuthType, Board } from "@/lib/utils/types";
import { ActionTypes } from "@/lib/utils/actions";
import { ProfileCard } from "../base-components/profilecard/profilecard";

interface BoardLink {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
}

const Sidebar = () => {
  const {
    user,
    dispatch,
    loading,
    isLoggedIn,
    signOut,
    isBoardActionDispatched,
    isTaskActionDispatched,
  } = useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showBoards, setShowBoards] = useState(false);

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
      dispatch({
        type: ActionTypes.BOARD_ACTION,
        payload: true,
      });
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
    const data = await getUserBoards(user.userid);
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
      } else if (user.userid?.length > 0) {
        getBoards();
      }
    }
    getBoards();

    if (isBoardActionDispatched) {
      getBoards();
    }
  }, [isLoggedIn, user, router, isTaskActionDispatched]);

  return (
    <div
      className={` h-screen w-80 p-3 flex flex-col sidebar ${
        theme === "light"
          ? "bg-task-light-white border-r-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark border-r-[0.6px] border-neutral-500"
      }`}>
      <div className="h-24">
        <div
          className={`flex flex-row items-center justify-center gap-3 font-bold text-2xl golos-font
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"} `}>
          <Link href="/dashboard">
            <Image
              src="/static/images/logo.png"
              width={30}
              height={30}
              alt="Tassker Logo"
            />
          </Link>
        </div>

        {/* short line like a divider */}
        <div className={` mt-6 ml-14 w-28 h-[0.5px] bg-blue-500`}></div>
      </div>
      <div className="flex flex-col h-screen justify-between ">
        <div className={`flex flex-col gap-2`}>
          <SidebarLink
            title="Overview"
            url="/dashboard"
            isActive={path === "/dashboard" ? true : false}
            icon={<BiHome className="w-5 h-5" />}
          />

          <SidebarLink
            title="Pinned Tasks"
            url="/pinned"
            isActive={path === "/pinned" ? true : false}
            icon={<BsPin className="w-5 h-5" />}
          />
          <SidebarLink
            title="Archived Tasks"
            url="/dashboard/archived"
            isActive={path === "/dashboard/archived" ? true : false}
            icon={<RiArchiveDrawerLine className="w-5 h-5" />}
          />

          <button
            type="button"
            className={`flex flex-row items-center pl-3 pt-2 space-x-2 ${
              theme === "light" ? "text-task-dark " : "text-task-light-white"
            }`}
            onClick={() => setShowBoards(!showBoards)}>
            <FiClipboard className="w-5 h-5" />
            <span className="ml-2 font-light text-[13px] golos-font">
              Boards ({boardCount || 0})
            </span>
            <span>
              {showBoards ? (
                <BsChevronUp className="w-4 h-4" />
              ) : (
                <BsChevronDown className="w-4 h-4" />
              )}
            </span>
          </button>
          <div className={`ml-3 ${showBoards ? "block" : "hidden"} `}>
            {showBoards && (
              <div>
                {(boardCount === 0 || userBoards?.length === 0) && (
                  <div
                    className={` font-light text-sm golos-font ${
                      theme === "light"
                        ? "text-task-dark"
                        : "text-task-light-white"
                    }`}>
                    You have no boards yet {error}
                  </div>
                )}

                {userBoards?.map((board: any, idx: any) => (
                  <SidebarLink
                    key={idx}
                    title={
                      <div className="flex w-48 flex-row justify-between">
                        <span>
                          {board.name.length > 18
                            ? board.name.slice(0, 20) + "..."
                            : board.name}
                        </span>

                        <span
                          title={"Total Number of Tasks created on this board"}
                          className={`text-xs font-medium p-[4px] rounded-sm bg-blue-500 text-task-white`}>
                          {board.taskCount}
                        </span>
                      </div>
                    }
                    url={`/dashboard/${board.id}/?name=${board.name}`}
                    isActive={
                      path ===
                      `/dashboard/${board.id}/?name=${board.name.replace(
                        /\+/g,
                        " "
                      )}`
                        ? true
                        : false
                    }
                    icon={<RxDashboard className="w-5 h-5" />}
                  />
                ))}
                <div>
                  <button
                    id="create-board"
                    className={`font-light text-[13px] golos-font w-full flex flex-row items-center gap-1 p-2 rounded-lg ${
                      theme === "light"
                        ? "text-task-dark hover:bg-blue-500 hover:text-task-light-white"
                        : "text-task-light-white hover:bg-blue-500"
                    }`}
                    onClick={() => setOpenModal(true)}>
                    <BsPlus className={`w-5 h-5 `} />
                    Create New Board
                  </button>
                </div>
              </div>
            )}
          </div>

          <SidebarLink
            title="Trash"
            url="/dashboard/trash"
            isActive={path === "/dashboard/trash" ? true : false}
            icon={<BsTrash className="w-5 h-5" />}
          />
        </div>

        <div className="flex flex-col gap-4">
          <div>
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
        </div>

        <div className={`flex flex-col gap-2`}>
          <SidebarLink
            title="Help Center"
            url="/help"
            isActive={path === "/help" ? true : false}
            icon={<IoIosHelpCircleOutline className="w-5 h-5" />}
          />

          <SidebarLink
            title="Notifications"
            url="/notifications"
            isActive={path === "/notifications" ? true : false}
            icon={<BsBell className="w-5 h-5" />}
          />

          <SidebarLink
            title="Settings"
            url={`/setting/${user?.userid}`}
            isActive={path === `/setting/${user?.userid}` ? true : false}
            icon={<IoSettingsOutline className="w-5 h-5" />}
          />

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

          <ProfileCard
            name={`${user?.firstName} ${user?.lastName}`}
            username={user?.username}
            image={user.profileImage}
            imagesize="md"
            theme={theme}
            isAdmin={user?.isAdmin}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
