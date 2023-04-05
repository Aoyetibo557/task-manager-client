import React, { useContext, useState, useEffect, useMemo } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { BsInbox } from "react-icons/bs";
import BoardColumn from "@/components/_board/boardcolumn";
import { Task } from "@/lib/utils/types";
import { Spin } from "antd";

type Props = {
  boardtasks: Task[];
  loading: boolean;
  searchQuery: string;
};

const BoardTable = ({ boardtasks, loading, searchQuery }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [donetasks, setDonetasks] = useState<Task[]>([]);
  const [doingtasks, setDoingtasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<Task[]>([]);

  // use effect to filter tasks by status into done, doing, todo
  useEffect(() => {
    let filteredTasks = boardtasks;

    if (searchQuery) {
      filteredTasks = boardtasks.filter((task) =>
        task?.name?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }

    const donetasks = filteredTasks.filter((task) => task.status === "done");
    const doingtasks = filteredTasks.filter((task) => task.status === "doing");
    const todo = filteredTasks.filter((task) => task.status === "todo");

    setDonetasks(donetasks);
    setDoingtasks(doingtasks);
    setTodo(todo);
  }, [boardtasks, searchQuery]);

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
    <div className={`flex flex-row gap-20 p-10 mobile-board-table`}>
      <BoardColumn theme={theme} columntype="todo" tasks={todo} />
      <BoardColumn theme={theme} columntype="doing" tasks={doingtasks} />
      <BoardColumn theme={theme} columntype="done" tasks={donetasks} />
    </div>
  );
};

export default BoardTable;
