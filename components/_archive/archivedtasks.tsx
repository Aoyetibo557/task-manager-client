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
  const { user, isLoggedIn, dispatch, isTaskActionDispatched } =
    useAuth() as AuthType;
  const { theme } = useContext(ThemeContext);
  const router = useRouter();

  const handleAllArchivedTasks = async () => {
    const data = (await getUserArchivedTasks(user?.userid)) as any;

    if (data.status === "success") {
      setArchivedTasks(data.tasks);
      message.success(data.message);
    } else {
      if (data.status === "error") {
        // message.error(data.message);
        console.log(data.message);
      }
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      handleAllArchivedTasks();
    } else {
      setArchivedTasks([]);
      router.push("/loginform");
    }
  }, [user, isTaskActionDispatched]);

  return (
    <div>
      <div>
        <ArchiveGrid tasks={archivedTasks} theme={theme} />
      </div>
    </div>
  );
};

export default ArchivedTasks;
