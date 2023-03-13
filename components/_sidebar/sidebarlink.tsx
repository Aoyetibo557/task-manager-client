import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";

type Props = {
  title: string;
  url: string;
  icon?: JSX.Element;
  isActive: boolean;
  isMobileLink?: boolean;
  onClick?: () => void;
};

export const SidebarLink = ({
  title,
  url,
  icon,
  isActive,
  isMobileLink,
  onClick,
}: Props) => {
  const router = useRouter();
  const { theme } = useContext(ThemeContext);
  const path = router.pathname.toLowerCase();
  const handleOnclick = () => {
    router.push(url);
    onClick && onClick();
  };
  return (
    <div
      className={`flex flex-row items-center space-x-2 py-1 cursor-pointer ${
        isActive ? "bg-task-sidebar-active" : "hover:bg-task-sidebar-hover"
      }`}
      onClick={handleOnclick}>
      <div
        className={`flex flex-row items-center justify-center w-8 h-8 rounded-full 
           ${isMobileLink && "text-task-light-white"}
          ${
            !isMobileLink && theme === "light"
              ? "text-task-sidebar-light-dark"
              : "text-white"
          }
        `}>
        {icon}
      </div>
      <div
        className={`text-sm golos-font font-light
          ${isMobileLink && "text-task-light-white"}
          ${
            !isMobileLink && theme === "light"
              ? "text-task-sidebar-light-dark"
              : "text-white"
          }
        `}>
        {title}
      </div>
    </div>
  );
};
