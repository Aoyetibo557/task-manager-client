import React, { useContext } from "react";
import { ThemeContext } from "./_contexts/themecontext";

const DashboardLayout = ({ children }: props) => {
  const { theme } = useContext(ThemeContext);
  return <div>{children}</div>;
};

export default DashboardLayout;
