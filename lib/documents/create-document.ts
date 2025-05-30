import { DocumentStorageType } from "@prisma/client";

export type DocumentData = {
  name: string;
  key: string;
  storageType: DocumentStorageType;
  contentType: string; // actual file mime type
  supportedFileType: string; // papermark types: "pdf", "sheet", "docs", "slides"
};

export const createDocument = async ({
  documentData,
  teamId,
  numPages,
  folderPathName ="components/welcome/uploadcreatedoc",
  createLink = false,
}: {
  documentData: DocumentData;
  teamId: string;
  numPages?: number;
  folderPathName?: string;
  createLink?: boolean;
}) => {
  // create a document in the database with the blob url
  console.log('25---crwate doc  ',documentData,numPages,folderPathName,createLink)
  const response = await fetch(`/api/teams/${teamId}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: documentData.name,
      url: documentData.key,
      storageType: documentData.storageType,
      numPages: numPages,
      // folderPathName: folderPathName,
      folderPathName :"components/welcome/uploadcreatedoc",

      type: documentData.supportedFileType,
      contentType: documentData.contentType,
      createLink: createLink,
    }),
  });

  if (!response.ok) {
    console.log("create doc  43 ",response)
    throw new Error(`HTTP error! status: ${response.status}`);
  }
   console.log("create documenets page",response)
  return response;
};

export const createAgreementDocument = async ({
  documentData,
  teamId,
  numPages,
  folderPathName,
}: {
  documentData: DocumentData;
  teamId: string;
  numPages?: number;
  folderPathName?: string;
}) => {
  // create a document in the database with the blob url
  const response = await fetch(`/api/teams/${teamId}/documents/agreement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: documentData.name,
      url: documentData.key,
      storageType: documentData.storageType,
      numPages: numPages,
      folderPathName: folderPathName,
      type: documentData.supportedFileType,
      contentType: documentData.contentType,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

// create a new version in the database
export const createNewDocumentVersion = async ({
  documentData,
  documentId,
  teamId,
  numPages,
}: {
  documentData: DocumentData;
  documentId: string;
  teamId: string;
  numPages?: number;
}) => {
  const response = await fetch(
    `/api/teams/${teamId}/documents/${documentId}/versions`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: documentData.key,
        storageType: documentData.storageType,
        numPages: numPages,
        type: documentData.supportedFileType,
        contentType: documentData.contentType,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};
