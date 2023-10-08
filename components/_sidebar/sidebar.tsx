import React, { useState, useRef, useEffect, useContext } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/router";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import { BsBell, BsCloudMoon, BsSun } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { AuthType } from "@/lib/utils/types";
import { SidebarLinks } from "../_sidebar/sidebarlinks";
import { Icon } from "@/components/base-components/icon/icon";
import { Logo } from "@/components/_logo/logo";
import { ProfileCard } from "../base-components/profilecard/profilecard";
import { Toggle } from "@/components/base-components/toggle/toggle";

const Sidebar = () => {
  const { user, loading, isLoggedIn, hasNotifications } = useAuth() as AuthType;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const [error, setError] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    toggleTheme();
  };

  return (
    <div
      className={`w-80 p-3  flex flex-col justify-between h-screen hide-sidebar ${
        theme === "light"
          ? "bg-task-light-white border-r-[0.6px] border-neutral-300"
          : "bg-task-sidebar-light-dark border-r-[0.6px] border-neutral-500"
      }`}>
      <div className="flex flex-col justify-between gap-10">
        <div className="flex flex-row items-center justify-around h-fit">
          <Logo />
          <Icon
            icon={BsBell}
            theme={theme}
            link="/notification"
            clx={`p-2 rounded-sm ${
              theme === "light"
                ? "text-task-dark bg-gray-200"
                : "text-task-light-white bg-gray-500"
            }`}
            hasbadge={hasNotifications}
          />
        </div>
        <SidebarLinks />
      </div>

      <div>
        <div>
          <Toggle
            checked={toggle}
            theme={theme}
            onChange={handleToggle}
            iconOff={<BsCloudMoon />}
            iconOn={<BsSun />}
            label="Task Mode"
          />
        </div>

        <ProfileCard
          name={`${user?.firstName} ${user?.lastName}`}
          username={user?.username}
          image={user?.profileImage || ""}
          imagesize="md"
          theme={theme}
          isAdmin={user?.isAdmin}
        />
      </div>
    </div>
  );
};

export default Sidebar;
