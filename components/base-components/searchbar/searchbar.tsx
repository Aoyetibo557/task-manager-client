import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { BsSearch } from "react-icons/bs";

type Props = {
  theme?: string;
  onSearch: (query: string) => void;
  isMobile?: boolean;
};

export const SearchBar = (props: Props) => {
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
        className={`w-96 p-3 h-full px-2 rounded-md golos-font text-sm font-light border-[1.5px] searchbar-input border-blue-400 focus:border-blue-600 focus:outline-none
        ${
          props.theme === "light"
            ? "text-task-dark "
            : "text-task-light-white bg-task-sidebar-light-dark "
        }
        
      `}
      />
    </div>
  );
};
