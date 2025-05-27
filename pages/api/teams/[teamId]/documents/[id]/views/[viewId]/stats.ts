import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";

import { errorhandler } from "@/lib/errorHandler";
import prisma from "@/lib/prisma";
import { getTeamWithUsersAndDocument } from "@/lib/team/helper";
import { getViewPageDuration } from "@/lib/tinybird";
import { CustomUser } from "@/lib/types";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // console.log("---16 stats viewid before auth ",req.method)
  if (req.method === "GET") {
    // GET /api/teams/:teamId/documents/:id/views/:viewId/stats
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      console.log("---20 stats viewid auth")
      return res.status(401).end("Unauthorized");
    }
    // console.log("---24 stats viewid auth session ",req.query)
    const {
      teamId,
      id: docId,
      viewId,
    } = req.query as {
      teamId: string;
      id: string;
      viewId: string;
    };

    const userId = (session.user as CustomUser).id;

    try {
      await getTeamWithUsersAndDocument({
        teamId,
        userId,
        docId,
        checkOwner: true,
        options: {
          select: {
            id: true,
            ownerId: true,
          },
        },
      });
      console.log("---50 stats viewid auth session ")

      const duration = await getViewPageDuration(
         docId,
         viewId,
         0
      );
 console.log("---56 stats viewid auth session ")
      // const total_duration = duration.data.reduce(
      //   (totalDuration, data) => totalDuration + data.sum_duration,
      //   0,
      // );
      const total_duration = duration.data.reduce(
        (totalDuration: number, data: { sum_duration: number }) => totalDuration + data.sum_duration,
        0
      );
      console.log("---60 stats viewid auth session ")
      const stats = { duration, total_duration };
      console.log("---63 stats viewid auth session ",stats)
      return res.status(200).json(stats);
    } catch (error) {
      errorhandler(error, res);
    }
  } else {
    // We only allow GET and POST requests
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
