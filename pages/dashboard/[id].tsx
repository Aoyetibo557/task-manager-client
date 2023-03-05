import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import BoardTable from "@/components/_board/boardtable";
import { getBoardTasks } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthContext } from "@/components/Layout/_contexts/authcontext";

interface Task {
  name: string;
  description: string;
  taskid: string;
  status: string;
  boardId?: string;
  userId?: string;
  subtasks: Task[];
  timestamp?: string;
}

const BoardDetail = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const {
    user,
    loading: authLoading,
    isLoggedIn,
    isTaskCreated,
    dispatch,
  } = useAuth();

  const handleGetBoardTasks = async () => {
    setTasks([]);
    const boardtasks = await getBoardTasks(id as string);

    if (boardtasks.status === "error") {
      setError(boardtasks.message);
      setLoading(false);
    } else {
      if (boardtasks.status === "success") {
        setLoading(false);
        setTasks(boardtasks.tasks);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = handleGetBoardTasks();
    if (isTaskCreated) {
      handleGetBoardTasks();
    }
    return () => {
      unsubscribe;
      dispatch({
        type: "TASK_CREATED",
        payload: false,
      });
    };
  }, [id, name, isTaskCreated]);

  return (
    <div
      className={`w-full
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <div>
        <DashboardHeader boardname={name} boardId={id} />
      </div>
      <div>
        <BoardTable boardtasks={tasks as Task[]} loading={loading} />
      </div>
    </div>
  );
};

BoardDetail.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BoardDetail;
