import { useRouter } from "next/router";

import { useState } from "react";
import { useCopyToClipboard } from "@/lib/utils/use-copy-to-clipboard";
import { useTeam } from "@/context/team-context";
import { LinkType } from "@prisma/client";
import { motion } from "framer-motion";
import { usePlausible } from "next-plausible";
import { toast } from "sonner";

import DocumentUpload from "@/components/document-upload";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { useAnalytics } from "@/lib/analytics";
import { STAGGER_CHILD_VARIANTS } from "@/lib/constants";
import { DocumentData, createDocument } from "@/lib/documents/create-document";
import { putFile } from "@/lib/files/put-file";
import {
  convertDataUrlToFile,
  copyToClipboard,
  uploadImage,
} from "@/lib/utils";
import { getSupportedContentType } from "@/lib/utils/get-content-type";

import Skeleton from "../Skeleton";
import { DEFAULT_LINK_PROPS, DEFAULT_LINK_TYPE } from "../links/link-sheet";
import { LinkOptions } from "../links/link-sheet/link-options";

export default function Upload() {
  const router = useRouter();
  const plausible = usePlausible();
  const analytics = useAnalytics();
  const [uploading, setUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentBlob, setCurrentBlob] = useState<boolean>(false);
  const [currentLinkId, setCurrentLinkId] = useState<string | null>(null);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);
  const { isCopied, copyToClipboard } = useCopyToClipboard({});
  const [linkData, setLinkData] = useState<DEFAULT_LINK_TYPE>(
    DEFAULT_LINK_PROPS(LinkType.DOCUMENT_LINK),
  );
  const teamInfo = useTeam();

  const teamId = teamInfo?.currentTeam?.id as string;

  const handleBrowserUpload = async (event: any) => {
    event.preventDefault();
    console.log("uploads tsx ----54")
    // Check if the file is chosen
    if (!currentFile) {
      toast.error("Please select a file to upload.");
      return; // prevent form from submitting
    }

    try {
      setUploading(true);
      console.log("uploads tsx ----63")

      const contentType = currentFile.type;
      const supportedFileType = getSupportedContentType(currentFile.type);

      if (!supportedFileType) {
        setUploading(false);
        toast.error(
          "Unsupported file format. Please upload a PDF, Powerpoint, Excel, or Word file.",
        );
        return;
      }
      console.log("uploads tsx ----75")
      const { type, data, numPages } = await putFile({
        file: currentFile,
        teamId,
      });
      // const folderPathName = "components/welcome/uploadcreatedoc";
      setCurrentFile(null);
      setCurrentBlob(true);
      console.log("uploads tsx ----83")
      const documentData: DocumentData = {
        name: currentFile.name,
        key: data!,
        storageType: type!,
        contentType: contentType,
        supportedFileType: supportedFileType,
      };
      // create a document in the database
      console.log("uploads tsx ----93",teamId,documentData,numPages)
      // try {
      //   const response = await createDocument({
      //     documentData,
      //     teamId,
      //     numPages,
      //     createLink: true,
      //   });
      // } catch (error) {
      //   console.log('101 line error--',error)
      // }
      const response = await createDocument({
        documentData,
        teamId,
        numPages,
        // folderPathName: folderPathName,
        createLink: true,
        
      });
      console.log("uploads tsx ----98")

      if (response) {
        const document = await response.json();
        const linkId = document.links[0].id;

        // track the event
        plausible("documentUploaded");
        analytics.capture("Document Added", {
          documentId: document.id,
          name: document.name,
          numPages: document.numPages,
          path: router.asPath,
          type: document.type,
          contentType: document.contentType,
          teamId: teamInfo?.currentTeam?.id,
        });
        analytics.capture("Link Added", {
          linkId: document.links[0].id,
          documentId: document.id,
          customDomain: null,
          teamId: teamInfo?.currentTeam?.id,
        });

        setTimeout(() => {
          setCurrentDocId(document.id);
          setCurrentLinkId(linkId);
          setUploading(false);
        }, 2000);
      }
  console.log("uploads tsx ----126")

    } catch (error) {
      console.error("An error occurred while uploading the file: ", error);
      setCurrentFile(null);
      setUploading(false);
    }
  };
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    // Upload the image if it's a data URL
    let blobUrl: string | null =
      linkData.metaImage && linkData.metaImage.startsWith("data:")
        ? null
        : linkData.metaImage;
    if (linkData.metaImage && linkData.metaImage.startsWith("data:")) {
      // Convert the data URL to a blob
      const blob = convertDataUrlToFile({ dataUrl: linkData.metaImage });
      // Upload the blob to vercel storage
      blobUrl = await uploadImage(blob);
      setLinkData({ ...linkData, metaImage: blobUrl });
    }

    const response = await fetch(`/api/links/${currentLinkId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...linkData,
        metaImage: blobUrl,
        targetId: currentDocId,
        linkType: LinkType.DOCUMENT_LINK,
      }),
    });

    if (!response.ok) {
      // handle error with toast message
      const { error } = await response.json();
      toast.error(error);
      setIsLoading(false);
      return;
    }

    copyToClipboard(
      `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${currentLinkId}`,
      "Link copied to clipboard. Redirecting to document page...",
    );

    router.push(`/documents/${currentDocId}`);
    setIsLoading(false);
  };

  return (
    <>
      {!currentBlob && (
        <motion.div
          className="z-10 flex flex-col space-y-10 text-center"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            show: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.3, type: "spring" }}
        >
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            className="flex flex-col items-center space-y-10 text-center"
          >
             <img src='/logo.png' style={{ height: '80px', width: '80px' }} alt='.' className="m-2" />
            <h1 className="font-display text-3xl font-semibold text-foreground transition-colors sm:text-4xl">
              {`Upload your ${router.query.type === "sales-document" ? "document" : `${router.query.type}`}`}
            </h1>
          </motion.div>
          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            <main className="mt-8">
              <form
                encType="multipart/form-data"
                onSubmit={handleBrowserUpload}
                className="flex flex-col"
              >
                <div className="space-y-12">
                  <div className="pb-6">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <DocumentUpload
                        currentFile={currentFile}
                        setCurrentFile={setCurrentFile}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  {/* <Button
                    type="submit"
                    className="w-full"
                    loading={uploading}
                    disabled={!currentFile}
                  >
                    {uploading ? "Uploading..." : "Upload Document"}
                  </Button> */}
                  <Button
                   type="submit"
                   loading={uploading}
                    disabled={!currentFile}
  className="px-8 py-3 bg-transparent backdrop-blur-md border border-gradient-to-r from-orange-400 to-yellow-500 rounded-full 
             text-orange-500 font-semibold text-lg transform transition-all duration-300 
             hover:scale-105 hover:bg-orange-500/10 hover:text-orange-700 hover:shadow-xl"
>
{uploading ? "Uploading..." : "Upload Pitch"}
</Button>
                </div>
              </form>

              {/* <div className="text-xs text-muted-foreground">
                <span>Use our</span>{" "}
                <Button
                  variant="link"
                  className="px-0 text-xs font-normal text-muted-foreground underline hover:text-gray-700"
                  onClick={async () => {
                    const response = await fetch(
                      "/_example/papermark-example-document.pdf",
                    );
                    const blob = await response.blob();
                    const file = new File(
                      [blob],
                      "papermark-example-document.pdf",
                      {
                        type: "application/pdf",
                      },
                    );
                    setCurrentFile(file);
                  }}
                >
                  sample document
                </Button>
              </div> */}
            </main>
          </motion.div>
        </motion.div>
      )}

      {currentBlob && (
        <motion.div
          className="z-10 flex flex-col space-y-10 text-center"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            show: {
              opacity: 1,
              scale: 1,
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
          initial="hidden"
          animate="show"
          exit="hidden"
          transition={{ duration: 0.3, type: "spring" }}
        >
          <motion.div
            variants={STAGGER_CHILD_VARIANTS}
            className="flex flex-col items-center space-y-10 text-center"
          >
              <img src='/logo.png' style={{ height: '80px', width: '80px' }} alt='.' className="m-2" />
            <h1 className="font-display text-3xl font-semibold text-foreground transition-colors sm:text-4xl">
              Share your unique link
            </h1>
          </motion.div>

          <motion.div variants={STAGGER_CHILD_VARIANTS}>
            {/* {currentLinkId && (
              <main className="min-h-[300px]">
                <div className="flex flex-col justify-center">
                  <div className="flex py-8">
                    <div className="flex w-full focus-within:z-10">
                      <Skeleton className="h-6 w-full" />
                    </div>
                  </div>
                </div>
              </main>
            )} */}
           
              {/* <main className="min-h-[300px]">
                <div className="flex flex-col justify-center">
                  <div className="relative">
                    <div className="flex py-8">
                      <div className="flex w-full max-w-xs focus-within:z-10 sm:max-w-lg">
                        <p className="block w-full overflow-y-scroll rounded-md border-0 bg-secondary px-4 py-1.5 text-left leading-6 text-secondary-foreground md:min-w-[500px]">
                          {`${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${currentLinkId}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full max-w-xs pb-8 sm:max-w-lg">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="space-x-2 rounded-lg py-0">
                          <span className="text-sm font-medium leading-6 text-foreground">
                            Configure Link Options
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-left first:pt-5">
                          <LinkOptions
                            data={linkData}
                            setData={setLinkData}
                            linkType={LinkType.DOCUMENT_LINK}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  <div className="mb-4 flex items-center justify-center">
                    <Button onClick={handleSubmit} loading={isLoading}>
                      Share Document
                    </Button>
                  </div>
                </div>
              </main> */}
               {currentLinkId && currentDocId ? (
              <main className="min-h-[300px] px-6 sm:px-12 py-10 ">
  <div className="flex flex-col items-center justify-center space-y-8">
    {/* Document Link Section */}
    <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Your Pitch Link
      </h2>
      <div className="flex items-center space-x-4">
        <p
          className="block w-full overflow-y-scroll rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-sm leading-6 text-gray-700 md:min-w-[500px]"
          title="Document Link"
        >
          {`${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${currentLinkId}`}
        </p>
        <button
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={() => copyToClipboard(
            `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${currentLinkId}`,
            "Link Copied",
          )}
          
        >
          Copy
        </button>
      </div>
    </div>

    {/* Accordion Section */}
    {/* <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="flex items-center space-x-2 rounded-lg py-2 px-4 bg-gray-100 hover:bg-gray-200">
            <span className="text-sm font-medium leading-6 text-gray-800">
              Configure Link Options
            </span>
          </AccordionTrigger>
          <AccordionContent className="text-left pt-4">
            <LinkOptions
              data={linkData}
              setData={setLinkData}
              linkType={LinkType.DOCUMENT_LINK}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div> */}

    {/* Share Button Section */}
    <div className="flex items-center justify-center">
      <Button
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleSubmit}
        loading={isLoading}
      >
        Share Pitch
      </Button>
    </div>
  </div>
</main>

              ) : (
                // Loader Section
                <div className="">
                  <span className="ml-4 text-gray-700 font-semibold">Loading...</span>
                </div>
              )} 
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
