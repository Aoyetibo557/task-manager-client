import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../Layout/_contexts/themecontext";

export const Logo = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div
      className={`bebas-neue-font font-bold text-4xl
    ${theme === "light" ? "text-task-dark" : "text-task-light-white"}
    `}>
      <span>Tass</span>
      <span
        className={`${theme === "light" ? "text-task-blue" : "text-red-300"}`}>
        ker
      </span>
      <span>
        <span className="text-blue-500">.</span>
        <span className="text-blue-400">io</span>
      </span>
    </div>
  );
};
