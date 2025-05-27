import { NextApiRequest, NextApiResponse } from "next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { client } from "@/trigger";
import { DocumentStorageType } from "@prisma/client";
import { getServerSession } from "next-auth/next";
import { parsePageId } from "notion-utils";

import { errorhandler } from "@/lib/errorHandler";
import notion from "@/lib/notion";
import prisma from "@/lib/prisma";
import { getTeamWithUsersAndDocument } from "@/lib/team/helper";
import { convertFilesToPdfTask } from "@/lib/trigger/convert-files";
import { CustomUser } from "@/lib/types";
import { getExtension, log } from "@/lib/utils";

async function fetchWithRetry(url: string, retries = 3, delay = 1000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return res;
      throw new Error(`Fetch failed: ${res.statusText}`);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error("Failed after retries");
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    console.log("22***********   index")
    // GET /api/teams/:teamId/documents
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).end("Unauthorized");
    }

    const { teamId } = req.query as { teamId: string };

    const userId = (session.user as CustomUser).id;

    try {
      const { team } = await getTeamWithUsersAndDocument({
        teamId,
        userId,
        options: {
          where: {
            folderId: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            _count: {
              select: { links: true, views: true, versions: true },
            },
            links: {
              take: 1,
              select: { id: true },
            },
          },
        },
      });

      const documents = team.documents;

      return res.status(200).json(documents);
    } catch (error) {
      errorhandler(error, res);
    }
  } else if (req.method === "POST") {
    console.log("63***********   index")
    // POST /api/teams/:teamId/documents
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      res.status(401).end("Unauthorized");
      return;
    }
    console.log("70*********** session  index",session)
    const { teamId } = req.query as { teamId: string };
    console.log("70*********** team  index",teamId)

    const userId = (session.user as CustomUser).id;
    console.log("70*********** userid  index",userId)
    // Assuming data is an object with `name` and `description` properties
    const {
      name,
      url: fileUrl,
      storageType,
      numPages,
      type: fileType,
      folderPathName,
      contentType,
      createLink,
    } = req.body as {
      name: string;
      url: string;
      storageType: DocumentStorageType;
      numPages?: number;
      type?: string;
      folderPathName?: string;
      contentType: string;
      createLink?: boolean;
    };
    console.log("96*********** team  index")
    try {
      await getTeamWithUsersAndDocument({
        teamId,
        userId,
      });
      console.log("102*********** team  index")
      // Get passed type property or alternatively, the file extension and save it as the type
      const type = fileType || getExtension(name);

      // Check whether the Notion page is publically accessible or not
      if (type === "notion") {
        console.log("108*********** team  index")
        try {
          const pageId = parsePageId(fileUrl, { uuid: false });
          // if the page isn't accessible then end the process here.
          await notion.getPage(pageId);
        } catch (error) {
          return res
            .status(404)
            .end("This Notion page isn't publically available.");
        }
      }
      console.log("119*********** team  index")

      const folder = await prisma.folder.findUnique({
        where: {
          teamId_path: {
            teamId,
            path: "/" + folderPathName,
          },
        },
        select: {
          id: true,
        },
      });
      console.log("132*********** team  index")

      // Save data to the database
      const document = await prisma.document.create({
        data: {
          name: name,
          numPages: numPages,
          file: fileUrl,
          originalFile: fileUrl,
          contentType: contentType,
          type: type,
          storageType,
          ownerId: (session.user as CustomUser).id,
          teamId: teamId,
          ...(createLink && {
            links: {
              create: {},
            },
          }),
          versions: {
            create: {
              file: fileUrl,
              originalFile: fileUrl,
              contentType: contentType,
              type: type,
              storageType,
              numPages: numPages,
              isPrimary: true,
              versionNumber: 1,
            },
          },
          folderId: folder?.id ? folder.id : null,
        },
        include: {
          links: true,
          versions: true,
        },
      });
      console.log("170*********** team  index")

      if (type === "docs" || type === "slides") {
        console.log("converting docx or pptx to pdf");
        // Trigger convert-files-to-pdf task
        await convertFilesToPdfTask.trigger(
          {
            documentId: document.id,
            documentVersionId: document.versions[0].id,
            teamId,
          },
          {
            idempotencyKey: `${teamId}-${document.versions[0].id}`,
            tags: [`team_${teamId}`, `document_${document.id}`],
          },
        );
      }

      // skip triggering convert-pdf-to-image job for "notion" / "excel" documents
      if (type === "pdf") {
        console.log("190*********** team  index",document,document.versions[0].id,teamId,document.id)


        console.log("SendEvent Payload:", {
          id: document.versions[0].id,
          name: "document.uploaded",
          payload: {
            documentVersionId: document.versions[0].id,
            teamId,
            documentId: document.id,
          },
        });

        // trigger document uploaded event to trigger convert-pdf-to-image job
        try{
          await client.sendEvent({
            id: document.versions[0].id, // unique eventId for the run
            name: "document.uploaded",
            payload: {
              documentVersionId: document.versions[0].id,
              teamId: teamId,
              documentId: document.id,
            },
          });
        }catch (error) {
          console.log("Error sending event:", error);
          log({
            message: `Failed to send event. \n\n*teamId*: _${teamId}_, \n\n*file*: ${fileUrl} \n\n ${error}`,
            type: "error",
          });
        }
       
      }
console.log('sendEvent Payload endded')
      return res.status(201).json(document);
    } catch (error) {
      log({
        message: `Failed to create document. \n\n*teamId*: _${teamId}_, \n\n*file*: ${fileUrl} \n\n ${error}`,
        type: "error",
      });
      errorhandler(error, res);
    }
  } else {
    console.log("206***********   index")
    // We only allow GET and POST requests
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
