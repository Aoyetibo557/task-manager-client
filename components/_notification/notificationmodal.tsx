import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { MdClose, MdAccessTime } from "react-icons/md";
import Modal from "../Utility/Modal/modal";
import { Notification } from "@/lib/utils/types";
import { Icon } from "@/components/base-components/icon/icon";
import { Tag, message } from "antd";
import {
  formatRelativeTime,
  NOTIFICATION_TYPES,
  NOTIFICATION_TYPE_COLOR,
} from "@/lib/utils/util";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import {updateNotification} from "@/lib/queries/notification.ts";


type Props = {
  notification: Notification;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  theme: string;
  render: (str: string, name: string) => JSX.Element;
  isRead: boolean;
  setIsRead: Dispatch<SetStateAction<boolean>>;
};

export const NotificationModal = ({
  notification,
  open,
  setOpen,
  theme,
  render,
  isRead,
  setIsRead,
}: props) => {
  const { user } = useAuth() as AuthType;
  const [userName, setUserName] = useState(
    `${user.firstName} ${user.lastName}`
  );

  const handleUpdateNotification = async () => {
    try {
      const res = await updateNotification(notification._id, {
       actionType: "read",
      });
      if (res.status === "success") {
        setOpen(true);
        setIsRead(true);
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() =>{
    handleUpdateNotification();
  },[])

  return (
    <Modal open={open} setOpen={setOpen} theme={theme}>
      <div className={`flex flex-col gap-4 justify-between`}>
        <div
          className={`flex flex-col gap-4 golos-font ${
            theme === "light" ? "text-task-dark" : "text-task-light-white"
          }`}>
          <div className={`flex flex-row items-center justify-between`}>
            <Tag color={NOTIFICATION_TYPE_COLOR[notification.type]}>
              {NOTIFICATION_TYPES[notification.type] || "Feature Update"}
            </Tag>

            <Icon
              icon={MdClose}
              size="lg"
              clx={`cursor-pointer`}
              onClick={() => setOpen(false)}
            />
          </div>

          <div>{render(notification?.title, userName)}</div>
          <div
            className={` text-[14px] p-3 rounded-sm opacity-70 ${
              theme === "light"
                ? "bg-gray-200 text-task-dark"
                : "bg-task-sidebar-light-dark text-task-light-white"
            }`}>
            <div>{notification?.message}</div>
            {notification?.change && (
              <div className={`font-medium`}>
                Change made -> " {notification?.change} "
              </div>
            )}
          </div>
        </div>
        <div
          className={`flex items-end text-sm opacity-50 border-t-[0.6px] ${
            theme === "light" ? "border-neutral-400" : "border-neutral-600"
          }`}>
          created {formatRelativeTime(notification?.timestamp)}
        </div>
      </div>
    </Modal>
  );
};
