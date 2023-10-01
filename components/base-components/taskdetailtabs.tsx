import React from "react";
import { Tabs } from "antd";
import { Task } from "@/lib/utils/types";

export const TaskdetailTabs = (props: { task: Task }) => {
  const tabitems = [
    {
      label: (
        <div className={`text-neutral-400`}>
          <div className={`text-neutral-400`}>Subtasks (0)</div>
        </div>
      ),
      key: "1",
      children: (
        <div>
          <div className={`text-neutral-300`}>Subtask Feature Coming Soon!</div>
        </div>
      ),
      disabled: true,
    },
    {
      label: (
        <div className={`text-neutral-400`}>
          <div className={`text-neutral-400`}>Activity (0)</div>
        </div>
      ),
      key: "2",
      children: "Tab 2",
      disabled: true,
    },
    {
      label: (
        <div>
          <div className={`text-neutral-400`}>Comments (0)</div>
        </div>
      ),
      key: "3",
      children: "Tab 3",
      disabled: true,
    },
  ];
  return <Tabs defaultActiveKey="1" items={tabitems} />;
};
