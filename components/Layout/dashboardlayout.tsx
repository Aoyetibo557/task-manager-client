import React, { useContext } from "react";
import { ThemeContext } from "./_contexts/themecontext";
import Sidebar from "../_sidebar/sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className="flex flex-row">
      <Sidebar />
      {children}
    </div>
  );
};

DashboardLayout.getLayout = function getLayout(page: React.ReactNode) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashboardLayout;
