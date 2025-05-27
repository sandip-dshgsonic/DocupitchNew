import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { LIMITS } from "@/lib/constants";
import { errorhandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { getTeamWithUsersAndDocument } from "@/lib/team/helper";
import { getViewPageDuration ,getViewVideoDuration} from "@/lib/tinybird";
import { CustomUser } from "@/lib/types";
import { log } from "@/lib/utils";


import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

const tb = new Tinybird({ token: process.env.TINYBIRD_TOKEN_NO_BEARER! });

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    // GET /api/teams/:teamId/documents/:id/views
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).end("Unauthorized");
    }

    // get document id and teamId from query params

    const { teamId, id: docId } = req.query as { teamId: string; id: string };
    const page = parseInt((req.query.page as string) || "1", 10);
    const limit = parseInt((req.query.limit as string) || "10", 10);
    const offset = (page - 1) * limit;

    console.log("offset", offset);



    // /////////////////

// Define the pipe for sending event data
const fetch = require('node-fetch'); // If using Node.js < v18, you may need to install node-fetch

    const userId = (session.user as CustomUser).id;

    try {
      const team = await prisma.team.findUnique({
        where: {
          id: teamId,
          users: {
            some: {
              userId: userId,
            },
          },
        },
        select: { plan: true },
      });
      console.log("offset 48", team);

      if (!team) {
        return res.status(404).end("Team not found");
      }

      const document = await prisma.document.findUnique({
        where: { id: docId, teamId: teamId },
        select: {
          id: true,
          ownerId: true,
          numPages: true,
          versions: {
            orderBy: { createdAt: "desc" },
            select: {
              versionNumber: true,
              createdAt: true,
              numPages: true,
            },
          },
          _count: {
            select: {
              views: true,
            },
          },
        },
      });
      console.log("offset 75", document);

      if (!document) {
        return res.status(404).end("Document not found");
      }

      const views = await prisma.view.findMany({
        skip: offset, // Implementing pagination
        take: limit, // Limit the number of views fetched
        where: {
          documentId: docId,
        },
        orderBy: {
          viewedAt: "desc",
        },
        include: {
          link: {
            select: {
              name: true,
            },
          },
          feedbackResponse: {
            select: {
              id: true,
              data: true,
            },
          },
          agreementResponse: {
            select: {
              id: true,
              agreementId: true,
              agreement: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
      console.log("offset 115", offset);

      if (!views) {
        return res.status(404).end("Document has no views");
      }

      const users = await prisma.user.findMany({
        where: {
          teams: {
            some: {
              teamId: teamId,
            },
          },
        },
        select: {
          email: true,
        },
      });
      console.log("offset 133", docId);

      // filter the last 20 views
      const limitedViews =
        team.plan === "free" && offset >= LIMITS.views ? [] : views;

        console.log('page api team team id id view index ----- limited views------------152 ',limitedViews)

      const durationsPromises = limitedViews
      // ?.filter((view) => view.link?.name !== "video") 
      ?.map(async (view) => {
        // console.log("Fetching duration for view:", view.id);
        try {
          const documentId = docId;
const viewId = view.id;
const since = 0; // or any appropriate number representing the time since
          return getViewPageDuration(documentId, viewId, since);
          // return await getViewPageDuration({
          //   documentId: docId,
          //   viewId: view.id,
          //   since: 0,
          // });
        } catch (error) {
          console.error(`Failed to fetch duration for viewId ${view.id}:`, error);
          return { data: [] }; // Return empty data if fetch call fails
        }
      });
      
      const durations = await Promise.all(durationsPromises);


///video

// console.log('************179 ',limitedViews)

// const durationsPromisesVideo = limitedViews
// // ?.filter((view) => view.link?.name === "video") 
// ?.map(async (view) => {
//   // console.log("Fetching duration for view:", view.id);
//   try {
//     const documentId = docId;
// const viewId = view.id;
// const since = 0; // or any appropriate number representing the time since
//     return getViewVideoDuration(documentId, viewId, since);
//   } catch (error) {
//     console.error(`Failed to fetch duration for viewId ${view.id}:`, error);
//     return { data: [] }; // Return empty data if fetch call fails
//   }
// });

// const durationsVideo = await Promise.all(durationsPromisesVideo);

// console.log('duration promise video-------------196 ',durationsVideo)

// const viewsWithDurationVideo = limitedViews?.map(
//   (view: any, index: number) => {
//     // Extract video duration data
//     const videoDurationData = durationsVideo[index]?.data || [];

//     console.log('---duration promise video---195-----------',videoDurationData)

//     // Calculate total video duration
//     const totalVideoDuration = videoDurationData.reduce(
//       (total: number, data: { sum_duration: number }) =>
//         total + data.sum_duration,
//       0
//     );

//     console.log('---duration promise video---215-----------',totalVideoDuration)

//     // Extract timestamps
//     const videoTimestamps = videoDurationData.map(
//       (data: { timestamp: string }) => data.timestamp
//     );
//     console.log('---duration promise video---220-----------',videoTimestamps)

//     return {
//       ...view,
//       totalVideoDuration,
//       videoTimestamps,
//     };
//   }
// );


/// video end


      const summedDurations = durations.map((duration, index) => {
        // console.log(`Processing duration at index ${index}:`, duration);
        
        // Check if duration.data exists and is an array
        if (duration.data && Array.isArray(duration.data)) {
          return duration.data.reduce(
            (totalDuration: number, data: { sum_duration: number }) => totalDuration + data.sum_duration,
            0
          );
        } else {
          console.warn(`duration.data is not defined or not an array for duration at index ${index}:`, duration);
          return 0; // Default value if no valid data
        }
      });
      console.log("offset 158", offset);

      // Construct the response combining views and their respective durations
      const viewsWithDuration = limitedViews?.map(
        (view: any, index: number) => {
          // find the relevant document version for the view
          const relevantDocumentVersion = document.versions.find(
            (version) => version.createdAt <= view.viewedAt,
          );

          // get the number of pages for the document version or the document
          const numPages =
            relevantDocumentVersion?.numPages || document.numPages || 0;

          // calculate the completion rate
          const completionRate = numPages
            ? (durations[index].data.length / numPages) * 100
            : 0;

          return {
            ...view,
            internal: users.some((user) => user.email === view.viewerEmail), // set internal to true if view.viewerEmail is in the users list
            duration: durations[index],
            totalDuration: summedDurations[index],
            completionRate: completionRate.toFixed(),
            versionNumber: relevantDocumentVersion?.versionNumber || 0,
            versionNumPages: numPages,
          };
        },
      );
      console.log("offset 188", offset);

      return res.status(200).json({
        viewsWithDuration,
        // viewsWithDurationVideo,
        hiddenViewCount: views.length - limitedViews.length,
        totalViews: document._count.views || 0,
      });
    } catch (error) {
      console.log("index ts 189----------",error)
      log({
        message: `Failed to get views for document: _${docId}_. \n\n ${error} \n\n*Metadata*: \`{teamId: ${teamId}, userId: ${userId}}\``,
        type: "error",
      });
      errorhandler(error, res);
    }
  } else {
    // We only allow GET requests
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}



// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method === "GET") {
//     const session = await getServerSession(req, res, authOptions);
//     if (!session) {
//       return res.status(401).end("Unauthorized");
//     }

//     const { teamId, id: docId } = req.query as { teamId: string; id: string };
//     const page = parseInt((req.query.page as string) || "1", 10);
//     const limit = parseInt((req.query.limit as string) || "10", 10);
//     const offset = (page - 1) * limit;

//     const userId = (session.user as CustomUser).id;

//     try {
//       const team = await prisma.team.findUnique({
//         where: {
//           id: teamId,
//           users: {
//             some: {
//               userId: userId,
//             },
//           },
//         },
//         select: { plan: true },
//       });

//       if (!team) {
//         return res.status(404).end("Team not found");
//       }

//       const document = await prisma.document.findUnique({
//         where: { id: docId, teamId: teamId },
//         select: {
//           id: true,
//           ownerId: true,
//           numPages: true,
//           versions: {
//             orderBy: { createdAt: "desc" },
//             select: {
//               versionNumber: true,
//               createdAt: true,
//               numPages: true,
//             },
//           },
//           _count: {
//             select: {
//               views: true,
//             },
//           },
//         },
//       });

//       if (!document) {
//         return res.status(404).end("Document not found");
//       }

//       const views = await prisma.view.findMany({
//         skip: offset,
//         take: limit,
//         where: {
//           documentId: docId,
//         },
//         orderBy: {
//           viewedAt: "desc",
//         },
//         include: {
//           link: {
//             select: {
//               name: true,
//             },
//           },
//           feedbackResponse: {
//             select: {
//               id: true,
//               data: true,
//             },
//           },
//           agreementResponse: {
//             select: {
//               id: true,
//               agreementId: true,
//               agreement: {
//                 select: {
//                   name: true,
//                 },
//               },
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

//       const limitedViews =
//         team.plan === "free" && offset >= LIMITS.views ? [] : views;

//       const durationsPromises = limitedViews?.map(async (view) => {
//         try {
//           const documentId = docId;
//           const viewId = view.id;
//           const since = 0;
//           return getViewPageDuration(documentId, viewId, since);
//         } catch (error) {
//           console.error(`Failed to fetch duration for viewId ${view.id}:`, error);
//           return { data: [] };
//         }
//       });

//       const durations = await Promise.all(durationsPromises);

//       const summedDurations = durations.map((duration, index) => {
//         if (duration.data && Array.isArray(duration.data)) {
//           return duration.data.reduce(
//             (totalDuration: number, data: { sum_duration: number }) =>
//               totalDuration + data.sum_duration,
//             0
//           );
//         } else {
//           console.warn(
//             `duration.data is not defined or not an array for duration at index ${index}:`,
//             duration
//           );
//           return 0;
//         }
//       });

//       const videoPartsPromises = limitedViews?.map(async (view) => {
//         try {
//           const videoId = docId; // Assuming `docId` is the video ID
//           const viewId = view.id;
//           return getViewVideoDuration(videoId, viewId);
//         } catch (error) {
//           console.error(`Failed to fetch video parts for viewId ${view.id}:`, error);
//           return { data: [] };
//         }
//       });

//       const videoParts = await Promise.all(videoPartsPromises);

//       const viewsWithData = limitedViews?.map((view: any, index: number) => {
//         const relevantDocumentVersion = document.versions.find(
//           (version) => version.createdAt <= view.viewedAt
//         );

//         const numPages =
//           relevantDocumentVersion?.numPages || document.numPages || 0;

//         const completionRate = numPages
//           ? (durations[index].data.length / numPages) * 100
//           : 0;

//         return {
//           ...view,
//           internal: users.some((user) => user.email === view.viewerEmail),
//           duration: durations[index],
//           totalDuration: summedDurations[index],
//           completionRate: completionRate.toFixed(),
//           videoParts: videoParts[index]?.data || [],
//           versionNumber: relevantDocumentVersion?.versionNumber || 0,
//           versionNumPages: numPages,
//         };
//       });

//       return res.status(200).json({
//         viewsWithData,
//         hiddenViewCount: views.length - limitedViews.length,
//         totalViews: document._count.views || 0,
//       });
//     } catch (error) {
//       log({
//         message: `Failed to get views for document: _${docId}_. \n\n ${error} \n\n*Metadata*: \`{teamId: ${teamId}, userId: ${userId}}\``,
//         type: "error",
//       });
//       errorhandler(error, res);
//     }
//   } else {
//     res.setHeader("Allow", ["GET"]);
//     return res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
