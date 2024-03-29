import { BsPlus } from "react-icons/bs";
import { Button } from "../base-components/button/button";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import type { MenuProps } from "antd";
import { Dropdown, message, Avatar, Spin } from "antd";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { AuthType } from "@/lib/utils/types";

type Props = {
  theme?: string;
  isMobile?: boolean;
};

const DropdownMenu = ({ theme, isMobile }: Props) => {
  const router = useRouter();
  const {
    user,
    signOut,
    loading,
    isLoggedIn,
    dispatch,
    isUserActionDispatched,
  } = useAuth() as AuthType;
  const [image, setImage] = useState<any>(user?.profileImage);

  const handleSignOut = () => {
    signOut();
    router.push("/loginform");
  };

  /**
   * 
   * {
      key: "1",
      label: !isMobile && (
        <div>
          {`${user?.firstName} ${user?.lastName}`}
          <div>
            <span className="text-xs text-gray-400">{user?.email}</span>
          </div>
        </div>
      ),
      icon: !isMobile && (
        <Avatar
          className="w-10 h-10"
          src={image ? image : user?.profileImage}
          alt="user"
        />
      ),
    },
    !isMobile &&
      ({
        key: "2",
        type: "divider",
      } as any),
   */

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          className="flex-flex-row items-center"
          href={`/setting/${user?.userid}`}
          type="submit"
          onClick={() => {}}>
          Account Settings
        </Link>
      ),
      icon: <IoSettingsOutline className="mr-2 w-5 h-5" />,
    },
    {
      key: "2",
      label: (
        <Link href="/help" type="submit" onClick={() => {}}>
          Help & Feedback
        </Link>
      ),
      icon: <IoMdHelpCircleOutline className="mr-2 w-5 h-5" />,
    },
    {
      key: "3",
      type: "divider",
    },
    {
      key: "6",
      label: (
        <button type="submit" onClick={handleSignOut}>
          Log out
        </button>
      ),
      icon: <MdLogout className="mr-2 w-5 h-5" />,
    },
  ];

  return (
    <div id="menu">
      <Dropdown menu={{ items }} trigger={["click"]} placement="bottomRight">
        <button
          title={`${user?.firstName} ${user?.lastName}`}
          araia-label={`${user?.firstName} ${user?.lastName}`}
          type="submit"
          className={`${
            theme === "light" ? "text-task-dark" : "text-task-light-white"
          }`}>
          {isMobile ? (
            <Avatar src={user?.profileImage} size={40} />
          ) : (
            <Avatar
              className="w-12 h-12 border-2 border-blue-400"
              src={image ? image : user?.profileImage}
              alt="user"
            />
          )}
        </button>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
