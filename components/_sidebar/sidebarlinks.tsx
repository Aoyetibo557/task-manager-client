import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  Dispatch,
} from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import {
  BsPlus,
  BsPin,
  BsTrash,
  BsClipboard,
  BsChevronUp,
  BsChevronDown,
  BsBell,
  BsArchive,
  BsCalendarEvent,
  BsUiChecksGrid,
} from "react-icons/bs";
import { RiArchiveDrawerLine } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";
import { IoExitOutline, IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { BiHome } from "react-icons/bi";
import Image from "next/image";
import CreateBoardModal from "../base-components/createboardModal";
import { getUserBoards, createBoard } from "@/lib/queries/board";
import { SidebarLink } from "../_sidebar/sidebarlink";
import { message } from "antd";
import Link from "next/link";
import { AuthType, Board } from "@/lib/utils/types";
import { ActionTypes } from "@/lib/utils/actions";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  signOut,
  selectUser,
  selectUserIsLoggedIn,
} from "@/redux/features/auth-slice";
import {
  setBoard,
  setUserBoards,
  setBoardLoading,
  setBoardError,
  selectUserBoards,
  selectBoardLoading,
  selectBoardError,
  fetchTasksForAllBoards,
} from "@/redux/features/board-slice";

interface BoardLink {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
}

type Props = {
  open?: boolean;
  setOpen?: Dispatch<React.SetStateAction<boolean>> | any;
  isMobileView?: boolean;
};

export const SidebarLinks = ({
  open = false,
  setOpen = null,
  isMobileView = false,
}: Props) => {
  // make sure when creating and working on the board slice, theres a loading state, before it shows either text or the boards it has to load
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectUserIsLoggedIn);
  const userBoards = useSelector(selectUserBoards);
  const boardLoading = useSelector(selectBoardLoading);
  const boardError = useSelector(selectBoardError);
  const dispatch = useDispatch<AppDispatch>();

  const { isBoardActionDispatched, isTaskActionDispatched } =
    useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [openModal, setOpenModal] = useState(false);
  const [input, setInput] = useState("");
  const [showBoards, setShowBoards] = useState(true);

  const [activeBoard, setActiveBoard] = useState<BoardLink>({
    title: "",
    url: "",
    isActive: false,
  });

  const handleClick = () => {
    if (setOpen) setOpen(!open);
  };

  const [boardCount, setBoardCount] = useState(0);

  const router = useRouter();
  const path = router.pathname.toLowerCase();

  const handleInput = (e: any) => {
    setInput(e);
  };

  const handleSignOut = () => {
    dispatch(signOut());
    router.push("/loginform");
  };

  const handleCreateBoard = async () => {
    const newBoard = {
      name: input,
      description: "This is a new board",
      userid: user?.userid,
    } as Board;

    const data = await createBoard(newBoard);
    if (data.status === "success") {
      getBoards();
      message.success(data.message);
      setOpenModal(false);
    } else {
      if (data.status === "error") {
        message.error(data.message);
        dispatch(setBoardError(data.message));
      }
    }
  };

  const getBoards = async () => {
    dispatch(setBoardLoading(true));
    try {
      const data = await getUserBoards(user.userid);
      if (data.status === "success") {
        dispatch(setUserBoards(data.boards));
        setBoardCount(data.boards?.length);
      } else {
        if (data.status === "error") dispatch(setBoardError(data.message));
      }
    } catch (error: any) {
      dispatch(setBoardError(error.message));
    } finally {
      dispatch(setBoardLoading(false));
    }
  };

  // use the getUserBoards hook to get the boards from the database
  useEffect(() => {
    const subscribe = getBoards();
    return () => {
      subscribe;
    };
  }, [isLoggedIn]);

  return (
    <div className={`flex flex-col`}>
      <div className={`flex flex-col ${isMobileView ? "gap-0" : "gap-2"}`}>
        <SidebarLink
          title="Overview"
          url="/dashboard"
          isActive={path === "/dashboard" ? true : false}
          icon={BsUiChecksGrid}
          onClick={handleClick}
        />

        <SidebarLink
          title="Pinned Tasks"
          url="/pinned"
          isActive={path === "/pinned" ? true : false}
          icon={BsPin}
          onClick={handleClick}
        />

        <SidebarLink
          title="Messages"
          url="/messages"
          isActive={path === "/messages" ? true : false}
          icon={FiMessageSquare}
          onClick={handleClick}
        />

        <SidebarLink
          title="Calendar"
          url="/calendar"
          isActive={path === "/calendar" ? true : false}
          icon={BsCalendarEvent}
          onClick={handleClick}
        />

        <SidebarLink
          title="Archived Tasks"
          url="/dashboard/archived"
          isActive={path === "/dashboard/archived" ? true : false}
          icon={BsArchive}
          onClick={handleClick}
        />

        <SidebarLink
          title="Trash"
          url="/trash"
          isActive={path === "/trash" ? true : false}
          icon={BsTrash}
          onClick={handleClick}
        />

        <SidebarLink
          title="Help Center"
          url="/help"
          isActive={path === "/help" ? true : false}
          icon={IoIosHelpCircleOutline}
        />

        <SidebarLink
          title="Settings"
          url={`/setting/${user?.userid}`}
          isActive={path === `/setting/${user?.userid}` ? true : false}
          icon={IoSettingsOutline}
          onClick={handleClick}
        />

        <SidebarLink
          title="Logout"
          url="/loginform"
          isActive={path === "/loginform" ? true : false}
          icon={IoExitOutline}
          onClick={handleSignOut}
        />

        <button
          type="button"
          className={`flex flex-row items-center justify-between pt-2 ${
            theme === "light" ? "text-task-dark " : "text-task-light-white"
          }`}
          onClick={() => setShowBoards(!showBoards)}>
          <span className="ml-2 font-light text-[13px] golos-font">Boards</span>
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
                  You have no boards yet {boardError}
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
                  icon={RxDashboard}
                  onClick={handleClick}
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
      </div>

      <>
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
      </>
    </div>
  );
};
