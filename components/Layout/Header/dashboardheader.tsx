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
  breadcrumblist?: string[] | { href: string; title: string }[];
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
  const [openModal, setOpenModal] = useState(false);

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
          breadcrumblist={props.breadcrumblist}
          bannerName={props.boardname as any}
          theme={theme}
        />
      </div>

      <div className={`flex flex-row gap-4`}>
        <div>
          {props.hasSearchBar && (
            <SearchBar theme={theme} onSearch={handleSearch} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
