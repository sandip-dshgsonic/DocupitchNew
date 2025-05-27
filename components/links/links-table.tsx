

import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { useTeam } from "@/context/team-context";
import { DocumentVersion } from "@prisma/client";
import { EyeIcon, LinkIcon, Settings2Icon, PenToolIcon } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";
import { Button } from "@/components/ui/button";
import  prisma  from '@/lib/prisma';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePlan } from "@/lib/swr/use-billing";
import { LinkWithViews, WatermarkConfig } from "@/lib/types";
import Cookies from "js-cookie";
import { cn, copyToClipboard, nFormatter, timeAgo } from "@/lib/utils";
import ProcessStatusBar from "../documents/process-status-bar";
import BarChart from "../shared/icons/bar-chart";
import ChevronDown from "../shared/icons/chevron-down";
import MoreHorizontal from "../shared/icons/more-horizontal";
import { ButtonTooltip } from "../ui/tooltip";
import LinkSheet, {
  DEFAULT_LINK_PROPS,
  type DEFAULT_LINK_TYPE,
} from "./link-sheet";
import LinksVisitors from "./links-visitors";

import { Document, Page, pdfjs } from 'react-pdf';

// const PDFViewerModal = ({ pdfUrl, onPositionSelect, onClose, linkId }) => {
//   const [numPages, setNumPages] = useState(null);

//   const handleDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   const handleClick = (event, pageNumber) => {
//     // Use currentTarget instead of target.
//     const boundingRect = event.currentTarget.getBoundingClientRect();
//     const x = event.clientX - boundingRect.left;
//     const y = event.clientY - boundingRect.top;
  
//     if (onPositionSelect) {
//       onPositionSelect({
//         x,
//         y,
//         page: pageNumber,
//         renderedWidth: boundingRect.width,
//         renderedHeight: boundingRect.height,
//         linkId
//       });
//     }
//   };

//   // You can still force a fixed width if you want for rendering,
//   // but the actual height might be computed automatically.
//   const fixedWidth = 800; // Force width on the Page component
//   // Do NOT pass height here if you want it to be dynamic. Let the <Page> component size itself,
//   // or if you have a computed height, use that.



//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0,0,0,0.8)",
//         zIndex: 9999,
//         overflow: "auto",
//         padding: "20px"
//       }}
//     >
//       <button
//         onClick={onClose}
//         style={{
//           marginBottom: "20px",
//           background: "white",
//           padding: "10px"
//         }}
//       >
//         Close
//       </button>

//       {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//         <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess}>
//           {Array.from(new Array(numPages), (_, index) => (
//            <div
//            style={{ width: fixedWidth, border: "1px solid #ccc", marginBottom: "20px" }}
//            onClick={(e) => handleClick(e, index + 1)}
//          >
//            <Page
//              key={`page_${index + 1}`}
//              pageNumber={index + 1}
//              width={fixedWidth}
//              // Let height adjust automatically
//            />
//          </div>
//           ))}
//         </Document>
//       </div> */}
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//   <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess}>
//     {Array.from(new Array(numPages), (_, index) => (
//       <div
//         key={`page_${index + 1}`}  // Add a unique key for each element
//         style={{ width: fixedWidth, border: "1px solid #ccc", marginBottom: "20px" }}
//         onClick={(e) => handleClick(e, index + 1)}
//       >
//         <Page
//           pageNumber={index + 1}
//           width={fixedWidth}
//           // Let height adjust automatically
//         />
//       </div>
//     ))}
//   </Document>
// </div>

//     </div>
//   );
// };

interface PDFViewerModalProps {
  pdfUrl: string;
  onPositionSelect?: (position: {
    x: number;
    y: number;
    page: number;
    renderedWidth: number;
    renderedHeight: number;
    linkId?: string;
  }) => void;
  onClose: () => void;
  linkId?: string;
}

export default function PDFViewerModal({
  pdfUrl,
  onPositionSelect,
  onClose,
  linkId,
}: PDFViewerModalProps) {
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>, pageNumber: number) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - boundingRect.left;
    const y = event.clientY - boundingRect.top;

    if (onPositionSelect) {
      onPositionSelect({
        x,
        y,
        page: pageNumber,
        renderedWidth: boundingRect.width,
        renderedHeight: boundingRect.height,
        linkId,
      });
    }
  };

  const fixedWidth = 800;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.8)",
        zIndex: 9999,
        overflow: "auto",
        padding: "20px",
      }}
    >
      <button
        onClick={onClose}
        style={{
          marginBottom: "20px",
          background: "white",
          padding: "10px",
        }}
      >
        Close
      </button>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Document file={pdfUrl} onLoadSuccess={handleDocumentLoadSuccess}>
          {Array.from(new Array(numPages || 0), (_, index) => (
            <div
              key={`page_${index + 1}`}
              style={{
                width: fixedWidth,
                border: "1px solid #ccc",
                marginBottom: "20px",
              }}
              onClick={(e) => handleClick(e, index + 1)}
            >
              <Page pageNumber={index + 1} width={fixedWidth} />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}

// export default PDFViewerModal;

export  function LinksTable({
  targetType,
  links,
  primaryVersion,
}: {
  targetType: "DOCUMENT" | "DATAROOM";
  links?: LinkWithViews[];
  primaryVersion?: DocumentVersion;
}) {
  const router = useRouter();
  const { plan } = usePlan();
  const teamInfo = useTeam();

  const [showViewer, setShowViewer] = useState(false);
  // const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [selectedLinkId, setSelectedLinkId] = useState<string | null>(null);

  const [selectedLinkUrl, setSelectedLinkUrl] = useState(null);

  // const linkWithFile = await prisma.link.findUnique({
  //   where: { id: 'your-link-id' },
  //   include: {
  //     document: {
  //       select: {
  //         file: true,
  //       },
  //     },
  //   },
  // });
  
  // console.log(linkWithFile?.document?.file);
  
  const handlePositionSelect = async ({
    x,
    y,
    page,
    renderedHeight,
    renderedWidth,
    linkId,
  }: {
    x: number;
    y: number;
    page: number;
    renderedHeight: number;
    renderedWidth: number;
    linkId?: string;
  }) => {
    
  // const handlePositionSelect = async ({ x, y, page,renderedHeight, renderedWidth, linkId }) => {
    console.log(`Clicked at x=${x}, y=${y} on page=${page} and ${linkId} ${renderedHeight}, ${renderedWidth},`);
  
    try {
      const res = await fetch('/api/link/updateSignaturePosition', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x, y, page, linkId ,renderedHeight, renderedWidth}),
      });
  
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');
  
      console.log('Signature position updated!', data.updatedLink);
    } catch (error) {
      console.error('Error calling API:', error);
    }
  };
  



  

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLinkSheetVisible, setIsLinkSheetVisible] = useState<boolean>(false);
  const [isPDFSelectorVisible, setIsPDFSelectorVisible] = useState<boolean>(false);
  const [selectedLink, setSelectedLink] = useState<DEFAULT_LINK_TYPE>(
    DEFAULT_LINK_PROPS(`${targetType}_LINK`),
  );
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);

  const handleCopyToClipboard = (linkString: string) => {
    copyToClipboard(`${linkString}`, "Link copied to clipboard.");
  };

  const handleEditLink = (link: LinkWithViews) => {
    setSelectedLink({
      id: link.id,
      name: link.name || `Link #${link.id.slice(-5)}`,
      domain: link.domainSlug,
      slug: link.slug,
      expiresAt: link.expiresAt,
      password: link.password,
      emailProtected: link.emailProtected,
      emailAuthenticated: link.emailAuthenticated,
      allowDownload: link.allowDownload ? link.allowDownload : false,
      allowList: link.allowList,
      denyList: link.denyList,
      enableNotification: link.enableNotification
        ? link.enableNotification
        : false,
      enableFeedback: link.enableFeedback ? link.enableFeedback : false,
      enableScreenshotProtection: link.enableScreenshotProtection
        ? link.enableScreenshotProtection
        : false,
      enableCustomMetatag: link.enableCustomMetatag
        ? link.enableCustomMetatag
        : false,
      enableQuestion: link.enableQuestion ? link.enableQuestion : false,
      questionText: link.feedback ? link.feedback.data?.question : "",
      questionType: link.feedback ? link.feedback.data?.type : "",
      metaTitle: link.metaTitle,
      metaDescription: link.metaDescription,
      metaImage: link.metaImage,
      enableAgreement: link.enableAgreement ? link.enableAgreement : false,
      agreementId: link.agreementId,
      showBanner: link.showBanner ?? false,
      enableWatermark: link.enableWatermark ?? false,
      watermarkConfig: link.watermarkConfig as WatermarkConfig | null,
      audienceType: link.audienceType,
      groupId: link.groupId,

       // Missing required fields
  creatorEmail: link.creatorEmail ?? "",           // or a valid default
  signaturePage: link.signaturePage ?? 1,
  signatureX: link.signatureX ?? 0,
  signatureY: link.signatureY ?? 0,
  renderedWidth: link.renderedWidth ?? 0,
  renderedHeight: link.renderedHeight ?? 0,
 
    });
    //wait for dropdown to close before opening the link sheet
    setTimeout(() => {
      setIsLinkSheetVisible(true);
    }, 0);
  };

  const handlePreviewLink = async (link: LinkWithViews) => {
    if (link.domainId && plan === "free") {
      toast.error("You need to upgrade to preview this link");
      return;
    }
    const response = await fetch(`/api/links/${link.id}/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      toast.error("Failed to generate preview link");
      return;
    }
    const { previewToken } = await response.json();
    const previewLink = `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${link.id}?previewToken=${previewToken}`;

    window.open(previewLink, "_blank");
  };
  
  const handleSelectSignaturePosition = (link: String) => {
    // const handleSelectSignaturePosition = (link: LinkWithViews) => {
    // Open the PDF signature position selector modal
    console.log('---1027 handle selct pdf sign pod')
    // setSelectedLink({
    //   id: link.id,
    //   name: link.name || `Link #${link.id.slice(-5)}`,
    //   // Include other properties...
    // });
    
    // // Set the current document ID for fetching the PDF
    // setCurrentDocumentId(link.documentId || null);
    
    // Open the PDF selector modal
    setIsPDFSelectorVisible(true);
  };

  const handleDuplicateLink = async (link: LinkWithViews) => {
    setIsLoading(true);

    const response = await fetch(
      `/api/links/${link.id}/duplicate?teamId=${teamInfo?.currentTeam?.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const duplicatedLink = await response.json();
    const endpointTargetType = `${targetType.toLowerCase()}s`; // "documents" or "datarooms"

    // Update the duplicated link in the list of links
    mutate(
      `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}/${encodeURIComponent(
        link.documentId ?? link.dataroomId ?? "",
      )}/links`,
      (links || []).concat(duplicatedLink),
      false,
    );

    toast.success("Link duplicated successfully");
    setIsLoading(false);
  };

  const handleArchiveLink = async (
    linkId: string,
    targetId: string,
    isArchived: boolean,
  ) => {
    setIsLoading(true);

    const response = await fetch(`/api/links/${linkId}/archive`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isArchived: !isArchived,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const archivedLink = await response.json();
    const endpointTargetType = `${targetType.toLowerCase()}s`; // "documents" or "datarooms"

    // Update the archived link in the list of links
    mutate(
      `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}/${encodeURIComponent(
        targetId,
      )}/links`,
      (links || []).map((link) => (link.id === linkId ? archivedLink : link)),
      false,
    );

    toast.success(
      !isArchived
        ? "Link successfully archived"
        : "Link successfully reactivated",
    );
    setIsLoading(false);
  };

  const archivedLinksCount = links
    ? links.filter((link) => link.isArchived).length
    : 0;


    const [fetchFile,setFetchFile]= useState('')

    const handleFetchFile = async (id: string) => {
      console.log('id-----882',id)
      try {
        const res = await fetch('/api/fetchFile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
    
        const data = await res.json();
    
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch file');
        }
    
        console.log('Fetched file:', data.file);
        setFetchFile(data.file)
        return data.file;
      } catch (error) {
        console.error('Error fetching file from link:', error);
      }
    };
    
    
  const hasFreePlan = plan === "free";
  return (
    <>
      <div className="w-full">
        <div>
          <h2 className="mb-2 md:mb-4">All links</h2>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="*:whitespace-nowrap *:font-medium hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead className="w-[150px] sm:w-[200px] md:w-[250px]">
                  Link
                </TableHead>
                <TableHead className="w-[250px] sm:w-auto">Views</TableHead>
                <TableHead>Last Viewed</TableHead>
                <TableHead className="text-center sm:text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="hover:text-black">
              {links && links.length > 0 ? (
                links
                  .filter((link) => !link.isArchived)
                  .map((link) => (
                    <Collapsible key={link.id} asChild>
                      <>
                        <TableRow key={link.id} className="group/row">
                          <TableCell className="w-[250px] truncate font-medium">
                            {link.name || `Link #${link.id.slice(-5)}`}

                            {link.domainId && hasFreePlan ? (
                              <span className="ml-2 rounded-full bg-destructive px-2.5 py-0.5 text-xs text-foreground ring-1 ring-destructive">
                                Inactive
                              </span>
                            ) : null}
                          </TableCell>
                          
                          <TableCell className="flex items-center gap-x-2 sm:min-w-[300px] md:min-w-[400px] lg:min-w-[450px]">
                            <div
                              style={{border:'2px solid #E5E7EB', borderRadius:'5px'}}
                              className={cn(
                                `group/cell relative flex w-full items-center gap-x-4 overflow-hidden truncate rounded-sm px-3 py-1.5 text-center text-secondary-foreground transition-all group-hover/row:ring-1 group-hover/row:ring-gray-400 group-hover/row:dark:ring-gray-100 md:py-1`,
                                link.domainId && hasFreePlan
                                  ? "bg-destructive hover:bg-red-700 hover:dark:bg-red-200"
                                  : "bg-secondary hover:bg-emerald-700 hover:dark:bg-emerald-200",
                              )}
                            >
                              {/* Progress bar */}
                              {primaryVersion &&
                              primaryVersion.type === "pdf" &&
                              !primaryVersion.hasPages ? (
                                <></>
                              ) : null}

                              <button className="flex w-full whitespace-nowrap text-sm group-hover/cell:opacity-0">
                                {link.domainId
                                  ? `https://${link.domainSlug}/${link.slug}`
                                  : `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${link.id}`}
                              </button>

                              {link.domainId && hasFreePlan ? (
                                <button
                                  className="absolute bottom-0 left-0 right-0 top-0 z-10 hidden w-full whitespace-nowrap text-center text-sm group-hover/cell:block group-hover/cell:text-primary-foreground"
                                  onClick={() =>
                                    router.push("/settings/billing")
                                  }
                                  title="Upgrade to activate link"
                                >
                                  Upgrade to activate link
                                </button>
                              ) : (
                                <button
                                  className="absolute bottom-0 left-0 right-0 top-0 z-10 hidden w-full whitespace-nowrap text-center text-xs group-hover/cell:block group-hover/cell:text-primary-foreground sm:text-sm"
                                  onClick={() =>
                                    handleCopyToClipboard(
                                      link.domainId
                                        ? `https://${link.domainSlug}/${link.slug}`
                                        : `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${link.id}`,
                                    )
                                  }
                                  title="Copy to clipboard"
                                >
                                  Copy to Clipboard
                                </button>
                              )}
                            </div>
                            <ButtonTooltip content="Edit link">
                              <Button
                                variant="link"
                                size="icon"
                                className="group h-7 w-8"
                                onClick={() => handleEditLink(link)}
                                title="Edit link"
                              >
                                <span className="sr-only">Edit link</span>
                                <Settings2Icon className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                              </Button>
                            </ButtonTooltip>
                          </TableCell>
                          <TableCell>
                            <CollapsibleTrigger
                              disabled={
                                Number(nFormatter(link._count.views)) === 0 ||
                                targetType === "DATAROOM"
                              }
                            >
                              <div className="flex items-center space-x-1 [&[data-state=open]>svg.chevron]:rotate-180">
                                <BarChart className="h-4 w-4 text-muted-foreground" />
                                <p className="whitespace-nowrap text-sm text-muted-foreground">
                                  {nFormatter(link._count.views)}
                                  <span className="ml-1 hidden sm:inline-block">
                                    views
                                  </span>
                                </p>
                              </div>
                            </CollapsibleTrigger>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {link.views[0] ? (
                              <time
                                dateTime={new Date(
                                  link.views[0].viewedAt,
                                ).toISOString()}
                              >
                                {timeAgo(link.views[0].viewedAt)}
                              </time>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          
                          <TableCell className="text-center sm:text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0 group-hover/row:ring-1 group-hover/row:ring-gray-200 group-hover/row:dark:ring-gray-700"
                                >
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-black">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => handleEditLink(link)}
                                >
                                  Edit Link
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDuplicateLink(link)}
                                >
                                  Duplicate Link
                                </DropdownMenuItem>
                                {/* <DropdownMenuItem
                                  onClick={() => {
                                    console.log('---1027 handle selct pdf sign pod',link)
                                    setSelectedLinkId(link.id); // pass link.id to viewer
                                    handleFetchFile(link.id)
                                    setShowViewer(true);
                                    console.log('---1027 handle selct pdf sign pod',link)
                                  }}
                                >
                                  Select Signature Position {link.id}
                                </DropdownMenuItem> */}
                                <DropdownMenuItem
                                  className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                                  onClick={() => handlePreviewLink(link)}
                                >
                                  Preview link
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                        <CollapsibleContent asChild>
                          <LinksVisitors
                            linkName={link.name || "No link name"}
                            linkId={link.id}
                          />
                        </CollapsibleContent>
                      </>
                    </Collapsible>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <div className="flex w-full flex-col items-center justify-center gap-4 rounded-xl py-4">
                      <div className="hidden rounded-full sm:block">
                        <div
                          className={cn(
                            "rounded-full border border-white bg-gradient-to-t from-gray-100 p-1 md:p-3",
                          )}
                        >
                          <LinkIcon className="size-6" />
                        </div>
                      </div>
                      <p>No links found for this {targetType.toLowerCase()}</p>
                      <Button 
                        style={{border:'1px solid #E5E7EB'}} 
                        className="hover:text-white hover:bg-[#10B981]" 
                        onClick={() => setIsLinkSheetVisible(true)}
                      >
                        Create link to share
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <LinkSheet
          isOpen={isLinkSheetVisible}
          setIsOpen={setIsLinkSheetVisible}
          linkType={`${targetType}_LINK`}
          currentLink={selectedLink.id ? selectedLink : undefined}
          existingLinks={links}
        />
        
      {/* PDF Signature Position Selector Modal */}
      <div>
      {/* <button onClick={() => setShowViewer(true)}>Open PDF</button> */}
      <p>{fetchFile} </p>
      {showViewer && (
        <PDFViewerModal
          pdfUrl={fetchFile}
          // pdfUrl="https://ng1fpw3pzi9q1m6s.public.blob.vercel-storage.com/Tofi-9FJa6Tl9Np3pqds4JBSXcTbQnO5I7f.PDF"
          onPositionSelect={handlePositionSelect}
          linkId={selectedLinkId!} // non-null assertion if you're sure it's not null
          onClose={() => setShowViewer(false)}
        />
      )}
    </div>

        {archivedLinksCount > 0 && (
          <Collapsible asChild>
            <>
              <CollapsibleTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="mx-auto mt-4 flex h-8 items-center justify-center gap-x-1 text-gray-400 [&[data-state=open]>svg.chevron]:rotate-180"
                >
                  {archivedLinksCount} Archived Links
                  <ChevronDown className="chevron h-4 w-4 text-gray-400 transition-transform duration-200" />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                {/* Archived links section - unchanged */}
                <div>
                  <h2 className="mb-2 md:mb-4">Archived Links</h2>
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow className="*:whitespace-nowrap *:font-medium hover:bg-transparent">
                        <TableHead>Name</TableHead>
                        <TableHead className="w-[150px] sm:w-[200px] md:w-[250px]">
                          Link
                        </TableHead>
                        <TableHead>Views</TableHead>
                        <TableHead>Last Viewed</TableHead>
                        <TableHead className="ftext-center sm:text-right"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {links &&
                        links
                          .filter((link) => link.isArchived)
                          .map((link) => (
                            <>
                              <TableRow key={link.id} className="group/row">
                                <TableCell className="w-[180px] truncate">
                                  {link.name || "No link name"}
                                </TableCell>
                                <TableCell className="max-w-[250px] sm:min-w-[300px] md:min-w-[400px] lg:min-w-[450px]">
                                  <div className="flex items-center gap-x-4 whitespace-nowrap rounded-sm bg-secondary px-3 py-1.5 text-xs text-secondary-foreground sm:py-1 sm:text-sm">
                                    {link.domainId
                                      ? `https://${link.domainSlug}/${link.slug}`
                                      : `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${link.id}`}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center space-x-1 [&[data-state=open]>svg.chevron]:rotate-180">
                                    <BarChart className="h-4 w-4 text-gray-400" />
                                    <p className="whitespace-nowrap text-sm text-gray-400">
                                      {nFormatter(link._count.views)}
                                      <span className="ml-1 hidden sm:inline-block">
                                        views
                                      </span>
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell className="text-sm text-gray-400">
                                  {link.views[0] ? (
                                    <time
                                      dateTime={new Date(
                                        link.views[0].viewedAt,
                                      ).toISOString()}
                                    >
                                      {timeAgo(link.views[0].viewedAt)}
                                    </time>
                                  ) : (
                                    "-"
                                  )}
                                </TableCell>
                                <TableCell className="text-center sm:text-right">
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        className="h-8 w-8 p-0"
                                      >
                                        <span className="sr-only">
                                          Open menu
                                        </span>
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuLabel>
                                        Actions
                                      </DropdownMenuLabel>

                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem
                                        className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
                                        onClick={() =>
                                          handleArchiveLink(
                                            link.id,
                                            link.documentId ??
                                              link.dataroomId ??
                                              "",
                                            link.isArchived,
                                          )
                                        }
                                      >
                                        Reactivate
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </TableCell>
                              </TableRow>
                            </>
                          ))}
                    </TableBody>
                  </Table>
                </div>
              </CollapsibleContent>
            </>
          </Collapsible>
        )}
      </div>
    </>
  );
}


