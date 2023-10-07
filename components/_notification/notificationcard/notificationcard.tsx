import React, { useState } from "react";
import { Notification } from "@/lib/utils/types";
import { formatDate } from "@/lib/utils/util";
import { Tag, Badge } from "antd";
import { MdAccessTime } from "react-icons/md";
import { useAuth } from "@/lib/hooks/useAuth";
import { AuthType } from "@/lib/utils/types";

type props = {
  notification: Notification;
  theme: string;
};

const NotificationCard = ({
  notification: { message, title, read, type, timestamp },
  theme,
}: props) => {
  const { user } = useAuth() as AuthType;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState(
    `${user.firstName} ${user.lastName}`
  );

  const typeColors = {
    "user-change": "#f50",
    "password-reset": "#2db7f5",
    "email-notification": "#87d068",
    "feature-update": "#4D5ACE",
    // Add more types and their respective colors as needed
  };

  const types = {
    "email-notification": "Email Notification",
    "user-change": "User Change",
    "password-reset": "Password Change",
    "feature-update": "Feature Update",
    // Add more types and their respective colors as needed
  };

  const themeClass =
    theme === "light"
      ? "bg-task-light-white text-task-dark "
      : "bg-task-sidebar-light-dark text-task-light-white";
  const cardColor = typeColors[type] || "bg-gray-500"; // Default to gray if type color not defined
  const opacityClass = read ? "opacity-50" : "";

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
          <span className="text-blue-500">{name}</span>
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
          <Tag color={typeColors[type]}>{types[type] || "Feature Update"}</Tag>
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

      {isModalOpen && "Add modal here"}
    </div>
  );
};

export default NotificationCard;
