import { BsPlus } from "react-icons/bs";
import { Button } from "../base-components/button/button";
import { useRouter } from "next/router";
import { useAuth } from "@/lib/hooks/useAuth";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";
import type { MenuProps } from "antd";
import { Dropdown, message, Avatar } from "antd";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { HiOutlineUserCircle } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { AuthType } from "@/lib/utils/types";
import { CgMenuGridO } from "react-icons/cg";

type Props = {
  theme?: string;
};

const DropdownMenu = ({ theme }: Props) => {
  const router = useRouter();
  const { user, signOut, loading, isLoggedIn, dispatch } =
    useAuth() as AuthType;
  const [image, setImage] = useState<any>(user?.profileImage);

  const handleSignOut = () => {
    signOut();
    router.push("/loginform");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div>
          {`${user?.firstName} ${user?.lastName}`}
          <div>
            <span className="text-xs text-gray-400">{user?.email}</span>
          </div>
        </div>
      ),
      // icon: <HiOutlineUserCircle className="mr-2 w-5 h-5" />,
      icon: (
        <Avatar
          className="w-10 h-10"
          src={image ? image : user?.profileImage}
          alt="user"
        />
      ),
    },
    {
      key: "2",
      type: "divider",
    },
    {
      key: "3",
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
      key: "4",
      label: (
        <Link href="/help" type="submit" onClick={() => {}}>
          Help & Feedback
        </Link>
      ),
      icon: <IoMdHelpCircleOutline className="mr-2 w-5 h-5" />,
    },
    {
      key: "5",
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
          type="submit"
          className={`${
            theme === "light" ? "text-task-dark" : "text-task-light-white"
          }`}>
          <CgMenuGridO className="cursor-pointer w-7 h-7" />
        </button>
      </Dropdown>
    </div>
  );
};

export default DropdownMenu;
