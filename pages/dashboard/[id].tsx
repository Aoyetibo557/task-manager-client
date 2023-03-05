import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import BoardTable from "@/components/_board/boardtable";
import { getBoardTasks } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthContext } from "@/components/Layout/_contexts/authcontext";
import { Task } from "@/lib/utils/types";

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
    isTaskActionDispatched,
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
    if (isTaskActionDispatched) {
      handleGetBoardTasks();
    }

    return () => {
      unsubscribe;
      dispatch({
        type: "TASK_CREATED",
        payload: false,
      });
    };
  }, [id, name, isLoggedIn, isTaskActionDispatched]);

  return (
    <div
      className={`ml-80 pl-5 w-full h-screen
    ${theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"}
    `}>
      <div>
        <DashboardHeader boardname={name} boardId={id} contentType="board" />
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
