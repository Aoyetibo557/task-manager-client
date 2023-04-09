/**
 * This is a component that renders a filter button, onclick it will show a dropdown menu, with the options to filter the tasks
 * The list of options are passed as props
 *
 */
import React from "react";
import { BsFilter } from "react-icons/bs";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

type FilterButtonProps = {
  label: string;
  theme: string | undefined;
  onFilter?: (filter: string) => void;
  onClick?: () => void;
};
export const FilterButton = ({
  label,
  theme,
  onFilter,
  onClick,
}: FilterButtonProps) => {
  return (
    <button
      className={`flex flex-row items-center justify-center gap-2 w-28 px-2 py-1 rounded-md  ${
        theme === "light"
          ? "bg-task-light-white"
          : "border-[1px] border-neutral-500 "
      }`}
      onClick={onClick}>
      <div
        className={`text-sm font-light golos-font ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }`}>
        {label}
      </div>
      <BsFilter
        className={`text-sm font-light ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }`}
      />
    </button>
  );
};
