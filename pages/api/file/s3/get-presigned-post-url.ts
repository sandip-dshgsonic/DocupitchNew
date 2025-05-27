// import { NextApiRequest, NextApiResponse } from "next";

// import { PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import slugify from "@sindresorhus/slugify";
// import { getServerSession } from "next-auth";
// import path from "node:path";

// import { ONE_HOUR, ONE_SECOND } from "@/lib/constants";
// import { getS3Client } from "@/lib/files/aws-client";
// import prisma from "@/lib/prisma";
// import { CustomUser } from "@/lib/types";

// import { authOptions } from "../../auth/[...nextauth]";

// const client = getS3Client();

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   if (req.method !== "POST") {
//     return res.status(405).end("Method Not Allowed");
//   }

//   const { fileName, contentType, teamId, docId } = req.body as {
//     fileName: string;
//     contentType: string;
//     teamId: string;
//     docId: string;
//   };

//   const session = await getServerSession(req, res, authOptions);
//   if (!session) {
//     return res.status(401).end("Unauthorized");
//   }

//   const team = await prisma.team.findUnique({
//     where: {
//       id: teamId,
//       users: {
//         some: {
//           userId: (session.user as CustomUser).id,
//         },
//       },
//     },
//     select: { id: true },
//   });

//   if (!team) {
//     return res.status(403).end("Unauthorized to access this team");
//   }

//   try {
//     // Get the basename and extension for the file
//     const { name, ext } = path.parse(fileName);

//     let key = `${team.id}/${docId}/${slugify(name)}${ext}`;

//     const putObjectCommand = new PutObjectCommand({
//       Bucket: process.env.NEXT_PRIVATE_UPLOAD_BUCKET,
//       Key: key,
//       ContentType: contentType,
//     });

//     const url = await getSignedUrl(client, putObjectCommand, {
//       expiresIn: ONE_HOUR / ONE_SECOND,
//     });

//     return res.status(200).json({ url, key, docId });
//   } catch (error) {
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }





// /////////////////////////////// directly upload to s3 bucket public
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { authOptions } from "../../auth/[...nextauth]";
// import { CustomUser } from "@/lib/types";
// import prisma from "@/lib/prisma";
// import slugify from "@sindresorhus/slugify";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const s3 = new S3Client({
//   region: process.env.NEXT_PRIVATE_UPLOAD_REGION!,
//   credentials: {
//     accessKeyId: process.env.NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY!,
//   },
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

//   const session = await getServerSession(req, res, authOptions);
//   if (!session) return res.status(401).end("Unauthorized");

//   const buffers: Buffer[] = [];
//   const contentType = req.headers["content-type"];

//   if (!contentType?.startsWith("multipart/form-data")) {
//     return res.status(400).json({ error: "Invalid content-type" });
//   }

//   const busboy = require("busboy");
//   const bb = busboy({ headers: req.headers });

//   let fileBuffer: Buffer = Buffer.alloc(0);
//   let fileName = "";
//   let fileType = "";
//   let teamId = "";
//   let docId = "";

//   bb.on("file", (_, file, info) => {
//     fileName = info.filename;
//     fileType = info.mimeType;

//     file.on("data", (data: Buffer) => {
//       fileBuffer = Buffer.concat([fileBuffer, data]);
//     });
//   });

//   bb.on("field", (name, val) => {
//     if (name === "teamId") teamId = val;
//     if (name === "docId") docId = val;
//   });

//   bb.on("finish", async () => {
//     if (!fileName || !fileType || !teamId || !docId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const team = await prisma.team.findUnique({
//       where: {
//         id: teamId,
//         users: {
//           some: {
//             userId: (session.user as CustomUser).id,
//           },
//         },
//       },
//     });

//     if (!team) return res.status(403).end("Unauthorized to access this team");

//     const { name, ext } = path.parse(fileName);
//     const s3Key = `${team.id}/${docId}/${slugify(name)}${ext}`;

//     try {
//       const putCommand = new PutObjectCommand({
//         Bucket: process.env.NEXT_PRIVATE_UPLOAD_BUCKET!,
//         Key: s3Key,
//         Body: fileBuffer,
//         ContentType: fileType,
//         // ACL: "public-read",
//       });

//       await s3.send(putCommand);

//       const fileUrl = `https://${process.env.NEXT_PRIVATE_UPLOAD_BUCKET}.s3.${process.env.NEXT_PRIVATE_UPLOAD_REGION}.amazonaws.com/${s3Key}`;

//       return res.status(200).json({
//         key: s3Key,
//         url: fileUrl,
//         docId,
//       });
//     } catch (error) {
//       console.error("S3 upload failed:", error);
//       return res.status(500).json({ error: `Failed to upload to S3 ${error} ----` });
//     }
//   });

//   req.pipe(bb);
// }


// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { authOptions } from "../../auth/[...nextauth]";
// import { CustomUser } from "@/lib/types";
// import prisma from "@/lib/prisma";
// import slugify from "@sindresorhus/slugify";
// import path from "path";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// const s3 = new S3Client({
//   region: process.env.NEXT_PRIVATE_UPLOAD_REGION!,
//   credentials: {
//     accessKeyId: process.env.NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY!,
//   },
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

//   const session = await getServerSession(req, res, authOptions);
//   if (!session) return res.status(401).end("Unauthorized");

//   const busboy = require("busboy");
//   const bb = busboy({ headers: req.headers });

//   let fileName = "";
//   let fileType = "";
//   let teamId = "";
//   let docId = "";

//   bb.on("file", (_, file, info) => {
//     fileName = info.filename;
//     fileType = info.mimeType;
//     file.resume(); // Skip processing file data
//   });

//   bb.on("field", (name, val) => {
//     if (name === "teamId") teamId = val;
//     if (name === "docId") docId = val;
//   });

//   bb.on("finish", async () => {
//     if (!fileName || !fileType || !teamId || !docId) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const team = await prisma.team.findUnique({
//       where: {
//         id: teamId,
//         users: {
//           some: {
//             userId: (session.user as CustomUser).id,
//           },
//         },
//       },
//     });

//     if (!team) return res.status(403).end("Unauthorized to access this team");

//     const { name, ext } = path.parse(fileName);
//     const s3Key = `${team.id}/${docId}/${slugify(name)}${ext}`;

//     try {
//       const command = new PutObjectCommand({
//         Bucket: process.env.NEXT_PRIVATE_UPLOAD_BUCKET!,
//         Key: s3Key,
//         ContentType: fileType,
//       });

//       const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 mins

//       return res.status(200).json({
//         key: s3Key,
//         url: signedUrl,
//         uploadUrl: signedUrl,
//         docId,
//       });
//     } catch (error) {
//       console.error("Failed to generate signed URL:", error);
//       return res.status(500).json({ error: `Failed to generate signed URL: ${error}` });
//     }
//   });

//   req.pipe(bb);
// }


import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { authOptions } from "../../auth/[...nextauth]";
import { CustomUser } from "@/lib/types";
import prisma from "@/lib/prisma";
import slugify from "@sindresorhus/slugify";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

const s3 = new S3Client({
  region: process.env.NEXT_PRIVATE_UPLOAD_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY!,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(401).end("Unauthorized");

  const busboy = require("busboy");
  const bb = busboy({ headers: req.headers });

  let fileName = "";
  let fileType = "";
  let teamId = "";
  let docId = "";

  bb.on("file", (_fieldname: string, file: NodeJS.ReadableStream, info: { filename: string; encoding: string; mimeType: string }) => {
    fileName = info.filename;
    fileType = info.mimeType;
    file.resume(); // Skip processing file data
  });

  bb.on("field", (name: string, val: string) => {
    if (name === "teamId") teamId = val;
    if (name === "docId") docId = val;
  });

  bb.on("finish", async () => {
    if (!fileName || !fileType || !teamId || !docId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const team = await prisma.team.findUnique({
      where: {
        id: teamId,
        users: {
          some: {
            userId: (session.user as CustomUser).id,
          },
        },
      },
    });

    if (!team) return res.status(403).end("Unauthorized to access this team");

    const { name, ext } = path.parse(fileName);
    const s3Key = `${team.id}/${docId}/${slugify(name)}${ext}`;

    try {
      const command = new PutObjectCommand({
        Bucket: process.env.NEXT_PRIVATE_UPLOAD_BUCKET!,
        Key: s3Key,
        ContentType: fileType,
      });

      const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 * 5 }); // 5 mins

      return res.status(200).json({
        key: s3Key,
        url: signedUrl,
        uploadUrl: signedUrl,
        docId,
      });
    } catch (error) {
      console.error("Failed to generate signed URL:", error);
      return res.status(500).json({ error: `Failed to generate signed URL: ${error}` });
    }
  });

  req.pipe(bb);
}   