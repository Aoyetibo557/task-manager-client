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
import Image from "next/image";
import Banner from "@/components/_banner/banner";

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
  const [error, setError] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    props.onSearch && props.onSearch(query);
  };

  const handleOpenModal = (query: string) => {
    setSearchQuery(query);
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
      <div>
        <Banner
          imageName="/banner.jpg"
          subBannerName={`Boards/${props.boardname}`}
          bannerName={props.boardname}
          theme={theme}
        />
      </div>
      {/* <div
        className={`flex flex-row items-center gap-3 golos-font font-medium text-lg
        ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
      `}>
        <Image src={"/static/images/banner.jpg"} width={40} height={40} />
        {props.boardname}

        <div>
          {props.hasboardMenu && (
            <BoardMenu theme={theme} boardid={props.boardId} />
          )}
        </div>
      </div> */}

      <div className={`flex flex-row gap-4 dashboard-header-div`}>
        <div>
          {props.hasSearchBar && (
            <SearchBar theme={theme} onSearch={handleSearch} />
          )}
        </div>

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
      </div>
    </div>
  );
};

export default DashboardHeader;
