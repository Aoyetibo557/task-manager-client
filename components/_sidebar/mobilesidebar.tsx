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
import { SidebarModal } from "../_sidebar/sidebarmodal";
import { AiOutlineCloseCircle } from "react-icons/ai";
interface BoardLink {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
}

const MobileSidebar = () => {
  const {
    user,
    loading,
    isLoggedIn,
    signOut,
    dispatch,
    isUserActionDispatched,
  } = useAuth() as AuthType;
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
    getBoards();
  }, [isLoggedIn, user, router, isUserActionDispatched]);

  return (
    <div
      className={`w-full mobile_sidebar ${
        theme === "dark" ? "bg-task-sidebar-dark" : "bg-white"
      }`}>
      <div
        className={`rounded-lg m-3 p-2
        ${showMenu && "h-full mobile_sidebar_div"}
        ${theme === "dark" ? "bg-task-sidebar-light-dark" : "bg-task-dark"}`}>
        <div className={`flex flex-row items-center justify-between`}>
          <DropdownMenu theme={theme} isMobile={true} />
          {!showMenu && (
            <HiMenuAlt1
              className={`w-7 h-7 text-white`}
              onClick={() => setShowMenu(!showMenu)}
            />
          )}
        </div>
      </div>
      {showMenu && <SidebarModal open={showMenu} setOpen={setShowMenu} />}
    </div>
  );
};

export default MobileSidebar;
