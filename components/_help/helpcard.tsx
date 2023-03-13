import { IoHelpCircleOutline } from "react-icons/io5";

type Props = {
  icon?: JSX.Element | React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
  theme?: string;
};

export const HelpCard = ({
  icon,
  title,
  description,
  children,
  theme,
}: Props) => {
  return (
    <div
      className={`w-2/6 p-4 h-full flex flex-col gap-4 m-1 rounded-md golos-font help-card ${
        theme === "light"
          ? "bg-task-light-white text-task-dark"
          : "bg-task-sidebar-light-dark text-task-light-white"
      }`}>
      <div>{icon || <IoHelpCircleOutline className="w-6 h-6 " />}</div>
      <div
        className={`text-base font-medium ${
          theme === "light" ? "text-task-dark" : "text-task-light-white"
        }`}>
        {title}
      </div>
      <div
        className={`text-sm font-normal ${
          theme === "light" ? "text-task-dark" : "text-neutral-400"
        }`}>
        {description}
      </div>
    </div>
  );
};
