import Link from "next/link";

type MenuProps = {
  title: string | JSX.Element;
  url: string;
  isActive: boolean;
  isDropDown?: boolean;
  dropdownItems?: MenuProps[];
  theme: string;
  onClick?: () => void;
};

export const MenuItem = (props: MenuProps) => {
  return (
    <Link onClick={props.onClick} href={props.url}>
      <div
        className={`mx-2 font-light text-base cursor-pointer py-2 px-3 golos-font transition-all ease-in-out hover:text-task-blue hover:underline mukta-font
        ${props.isActive && "text-black"}
        ${props.theme === "light" ? "text-neutral-500" : "text-white"}
      `}>
        <span className="m-auto font-light">{props.title}</span>
      </div>
    </Link>
  );
};
