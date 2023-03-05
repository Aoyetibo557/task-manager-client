import { useState, Fragment } from "react";
import { Switch } from "@headlessui/react";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: "left" | "right";
  disabled?: boolean;
  className?: string;
  theme?: string;
  iconOn?: JSX.Element;
  iconOff?: JSX.Element;
};

export const Toggle = (props: Props) => {
  return (
    <div
      className={`flex flex-row items-center justify-center p-3 gap-6
      ${
        props.theme === "light"
          ? "text-task-dark bg-task-white"
          : "text-task-light-white bg-task-sidebar-dark"
      }
    `}>
      <div>{props.iconOn && <span className="">{props.iconOn}</span>}</div>
      <Switch
        checked={props.checked}
        onChange={props.onChange}
        className={`${
          props.className
        } ${"bg-blue-400"} inline-flex items-center h-6 rounded-full w-12`}>
        <span
          className={`${
            props.theme === "light"
              ? "translate-x-1 bg-white"
              : "translate-x-7 bg-white"
          } inline-block w-4 h-4 transform rounded-full`}></span>
      </Switch>

      <div>
        {props.iconOff && <span className="w-6 h-6">{props.iconOff}</span>}
      </div>
    </div>
  );
};

/**
 * <span
        className={`${
          props.theme === "dark"
            ? "translate-x-6 bg-gray-900"
            : "translate-x-1 bg-white"
        } inline-block w-4 h-4 transform rounded-full`}></span>
      {props.labelPosition === "left" && (
        <span
          className={`text-sm ${
            props.theme === "dark" ? "text-white" : "text-gray-700"
          }`}>
          {props.label}
        </span>
      )}
      {props.iconOn && props.checked && (
        <span className="">{props.iconOn}</span>
      )}
      {props.iconOff && !props.checked && (
        <span className="">{props.iconOff}</span>
      )}
      {props.labelPosition === "right" && (
        <span
          className={`ml-3 text-sm ${
            props.theme === "dark" ? "text-white" : "text-gray-700"
          }`}>
          {props.label}
        </span>
      )}
 */
