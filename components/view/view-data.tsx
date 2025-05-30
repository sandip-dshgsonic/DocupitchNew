import dynamic from "next/dynamic";
import { useState } from "react";

import { Brand } from "@prisma/client";
import { ExtendedRecordMap } from "notion-types";

import  NotionPage  from "@/components/NotionPage";
import PDFViewer from "@/components/view/PDFViewer";
import PDFSignatureSection from "@/components/PDFSignatureSection";
// import PDFViewerSelectCoordinates, { Coordinates } from "@/components/PDFViewerSelectCoordinates";
// import PDFSignatureSection from "@/components/PDFSignatureSection";
import VideoViewer from "@/components/view/VideoViewer";
import PagesViewerNew from "@/components/view/PagesViewerNew";
import { DEFAULT_DOCUMENT_VIEW_TYPE } from "@/components/view/document-view";

import { LinkWithDocument, WatermarkConfig } from "@/lib/types";

import AdvancedExcelViewer from "./viewer/advanced-excel-viewer";

const ExcelViewer = dynamic(
  () => import("@/components/view/viewer/excel-viewer"),
  { ssr: false },
);

export default function ViewData({
  viewData,
  link,
  notionData,
  brand,
  showPoweredByBanner,
  showAccountCreationSlide,
  useAdvancedExcelViewer,
  viewerEmail,
}: {
  viewData: DEFAULT_DOCUMENT_VIEW_TYPE;
  link: LinkWithDocument;
  notionData?: {
    rootNotionPageId: string | null;
    recordMap: ExtendedRecordMap | null;
  };
  brand?: Partial<Brand> | null;
  showPoweredByBanner?: boolean;
  showAccountCreationSlide?: boolean;
  useAdvancedExcelViewer?: boolean;
  viewerEmail?: string;
}) {
  const { document } = link;

  // const [selectedCoords, setSelectedCoords] = useState<Coordinates | undefined>(undefined);

  console.log('------component view viewdata 44 ',viewData, 'doc', document, 'link',link)

  return notionData?.recordMap ? (
    <NotionPage
      recordMap={notionData.recordMap}
      // rootPageId={notionData.rootNotionPageId}
      viewId={viewData.viewId}
      isPreview={viewData.isPreview}
      linkId={link.id}
      documentId={document.id}
      versionNumber={document.versions[0].versionNumber}
      brand={brand}
    />
  ) : viewData.fileType === "sheet" && viewData.sheetData ? (
    <ExcelViewer
      linkId={link.id}
      viewId={viewData.viewId}
      isPreview={viewData.isPreview}
      documentId={document.id}
      documentName={document.name}
      versionNumber={document.versions[0].versionNumber}
      sheetData={viewData.sheetData}
      brand={brand}
      allowDownload={link.allowDownload!}
    />
  ) 
  // : viewData.fileType === "video" ?(
  //   <VideoViewer
  //         // file={viewData.file}
  //         // viewId={viewData.viewId}
  //         documentName={document.name}
  //         // allowDownload={viewData.link.allowDownload}
  //         // currentTime={currentTime}
  //         // duration={duration}
  //         // assistantEnabled={assistantEnabled}
  //         // linkId={viewData.link.id}
  //         // versionNumber={versionNumber}
  //       />
  // ) 
  : viewData.fileType === "sheet" && useAdvancedExcelViewer ? (
    <AdvancedExcelViewer
      linkId={link.id}
      viewId={viewData.viewId}
      isPreview={viewData.isPreview}
      documentId={document.id}
      documentName={document.name}
      versionNumber={document.versions[0].versionNumber}
      file={viewData.file!}
      allowDownload={link.allowDownload!}
      brand={brand}
    />
  ) : viewData.pages ? (
    <PagesViewerNew
      pages={viewData.pages}
      viewId={viewData.viewId}
      isPreview={viewData.isPreview}
      linkId={link.id}
      documentId={document.id}
      assistantEnabled={document.assistantEnabled}
      allowDownload={link.allowDownload!}
      feedbackEnabled={link.enableFeedback!}
      screenshotProtectionEnabled={link.enableScreenshotProtection!}
      versionNumber={document.versions[0].versionNumber}
      brand={brand}
      showPoweredByBanner={showPoweredByBanner}
      showAccountCreationSlide={showAccountCreationSlide}
      enableQuestion={link.enableQuestion}
      feedback={link.feedback}
      isVertical={document.versions[0].isVertical}
      viewerEmail={viewerEmail}
      watermarkConfig={
        link.enableWatermark ? (link.watermarkConfig as WatermarkConfig) : null
      }
      ipAddress={viewData.ipAddress}
      linkName={link.name ?? `Link #${link.id.slice(-5)}`}
    />
  ) : (
  <>
    <PDFViewer
      file={viewData.file}
      viewId={viewData.viewId}
      isPreview={viewData.isPreview}
      linkId={link.id}
      documentId={document.id}
      name={document.name}
      allowDownload={link.allowDownload}
      assistantEnabled={document.assistantEnabled}
      versionNumber={document.versions[0].versionNumber}
    />
 
  {/* <PDFSignatureSection
  file={viewData.file ?? ""}
  documentId={document.id}
  viewId={viewData.viewId ?? ""}
  linkId={link.id}
  versionNumber={String(document.versions[0].versionNumber)}
  viewerEmail={viewerEmail}
  creatorEmail={link.creatorEmail ?? undefined}
  signaturePage={link.signaturePage === null ? undefined : link.signaturePage}
  signatureX={link.signatureX ?? undefined}
  signatureY={link.signatureY ?? undefined}
  renderedWidth={link.renderedWidth ?? undefined}
  renderedHeight={link.renderedHeight ?? undefined}
/> */}
  </>
  );
}
