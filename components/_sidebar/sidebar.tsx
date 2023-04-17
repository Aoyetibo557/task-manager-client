import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ThemeContext } from "../Layout/_contexts/themecontext";

import Image from "next/image";
import Link from "next/link";
import { AuthType } from "@/lib/utils/types";
import { SidebarLinks } from "../_sidebar/sidebarlinks";

const Sidebar = () => {
  const { user, loading, isLoggedIn } = useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!user || isLoggedIn === false) {
        router.push("/loginform");
        setError("You are not logged in");
      }
    }
  }, [isLoggedIn, user]);

  return (
    <div
      className={` w-80 p-3 flex flex-col hide-sidebar ${
        theme === "light"
          ? "bg-task-light-white border-r-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark border-r-[0.6px] border-neutral-500"
      }`}>
      <div className="">
        <div
          className={`flex flex-row items-center justify-center gap-3 font-bold text-2xl golos-font
          ${theme === "light" ? "text-task-dark" : "text-task-light-white"} `}>
          <Link href="/dashboard">
            <Image
              src="/static/images/logo.png"
              width={30}
              height={30}
              alt="Tassker Logo"
            />
          </Link>
        </div>

        {/* short line like a divider */}
        <div className={` mt-6 mb-6 ml-14 w-28 h-[0.5px] bg-blue-500`}></div>
        <SidebarLinks />
      </div>
    </div>
  );
};

export default Sidebar;
