import ErrorPage from "next/error";

import { Skeleton } from "@/components/ui/skeleton";

import { TStatsData } from "@/lib/swr/use-stats";

import StatsElement from "./stats-element";

export default function StatsCard({
  statsData,
}: {
  statsData: { stats: TStatsData | undefined; loading: boolean; error: any };
}) {
  const { stats, loading, error } = statsData;

  if (error && error.status === 404) {
    return <ErrorPage statusCode={404} />;
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 space-y-2 border-foreground/5 sm:grid-cols-3 sm:space-x-2 sm:space-y-0 lg:grid-cols-3 lg:space-x-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            className="rounded-lg border border-foreground/5 px-4 py-6 sm:px-6 lg:px-8"
            key={i}
          >
            <Skeleton className="h-6 w-[80%] rounded-sm" />
            <Skeleton className="mt-4 h-8 w-9" />
          </div>
        ))}
      </div>
    );
  }

  const groupedReactionsTotal =
    stats?.groupedReactions
      .reduce((accumulator, item) => {
        return accumulator + item._count.type;
      }, 0)
      .toString() ?? "0";

      const statistics = [
        {
          name: "Number of visits",
          value: stats?.totalViews?.toString() ?? "0",
          active: true,
        },
        {
          name: "Total average view duration",
          value: (() => {
            if (!stats?.total_duration || !stats?.views || stats.views.length === 0) {
              return "0";
            }
            const avgDuration = stats.total_duration / stats.views.length;
            if (avgDuration < 60000) {
              return `${Math.round(avgDuration / 1000)}`;
            } else {
              const minutes = Math.floor(avgDuration / 60000);
              const seconds = Math.round((avgDuration % 60000) / 1000);
              return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
            }
          })(),
          unit:
            !stats?.total_duration || !stats?.views || stats.views.length === 0
              ? "seconds"
              : stats.total_duration / stats.views.length < 60000
              ? "seconds"
              : "minutes",
          active: !!stats?.total_duration,
        },
      ];
      

  return stats && stats.views.length > 0 ? (
    <div className="grid grid-cols-1 space-y-2 border-foreground/5 sm:grid-cols-3 sm:space-x-2 sm:space-y-0 lg:grid-cols-2 lg:space-x-3">
      {statistics.map((stat, statIdx) => (
        <StatsElement key={statIdx} stat={stat} statIdx={statIdx} />
      ))}
    </div>
  ) : null;
}
