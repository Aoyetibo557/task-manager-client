import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { BsSearch } from "react-icons/bs";

type Props = {
  theme?: string;
  onSearch: (query: string) => void;
  isMobile?: boolean;
};

export const SearchBar = (props: Props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [hide, setHide] = useState(false);

  const handleClick = () => {
    // setShowSearch(!showSearch);
    setHide(!hide);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    const query = event.currentTarget.value;
    props.onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleSearch}
        placeholder="e.g update the profie page avatar..."
        className={`w-96 p-3 h-full px-2 rounded-lg golos-font text-sm font-light border-[0.8px] searchbar-input ${
          showSearch === true ? "show-search" : "hide-search"
        }
        ${
          props.theme === "light"
            ? "text-task-dark border-task-light-dark focus:outline focus:outline-neutral-500"
            : "text-task-light-white bg-task-sidebar-light-dark border-task-light-white focus:outline focus:outline-neutral-100"
        }
        
      `}
      />
    </div>
  );
};
