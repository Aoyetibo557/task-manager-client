import React from "react";
import { IconType } from "react-icons";

interface IconProps {
  icon: IconType | any;
  theme?: string;
  size?: "sm" | "md" | "lg";
  clx?: string;
}

export const Icon: React.FC<IconProps> = ({
  icon: IconComponent,
  theme,
  size = "medium",
  clx,
}) => {
  const themeClass = theme === "light" && "bg-task-light";
  const sizeClass =
    size === "small" ? "w-6" : size === "medium" ? "w-8" : "w-12";

  return (
    <div className={`icon ${themeClass} ${sizeClass} ${clx}`}>
      {IconComponent && IconComponent()}
    </div>
  );
};
