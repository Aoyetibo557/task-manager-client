import React, { useState, useEffect, useContext } from "react";
import { getDeletedTasks } from "@/lib/queries/task";
import { AuthType, Task } from "@/lib/utils/types";
import { useAuth } from "@/lib/hooks/useAuth";
import { message } from "antd";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { TaskCard } from "../_task/task";
const TrashGrid = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const { user, dispatch } = useAuth() as AuthType;
  const { theme } = useContext(ThemeContext);

  const handleGetDeletedTasks = async () => {
    const res = (await getDeletedTasks(user?.userid)) as any;

    if (res.status === "success") {
      setTasks(res.tasks);
    } else {
      if (res.status === "error") {
        // message.error(res.message);
        setError(res.message);
      }
    }
  };

  useEffect(() => {
    handleGetDeletedTasks();
  }, [user, dispatch]);

  return (
    <div className={`flex flex-row flex-wrap gap-5`}>
      {tasks.map((task, idx) => (
        <TaskCard task={task} theme={theme} />
      ))}
    </div>
  );
};

export default TrashGrid;
