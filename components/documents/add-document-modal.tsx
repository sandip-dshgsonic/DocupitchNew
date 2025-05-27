import { useRouter } from "next/router";

import { FormEvent, useState } from "react";

import { useTeam } from "@/context/team-context";
import { usePlausible } from "next-plausible";
import { parsePageId } from "notion-utils";
import { toast } from "sonner";
import { mutate } from "swr";

import DocumentUpload from "@/components/document-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAnalytics } from "@/lib/analytics";
import {
  DocumentData,
  createDocument,
  createNewDocumentVersion,
} from "@/lib/documents/create-document";
import { putFile } from "@/lib/files/put-file";
import { copyToClipboard } from "@/lib/utils";
import { getSupportedContentType } from "@/lib/utils/get-content-type";

export function AddDocumentModal({
  open,
  setOpen,
  newVersion,
  children,
  isDataroom,
  dataroomId,
  setAddDocumentModalOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  newVersion?: boolean;
  children: React.ReactNode;
  isDataroom?: boolean;
  dataroomId?: string;
  setAddDocumentModalOpen?: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const plausible = usePlausible();
  const analytics = useAnalytics();
  const [uploading, setUploading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [notionLink, setNotionLink] = useState<string | null>(null);
  const teamInfo = useTeam();

  const teamId = teamInfo?.currentTeam?.id as string;

  /** current folder name */
  const currentFolderPath = router.query.name as string[] | undefined;

  const handleFileUpload = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    // Check if the file is chosen
    if (!currentFile) {
      toast.error("Please select a file to upload.");
      return; // prevent form from submitting
    }

    try {
      setUploading(true);

      const contentType = currentFile.type;
      const supportedFileType = getSupportedContentType(contentType);

      if (!supportedFileType) {
        setUploading(false);
        toast.error(
          "Unsupported file format. Please upload a PDF, Powerpoint, Excel, or Word file.",
        );
        return;
      }

      console.log('--------86******** add document modal ',contentType)

      const { type, data, numPages } = await putFile({
        file: currentFile,
        teamId,
      });
      console.log('--------96******** add document modal ')

      const documentData: DocumentData = {
        name: currentFile.name,
        key: data!,
        storageType: type!,
        contentType: contentType,
        supportedFileType: supportedFileType,
      };

      console.log('--------106******** add document modal ')

      let response: Response | undefined;
      // create a document or new version in the database
      if (!newVersion) {
        // create a document in the database
        try{
          response = await createDocument({
            documentData,
            teamId,
            numPages,
            folderPathName: currentFolderPath?.join("/"),
          });
        }catch(error){
          console.log('--------112******** add document modal ',error)
        }
        
      } else {
        // create a new version for existing document in the database
        try{
          const documentId = router.query.id as string;
          response = await createNewDocumentVersion({
            documentData,
            documentId,
            numPages,
            teamId,
          });
        }catch(error){
          console.log('--------128******** add document modal ',error)
        }
       
      }

      console.log('--------139******** add document modal ')
      if (response) {
        console.log('--------141******** add document modal ')
        const document = await response.json();
        console.log('--------143******** add document modal ')

        if (isDataroom && dataroomId) {
          await addDocumentToDataroom({
            documentId: document.id,
            folderPathName: currentFolderPath?.join("/"),
          });
          console.log('--------150******** add document modal ')

          plausible("documentUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            numPages: document.numPages,
            path: router.asPath,
            type: document.type,
            teamId: teamId,
            dataroomId: dataroomId,
          });

          return;
        }

        if (!newVersion) {
        console.log('--------167******** add document modal ')

          toast.success("Pitch uploaded. Redirecting to Pitch page...");

          // track the event
          plausible("documentUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            numPages: document.numPages,
            path: router.asPath,
            type: document.type,
            teamId: teamId,
          });

          // redirect to the document page
          router.push("/documents/" + document.id);
        } else {
        console.log('--------185******** add document modal ')

          // track the event
          plausible("documentVersionUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            numPages: document.numPages,
            path: router.asPath,
            type: document.type,
            newVersion: true,
            teamId: teamId,
          });
          toast.success("New Pitch version uploaded.");

          // reload to the document page
          router.reload();
        }
      }
    } catch (error) {
      setUploading(false);
      console.error("An error occurred while uploading the file: ", error);
      alert(`Did I hit this?, ${error}`);
      
            toast.error(`An error occurred while uploading the file. ${error}`);
            // toast.error(error as string);
      
      console.error("An error occurred while uploading the file: ", error);
    } finally {
      setUploading(false);
      setIsOpen(false);
      setAddDocumentModalOpen && setAddDocumentModalOpen(false);
    }
  };

  const addDocumentToDataroom = async ({
    documentId,
    folderPathName,
  }: {
    documentId: string;
    folderPathName?: string;
  }) => {
    try {
      const response = await fetch(
        `/api/teams/${teamInfo?.currentTeam?.id}/datarooms/${dataroomId}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId: documentId,
            folderPathName: folderPathName,
          }),
        },
      );

      if (!response.ok) {
        const { message } = await response.json();
        toast.error(message);
        return;
      }

      mutate(
        `/api/teams/${teamInfo?.currentTeam?.id}/datarooms/${dataroomId}/documents`,
      );
      mutate(
        `/api/teams/${teamInfo?.currentTeam?.id}/datarooms/${dataroomId}/folders/documents/${folderPathName}`,
      );

      toast.success("Pitch added to dataroom successfully! 🎉");
    } catch (error) {
      toast.error("Error adding Pitch to dataroom.");
      console.error(
        "An error occurred while adding Pitch to the dataroom: ",
        error,
      );
    }
  };

  const createNotionFileName = () => {
    // Extract Notion file name from the URL
    const urlSegments = (notionLink as string).split("/")[3];
    // Remove the last hyphen along with the Notion ID
    const extractName = urlSegments.replace(/-([^/-]+)$/, "");
    const notionFileName = extractName.replaceAll("-", " ") || "Notion Link";

    return notionFileName;
  };

  const handleNotionUpload = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();
    const validateNotionPageURL = parsePageId(notionLink);
    // Check if it's a valid URL or not by Regx
    const isValidURL =
      /^(https?:\/\/)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}([a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]+)?$/;

    // Check if the field is empty or not
    if (!notionLink) {
      toast.error("Please enter a Notion link to proceed.");
      return; // prevent form from submitting
    }
    if (validateNotionPageURL === null || !isValidURL.test(notionLink)) {
      toast.error("Please enter a valid Notion link to proceed.");
      return;
    }

    try {
      setUploading(true);

      const response = await fetch(
        `/api/teams/${teamInfo?.currentTeam?.id}/documents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: createNotionFileName(),
            url: notionLink,
            numPages: 1,
            type: "notion",
            createLink: false,
          }),
        },
      );

      if (response) {
        const document = await response.json();

        if (isDataroom && dataroomId) {
          await addDocumentToDataroom({
            documentId: document.id,
            folderPathName: currentFolderPath?.join("/"),
          });

          plausible("documentUploaded");
          plausible("notionDocumentUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            numPages: document.numPages,
            path: router.asPath,
            type: "notion",
            teamId: teamId,
            dataroomId: dataroomId,
          });

          return;
        }

        if (!newVersion) {
          toast.success(
            "Notion Page processed. Redirecting to document page...",
          );

          // track the event
          plausible("documentUploaded");
          plausible("notionDocumentUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            fileSize: null,
            path: router.asPath,
            type: "notion",
            teamId: teamId,
          });

          // redirect to the document page
          router.push("/documents/" + document.id);
        }
      }
    } catch (error) {
      setUploading(false);
      toast.error(
        "Oops! Can't access the Notion page. Please double-check it's set to 'Public'.",
      );
      console.error(
        "An error occurred while processing the Notion link: ",
        error,
      );
    } finally {
      setUploading(false);
      setIsOpen(false);
    }
  };

  const clearModelStates = () => {
    currentFile !== null && setCurrentFile(null);
    notionLink !== null && setNotionLink(null);
    setIsOpen(!isOpen);
    setAddDocumentModalOpen && setAddDocumentModalOpen(!isOpen);
  };

  return (
// {/* <Dialog open={isOpen} onOpenChange={clearModelStates} open={open} onOpenChange={setOpen}> */}
<Dialog  open={open} onOpenChange={setOpen}>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent style={{border:'1px solid black'}} className="border-black   bg-white dark:bg-gray-800 text-foreground shadow-none max-w-lg">
    <Tabs defaultValue="document">
      <TabsContent value="document" className="border-none">
        <Card className="border-none">
          <CardHeader className="text-center space-y-4 border-none">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-[#FFEDD5] dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30 24H0V0H30V24Z" stroke="#E5E7EB"/>
<path d="M30 24H0V0H30V24Z" stroke="#E5E7EB"/>
<path d="M6.75 22.5C3.02344 22.5 0 19.4766 0 15.75C0 12.8062 1.88437 10.3031 4.50937 9.37969C4.50469 9.25313 4.5 9.12656 4.5 9C4.5 4.85625 7.85625 1.5 12 1.5C14.7797 1.5 17.2031 3.00937 18.5016 5.25937C19.2141 4.78125 20.0766 4.5 21 4.5C23.4844 4.5 25.5 6.51562 25.5 9C25.5 9.57187 25.3922 10.1156 25.2 10.6219C27.9375 11.175 30 13.5984 30 16.5C30 19.8141 27.3141 22.5 24 22.5H6.75ZM10.4531 12.3281C10.0125 12.7688 10.0125 13.4812 10.4531 13.9172C10.8938 14.3531 11.6062 14.3578 12.0422 13.9172L13.8703 12.0891V18.375C13.8703 18.9984 14.3719 19.5 14.9953 19.5C15.6187 19.5 16.1203 18.9984 16.1203 18.375V12.0891L17.9484 13.9172C18.3891 14.3578 19.1016 14.3578 19.5375 13.9172C19.9734 13.4766 19.9781 12.7641 19.5375 12.3281L15.7875 8.57812C15.3469 8.1375 14.6344 8.1375 14.1984 8.57812L10.4484 12.3281H10.4531Z" fill="#F97316"/>
</svg>

              </div>
            </div>
            <CardTitle className="text-2xl font-semibold" style={{ fontFamily: 'SF Pro Display Light' }}>
              {newVersion ? `Upload a new version` : `Upload Pitch`}
            </CardTitle>
            <CardDescription className="text-lg text-gray-500 dark:text-gray-400" style={{ fontFamily: 'SF Pro Display Light' }}>
              {newVersion
                ? `After you upload a new version, the existing links will remain unchanged.`
                : `Upload your pitch in PDF, DOC, or DOCX format`}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form
              encType="multipart/form-data"
              onSubmit={handleFileUpload}
              className="flex flex-col space-y-6"
            >
              {/* Drag and Drop Upload */}
              <div
                id="upload-multi-files-zone"
                className="border-2  border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <DocumentUpload
                  currentFile={currentFile}
                  setCurrentFile={setCurrentFile}
                />
                {/* <p className="mt-2 text-sm text-muted-foreground">
                  Drag & drop your file here or{" "}
                  <span className="underline font-medium">browse</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Max file size: 25MB
                </p> */}
              </div>

              {/* Supported formats */}
              <div className="text-sm text-start text-muted-foreground bg-[#F9FAFB] p-4 rounded-md">
  <span className="text-gray-600 text-start text-lg" style={{ fontFamily: 'SF Pro Display Light' }}>Supported formats:</span>
  <div className="mt-2 flex flex-wrap justify-start gap-2">
    {["PDF", "DOCX", "PPTX"].map((format) => (
      <span
        key={format}
        className="inline-block rounded-sm bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm"
      >
        {format}
      </span>
    ))}
  </div>
</div>


              {/* Buttons */}
              <div className="flex justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full bg-[#F9FAFB]"
                  onClick={clearModelStates}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="w-full  dark:border-white border-2 bg-[#F97316] text-white dark:text-black dark:bg-white"
                  disabled={uploading || !currentFile}
                  loading={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Pitch"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </DialogContent>
</Dialog>


    // <Dialog   open={isOpen} onOpenChange={clearModelStates} >
    //   <DialogTrigger asChild>{children}</DialogTrigger>
    //   <DialogContent
    //     className="border-none bg-white dark:bg-gray-800  text-foreground shadow-none"
    //     isDocumentDialog
    //   >
    //     <Tabs defaultValue="document">
    //       <TabsContent value="document">
    //         <Card>
    //           <CardHeader className="space-y-3">
    //             <CardTitle>
    //               {newVersion ? `Upload a new version` : `Share a Pitch`}
    //             </CardTitle>
    //             <CardDescription>
    //               {newVersion
    //                 ? `After you upload a new version, the existing links will remain the unchanged.`
    //                 : `After you upload the Pitch, a shareable link will be
    //             generated and copied to your clipboard.`}
    //             </CardDescription>
    //           </CardHeader>
    //           <CardContent className="space-y-2">
    //             <form
    //               encType="multipart/form-data"
    //               onSubmit={handleFileUpload}
    //               className="flex flex-col space-y-4"
    //             >
    //               <div className="space-y-1">
    //                 <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    //                   <DocumentUpload
    //                     currentFile={currentFile}
    //                     setCurrentFile={setCurrentFile}
    //                   />
    //                 </div>
    //               </div>

    //               {/* {!newVersion ? (
    //                 <div className="flex justify-center">
    //                   <button
    //                     type="button"
    //                     className="text-sm text-muted-foreground underline-offset-4 transition-all hover:text-gray-800 hover:underline hover:dark:text-muted-foreground/80"
    //                     onClick={(e) => {
    //                       e.stopPropagation();
    //                       document
    //                         .getElementById("upload-multi-files-zone")
    //                         ?.click();
    //                       clearModelStates();
    //                     }}
    //                   >
    //                     Want to upload multiple files?
    //                   </button>
    //                 </div>
    //               ) : null} */}

    //               <div className="flex justify-center">
    //                 <Button
    //                   type="submit"
    //                   className="w-full lg:w-1/2 border-black dark:border-white border-2 dark:text-black  dark:bg-white"
    //                   disabled={uploading || !currentFile}
    //                   loading={uploading}
    //                 >
    //                   {uploading ? "Uploading..." : "Upload Pitch"}
    //                 </Button>
    //               </div>
    //             </form>
    //           </CardContent>
    //         </Card>
    //       </TabsContent>
         

    //     </Tabs>
    //   </DialogContent>
    // </Dialog>
  );
}
