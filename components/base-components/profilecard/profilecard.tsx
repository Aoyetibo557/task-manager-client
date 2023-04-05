import react from "react";
import { Avatar, Tag } from "antd";

type Props = {
  image: string | JSX.Element;
  imagesize: "xs" | "sm" | "md" | "lg";
  name: string;
  username?: string;
  theme: string;
  tagtext?: string;
  isAdmin: boolean;
};

/**
 * TODO: When notifications is set up , update with badge feature, so user can be made aware of notifications
 *
 */

export const ProfileCard = (props: Props) => {
  const getSize = () => {
    switch (props.imagesize) {
      case "xs":
        return 24;
      case "sm":
        return 32;
      case "md":
        return 40;
      case "lg":
        return 64;
      default:
        return 48;
    }
  };

  return (
    <>
      <div
        className={`flex flex-row items-center justify-between p-2 rounded-lg w-full golos-font bg-task-light-dark text-task-white`}>
        <div className={`flex flex-row items-center gap-3`}>
          <Avatar src={props.image || props.name} size={getSize()} />
          <div className={`flex flex-col`}>
            <span
              className={`text-sm
            ${
              props.theme === "light"
                ? "text-task-light-white"
                : "text-task-light-white"
            }
          `}>
              {props.name}
            </span>
            <span className={`text-sm text-neutral-400`}>{props.username}</span>
          </div>
        </div>
        <div>{props.isAdmin && <Tag color="#4D5ACE">Admin</Tag>}</div>
      </div>
    </>
  );
};
