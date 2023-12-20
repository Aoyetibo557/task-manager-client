import { getUserStats } from "@/lib/queries/user";
import { getBoardTasks } from "@/lib/queries/task";
import { selectUser } from "@/redux/features/auth-slice";
import {
  setUserLoading,
  setUserError,
  setStats,
} from "@/redux/features/user-slice";
import {
  setBoardLoading,
  setBoardError,
  setUserBoards,
} from "@/redux/features/board-slice";
import { getUserBoards } from "@/lib/queries/board";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const apiFuncContainer = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserStats = async () => {
    try {
      const res = await getUserStats(user?.userid);

      if (res.status === "success") {
        dispatch(setStats(res.userStats));
      } else {
        if (res.status === "error") {
          dispatch(setUserError(res.message));
        }
      }
    } catch (error) {
      console.error("Error fetching user stats:", error);
      dispatch(setUserError(error.message));
      throw error;
    } finally {
      dispatch(setUserLoading(false));
    }
  };

  const getBoards = async () => {
    dispatch(setBoardLoading(true));
    try {
      const data = await getUserBoards(user?.userid);
      if (data.status === "success") {
        dispatch(setUserBoards(data.boards));
        return data.boards;
      } else {
        if (data.status === "error") dispatch(setBoardError(data.message));
      }
    } catch (error: any) {
      dispatch(setBoardError(error.message));
    } finally {
      dispatch(setBoardLoading(false));
    }
  };

  // define a function to get all the tasks for each board and save in the boards state in user-slce
  const fetchAllTasksForAllBoards = async () => {
    try {
      const boards = await getBoards();
      const taskPromises = boards.map((board) => getBoardTasks(board.id));
      const tasksForAllBoards = await Promise.all(taskPromises);
      console.log("tasksForAllBoards:", tasksForAllBoards);
      // dispatch(setBoardCount(tasksForAllBoards));
    } catch (error) {
      console.error("Error fetching board tasks:", error);
      throw error;
    }
  };

  return {
    getBoards,
    fetchUserStats,
    fetchAllTasksForAllBoards,
  };
};

export default apiFuncContainer;

/**
 * Where i stopped:
 *
 * I was working on getting the boards and tasks for each board to be saved in the redux store
 * so that i can use them in the app. I was able to get the boards and tasks for each board
 */
