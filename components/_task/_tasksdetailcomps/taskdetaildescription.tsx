import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { Task } from "@/lib/utils/types";

type Props = {
  description: string | undefined;
  onUpdate: (name: keyof Task, value: string) => void;
  theme?: string;
};

export const TaskDetailsDescription = ({
  description,
  onUpdate,
  theme,
}: Props) => {
  const [editDescription, setEditDescription] = useState(false);

  return (
    <div>
      {/* description  */}
      <div
        className={`flex flex-row items-center gap-3 text-xl font-medium golos-font mb-2 ${
          theme === "light" ? "text-neutral-600" : "text-neutral-200"
        }`}>
        Description
        {editDescription ? (
          <AiOutlineClose
            title={`Cancel Edit Description`}
            aria-label={`Cancel Edit Description`}
            className={`w-6 h-6 b-[1px] rounded-full p-1 text-xs border-[2px] border-neutral-300 hover:border-neutral-500 hover:scale-100 cursor-pointer`}
            onClick={() => setEditDescription(!editDescription)}
          />
        ) : (
          <TbEdit
            className={`w-5 h-5 opacity-50 hover:opacity-75 cursor-pointer`}
            onClick={() => setEditDescription(!editDescription)}
          />
        )}
      </div>
      <div
        className={`text-[14px] font-normal golos-font ${
          theme === "light" ? "text-neutral-600" : "text-neutral-400"
        }`}>
        {editDescription ? (
          <textarea
            name="description"
            className={`w-full p-3 rounded-md border-[1px] border-neutral-300 golos-font text-sm font-light resize-none h-28
                ${
                  theme === "light"
                    ? "bg-task-light-white text-task-sidebar-dark border-neutral-800 focus:outline-neutral-400"
                    : "bg-task-sidebar-dark text-task-light-white border-neutral-500 outline-[0.2px] focus:outline-neutral-800"
                }`}
            value={description}
            onChange={(e) => onUpdate("description", e.target.value)}
          />
        ) : (
          <div className="w-full">{description}</div>
        )}
      </div>
    </div>
  );
};
