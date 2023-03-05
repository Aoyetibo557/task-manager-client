import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { BsInbox } from "react-icons/bs";
import BoardColumn from "@/components/_board/boardcolumn";
import { Task } from "@/lib/utils/task";

type Props = {
  boardtasks: Task[];
  loading: boolean;
};

const BoardTable = ({ boardtasks, loading }: Props) => {
  const { theme } = useContext(ThemeContext);
  const [donetasks, setDonetasks] = useState<Task[]>([]);
  const [doingtasks, setDoingtasks] = useState<Task[]>([]);
  const [todo, setTodo] = useState<Task[]>([]);

  // use effect to filter tasks by status into done, doing, todo
  useEffect(() => {
    const donetasks = boardtasks.filter((task) => task.status === "done");
    const doingtasks = boardtasks.filter((task) => task.status === "doing");
    const todo = boardtasks.filter((task) => task.status === "todo");

    setDonetasks(donetasks);
    setDoingtasks(doingtasks);
    setTodo(todo);
  }, [boardtasks]);

  return boardtasks.length === 0 ? (
    <div className="flex flex-col w-full h-full p-5">
      <div
        className={` flex flex-col h-96 justify-center items-center
        ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
        `}>
        <div>
          <div
            className={`flex flex-col h-96 justify-center items-center font-bold text-3xl opacity-50 golos-font mb-4`}>
            No Tasks For This Board Yet!
            <BsInbox size={100} className={`opacity-50`} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={`flex flex-row gap-10 p-10`}>
      <BoardColumn theme={theme} columntype="todo" tasks={todo} />
      <BoardColumn theme={theme} columntype="doing" tasks={doingtasks} />
      <BoardColumn theme={theme} columntype="done" tasks={donetasks} />
    </div>
  );
};

export default BoardTable;
