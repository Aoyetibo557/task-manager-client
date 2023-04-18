import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";

type Props = {
  title: string | JSX.Element;
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
      className={`w-full flex flex-row items-center space-x-2 cursor-pointer p-1  ${
        isActive
          ? "bg-blue-500 text-task-light-white rounded-lg"
          : "hover:bg-task-sidebar-hover"
      }
      ${
        theme === "light"
          ? "hover:bg-blue-400 hover:text-task-light-white rounded-lg"
          : "text-task-light-white hover:bg-blue-500 rounded-lg"
      }
      `}
      onClick={handleOnclick}>
      <div
        className={`flex flex-row items-center justify-center w-8 h-8 rounded-full ${
          isMobileLink && "text-task-light-white"
        }`}>
        {icon}
      </div>
      <div
        className={`text-[13px] golos-font font-light
          ${isMobileLink && "text-task-light-white"}
          
         
        `}>
        {title}
      </div>
    </div>
  );
};

/**
 * ${
            !isMobileLink && theme === "light"
              ? "text-task-sidebar-light-dark"
              : "text-white"
          } 
 */
