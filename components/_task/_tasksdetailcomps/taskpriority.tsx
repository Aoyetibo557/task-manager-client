import React, { useState } from "react";
import { Tag } from "antd";

type Props = {
  priority: string;
  onUpdate: (key: string, value: string) => void;
};

export const TaskPriorityModal = ({ priority, onUpdate }: Props) => {
  const [statePriority, setPriority] = useState(priority);
  const [changePriority, setChangePriority] = useState(false);

  const getTagColor = (proiority: string) => {
    switch (proiority) {
      case "high":
        return "#f50";
      case "medium":
        return "#FF4366";
      case "low":
        return "#4D5ACE";
      default:
        return "#2db7f5";
    }
  };

  const handleUpdate = (newPriority: any) => {
    // Add any additional logic or validation before updating the status
    onUpdate("priority", newPriority);
  };

  return (
    <div className="modal">
      <div className={`flex flex-row gap-4 golos-font text-[13px]`}>
        <span>
          <Tag
            title={priority ? `${priority} priority` : "low priority"}
            color={getTagColor(priority ? priority : "low")}>
            {priority ? priority : "low"}
          </Tag>
        </span>

        <select
          required
          className={`text-neutral-700 bg-transparent border-none outline-none`}
          value={statePriority}
          onChange={(e) => {
            setPriority(e.target.value);
            handleUpdate(e.target.value);
          }}>
          <option value="low">Low </option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};
