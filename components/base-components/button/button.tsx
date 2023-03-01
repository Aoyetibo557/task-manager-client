import { useState } from "react";

type props = {
  label: string;
  bgColor?: "primary" | "secondary" | "tertiary" | "quaternary";
  onClick?: () => void;
  theme?: string;
};

export const Button = ({ label, bgColor, onClick, theme }: props) => {
  const getBgColor = () => {
    switch (bgColor) {
      case "primary":
        return `${theme === "light" ? "bg-task-light" : "bg-task-dark"}`;
      case "secondary":
        return "bg-green-500";
      case "tertiary":
        return "yellow-500";
      case "quaternary":
        return "bg-red-500";
      default:
        return "bg-task-blue";
    }
  };
  return (
    <button
      className={`golos-font p-3 rounded-lg text-white font-bold ${getBgColor()} ${theme}`}
      onClick={onClick}>
      {label}
    </button>
  );
};
