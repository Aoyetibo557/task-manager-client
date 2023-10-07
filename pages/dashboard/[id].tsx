import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/dashboardlayout";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import DashboardHeader from "@/components/Layout/Header/dashboardheader";
import BoardTable from "@/components/_board/boardtable";
import { getBoardTasks } from "@/lib/queries/task";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthContext } from "@/components/Layout/_contexts/authcontext";
import { Task, AuthType } from "@/lib/utils/types";

const BoardDetail = () => {
  const router = useRouter();
  const { id, name } = router.query;
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    user,
    loading: authLoading,
    isLoggedIn,
    isTaskActionDispatched,
    isTaskPinned,
    isBoardActionDispatched,
    dispatch,
  } = useAuth() as AuthType;

  const handleGetBoardTasks = async () => {
    setTasks([]);
    const boardtasks = await getBoardTasks(id as string);

    if (boardtasks.status === "error") {
      setError(boardtasks.message);
      setLoading(false);
    } else {
      setLoading(false);
      if (boardtasks.status === "success") {
        setTasks(boardtasks.tasks);
        setLoading(false);
      }
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    setLoading(true);
    const unsubscribe = handleGetBoardTasks();
    // if (isTaskActionDispatched || isTaskPinned) {
    //   handleGetBoardTasks();
    // }

    return () => {
      unsubscribe;
      dispatch({
        type: "TASK_CREATED",
        payload: false,
      });
    };
  }, [
    id,
    name,
    isLoggedIn,
    isTaskActionDispatched,
    dispatch,
    isBoardActionDispatched,
  ]);

  return (
    <div
      className={`w-full h-screen overflow-auto ${
        theme === "light" ? "bg-task-light" : "bg-task-sidebar-dark"
      }
    `}>
      <div className="sticky top-0">
        <DashboardHeader
          boardname={name as string}
          boardId={id as any}
          contentType="board"
          hasboardMenu={true}
          hasSearchBar={true}
          onSearch={handleSearch}
          breadcrumblist={[
            { href: "/dashboard", title: "Dashboard" },
            { href: "", title: "Boards" },
            { href: `/dashboard/${id}?name=${name}`, title: name },
          ]}
        />
      </div>
      <div className="">
        <BoardTable
          boardId={id as string}
          boardtasks={tasks as Task[]}
          loading={loading}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

BoardDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default BoardDetail;
