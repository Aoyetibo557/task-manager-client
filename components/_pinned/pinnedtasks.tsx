import { Task } from "@/lib/utils/types";
import { TaskCard } from "@/components/_task/task";
type Props = {
  tasks: Task[];
  theme: string | undefined;
};

export const PinnedTasks = (props: Props) => {
  return props.tasks.length > 0 ? (
    <div className={`grid grid-cols-4 gap-2`}>
      {props.tasks.map((task) => (
        <TaskCard task={task} theme={props.theme} />
      ))}
    </div>
  ) : (
    <div
      className={`flex flex-col text-center items-center justify-center h-96`}>
      <div className={`text-2xl font-normal golos-font text-neutral-400`}>
        {" "}
        No Pinned Tasks!
      </div>
    </div>
  );
};
