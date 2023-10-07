import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import { BsBell } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { AuthType } from "@/lib/utils/types";
import { SidebarLinks } from "../_sidebar/sidebarlinks";
import { Icon } from "@/components/base-components/icon/icon";
import { Logo } from "@/components/_logo/logo";

const Sidebar = () => {
  const { user, loading, isLoggedIn } = useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const [error, setError] = useState("");

  return (
    <div
      className={`w-80 p-3 flex flex-col hide-sidebar ${
        theme === "light"
          ? "bg-task-light-white border-r-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark border-r-[0.6px] border-neutral-500"
      }`}>
      <div className="flex flex-row items-center justify-around h-20">
        <Logo />
        <Icon
          icon={BsBell}
          theme={theme}
          link="/notification"
          clx={`${
            theme === "light" ? "text-task-dark" : "text-task-light-white"
          }`}
        />

        {/* short line like a divider */}
        {/* <div className={` mt-6 mb-6 ml-14 w-28 h-[0.5px] bg-blue-500`}></div> */}
      </div>
      <SidebarLinks />
    </div>
  );
};

export default Sidebar;
