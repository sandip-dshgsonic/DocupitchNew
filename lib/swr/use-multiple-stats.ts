import { useState, useEffect } from "react";
import { useTeam } from "@/context/team-context";
import { View } from "@prisma/client";
import useSWR from "swr";

import { fetcher } from "@/lib/utils";

export type TStatsData = {
  views: View[];
  groupedReactions: { type: string; _count: { type: number } }[];
  duration: {
    data: { versionNumber: number; pageNumber: string; avg_duration: number }[];
  };
  total_duration: number;
  totalViews: number;
};

export type MultiDocumentStatsResult = {
  combinedStats: {
    totalViews: number;
    uniqueViews: number;
    avgDuration: {
      value: string;
      unit: "seconds" | "minutes";
    };
    totalDuration: number;
  };
  individualStats: Record<string, TStatsData | undefined>;
  loading: boolean;
  error: any;
};

/**
 * Hook to fetch stats for multiple documents
 */
export function useMultiDocumentStats({
  documentIds,
  excludeTeamMembers = false,
}: {
  documentIds: string[];
  excludeTeamMembers?: boolean;
}): MultiDocumentStatsResult {
  const teamInfo = useTeam();
  const [individualStats, setIndividualStats] = useState<Record<string, TStatsData | undefined>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const [combinedStats, setCombinedStats] = useState<MultiDocumentStatsResult['combinedStats']>({
    totalViews: 0,
    uniqueViews: 0,
    avgDuration: {
      value: "0",
      unit: "seconds",
    },
    totalDuration: 0,
  });

  useEffect(() => {
    if (!teamInfo?.currentTeam || !documentIds.length) {
      return;
    }

    const fetchAllStats = async () => {
      setIsLoading(true);
      try {
        const statsPromises = documentIds.map(id => 
          fetch(`/api/teams/${teamInfo.currentTeam!.id}/documents/${encodeURIComponent(id)}/stats${excludeTeamMembers ? "?excludeTeamMembers=true" : ""}`)
            .then(res => res.json())
            .catch(err => {
              console.error(`Error fetching stats for document ${id}:`, err);
              return undefined;
            })
        );

        const results = await Promise.all(statsPromises);
        
        // Organize results by document ID
        const statsMap: Record<string, TStatsData | undefined> = {};
        documentIds.forEach((id, index) => {
          statsMap[id] = results[index];
        });
        
        setIndividualStats(statsMap);
        
        // Calculate combined stats
        let totalViewsCount = 0;
        let totalDurationSum = 0;
        const allViewerEmails = new Set<string>();

        // Filter out undefined results
        const validResults = results.filter(result => result !== undefined) as TStatsData[];
        
        validResults.forEach(stats => {
          totalViewsCount += stats.views.length;
          totalDurationSum += stats.total_duration;
          
          // Collect unique viewer emails
          stats.views.forEach(view => {
            if (view.viewerEmail) {
              allViewerEmails.add(view.viewerEmail);
            }
          });
        });

        // Calculate average duration
        let formattedAvgDuration = "0";
        let durationUnit: "seconds" | "minutes" = "seconds";
        
        if (totalViewsCount > 0) {
          const avgDuration = Math.floor(totalDurationSum / totalViewsCount);
          
          if (avgDuration < 60000) {
            formattedAvgDuration = `${Math.round(avgDuration / 1000)}`;
            durationUnit = "seconds";
          } else {
            const minutes = Math.floor(avgDuration / 60000);
            const seconds = Math.round((avgDuration % 60000) / 1000);
            formattedAvgDuration = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
            durationUnit = "minutes";
          }
        }

        setCombinedStats({
          totalViews: totalViewsCount,
          uniqueViews: allViewerEmails.size,
          avgDuration: {
            value: formattedAvgDuration,
            unit: durationUnit,
          },
          totalDuration: totalDurationSum,
        });
        
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching multiple document stats:", err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchAllStats();
  }, [teamInfo?.currentTeam, documentIds, excludeTeamMembers]);

  return {
    combinedStats,
    individualStats,
    loading: isLoading,
    error,
  };
}