import { StatsCardType } from "@/lib/utils/types";
import { BsInfoCircle } from "react-icons/bs";
import { Tooltip } from "antd";

type Props = {
  title: string;
  value: any;
  cardsize: "small" | "large";
  description?: string;
  theme: string | undefined;
};

export const StatsCard = ({
  title,
  value,
  cardsize,
  description,
  theme,
}: Props) => {
  const getSize = () => {
    switch (cardsize) {
      case "small":
        return "w-20 md:w-16 lg:w-20 xl:w-24 2xl:w-32";
      case "large":
        return "w-full lg:w-32 xl:w-44 2xl:w-72";

      default:
        return "w-1/4";
    }
  };

  const tooltipPropmpt = () => {
    return (
      <div className="flex flex-col gap-2 ">
        <div className="text-sm font-normal golos-font">{description}</div>
      </div>
    );
  };

  return (
    <>
      <div
        className={` ${getSize()} w- h-full p-3 flex flex-col rounded-md golos-font 
        ${
          theme === "light"
            ? "text-task-sidebar-dark border-neutral-400 border-[0.8px]"
            : "text-task-white bg-task-sidebar-light-dark"
        }
      `}>
        <div
          className={`flex flex-row gap-3 justify-between golos-font font-normal text-base text-neutral-500`}>
          {title}
          {description && (
            <Tooltip title={tooltipPropmpt()}>
              <BsInfoCircle className="w-4 h-4" />
            </Tooltip>
          )}
        </div>
        <div className={`golos-font font-semibold text-2xl`}>{value}</div>
      </div>
    </>
  );
};
