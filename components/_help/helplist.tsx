import React from "react";
import { HelpCard } from "@/components/_help/helpcard";

type Props = {
  theme?: string;
};

const helpArray = [
  {
    id: 1,
    title: "How to create a task",
    icon: "",
    description:
      "Use the add task button on the dashboard header to create a new task. Note you have to be logged in to create a task.",
  },
  {
    id: 2,
    title: "How do I udate the status of a task",
    icon: "",
    description:
      "You can update the status of a task by clicking on the task and making a change to the status from the select input.",
  },
  {
    id: 3,
    title: "How do I delete a task",
    icon: "",
    description:
      "You can delete a task by clicking on the task and clicking on the three dots in beside the title, this should open up a menu and by clicking on the delete button option.",
  },
];

const HelpList = ({ theme }: Props) => {
  return (
    <div className="flex flex-row p-5 gap-5 help-list-cards">
      {helpArray.map((help) => (
        <HelpCard
          key={help.id}
          icon={help.icon}
          title={help.title}
          description={help.description}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default HelpList;
