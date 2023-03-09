import { useState } from "react";

type props = {
  label: string | JSX.Element;
  bgColor?: "primary" | "secondary" | "other" | "quaternary";
  onClick?: () => void;
  className?: string;
  theme?: string;
  size?: "xs" | "sm" | "md" | "lg";
};

export const Button = ({
  label,
  bgColor,
  onClick,
  theme,
  className,
  size,
}: props) => {
  const getBgColor = () => {
    switch (bgColor) {
      case "primary":
        return `${
          theme === "light" ? "bg-task-light" : "bg-task-dark"
        } hover:bg-task-dark`;
      case "secondary":
        return "bg-blue-400 hover:bg-blue-500";
      case "other":
        return "bg-neutral-400 text-neutral-600 hover:bg-neutral-500";
      case "quaternary":
        return "bg-red-500";
      default:
        return "bg-blue-400 hover:bg-blue-500";
    }
  };

  const getSize = () => {
    switch (size) {
      case "xs":
        return " h-6 text-xs";
      case "sm":
        return " h-8 text-sm";
      case "md":
        return " h-10 text-base";
      case "lg":
        return " h-12 text-lg";
      default:
        return " h-10 text-base";
    }
  };

  return (
    <button
      className={`flex items-center justify-center golos-font p-2 rounded-sm text-white font-medium ${getBgColor()} ${getSize()} ${theme} ${className}}`}
      onClick={onClick}>
      {label}
    </button>
  );
};
