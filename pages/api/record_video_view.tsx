// import { NextApiRequest, NextApiResponse } from "next";
// import { z } from "zod";
// import { newId } from "@/lib/id-helper";
// import { publishVideoView } from "@/lib/tinybird";
// import { Geo } from "@/lib/types";
// import { capitalize, getDomainWithoutWWW, log } from "@/lib/utils";
// import { LOCALHOST_GEO_DATA, getGeoData } from "@/lib/utils/geo";
// import { userAgentFromString } from "@/lib/utils/user-agent";

// const bodyValidation = z.object({
//   id: z.string(),
//   // linkId: z.string(),
//   documentName: z.string(),
//   viewId: z.string(),
//   versionNumber: z.number().int().optional(),
//   duration: z.number().int(),
//   playRecords: z
//     .array(
//       z.object({
//         time: z.number().int(),
//         timestamp: z.string(), // ISO string representation of timestamp
//       })
//     )
//     .optional(),
//   country: z.string().optional(),
//   city: z.string().optional(),
//   region: z.string().optional(),
//   latitude: z.string().optional(),
//   longitude: z.string().optional(),
//   ua: z.string().optional(),
//   browser: z.string().optional(),
//   browser_version: z.string().optional(),
//   engine: z.string().optional(),
//   engine_version: z.string().optional(),
//   os: z.string().optional(),
//   os_version: z.string().optional(),
//   device: z.string().optional(),
//   device_vendor: z.string().optional(),
//   device_model: z.string().optional(),
//   cpu_architecture: z.string().optional(),
//   bot: z.boolean().optional(),
//   referer: z.string().optional(),
//   referer_url: z.string().optional(),
// });

// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {

//   console.log('apegs api record video veiw 51')
//   if (req.method !== "POST") {
//     res.status(405).json({ message: "Method Not Allowed" });
//     return;
//   }

//   const geo: Geo =
//     process.env.VERCEL === "1" ? getGeoData(req.headers) : LOCALHOST_GEO_DATA;

//   const referer = req.headers.referer;
//   const ua = userAgentFromString(req.headers["user-agent"]);

//   const {
//     // linkId,
//     documentName,
//     viewId,
//     duration,
//     playRecords,
//     versionNumber,
//   } = req.body as {
//     // linkId: string;
//     documentName: string;
//     viewId: string;
//     duration: number;
//     playRecords?: { time: number; timestamp: string }[];
//     versionNumber?: number;
//   };

//   const time = Date.now(); // in milliseconds

//   const videoViewId = newId("video_view");
//   console.log('apegs api record video veiw 81')
//   const videoViewObject = {
//     id: videoViewId,
//     // linkId,
//     documentName,
//     viewId,
//     versionNumber: versionNumber || 1,
//     duration,
//     playRecords: playRecords || [],
//     time,
//     country: geo?.country || "Unknown",
//     city: geo?.city || "Unknown",
//     region: geo?.region || "Unknown",
//     latitude: geo?.latitude || "Unknown",
//     longitude: geo?.longitude || "Unknown",
//     ua: ua?.ua || "Unknown",
//     browser: ua?.browser?.name || "Unknown",
//     browser_version: ua?.browser?.version || "Unknown",
//     engine: ua?.engine?.name || "Unknown",
//     engine_version: ua?.engine?.version || "Unknown",
//     os: ua?.os?.name || "Unknown",
//     os_version: ua?.os?.version || "Unknown",
//     device: ua?.device?.type ? capitalize(ua?.device?.type) : "Desktop",
//     device_vendor: ua?.device?.vendor || "Unknown",
//     device_model: ua?.device?.model || "Unknown",
//     cpu_architecture: ua?.cpu?.architecture || "Unknown",
//     bot: ua?.isBot,
//     referer: referer ? getDomainWithoutWWW(referer) : "(direct)",
//     referer_url: referer || "(direct)",
//   };

//   const result = bodyValidation.safeParse(videoViewObject);
//   if (!result.success) {
//     return res.status(400).json({ error: `Invalid body: ${result.error.message}` });
//   }

//   try {
//     console.log('apegs api record video veiw 119 ',result.data)
//     await publishVideoView(result.data);
//     res.status(200).json({ message: "Video view recorded  pages api record video viewer" });
//   } catch (error) {
//     log({
//       message: `Failed to record video view (Tinybird) for ${linkId}. \n\n ${error}`,
//       type: "error",
//       mention: true,
//     });
//     res.status(500).json({ message: (error as Error).message });
//   }
// }
