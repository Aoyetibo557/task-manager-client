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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  setBoardLoading,
  setBoardError,
  setBoardTasks,
  selectBoardError,
  selectBoardLoading,
  fetchBoardTasks,
  selectedBoardTasks,
} from "@/redux/features/board-slice";

const BoardDetail = () => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch<AppDispatch>();
  const boardError = useSelector(selectBoardError);

  const router = useRouter();
  const { id, name } = router.query;

  const [searchQuery, setSearchQuery] = useState("");
  const [boardtasks, setBoardtasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGetBoardTasks = async () => {
    dispatch(setBoardLoading(true));
    setBoardtasks([]);
    setLoading(true);
    try {
      const boardtasks = await getBoardTasks(id as string);

      if (boardtasks.status === "success") {
        dispatch(setBoardTasks(boardtasks.tasks));
        setBoardtasks(boardtasks.tasks);
      } else {
        dispatch(setBoardTasks([]));
        dispatch(setBoardError(boardtasks.message));
      }
    } catch (error: any) {
      dispatch(setBoardError(error.message));
    } finally {
      dispatch(setBoardLoading(false));
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    // dispatch(setBoardLoading(true));
    // const unsubscribe = handleGetBoardTasks();
    // return () => {
    //   unsubscribe;
    //   dispatch(setBoardLoading(false));
    // };
    handleGetBoardTasks();
  }, [id, name]);

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
          boardtasks={boardtasks}
          boardId={id as string}
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
