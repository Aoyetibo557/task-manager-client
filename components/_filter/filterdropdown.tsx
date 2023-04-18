/**
 * This will render a dropdown menu with the options to filter the tasks
 */

import React from "react";
import { Fragment } from "react";
import { Menu } from "@headlessui/react";
import { DownOutlined } from "@ant-design/icons";
import { FilterButton } from "./filterbutton";

type FilterDropdownProps = {
  boardId?: string;
  options: { label: string; value: string }[];
  label: string;
  theme: string | undefined;
  onFilter?: (type: string, value: string) => void;
  onClick?: () => void;
};

export const FilterDropdown = ({
  options,
  label,
  theme,
  onFilter,
}: FilterDropdownProps) => {
  return (
    <Menu>
      <div className={`flex flex-col gap-2`}>
        <Menu.Button>
          <FilterButton label={label} theme={theme} />
        </Menu.Button>
        <Menu.Items
          className={`absolute z-10 mt-10 rounded-sm border-[1px] ${
            theme === "light"
              ? "bg-task-light-white"
              : "bg-task-sidebar-light-dark"
          } `}>
          {options.map((option) => (
            <Menu.Item key={option.value} as={Fragment}>
              {({ active }) => (
                <button
                  className={`w-full flex flex-row items-center gap-2 px-2 py-1 hover:text-task-light-white rounded-sm ${
                    active ? "bg-blue-500 hover:text-task-light-white" : ""
                  }`}
                  onClick={() => onFilter && onFilter(label, option.value)}>
                  <div
                    className={`text-sm font-light golos-font ${
                      theme === "light" ? "" : "text-task-light-white"
                    }`}>
                    {option.label}
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </div>
    </Menu>
  );
};
