import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import Link from "next/link";
import { Icon } from "../base-components/icon/icon";
import { FaReact } from "react-icons/fa";

type Props = {
  title: string | JSX.Element;
  url: string;
  icon?: string | JSX.Element | any;
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
    onClick && onClick();
  };
  return (
    <Link
      href={url}
      className={`w-full flex flex-row items-center cursor-pointer p-2  ${
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
        className={`flex flex-row items-center justify-center rounded-full ${
          isMobileLink && "text-task-light-white"
        }`}>
        <Icon icon={icon} theme={theme} />
      </div>
      <div
        className={`text-[13px] golos-font font-light
          ${isMobileLink && "text-task-light-white"}`}>
        {title}
      </div>
    </Link>
  );
};
