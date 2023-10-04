import React, { useState, useEffect, useMemo, useContext } from "react";
import { Task, AuthType } from "@/lib/utils/types";
import { getUserArchivedTasks } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { message, Spin } from "antd";
import ArchiveGrid from "./archivegrid";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useRouter } from "next/router";

const ArchivedTasks = () => {
  const [archivedTasks, setArchivedTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isLoggedIn, dispatch, isTaskActionDispatched } =
    useAuth() as AuthType;
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const handleAllArchivedTasks = async () => {
    setLoading(true);
    try {
      const data = (await getUserArchivedTasks(user?.userid)) as any;

      if (data.status === "success") {
        setArchivedTasks(data.tasks);
      } else {
        if (data.status === "error") {
          message.error(data.message);
        }
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleAllArchivedTasks();
    }
  }, [user, isTaskActionDispatched]);

  return archivedTasks.length > 0 && !loading ? (
    <div>
      <ArchiveGrid tasks={archivedTasks} theme={theme} />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-96">
      <div className="text-2xl font-normal golos-font text-neutral-400">
        {loading ? <Spin size="large" /> : "No archived tasks"}
      </div>
    </div>
  );
};

export default ArchivedTasks;
