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
import { CgMenuGridO } from "react-icons/cg";
import { SlOptionsVertical } from "react-icons/sl";
import { ConfirmationModal } from "../_confirmationmodal/confirmationmodal";
import { clearBoard, deleteBoard } from "@/lib/queries/board";
import { ActionTypes } from "@/lib/utils/actions";

type Props = {
  theme?: string;
  isMobile?: boolean;
  boardid?: string;
};

const BoardMenu = ({ theme, isMobile, boardid }: Props) => {
  const [clearModal, setClearModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const router = useRouter();
  const {
    user,
    signOut,
    loading,
    isLoggedIn,
    dispatch,
    isUserActionDispatched,
  } = useAuth() as AuthType;

  const clearBoardModal = () => {
    setClearModal(true);
  };

  const deleteBoardModal = () => {
    setDeleteModal(true);
  };

  const handleClearBoard = async (boardid: string) => {
    const res = (await clearBoard(boardid)) as any;
    if (res.status === "success") {
      message.success("Board Cleared");
      setClearModal(false);
      dispatch({
        type: ActionTypes.BOARD_ACTION,
        payload: true,
      });
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

  const handleDeleteBoard = async (boardid: string) => {
    const res = (await deleteBoard(boardid)) as any;
    if (res.status === "success") {
      message.success("Board Deleted");
      setDeleteModal(false);
      dispatch({
        type: ActionTypes.BOARD_ACTION,
        payload: true,
      });
      router.push("/dashboard");
    } else {
      if (res.status === "error") {
        message.error(res.message);
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: !isMobile && (
        <div>
          <button type="submit" onClick={clearBoardModal}>
            Clear Board
          </button>
        </div>
      ),
      icon: "",
    },
    {
      key: "2",
      label: !isMobile && <div>Archive Board</div>,
      icon: "",
    },
    {
      key: "3",
      label: !isMobile && (
        <div>
          <button type="submit" onClick={deleteBoardModal}>
            Delete Board
          </button>
        </div>
      ),
      icon: "",
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
          {isMobile ? (
            <SlOptionsVertical className="cursor-pointer w-4 h-4" />
          ) : (
            <SlOptionsVertical className="cursor-pointer w-5 h-5" />
          )}
        </button>
      </Dropdown>

      {clearModal && (
        <ConfirmationModal
          open={clearModal}
          setOpen={setClearModal}
          title="Clear Tasks"
          subtitle="Are you sure you want to clear all tasks on this board?"
          onConfirm={() => handleClearBoard(boardid as any)}
          primaryBtnLabel="Clear"
          secondaryBtnLabel="Cancel"
        />
      )}

      {deleteModal && (
        <ConfirmationModal
          open={deleteModal}
          setOpen={setDeleteModal}
          title="Delete Board"
          subtitle="Are you sure you want to delete this board?"
          onConfirm={() => handleDeleteBoard(boardid as any)}
          primaryBtnLabel="Delete"
          secondaryBtnLabel="Cancel"
        />
      )}
    </div>
  );
};

export default BoardMenu;
