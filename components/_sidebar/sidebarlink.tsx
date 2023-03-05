import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";

type Props = {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
};

export const SidebarLink = ({ title, url, icon, isActive }: Props) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const path = router.pathname.toLowerCase();
  return (
    <div
      className={`flex flex-row items-center space-x-2 py-1 cursor-pointer ${
        isActive ? "bg-task-sidebar-active" : "hover:bg-task-sidebar-hover"
      }`}
      onClick={() => router.push(url)}>
      <div
        className={`flex flex-row items-center justify-center w-8 h-8 rounded-full 
          ${
            theme === "light"
              ? "text-task-sidebar-light-dark"
              : "text-task-light-white"
          }
        `}>
        {icon}
      </div>
      <div
        className={`text-sm golos-font font-light
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
        `}>
        {title}
      </div>
    </div>
  );
};
