import React, { useState } from "react";

type Props = {
  status: string;
  isActive: boolean | undefined;
  onUpdateStatus: (key: string, value: string) => void;
};

const TaskStatusModal = ({ status, isActive, onUpdateStatus }: Props) => {
  const [stateStatus, setStatus] = useState(status);

  const handleUpdateStatus = (newStatus: any) => {
    // Add any additional logic or validation before updating the status
    onUpdateStatus("status", newStatus);
  };

  return (
    <div className="modal">
      <div className={`flex flex-row gap-10 golos-font text-[15px]`}>
        {isActive ? (
          <select
            required
            className={`text-neutral-700 bg-transparent border-none outline-none`}
            value={stateStatus}
            onChange={(e) => {
              setStatus(e.target.value);
              handleUpdateStatus(e.target.value);
            }}>
            <option value="todo">ToDo</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <span className={`text-sm opacity-40`}>{status} | Deleted</span>
        )}
      </div>
    </div>
  );
};

export default TaskStatusModal;
