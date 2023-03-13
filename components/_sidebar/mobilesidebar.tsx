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
import { message, Avatar } from "antd";
import { Toggle } from "../base-components/toggle/toggle";
import { IoExitOutline } from "react-icons/io5";
import Link from "next/link";
import { AuthType, Board } from "@/lib/utils/types";
import { HiMenuAlt1 } from "react-icons/hi";
import DropdownMenu from "../_menu/dropdownmenu";

interface BoardLink {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
}

const MobileSidebar = () => {
  const { user, loading, isLoggedIn, signOut } = useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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

  const handleClick = (e: any) => {
    setShowMenu(false);
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
      } else if (user.userid.length > 0) {
        getBoards();
      }
    }

    getBoards();
  }, [isLoggedIn, user, router]);

  return (
    <div
      className={`w-full fixed mobile_sidebar ${
        theme === "dark" ? "bg-task-sidebar-dark" : "bg-white"
      }`}>
      <div
        className={`rounded-lg m-3 p-2
        ${showMenu && "h-full mobile_sidebar_div"}
        ${theme === "dark" ? "bg-task-sidebar-light-dark" : "bg-task-dark"}`}>
        <div className={`flex flex-row items-center justify-between`}>
          <HiMenuAlt1
            className={`w-7 h-7 text-white`}
            onClick={() => setShowMenu(!showMenu)}
          />

          {/* <Avatar src={user?.profileImage} size={40} /> */}
          <DropdownMenu theme={theme} isMobile={true} />
        </div>

        {showMenu && (
          <div className={`mt-10`}>
            <div
              className={`font-light text-sm golos-font tracking-widest text-task-light-white `}>
              ALL BOARDS ({boardCount || 0})
            </div>

            <div>
              {/* if there are no boards */}
              {(boardCount === 0 || userBoards?.length === 0) && (
                <div
                  className={`
              font-light text-sm golos-font
              ${theme === "dark" ? "text-task-dark" : "text-task-light-white"}
              `}>
                  You have no boards yet {error}
                </div>
              )}
              <SidebarLink
                title="Dashboard"
                url="/dashboard"
                isActive={path === "/dashboard" ? true : false}
                isMobileLink={true}
                icon={<RxDashboard className="w-5 h-5" />}
                onClick={() => setShowMenu(false)}
              />

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
                  isMobileLink={true}
                  icon={<RxDashboard className="w-5 h-5" />}
                  onClick={() => setShowMenu(false)}
                />
              ))}

              <div>
                <button
                  id="create-board"
                  className={`font-light text-sm golos-font flex flex-row items-center gap-2 p-2 text-task-light-white
              ${
                theme === "dark"
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
            {/* <div>
              <div>
                <div
                  className={`font-light text-sm golos-font tracking-widest ${
                    theme === "dark"
                      ? "text-task-dark"
                      : "text-task-light-white"
                  }`}>
                  ARCHIVED
                </div>
              </div>
            </div> */}

            <div className="mt-10">
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
        )}
      </div>
    </div>
  );
};

export default MobileSidebar;
