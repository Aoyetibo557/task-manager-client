import React, { useContext } from "react";
import { ThemeContext } from "./_contexts/themecontext";
import Sidebar from "../_sidebar/sidebar";

const DashboardLayout = ({ children }: props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-1">
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
