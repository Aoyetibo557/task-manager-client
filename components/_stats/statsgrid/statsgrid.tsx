import { StatsType } from "@/lib/utils/types";
import { StatsCard } from "@/components/_stats/statscard/statscard";

type Props = {
  stats: StatsType;
  theme: string | undefined;
};

export const StatsGrid = ({ stats, theme }: Props) => {
  return (
    <>
      <div className={`grid grid-cols-4 items-center gap-4 justify-between`}>
        <StatsCard
          title={"Active Boards"}
          value={stats.totalBoards}
          theme={theme}
          cardsize={"large"}
          description={"Boards with at least one task"}
        />

        <StatsCard
          title={"Total tasks"}
          value={stats.totalTasks}
          theme={theme}
          cardsize={"large"}
          description={"Total Active Tasks created accross all boards"}
        />

        <StatsCard
          title={"In progress"}
          value={stats.totalTasksInProgress}
          theme={theme}
          cardsize={"large"}
        />

        <StatsCard
          title={"Completed"}
          value={stats.totalCompletedTasks}
          theme={theme}
          cardsize={"large"}
          description={"Tasks completed in the last 30 days"}
        />

        <StatsCard
          title={"Pinned"}
          value={stats.totalPinnedTasks}
          theme={theme}
          cardsize={"large"}
        />

        <StatsCard
          title={"Due Today"}
          value={stats.totalTasksDueToday}
          theme={theme}
          cardsize={"large"}
        />

        <StatsCard
          title={"Overdue"}
          value={stats.totalTasksOverdue}
          theme={theme}
          cardsize={"large"}
          description={"Tasks overdue in the last 30 days"}
        />
      </div>
    </>
  );
};
