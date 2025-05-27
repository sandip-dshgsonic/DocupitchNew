import { DocumentStorageType } from "@prisma/client";
import { upload } from "@vercel/blob/client";
import { match } from "ts-pattern";

import { newId } from "@/lib/id-helper";
import {
  getPagesCount,
  getSheetsCount,
} from "@/lib/utils/get-page-number-count";

import { SUPPORTED_DOCUMENT_MIME_TYPES } from "../constants";

export const putFile = async ({
  file,
  teamId,
  docId,
}: {
  file: File;
  teamId: string;
  docId?: string;
}) => {
  const NEXT_PUBLIC_UPLOAD_TRANSPORT = process.env.NEXT_PUBLIC_UPLOAD_TRANSPORT;

  const { type, data, numPages } = await match(NEXT_PUBLIC_UPLOAD_TRANSPORT)
    .with("s3", async () => putFileInS3({ file, teamId, docId }))
    .with("vercel", async () => putFileInVercel(file))
    .otherwise(() => {
      return {
        type: null,
        data: null,
        numPages: undefined,
      };
    });

  return { type, data, numPages };
};

// const putFileInVercel = async (file: File) => {
//   const newBlob = await upload(file.name, file, {
//     access: "public",
//     handleUploadUrl: "/api/file/browser-upload",
//   });

//   let numPages: number = 1;
//   if (file.type === "application/pdf") {
//     const contents = await file.arrayBuffer();
//     numPages = await getPagesCount(contents);
//   }

//   return {
//     type: DocumentStorageType.VERCEL_BLOB,
//     data: newBlob.url,
//     numPages: numPages,
//   };
// };

// const putFileInS3 = async ({
//   file,
//   teamId,
//   docId,
// }: {
//   file: File;
//   teamId: string;
//   docId?: string;
// }) => {
//   if (!docId) {
//     docId = newId("doc");
//   }

//   if (!SUPPORTED_DOCUMENT_MIME_TYPES.includes(file.type)) {
//     throw new Error("Only PDF, Powerpoint, Word, and Excel files are supported");
//   }

//   const presignedResponse = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL}/api/file/s3/get-presigned-post-url`,
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         fileName: file.name,
//         contentType: file.type,
//         teamId: teamId,
//         docId: docId,
//       }),
//     },
//   );

//   if (!presignedResponse.ok) {
//     throw new Error(
//       `Failed to get presigned post url, failed with status code ${presignedResponse.status}`,
//     );
//   }

//   const { url, key } = (await presignedResponse.json()) as {
//     url: string;
//     key: string;
//   };

//   const response = await fetch(url, {
//     method: "PUT",
//     headers: {
//       "Content-Type": file.type,
//     },
//     body: file,
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Failed to upload file "${file.name}", failed with status code ${response.status}`,
//     );
//   }

//   let numPages: number = 1;
//   // get page count for pdf files
//   if (file.type === "application/pdf") {
//     const body = await file.arrayBuffer();
//     numPages = await getPagesCount(body);
//   }
//   // get sheet count for excel files
//   // else if (
//   //   SUPPORTED_DOCUMENT_MIME_TYPES.includes(file.type) &&
//   //   file.type !== "application/pdf"
//   // ) {
//   //   const body = await file.arrayBuffer();
//   //   numPages = getSheetsCount(body);
//   // }

//   return {
//     type: DocumentStorageType.S3_PATH,
//     data: key,
//     numPages: numPages,
//   };
// };


const putFileInVercel = async (file: File) => {
  console.log('lib-files-put files 140--------',file.type)
  const newBlob = await upload(file.name, file, {
    access: "public",
    handleUploadUrl: "/api/file/browser-upload",
  });

  let numPages: number = 1; // Default for files without pages
  if (file.type === "application/pdf") {
    const contents = await file.arrayBuffer();
    numPages = (await getPagesCount(contents)) ?? 1; // by aniket

    // numPages = await getPagesCount(contents);
  }

  

  return {
    type: DocumentStorageType.VERCEL_BLOB,
    data: newBlob.url,
    numPages: numPages,
  };
};


const putFileInS3 = async ({
  file,
  teamId,
  docId,
}: {
  file: File;
  teamId: string;
  docId?: string;
}) => {
  if (!docId) {
    docId = newId("doc");
  }

  if (!SUPPORTED_DOCUMENT_MIME_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type");
  }

  const formData = new FormData();
formData.append("file", file);
formData.append("fileName", file.name); // optional if using `file.name`
formData.append("contentType", file.type); // optional, handled by browser
formData.append("teamId", teamId);
formData.append("docId", docId);

const presignedResponse = await fetch(
  `${process.env.NEXT_PUBLIC_BASE_URL}/api/file/s3/get-presigned-post-url`,
  {
    method: "POST",
    body: formData,
  }
);

  // const presignedResponse = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/file/s3/get-presigned-post-url`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       fileName: file.name,
  //       contentType: file.type,
  //       teamId: teamId,
  //       docId: docId,
  //     }),
  //   },
  // );

  console.log('lib-files-put files 210--------')
  if (!presignedResponse.ok) {
    throw new Error(
      `Failed to get presigned post url, failed with status code ${presignedResponse.status}`,
    );
  }

  const { url, key } = (await presignedResponse.json()) as {
    url: string;
    key: string;
  };
console.log('lib-files-put files 222--------')
  // const response = await fetch(url, {
  //   method: "PUT",
  //   headers: {
  //     "Content-Type": file.type,
  //   },
  //   body: file,
  // });
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  });
  console.log('lib-files-put files 230--------')

  if (!response.ok) {
    throw new Error(
      `Failed to upload file "${file.name}", failed with status code ${response.status}`,
    );
  }
console.log('lib-files-put files 240--------')

  let numPages: number = 1;
  if (file.type === "application/pdf") {
    const body = await file.arrayBuffer();
    numPages = await getPagesCount(body) ?? 1; // by aniket
    // numPages = await getPagesCount(body);
  }
  console.log('lib-files-put files 245--------')
  return {
    type: DocumentStorageType.S3_PATH,
    data: key,
    numPages: numPages,
  };
};
