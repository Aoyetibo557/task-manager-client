import React, { useContext, useState, useEffect, useMemo } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { IoCloseCircleOutline } from "react-icons/io5";
import { FilterDropdown } from "../_filter/filterdropdown";
import { Button } from "../base-components/button/button";
import { message } from "antd";
import { BsFilter } from "react-icons/bs";

type FilterListProps = {
  boardId: string;
  getFilterValue: (type: string, value: string) => void;
};

export const FilterList = ({ boardId, getFilterValue }: FilterListProps) => {
  const { theme } = useContext(ThemeContext);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [toggleFilter, setToggleFilter] = useState(false);

  const handleRemoveFilter = (index: number) => {
    setSelectedFilters(selectedFilters.filter((_, i) => i !== index));
    getFilterValue("remove", selectedFilters[index]);
  };

  const handleSetFilter = (type: string, value: string) => {
    if (selectedFilters.includes(value)) {
      message.info(`"${value}" is already selected!`);
    } else {
      setSelectedFilters([...selectedFilters, value]);
      getFilterValue(type, value);
    }
  };

  return (
    <>
      <div
        className={`flex flex-row justify-end gap-3 ${
          !toggleFilter ? "hide" : "showfilterlist"
        } `}>
        <div className={`flex flex-row gap-2 selectedfilters`}>
          {selectedFilters?.map((filter, index) => {
            return (
              <Button
                key={index}
                label={
                  <div className={`flex flex-row gap-2 items-center`}>
                    <div className={`text-sm`}>{filter}</div>
                    <IoCloseCircleOutline
                      className="w-5 h-5"
                      onClick={() => handleRemoveFilter(index)}
                    />
                  </div>
                }
                size="xs"
              />
            );
          })}
        </div>
        <div className={`flex flex-row gap-2 filterlist`}>
          <FilterDropdown
            boardId={boardId}
            theme={theme}
            label="Filter"
            onFilter={handleSetFilter}
            options={[
              { label: "Pinned", value: "pinned" },
              { label: "Starred", value: "starred" },
            ]}
          />
          <FilterDropdown
            boardId={boardId}
            theme={theme}
            label="Status"
            onFilter={handleSetFilter}
            options={[
              { label: "TODO", value: "todo" },
              { label: "DOING", value: "doing" },
              { label: "DONE", value: "done" },
            ]}
          />
          <FilterDropdown
            boardId={boardId}
            theme={theme}
            label="Sort"
            onFilter={handleSetFilter}
            options={[
              { label: "Newest", value: "newest" },
              { label: "Oldest", value: "oldest" },
              // { label: "Due Date (earliest)", value: "duedate" },
              // { label: "Due Date (latest)", value: "duedate" },
            ]}
          />
          <FilterDropdown
            boardId={boardId}
            theme={theme}
            label="Priority"
            onFilter={handleSetFilter}
            options={[
              { label: "High", value: "high" },
              { label: "Medium", value: "medium" },
              { label: "Low", value: "low" },
            ]}
          />
        </div>
      </div>
      <div className={`showfilterbtn`}>
        <Button
          label={
            <div className={`flex flex-row gap-2 items-center`}>
              <div className={`text-sm`}>Filter</div>
              <BsFilter className="w-5 h-5" />
            </div>
          }
          size="sm"
          onClick={() => setToggleFilter(!toggleFilter)}
        />
      </div>
    </>
  );
};
