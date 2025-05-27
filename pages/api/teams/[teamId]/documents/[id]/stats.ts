// import { NextApiRequest, NextApiResponse } from "next";

// import { View } from "@prisma/client";
// import { getServerSession } from "next-auth/next";

// import { LIMITS } from "@/lib/constants";
// import { errorhandler } from "@/lib/errorHandler";
// import prisma from "@/lib/prisma";
// import { getTeamWithUsersAndDocument } from "@/lib/team/helper";
// import { getTotalAvgPageDuration } from "@/lib/tinybird";
// import { CustomUser } from "@/lib/types";

// import { authOptions } from "../../../../auth/[...nextauth]";

// // export default async function handle(
// //   req: NextApiRequest,
// //   res: NextApiResponse,
// // ) {
// //   if (req.method === "GET") {
// //     // GET /api/teams/:teamId/documents/:id/stats
// //     const session = await getServerSession(req, res, authOptions);
// //     if (!session) {
// //       console.log("stats ---------------23")
// //       return res.status(401).end("Unauthorized");
// //     }
// //     console.log("stats ---------------26")
// //     const {
// //       teamId,
// //       id: docId,
// //       excludeTeamMembers,
// //     } = req.query as {
// //       teamId: string;
// //       id: string;
// //       excludeTeamMembers?: string;
// //     };

// //     const userId = (session.user as CustomUser).id;

// //     try {
// //       const document = await prisma.document.findUnique({
// //         where: {
// //           id: docId,
// //           teamId,
// //         },
// //         include: {
// //           views: true,
// //           team: {
// //             select: {
// //               plan: true,
// //             },
// //           },
// //         },
// //       });
// //       console.log("stats ---------------54")
// //       // const { document } = await getTeamWithUsersAndDocument({
// //       //   teamId,
// //       //   userId,
// //       //   docId,
// //       //   checkOwner: true,
// //       //   options: {
// //       //     include: {
// //       //       views: true,
// //       //       team: true,
// //       //     },
// //       //   },
// //       // });

// //       const users = await prisma.user.findMany({
// //         where: {
// //           teams: {
// //             some: {
// //               teamId: teamId,
// //             },
// //           },
// //         },
// //         select: {
// //           email: true,
// //         },
// //       });

// //       const views = document?.views;

// //       // if there are no views, return an empty array
// //       if (!views) {
// //         return res.status(200).json({
// //           views: [],
// //           duration: { data: [] },
// //           total_duration: 0,
// //           groupedReactions: [],
// //         });
// //       }

// //       const totalViews = views.length;
// //       console.log("stats ---------------94")
// //       // limit the number of views to 20 on free plan
// //       const limitedViews =
// //         document?.team?.plan === "free" ? views.slice(0, LIMITS.views) : views;

// //       // exclude views from the team's members
// //       let excludedViews: View[] = [];
// //       if (excludeTeamMembers) {
// //         excludedViews = limitedViews.filter((view) => {
// //           return users.some((user) => user.email === view.viewerEmail);
// //         });
// //       }

// //       const filteredViews = limitedViews.filter(
// //         (view) => !excludedViews.map((view) => view.id).includes(view.id),
// //       );
// //       console.log("stats ---------------110")
// //       const groupedReactions = await prisma.reaction.groupBy({
// //         by: ["type"],
// //         where: {
// //           view: {
// //             documentId: docId,
// //             id: { notIn: excludedViews.map((view) => view.id) },
// //           },
// //         },
// //         _count: { type: true },
// //       });
// //       console.log("stats ---------------121")
// //       const duration = await getTotalAvgPageDuration({
// //         documentId: docId,
// //         excludedLinkIds: [],
// //         excludedViewIds: excludedViews.map((view) => view.id),
// //         since: 0,
// //       });

// //       const total_duration = duration.data.reduce(
// //         (totalDuration, data) => totalDuration + data.avg_duration,
// //         0,
// //       );

// //       const stats = {
// //         views: filteredViews,
// //         duration,
// //         total_duration,
// //         groupedReactions,
// //         totalViews,
// //       };

// //       return res.status(200).json(stats);
// //     } catch (error) {
// //       errorhandler(error, res);
// //     }
// //   } else {
// //     // We only allow GET requests
// //     res.setHeader("Allow", ["GET"]);
// //     return res.status(405).end(`Method ${req.method} Not Allowed`);
// //   }
// // }

// // Assuming the shape of the data object
// interface DurationData {
//   avg_duration: number;
// }

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
  
//   if (req.method === "GET") {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       return res.status(401).end("Unauthorized");
//     }

//     const {
//       teamId,
//       id: docId,
//       excludeTeamMembers,
//     } = req.query as {
//       teamId: string;
//       id: string;
//       excludeTeamMembers?: string;
//     };

//     const userId = (session.user as CustomUser).id;

//     try {
//       const document = await prisma.document.findUnique({
//         where: {
//           id: docId,
//           teamId,
//         },
//         include: {
//           views: true,
//           team: {
//             select: {
//               plan: true,
//             },
//           },
//         },
//       });

//       const users = await prisma.user.findMany({
//         where: {
//           teams: {
//             some: {
//               teamId: teamId,
//             },
//           },
//         },
//         select: {
//           email: true,
//         },
//       });

//       const views = document?.views;

//       if (!views) {
//         return res.status(200).json({
//           views: [],
//           duration: { data: [] },
//           total_duration: 0,
//           groupedReactions: [],
//         });
//       }

//       const totalViews = views.length;
//       const limitedViews =
//         document?.team?.plan === "free" ? views.slice(0, LIMITS.views) : views;

//       let excludedViews: View[] = [];
//       if (excludeTeamMembers) {
//         excludedViews = limitedViews.filter((view) => {
//           return users.some((user) => user.email === view.viewerEmail);
//         });
//       }

//       const filteredViews = limitedViews.filter(
//         (view) => !excludedViews.map((view) => view.id).includes(view.id),
//       );

//       const groupedReactions = await prisma.reaction.groupBy({
//         by: ["type"],
//         where: {
//           view: {
//             documentId: docId,
//             id: { notIn: excludedViews.map((view) => view.id) },
//           },
//         },
//         _count: { type: true },
//       });
//       console.log('245----stats-----')
//       const duration = await getTotalAvgPageDuration({
//         documentId: docId,
//         excludedLinkIds: [],
//         excludedViewIds: excludedViews.map((view) => view.id),
//         since: 0,
//       });
//       // console.log('252----stats-----',duration)
      
//       // Explicitly typing the reduce parameters
//       // let total_duration = 0;
//       // try {
//       //    total_duration = duration.data.reduce(
//       //     (totalDuration: number, data: DurationData) => totalDuration + data.avg_duration,
//       //     0,
//       //   );
//       // } catch (error) {
//       //   console.log('257----stats-----',error)
//       // }
//       let total_duration = 0;
//       try {
//         if (duration.data && Array.isArray(duration.data)) {
//           total_duration = duration.data.reduce(
//             (totalDuration: number, data: DurationData) => totalDuration + data.avg_duration,
//             0,
//           );
//         } else {
//           console.error('duration.data is not an array or is undefined:', duration.data);
//         }
//       } catch (error) {
//         console.log('257----stats-----', error);
//       }
      
//       console.log('258----stats-----')
//       const stats = {
//         views: filteredViews,
//         duration,
//         total_duration,
//         groupedReactions,
//         totalViews,
//       };
//       console.log('266----stats-----')
//       return res.status(200).json(stats);
//     } catch (error) {
//       errorhandler(error, res);
//     }


  
  
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }





// import { NextApiRequest, NextApiResponse } from "next";
// import { View } from "@prisma/client";
// import { getServerSession } from "next-auth/next";

// import { LIMITS } from "@/lib/constants";
// import { errorhandler } from "@/lib/errorHandler";
// import prisma from "@/lib/prisma";
// import { getTotalAvgPageDuration } from "@/lib/tinybird";
// import { CustomUser } from "@/lib/types";

// import { authOptions } from "../../../../auth/[...nextauth]";

// interface DurationData {
//   avg_duration: number;
// }

// type DurationResponse = Awaited<ReturnType<typeof getTotalAvgPageDuration>>;

// // --- simple in‑memory cache for durations ---
// interface DurationCacheEntry {
//   timestamp: number;
//   duration: DurationResponse;
// }
// const durationCache = new Map<string, DurationCacheEntry>();
// const CACHE_TTL = 15 * 60 * 1000; // 15 minutes in ms
// // -------------------------------------------

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method !== "GET") {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }

//   // auth
//   const session = await getServerSession(req, res, authOptions);
//   if (!session) return res.status(401).end("Unauthorized");
//   const userId = (session.user as CustomUser).id;

//   const {
//     teamId,
//     id: docId,
//     excludeTeamMembers,
//   } = req.query as {
//     teamId: string;
//     id: string;
//     excludeTeamMembers?: string;
//   };

//   try {
//     // fetch document + views + plan
//     const document = await prisma.document.findUnique({
//       where: { id: docId, teamId },
//       include: {
//         views: true,
//         team: { select: { plan: true } },
//       },
//     });

//     if (!document) {
//       return res.status(404).json({ error: "Document not found" });
//     }

//     // fetch team users for optional exclusion
//     const users = await prisma.user.findMany({
//       where: { teams: { some: { teamId } } },
//       select: { email: true },
//     });

//     const views = document.views ?? [];
//     if (views.length === 0) {
//       return res.status(200).json({
//         views: [],
//         duration: { data: [] as DurationData[] },
//         total_duration: 0,
//         groupedReactions: [],
//         totalViews: 0,
//       });
//     }

//     const totalViews = views.length;
//     const limitedViews =
//       document.team.plan === "free" ? views.slice(0, LIMITS.views) : views;

//     // compute excludedViews if asked
//     let excludedViews: View[] = [];
//     if (excludeTeamMembers) {
//       excludedViews = limitedViews.filter((v) =>
//         users.some((u) => u.email === v.viewerEmail)
//       );
//     }

//     const excludedIds = new Set(excludedViews.map((v) => v.id));
//     const filteredViews = limitedViews.filter((v) => !excludedIds.has(v.id));

//     // grouped reactions
//     const groupedReactions = await prisma.reaction.groupBy({
//       by: ["type"],
//       where: {
//         view: { documentId: docId, id: { notIn: Array.from(excludedIds) } },
//       },
//       _count: { type: true },
//     });

//     // === DURATION: check cache first ===
//     const cacheKey = `duration_${docId}`;
//     let durationResp: DurationResponse | undefined;
//     const cached = durationCache.get(cacheKey);

//     if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
//       // use cached
//       durationResp = cached.duration;
//       console.log(`Using cached duration for doc ${docId}`);
//     } else {
//       // fresh fetch
//       try {
//         durationResp = await getTotalAvgPageDuration({
//           documentId: docId,
//           excludedLinkIds: [],
//           excludedViewIds: Array.from(excludedIds),
//           since: 0,
//         });
//         // store in cache
//         durationCache.set(cacheKey, {
//           timestamp: Date.now(),
//           duration: durationResp,
//         });
//         console.log(`Fetched & cached duration for doc ${docId}`);
//       } catch (apiErr) {
//         console.error(
//           `Error fetching duration for ${docId}:`,
//           apiErr
//         );
//         if (cached) {
//           // fallback to stale cache
//           durationResp = cached.duration;
//           console.warn(
//             `Falling back to stale cache for doc ${docId} (age=${Date.now() -
//               cached.timestamp}ms)`
//           );
//         } else {
//           // no cache to fallback
//           throw apiErr;
//         }
//       }
//     }
//     // ===================================

//     // sum up total_duration
//     let total_duration = 0;
//     if (durationResp.data && Array.isArray(durationResp.data)) {
//       total_duration = durationResp.data.reduce(
//         (sum: number, d: DurationData) => sum + d.avg_duration,
//         0
//       );
//     } else {
//       console.warn("durationResp.data is missing or not an array:", durationResp);
//     }

//     return res.status(200).json({
//       views: filteredViews,
//       duration: durationResp,
//       total_duration,
//       groupedReactions,
//       totalViews,
//     });
//   } catch (error) {
//     return errorhandler(error, res);
//   }
// }


import { NextApiRequest, NextApiResponse } from "next";
import { View } from "@prisma/client";
import { getServerSession } from "next-auth/next";

import { LIMITS } from "@/lib/constants";
import { errorhandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { getTotalAvgPageDuration } from "@/lib/tinybird";
import { CustomUser } from "@/lib/types";

import { authOptions } from "../../../../auth/[...nextauth]";

interface DurationData { avg_duration: number }
type DurationResponse = Awaited<ReturnType<typeof getTotalAvgPageDuration>>;

// in‑memory caches (unchanged)
interface FullStatsEntry { timestamp: number; payload: any }
const fullStatsCache = new Map<string, FullStatsEntry>();

interface DurationCacheEntry { timestamp: number; duration: DurationResponse }
const durationCache = new Map<string, DurationCacheEntry>();

const CACHE_TTL = 1 * 60 * 1000; // 10 minutes in milliseconds

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // *** Client‑side caching for 10 minutes ***
  // max-age=900 → browser will serve from cache without any request
  res.setHeader("Cache-Control", "public, max-age=60, s-maxage=60, immutable");
  // res.setHeader("Cache-Control", "no-cache, max-age=0");
  // res.setHeader("Cache-Control", "no-store");


  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");

  const { teamId, id: docId, excludeTeamMembers } = req.query as {
    teamId: string;
    id: string;
    excludeTeamMembers?: string;
  };
  const excludeFlag = excludeTeamMembers ? "1" : "0";
  const fullKey = `${docId}_${excludeFlag}`;

  // 1) Full‑response cache
  const fullCached = fullStatsCache.get(fullKey);
  if (fullCached && Date.now() - fullCached.timestamp < CACHE_TTL) {
    console.log(`📋 Using full‑stats cache for ${fullKey}`);
    return res.status(200).json(fullCached.payload);
  }

  try {
    // 2) fetch document + plan + views
    const document = await prisma.document.findUnique({
      where: { id: docId, teamId },
      include: { views: true, team: { select: { plan: true } } },
    });
    if (!document) return res.status(404).json({ error: "Document not found" });

    // 3) optionally load team users
    const users = await prisma.user.findMany({
      where: { teams: { some: { teamId } } },
      select: { email: true },
    });

    const allViews = document.views || [];
    if (allViews.length === 0) {
      const empty = {
        views: [],
        duration: { data: [] as DurationData[] },
        total_duration: 0,
        groupedReactions: [],
        totalViews: 0,
      };
      fullStatsCache.set(fullKey, { timestamp: Date.now(), payload: empty });
      return res.status(200).json(empty);
    }

    const totalViews = allViews.length;
    const limited =
      document.team.plan === "free"
        ? allViews.slice(0, LIMITS.views)
        : allViews;

    // 4) exclude team members
    let excluded: View[] = [];
    if (excludeTeamMembers) {
      excluded = limited.filter((v) =>
        users.some((u) => u.email === v.viewerEmail)
      );
    }
    const excludedIds = new Set(excluded.map((v) => v.id));
    const filtered = limited.filter((v) => !excludedIds.has(v.id));

    // 5) grouped reactions
    const groupedReactions = await prisma.reaction.groupBy({
      by: ["type"],
      where: {
        view: { documentId: docId, id: { notIn: Array.from(excludedIds) } },
      },
      _count: { type: true },
    });

    // 6) getTinybird duration (with its own cache)
    const durKey = `duration_${docId}`;
    let durationResp: DurationResponse;
    const durCached = durationCache.get(durKey);

    if (durCached && Date.now() - durCached.timestamp < CACHE_TTL) {
      console.log(`⏱ Using duration cache for ${docId}`);
      durationResp = durCached.duration;
    } else {
      try {
        durationResp = await getTotalAvgPageDuration({
          documentId: docId,
          excludedLinkIds: [],
          excludedViewIds: Array.from(excludedIds),
          since: 0,
        });
        durationCache.set(durKey, {
          timestamp: Date.now(),
          duration: durationResp,
        });
        console.log(`✅ Fetched & cached duration for ${docId}`);
      } catch (e) {
        console.error(`⚠ Tinybird error for ${docId}:`, e);
        if (durCached) {
          console.warn("↩ Falling back to stale duration cache");
          durationResp = durCached.duration;
        } else {
          throw e;
        }
      }
    }

    // 7) sum durations
    let total_duration = 0;
    // if (Array.isArray(durationResp.data)) {
    //   total_duration = durationResp.data.reduce(
    //     (sum, d) => sum + d.avg_duration,
    //     0
    //   );
    // }
    total_duration = durationResp.data.reduce(
      (sum: number, d: DurationData) => sum + d.avg_duration,
      0
    );

    // 8) final payload + prime full cache
    const payload = {
      views: filtered,
      duration: durationResp,
      total_duration,
      groupedReactions,
      totalViews,
    };
    fullStatsCache.set(fullKey, {
      timestamp: Date.now(),
      payload,
    });

    return res.status(200).json(payload);
  } catch (err) {
    return errorhandler(err, res);
  }
}
