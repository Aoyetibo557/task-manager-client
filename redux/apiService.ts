import { useDispatch } from "react-redux";
import { fetchTasksForAllBoards } from "./features/board-slice";
import { AppDispatch } from "./store";
import apiFuncContainer from "@/lib/utils/userhandlers";

const apiService = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { fetchUserStats } = apiFuncContainer();

  const initializeAppData = async () => {
    try {
      // dispatch(fetchTasksForAllBoards());
      // await fetchUserStats();
      // await fetchAllTasksForAllBoards();
    } catch (error) {
      console.error("Error initializing app data:", error);
    }
  };

  return {
    initializeAppData,
  };
};

export default apiService;
