import React from "react";
import { BsFillPinFill, BsPin, BsFillStarFill, BsStar } from "react-icons/bs";
import { Task } from "@/lib/utils/types";

type Props = {
  isPinned: boolean | undefined;
  isStarred: boolean | undefined;
  handleUnpin: () => void;
  handlePin: () => void;
  handleStarTask: () => void;
  handleUnStarTask: () => void;
  className?: string;
};

export const TaskActions = ({
  isPinned,
  isStarred,
  handleUnpin,
  handlePin,
  handleStarTask,
  handleUnStarTask,
  className,
}: Props) => {
  return (
    <div className={`flex items-center gap-4`}>
      <div>
        {isPinned ? (
          <BsFillPinFill
            className="w-4 h-4 cursor-pointer"
            onClick={handleUnpin}
          />
        ) : (
          <BsPin className="w-4 h-4 cursor-pointer" onClick={handlePin} />
        )}
      </div>

      <div>
        {isStarred ? (
          <BsFillStarFill className={className} onClick={handleUnStarTask} />
        ) : (
          <BsStar className="w-4 h-4 cursor-pointer" onClick={handleStarTask} />
        )}
      </div>
    </div>
  );
};
