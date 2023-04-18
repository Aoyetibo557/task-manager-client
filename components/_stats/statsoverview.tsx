import { useState, useEffect, useContext } from "react";
import { StatsGrid } from "./statsgrid/statsgrid";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import { getUserStats } from "@/lib/queries/user";
import { StatsType } from "@/lib/utils/types";
import { message } from "antd";

export const StatsOverview = () => {
  const { theme } = useContext(ThemeContext);
  const { user, loading, isLoggedIn, isTaskPinned } = useAuth() as AuthType;
  const [stats, setStats] = useState<StatsType>({} as StatsType);

  const getStats = async () => {
    const res = await getUserStats(user?.userid);

    if (res.status === "success") {
      setStats(res.userStats);
    } else {
      if (res.status === "error") {
        console.log(res.message);
      }
    }
  };

  useEffect(() => {
    getStats();
  }, [user, isTaskPinned]);

  return (
    <div className="stats-overview">
      <div>
        {" "}
        <StatsGrid stats={stats} theme={theme} />{" "}
      </div>
    </div>
  );
};
