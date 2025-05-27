import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

const tb = new Tinybird({ token: process.env.TINYBIRD_TOKEN_NO_BEARER! });

// console.log(process.env.TINYBIRD_TOKEN,"  -----------------publish");



// export const publishPageView = tb.buildIngestEndpoint({
//   datasource: "page_views__v3",
//   event: z.object({
//     id: z.string(),
//     linkId: z.string(),
//     documentId: z.string(),
//     viewId: z.string(),
//     dataroomId: z.string().nullable().optional(),
//     versionNumber: z.number().int().min(1).max(65535).optional().default(1),
//     time: z.number().int(),
//     duration: z.number().int(),
//     pageNumber: z.string(),
//     country: z.string().optional().default("Unknown"),
//     city: z.string().optional().default("Unknown"),
//     region: z.string().optional().default("Unknown"),
//     latitude: z.string().optional().default("Unknown"),
//     longitude: z.string().optional().default("Unknown"),
//     ua: z.string().optional().default("Unknown"),
//     browser: z.string().optional().default("Unknown"),
//     browser_version: z.string().optional().default("Unknown"),
//     engine: z.string().optional().default("Unknown"),
//     engine_version: z.string().optional().default("Unknown"),
//     os: z.string().optional().default("Unknown"),
//     os_version: z.string().optional().default("Unknown"),
//     device: z.string().optional().default("Desktop"),
//     device_vendor: z.string().optional().default("Unknown"),
//     device_model: z.string().optional().default("Unknown"),
//     cpu_architecture: z.string().optional().default("Unknown"),
//     bot: z.boolean().optional(),
//     referer: z.string().optional().default("(direct)"),
//     referer_url: z.string().optional().default("(direct)"),
//     // name: z.string().optional().default("(UNKNOWN)"),
//   }),
// });

// export const publishPageView = async (data: {
//   id: string;
//   linkId: string;
//   documentId: string;
//   viewId: string;
//   dataroomId?: string | null;
//   versionNumber?: number;
//   time: number;
//   duration: number;
//   pageNumber: string;
//   country?: string;
//   city?: string;
//   region?: string;
//   latitude?: string;
//   longitude?: string;
//   ua?: string;
//   browser?: string;
//   browser_version?: string;
//   engine?: string;
//   engine_version?: string;
//   os?: string;
//   os_version?: string;
//   device?: string;
//   device_vendor?: string;
//   device_model?: string;
//   cpu_architecture?: string;
//   bot?: boolean;
//   referer?: string;
//   referer_url?: string;
//   // Add the missing 'name' field
//   name?: string; // Set as an optional string ok

// }) => {
//   try {
//     const response = await fetch(
//       `https://${process.env.TINYBIRD_REGION}/v0/events?page_views__v3`, // URL for ingestion
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer p.eyJ1IjogImVjNTIxMWFkLWEyYmUtNDgxZS04MzUwLTUxOGMzMDVkMTA1NiIsICJpZCI6ICI0MDU0NTdmNC1lMmYxLTRlOGQtOTRkMi0xODE1MmJjNzRjZTEiLCAiaG9zdCI6ICJ1c19lYXN0In0.X4_DbmFT6GSI84QST3uTjSECVe7o62bK7jp7EBqEP4o`, // Use your Tinybird token
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, message: ${errorText}`
//       );
//     }

//     const responseData = await response.json();
//     console.log("View recorded successfully:", responseData);
//     return responseData;
//   } catch (error) {
//     console.error(":", error);
//     throw error;
//   }
// };



export const publishPageView = async (data: {
  id: string;
  linkId: string;
  documentId: string;
  viewId: string;
  dataroomId?: string | null;
  versionNumber?: number;
  time: number;
  duration: number;
  pageNumber: string;
  country?: string;
  city?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
  ua?: string;
  browser?: string;
  browser_version?: string;
  engine?: string;
  engine_version?: string;
  os?: string;
  os_version?: string;
  device?: string;
  device_vendor?: string;
  device_model?: string;
  cpu_architecture?: string;
  bot?: boolean;
  referer?: string;
  referer_url?: string;
  // name: string; // Set the 'name' field as required
}) => {
  try {
    // console.log("Request body being sent:", JSON.stringify(data, null, 2));
    // console.log("aaa ",`Bearer ${process.env.TINYBIRD_TOKEN}`)
    // console.log("bbb ","Bearer p.eyJ1IjogImVjNTIxMWFkLWEyYmUtNDgxZS04MzUwLTUxOGMzMDVkMTA1NiIsICJpZCI6ICI0MDU0NTdmNC1lMmYxLTRlOGQtOTRkMi0xODE1MmJjNzRjZTEiLCAiaG9zdCI6ICJ1c19lYXN0In0.X4_DbmFT6GSI84QST3uTjSECVe7o62bK7jp7EBqEP4o")
    const response = await fetch(
      `https://${process.env.TINYBIRD_REGION}/v0/events?name=page_views__v3`, // URL for ingestion TINYBIRD_REGION
      // `https://${process.env.TINYBIRD_REGION}/v0/events?name=page_views__v3`, // URL for ingestion TINYBIRD_REGION
      {
        method: "POST",
        headers: {
          Authorization: `${process.env.TINYBIRD_TOKEN}`, // Use your Tinybird token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      console.log('error response ok ========',response)
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    const responseData = await response.json();
    console.log("View recorded successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error recording view:", error);
    throw error;
  }
};

export const publishVideoView = async (data: {
  id: string;
  linkId: string;
  documentName: string;
  viewId: string;
  versionNumber?: number;
  duration: number;
  playRecords?: Array<{ time: number; timestamp: string }>;
  time: number;
  country?: string;
  city?: string;
  region?: string;
  latitude?: string;
  longitude?: string;
  ua?: string;
  browser?: string;
  browser_version?: string;
  engine?: string;
  engine_version?: string;
  os?: string;
  os_version?: string;
  device?: string;
  device_vendor?: string;
  device_model?: string;
  cpu_architecture?: string;
  bot?: boolean;
  referer?: string;
  referer_url?: string;
}) => {
  try {
    const response = await fetch(
      `https://${process.env.TINYBIRD_REGION}/v0/events?name=video_views__v3`, // URL for ingestion
      {
        method: "POST",
        headers: {
          Authorization: `${process.env.TINYBIRD_TOKEN}`, // Use your Tinybird token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const responseData = await response.json();
    console.log("Video view recorded successfully:", responseData);
    return responseData;
  } catch (error) {
    console.error("Error recording video view:", error);
    throw error;
  }
};
