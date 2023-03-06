import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

type Props = {
  theme?: string;
  onSearch: (query: string) => void;
};

export const SearchBar = (props: Props) => {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = event.currentTarget.value;
    props.onSearch(query);
  };
  return (
    <div>
      <input
        type="text"
        // value={search}
        onChange={handleSearch}
        placement="bottomRight"
        placeholder="e.g update the profie page avatar..."
        className={`w-96 p-3 h-full px-2 rounded-lg golos-font text-sm font-light border-[0.8px] 
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
