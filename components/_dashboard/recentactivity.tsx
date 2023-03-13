import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { getRecentTasks, getPinnedTasks } from "@/lib/queries/task";
import { Task, AuthType } from "@/lib/utils/types";
import { TaskCard } from "@/components/_task/task";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "antd";

type Props = {
  theme?: string;
};

export const RecentActivity = ({ theme }: Props) => {
  const { user, isLoggedIn, dispatch, isTaskActionDispatched, isTaskPinned } =
    useAuth() as AuthType;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pinnedTasks, setPinnedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRecentTasks = async () => {
    setLoading(true);
    const recentTasks = await getRecentTasks(user?.userid as string);
    if (recentTasks.status === "success") {
      setLoading(false);
      setTasks(recentTasks.tasks);
    } else {
      if (recentTasks.status === "error") {
        setError(recentTasks.message);
      }
      setLoading(false);
    }
  };

  const handlePinnedTasks = async () => {
    setLoading(true);
    const pinned = await getPinnedTasks(user?.userid as string);
    if (pinned.status === "success") {
      setLoading(false);
      setPinnedTasks(pinned.tasks);
    } else {
      if (pinned.status === "error") {
        setError(pinned.message);
      }
      setLoading(false);
    }
  };

  const tooltiPropmpt = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm font-normal golos-font">
          Recent activity shows the tasks you have recently created.
        </div>
      </div>
    );
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribeOne = handleRecentTasks();
    const unsubscribeTwo = handlePinnedTasks();
    if (isTaskPinned) {
      handleRecentTasks();
      handlePinnedTasks();
    }

    return () => {
      unsubscribeOne;
      unsubscribeTwo;

      // dispatch({
      //   type: "TASK_PINACTION",
      //   payload: false,
      // });
    };
  }, [isTaskActionDispatched, isTaskPinned]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <div
          className={`flex flex-row items-center gap-2 text-lg font-medium golos-font ${
            theme === "light" ? "text-neutral-700" : "text-neutral-400"
          }`}>
          Recent Activity ({tasks.length})
          <Tooltip title={tooltiPropmpt()}>
            <BsInfoCircle className="w-4 h-4" />
          </Tooltip>
        </div>

        <div className="flex flex-row flex-wrap gap-4">
          {tasks
            .map((task, idx) => (
              <TaskCard key={idx} task={task} theme={theme} />
            ))
            .reverse()}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div
          className={`text-lg font-medium golos-font ${
            theme === "light" ? "text-neutral-700" : "text-neutral-400"
          }`}>
          Pinned Tasks
        </div>

        <div className="flex flex-row gap-4 pinned-tasks-container">
          {pinnedTasks.map((task, idx) => (
            <TaskCard key={idx} task={task} theme={theme} />
          ))}

          {pinnedTasks.length === 0 && (
            <div
              className={`text-sm font-normal golos-font ${
                theme === "light" ? "text-neutral-800" : "text-neutral-300"
              }`}>
              No pinned tasks yet. Pin a task by clicking on the pin icon on the
              task card.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
