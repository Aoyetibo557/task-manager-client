import { Task } from "@/lib/utils/types";
import { TaskCard } from "@/components/_task/task";
type Props = {
  tasks: Task[];
  theme: string | undefined;
};

export const PinnedTasks = (props: Props) => {
  return (
    <div className={`grid grid-cols-4 gap-2`}>
      {props.tasks.map((task) => (
        <TaskCard task={task} theme={props.theme} />
      ))}
    </div>
  );
};
