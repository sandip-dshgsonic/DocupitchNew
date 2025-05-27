import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import { useStats } from "@/lib/swr/use-stats";

import StatsCard from "./stats-card";
import StatsChart from "./stats-chart";

export const StatsComponent = ({
  documentId,
  numPages,
}: {
  documentId: string;
  numPages: number;
}) => {
  const [excludeTeamMembers, setExcludeTeamMembers] = useState<boolean>(false);
  const statsData = useStats({ excludeTeamMembers });

  // console.log('----stats data---21-', statsData);

  return (
    <>
    

      {/* Stats Chart */}
      <StatsChart
        documentId={documentId}
        totalPagesMax={numPages}
        statsData={statsData}
      />

      {/* Stats Card */}
      <StatsCard statsData={statsData} />
    </>
  );
};
