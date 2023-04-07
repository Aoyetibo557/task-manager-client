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
        return "w-1/4";
      case "large":
        return "w-1/2";

      default:
        return "w-1/4";
    }
  };

  const tooltipPropmpt = () => {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm font-normal golos-font">{description}</div>
      </div>
    );
  };

  return (
    <>
      <div
        className={` ${getSize()} h-20 p-3 m-2 flex flex-col justify-center rounded-md golos-font
        ${theme === "light" ? "text-task-sidebar-dark" : "text-task-white"}
      `}>
        <div
          className={`flex flex-row gap-3 items-center golos-font font-normal text-base text-neutral-500`}>
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
