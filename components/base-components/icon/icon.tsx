import React from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import { Badge } from "antd";

interface IconProps {
  icon: IconType | any;
  theme?: string;
  size?: "sm" | "md" | "lg";
  clx?: string;
  link?: string;
  onClick?: () => void;
  hasbadge?: boolean;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  theme,
  size = "medium",
  clx,
  link,
  onClick,
  hasbadge,
}) => {
  const themeClass = theme === "light" && "bg-task-light";
  const sizeClass =
    size === "small" ? "w-6" : size === "medium" ? "w-8" : "w-12";

  return (
    <Badge dot={hasbadge} title="You have unread notifications!">
      {link ? (
        <Link href={link} onClick={onClick}>
          <div
            className={`flex flex-row items-center justify-center rounded-full ${themeClass} ${sizeClass} ${clx}`}>
            <IconComponent />
          </div>
        </Link>
      ) : (
        <div
          className={`icon ${themeClass} ${sizeClass} ${clx}`}
          onClick={onClick}>
          {IconComponent && IconComponent()}
        </div>
      )}
    </Badge>
  );
};
