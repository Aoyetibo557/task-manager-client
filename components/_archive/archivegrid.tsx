import React, { useState, useEffect } from "react";
import { Task, AuthType } from "@/lib/utils/types";
import { TaskCard } from "@/components/_task/task";
import { useAuth } from "@/lib/hooks/useAuth";

type Props = {
  tasks: Task[];
  theme: string | undefined;
};

const ArchiveGrid = ({ tasks, theme }: Props) => {
  const { user, dispatch } = useAuth() as AuthType;

  return (
    <div className="m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tasks?.map((task) => (
        <TaskCard task={task} theme={theme} />
      ))}
    </div>
  );
};

export default ArchiveGrid;
