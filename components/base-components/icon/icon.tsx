import React from "react";
import { IconType } from "react-icons";
import Link from "next/link";

interface IconProps {
  icon: IconType | any;
  theme?: string;
  size?: "sm" | "md" | "lg";
  clx?: string;
  link?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  theme,
  size = "medium",
  clx,
  link,
}) => {
  const themeClass = theme === "light" && "bg-task-light";
  const sizeClass =
    size === "small" ? "w-6" : size === "medium" ? "w-8" : "w-12";

  return link ? (
    <Link href={link}>
      <div
        className={`flex flex-row items-center justify-center rounded-full ${themeClass} ${sizeClass} ${clx}`}>
        <IconComponent />
      </div>
    </Link>
  ) : (
    <div className={`icon ${themeClass} ${sizeClass} ${clx}`}>
      {IconComponent && IconComponent()}
    </div>
  );
};
