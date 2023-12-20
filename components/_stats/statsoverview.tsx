import { useState, useEffect, useContext } from "react";
import { StatsGrid } from "./statsgrid/statsgrid";
import { ThemeContext } from "@/components/Layout/_contexts/themecontext";
import { useAuth } from "@/lib/hooks/useAuth";
import { getUserStats } from "@/lib/queries/user";
import { message } from "antd";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/auth-slice";
import { selectUserStats } from "@/redux/features/user-slice";

// going to add a slice for user, to save userstats and all pertinent information for a user to avoid repeated api calls in the redux store, but for now just update with auth user
export const StatsOverview = () => {
  const { theme } = useContext(ThemeContext);
  const user = useSelector(selectUser);
  const stats = useSelector(selectUserStats);

  return (
    <div className="stats-overview">
      <div>
        {" "}
        <StatsGrid stats={stats} theme={theme} />{" "}
      </div>
    </div>
  );
};
