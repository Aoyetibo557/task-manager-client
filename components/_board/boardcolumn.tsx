import React from "react";
import { RxDotFilled as Dot } from "react-icons/rx";
import { TaskCard } from "../_task/task";
import { Task } from "@/lib/utils/types";

type BoardColumnProps = {
  columntype: "done" | "doing" | "todo";
  tasks: Task[];
  theme: string;
};

const BoardColumn = ({ columntype, tasks, theme }: BoardColumnProps) => {
  const getDot = () => {
    switch (columntype) {
      case "done":
        return <Dot className="w-10 h-10 text-green-400" />;
      case "doing":
        return <Dot className="w-10 h-10 text-blue-500" />;
      case "todo":
        return <Dot className="w-10 h-10 text-red-600" />;
      default:
        return <Dot className="w-10 h-10 text-gray-500" />;
    }
  };

  return (
    <div>
      <div
        className={`flex flex-row tracking-widest items-center golos-font font-light text-sm ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }
        `}>
        <div>{getDot()}</div>
        {`${columntype.toUpperCase()} (${tasks.length})`}{" "}
      </div>

      <div className="grid grid-rows-3 gap-4">
        {/* update the key to taskid later */}
        {tasks.map((task, idx) => (
          <TaskCard key={idx} task={task} theme={theme} />
        ))}
      </div>
    </div>
  );
};

export default BoardColumn;
