import React, { useState } from "react";
import { Notification } from "@/lib/utils/types";
import {
  formatDate,
  NOTIFICATION_TYPE_COLOR,
  NOTIFICATION_TYPES,
} from "@/lib/utils/util";
import { Tag, Badge } from "antd";
import { MdAccessTime } from "react-icons/md";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";
import { NotificationModal } from "../notificationmodal";

type props = {
  notification: Notification;
  theme: string;
};

const NotificationCard = ({
  notification: { _id, message, title, read, type, change, timestamp },
  theme,
}: props) => {
  const { user } = useAuth() as AuthType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRead, setIsRead] = useState(read);
  const [userName, setUserName] = useState(
    `${user.firstName} ${user.lastName}`
  );

  const themeClass =
    theme === "light"
      ? "bg-task-light-white text-task-dark "
      : "bg-task-sidebar-light-dark text-task-light-white";
  const cardColor = NOTIFICATION_TYPE_COLOR[type] || "bg-gray-500"; // Default to gray if type color not defined
  const opacityClass = isRead ? "opacity-70" : "";

  /**
   * Detect is the user's name is in the string.if the user.firstname && || user.lastname is in the string, return true
   *  Function to parse the message string and apply styles to the user's name
   * @param {string} str
   */
  const renderStyledNameInMessage = (str: string, name: string) => {
    const nameIndex = str.indexOf(name);

    if (nameIndex !== -1) {
      return (
        <div className="text-base font-medium golos-font">
          <span>{str.substring(0, nameIndex)}</span>
          <span className="text-blue-400">{name}</span>
          <span>{str.substring(nameIndex + name.length)}</span>
        </div>
      );
    } else {
      // If the name is not found, render the entire message
      return <div className="text-base font-medium golos-font">{str}</div>;
    }
  };

  return (
    <div
      className={`m-2 golos=font cursor-pointer ${themeClass} ${cardColor} ${opacityClass}`}
      onClick={() => setIsModalOpen(true)}>
      <div className="flex flex-col justify-between p-4 gap-2">
        <div className={`flex flex-row items-center justify-between`}>
          <Tag color={NOTIFICATION_TYPE_COLOR[type]}>
            {NOTIFICATION_TYPES[type] || "Feature Update"}
          </Tag>
          <div
            className={`flex flex-row items-center gap-1 text-[13px] opacity-50 `}>
            <MdAccessTime className="text-sm" />
            {formatDate(timestamp)}{" "}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`text-base font-medium golos-font`}>
            {renderStyledNameInMessage(title, userName)}
          </div>
        </div>
        <div className="text-gray-400 text-[13px]">{message}</div>
      </div>

      {isModalOpen && (
        <NotificationModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          theme={theme}
          notification={{ _id, message, title, read, type, change, timestamp }}
          render={renderStyledNameInMessage}
          isRead={isRead}
          setIsRead={setIsRead}
        />
      )}
    </div>
  );
};

export default NotificationCard;
