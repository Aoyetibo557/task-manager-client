import React, { useContext, useState, useEffect, useMemo } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { BsInbox } from "react-icons/bs";
import BoardColumn from "@/components/_board/boardcolumn";
import { Task } from "@/lib/utils/types";
import { Spin, message } from "antd";
import { FilterList } from "@/components/_filter/filterlist";
import dayjs from "dayjs";

type Props = {
  boardId: string;
  boardtasks: Task[];
  loading: boolean;
  searchQuery: string;
};

type Filter = {
  type: string;
  value: string;
};

const BoardTable = ({ boardtasks, loading, searchQuery, boardId }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [donetasks, setDonetasks] = useState<Task[]>([]);
  const [doingtasks, setDoingtasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<Task[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [filter, setFilter] = useState({ type: "all", value: "all" });

  const getFilterValue = (type: string, value: string) => {
    setFilter({ type, value });
    if (!filterList.includes(value)) {
      setFilterList([...filterList, value]);
    }
    if (type === "remove") {
      removeFilter(value);
    }
  };

  const removeFilter = (value: string) => {
    const newFilterList = filterList.filter((filter) => filter !== value);
    setFilterList(newFilterList);
  };

  const handleRemoveFilter = (index: number) => {
    setFilterList(filterList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    let filteredTasks = boardtasks;

    // Apply searchQuery filter
    if (searchQuery || filterList.length === 0) {
      filteredTasks = boardtasks.filter((task) =>
        task?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }

    // Apply filterList filters
    if (filterList.length > 0) {
      filteredTasks = boardtasks.filter((task) =>
        filterList.every((filterList) => {
          // Filter tasks based on filter type
          switch (filter.type) {
            case "Status" || "status":
              return task?.status
                ?.toLowerCase()
                .includes(filter?.value.toLowerCase());
            case "Priority" || "priority":
              return (
                task?.priority?.toLowerCase() === filter?.value.toLowerCase()
              );
            case "Filter" || "filter":
              if (filter.value === "pinned") {
                return task?.pinned === true;
              }
              if (filter.value === "starred") {
                return task?.isStarred === true;
              }
            case "Sort" || "sort":
              const now = dayjs();
              const dayBefore = now.subtract(1, "day");
              if (filter.value === "newest") {
                return (
                  task?.timestamp &&
                  dayjs.unix(task?.timestamp as any).isAfter(dayBefore)
                );
              }
              if (filter.value === "oldest") {
                return (
                  task?.timestamp &&
                  dayjs.unix(task?.timestamp as any).isBefore(dayBefore)
                );
              }

            default:
              return true;
          }
        })
      );
    }

    const donetasks = filteredTasks.filter((task) => task.status === "done");
    const doingtasks = filteredTasks.filter((task) => task.status === "doing");
    const todo = filteredTasks.filter((task) => task.status === "todo");

    if (filteredTasks.length > 0) {
      setDonetasks(donetasks);
      setDoingtasks(doingtasks);
      setTodo(todo);
    } else {
      setDonetasks([]);
      setDoingtasks([]);
      setTodo([]);
    }
  }, [boardtasks, searchQuery, filterList]);

  //

  return boardtasks.length === 0 ? (
    <div className="flex flex-col w-full h-full p-5 ">
      <div
        className={` flex flex-col h-96 justify-center items-center
        ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
        `}>
        <div>
          {loading ? (
            <Spin size="large" />
          ) : (
            <div
              className={`flex flex-col h-96 justify-center items-center font-medium text-xl golos-font mb-4`}>
              No Tasks For This Board Yet!
              <BsInbox size={50} className={`opacity-50`} />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className={`p-4`}>
      <div className=" flex flex-row justify-end gap-3">
        <FilterList boardId={boardId} getFilterValue={getFilterValue} />
      </div>
      <div className={`flex flex-row gap-5 p-10 mobile-board-table`}>
        <BoardColumn
          boardId={boardId}
          theme={theme}
          columntype="todo"
          tasks={todo}
        />
        <BoardColumn
          boardId={boardId}
          theme={theme}
          columntype="doing"
          tasks={doingtasks}
        />
        <BoardColumn
          boardId={boardId}
          theme={theme}
          columntype="done"
          tasks={donetasks}
        />
      </div>
    </div>
  );
};

export default BoardTable;
