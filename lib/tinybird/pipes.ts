import { Tinybird } from "@chronark/zod-bird";
import { z } from "zod";

const tb = new Tinybird({ token: process.env.TINYBIRD_TOKEN_NO_BEARER! });
// console.log("  -----------------pipes",tb);

interface GetTotalAvgPageDurationParams {
  documentId: string;
  excludedLinkIds: string[];
  excludedViewIds: string[];
  since: number;
}

export const getTotalAvgPageDuration = async ({
  documentId,
  excludedLinkIds,
  excludedViewIds,
  since,
}: GetTotalAvgPageDurationParams) => {
  try {
    // Check the parameter values
    // console.log('Parameters:', { documentId, excludedLinkIds, excludedViewIds, since });

    // Validate 'since'
    if (typeof since !== 'number') {
      throw new Error(`Invalid 'since' value: ${since}. It must be a number.`);
    }

    const url = `https://${process.env.TINYBIRD_REGION}/v0/pipes/get_total_average_page_duration__v4.json`;

    const params = new URLSearchParams({
      documentId,
      excludedLinkIds: JSON.stringify(excludedLinkIds),
      excludedViewIds: JSON.stringify(excludedViewIds),
      since: since.toString(),
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `${process.env.TINYBIRD_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("Error response from Tinybird API:", response);
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log('45 ------ get total avg page duration v4');
    return result;
  } catch (error) {
    console.error("Error fetching total average page duration:", error);
    return { data: [] }
    throw error;
  }
};



// export const getTotalAvgPageDuration = tb.buildPipe({
//   pipe: "get_total_average_page_duration__v5",
//   parameters: z.object({
//     documentId: z.string(),
//     excludedLinkIds: z.array(z.string()),
//     excludedViewIds: z.array(z.string()),
//     since: z.number(),
//   }),
//   data: z.object({
//     versionNumber: z.number().int(),
//     pageNumber: z.string(),
//     avg_duration: z.number(),
//   }),
// });

// Using zod to validate the parameters for getTotalAvgPageDuration
// export const getTotalAvgPageDuration = async ({
//   documentId,
//   excludedLinkIds,
//   excludedViewIds,
//   since,
// }: {
//   documentId: string;
//   excludedLinkIds: string[];
//   excludedViewIds: string[];
//   since: number;
// }): Promise<any> => {
//   try {
//     const response = await fetch(
//       `https://${process.env.TINYBIRD_REGION}/v0/pipes/get_total_average_page_duration__v5.json`,
//       {
//         method: "POST",
//         headers: {
//           Authorization:
//             "Bearer p.eyJ1IjogImVjNTIxMWFkLWEyYmUtNDgxZS04MzUwLTUxOGMzMDVkMTA1NiIsICJpZCI6ICI0MDU0NTdmNC1lMmYxLTRlOGQtOTRkMi0xODE1MmJjNzRjZTEiLCAiaG9zdCI6ICJ1c19lYXN0In0.X4_DbmFT6GSI84QST3uTjSECVe7o62bK7jp7EBqEP4o", // Replace with your token
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           documentId,
//           excludedLinkIds,
//           excludedViewIds,
//           since,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, message: ${errorText}`
//       );
//     }

//     const data = await response.json();
//     console.log("Total Average Page Duration Data:");
//     return data;
//   } catch (error) {
//     console.error(`Error fetching total average page duration:`, error);
//     throw error;
//   }
// };

// export const getViewPageDuration = tb.buildPipe({
//   pipe: "get_page_duration_per_view__v5",
//   parameters: z.object({
//     documentId: z.string(),
//     viewId: z.string(),
//     since: z.number(),
//   }),
//   data: z.object({
//     pageNumber: z.string(),
//     sum_duration: z.number(),
//   }),
// });

// Define the expected type for tb (replace 'TbType' with the actual type or interface)

// export const getViewPageDuration = async ( documentId: string, viewId: string, since: number) => {
//   try {
//     // Build the pipe with the parameters
//     const pipe = tb.buildPipe({
//       pipe: "get_page_duration_per_view__v5",
//       parameters: z.object({
//         documentId: z.string(),
//         viewId: z.string(),
//         since: z.number(),
//       }),
//       data: z.object({
//         pageNumber: z.string(),
//         sum_duration: z.number(),
//       }),
//     });

//     // Execute the pipe and return the result
//     const result = await pipe({
//       documentId,
//       viewId,
//       since,
//     });

//     return result;
//   } catch (error) {
//     console.error("Error fetching page duration per view 110:", error);
//     throw error;
//   }
// };

export const getViewPageDuration = async (documentId: string, viewId: string, since: number) => {
  try {

    console.log(" lin tinybird pipe getviewpageduration 174***************")
    // Validate input parameters
    if (!documentId || !viewId || typeof since !== 'number') {
      throw new Error('Invalid parameters: documentId, viewId, and since are required.');
    }

    // Prepare the request URL for Tinybird API
    const params = new URLSearchParams({
      documentId: documentId,
      viewId: viewId,
      since: since.toString(), // Convert since to a string for the query parameter
    });
    
    const response = await fetch(
      `https://${process.env.TINYBIRD_REGION}/v0/pipes/get_page_duration_per_view__v4.json?${params.toString()}`, // URL with query parameters
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.TINYBIRD_TOKEN}`, // Use your Tinybird token
          "Content-Type": "application/json",
        },
      }
    );

    // Check for errors in the response
    if (!response.ok) {
      console.error("Error response from Tinybird API:", response);
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    // Parse the JSON response
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching page duration per view:", error);
    throw error;
  }
};


export const getViewVideoDuration = async (
  documentName: string,
  viewId: string,
  since: number
) => {
  try {
    console.log(" lin tinybird pipe get video pageduration 224")

    // Validate input parameters
    if (!documentName || !viewId || typeof since !== 'number') {
      throw new Error('Invalid parameters: documentName, viewId, and since are required.');
    }

    // Prepare the request URL for Tinybird API
    const params = new URLSearchParams({
      documentName: documentName,
      viewId: viewId,
      since: since.toString(), // Convert since to a string for the query parameter
    });

    const response = await fetch(
      `https://${process.env.TINYBIRD_REGION}/v0/pipes/get_video_duration_per_view__v4.json?${params.toString()}`, // URL with query parameters
      {
        method: "GET",
        headers: {
          Authorization: `${process.env.TINYBIRD_TOKEN}`, // Use your Tinybird token
          "Content-Type": "application/json",
        },
      }
    );

    // Check for errors in the response
    if (!response.ok) {
      console.error("Error response from Tinybird API:", response);
      const errorText = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
    }

    // Parse the JSON response
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching video duration per view:", error);
    throw error;
  }
};




// interface ViewPageDurationParams {
//   documentId: string; // Define the type of documentId
//   viewId: string;     // Define the type of viewId
//   since: number;      // Define the type of since
// }

// // Update the function with explicit types
// export const getViewPageDuration = async ({
//   documentId,
//   viewId,
//   since,
// }: ViewPageDurationParams): Promise<any> => {
//   try {
//     console.log("**********pipes    ",documentId,viewId)
//     const response = await fetch(
//       `https://${process.env.TINYBIRD_REGION}/v0/pipes/get_page_duration_per_view__v5.json`,
//       {
//         method: "POST",
//         headers: {
//           Authorization:
//             "Bearer p.eyJ1IjogImVjNTIxMWFkLWEyYmUtNDgxZS04MzUwLTUxOGMzMDVkMTA1NiIsICJpZCI6ICI0MDU0NTdmNC1lMmYxLTRlOGQtOTRkMi0xODE1MmJjNzRjZTEiLCAiaG9zdCI6ICJ1c19lYXN0In0.X4_DbmFT6GSI84QST3uTjSECVe7o62bK7jp7EBqEP4o", // Replace with your token
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           documentId,
//           viewId,
//           since,
//         }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(
//         `HTTP error! status: ${response.status}, message: ${errorText}`
//       );
//     }

//     const data = await response.json();
//     console.log("API Response Data:");
//     return data;
//   } catch (error) {
//     console.error(`Error fetching page duration for viewId ${viewId}:`, error);
//     throw error;
//   }
// };

// #######3333333333333

// Function to fetch page duration
// async function fetchViewDuration(documentId, viewId, since) {
//   try {
//     const result = await getViewPageDuration({ documentId, viewId, since });
//     console.log("Page Duration Result:", result);
//     return result;
//   } catch (error) {
//     console.error("Error fetching page duration:", error.message);
//   }
// }

// // Example usage
// const documentId = "cm1gf612i004y12vwz13fu0z6"; // Replace with actual document ID
// const viewId = "cm1gfepls005c12vwwwgs3qli"; // Replace with actual view ID
// const since = Date.now() - 24 * 60 * 60 * 1000; // Example: last 24 hours

// fetchViewDuration(documentId, viewId, since);

// ==============


export const getViewUserAgent = tb.buildPipe({
  pipe: "get_useragent_per_view__v2",
  parameters: z.object({
    documentId: z.string(),
    viewId: z.string(),
    since: z.number(),
  }),
  data: z.object({
    country: z.string(),
    city: z.string(),
    browser: z.string(),
    os: z.string(),
    device: z.string(),
  }),
});

export const getTotalDataroomDuration = tb.buildPipe({
  pipe: "get_total_dataroom_duration__v1",
  parameters: z.object({
    dataroomId: z.string(),
    excludedLinkIds: z.array(z.string()),
    excludedViewIds: z.array(z.string()),
    since: z.number(),
  }),
  data: z.object({
    viewId: z.string(),
    sum_duration: z.number(),
  }),
});


