// import { memo, useCallback, useState } from "react";
// import React,{ useEffect} from "react";

// import { useStats } from "@/lib/swr/use-stats";
// import { useTeam } from "@/context/team-context";
// import { useMultiDocumentStats } from "@/lib/swr/use-multiple-stats";
// // import { useMultiDocumentStats } from "@/lib/swr/use-multiple-stats";

// import { TeamContextType } from "@/context/team-context";
// import {
//   DndContext,
//   DragEndEvent,
//   DragOverEvent,
//   DragOverlay,
//   DragStartEvent,
//   MeasuringStrategy,
//   MouseSensor,
//   PointerSensor,
//   TouchSensor,
//   useSensor,
//   useSensors,
// } from "@dnd-kit/core";
// import { motion } from "framer-motion";
// import {
//   FileIcon,
//   FolderIcon,
//   FolderInputIcon,
//   Trash2Icon,
//   XIcon,
// } from "lucide-react";

// import { Skeleton } from "@/components/ui/skeleton";
// import { UploadNotificationDrawer } from "@/components/upload-notification";
// import UploadZone from "@/components/upload-zone";

// import { moveDocumentToFolder } from "@/lib/documents/move-documents";
// import { FolderWithCount } from "@/lib/swr/use-documents";
// import { DocumentWithLinksAndLinkCountAndViewCount } from "@/lib/types";
// import { useMediaQuery } from "@/lib/utils/use-media-query";

// import { Button } from "../ui/button";
// import { Portal } from "../ui/portal";
// import { ButtonTooltip } from "../ui/tooltip";
// import { useDeleteDocumentsModal } from "./actions/delete-documents-modal";
// import DocumentCard from "./document-card";
// import { DraggableItem } from "./drag-and-drop/draggable-item";
// import { DroppableFolder } from "./drag-and-drop/droppable-folder";
// import { EmptyDocuments } from "./empty-document";
// import FolderCard from "./folder-card";
// import { MoveToFolderModal } from "./move-folder-modal";

// export function DocumentsList({
//   folders,
//   documents,
//   teamInfo,
//   folderPathName,
// }: {
//   folders: FolderWithCount[] | undefined;
//   documents: DocumentWithLinksAndLinkCountAndViewCount[] | undefined;
//   teamInfo: TeamContextType | null;
//   folderPathName?: string[];
// }) {
//   const { isMobile } = useMediaQuery();

//   const [uploads, setUploads] = useState<
//     { fileName: string; progress: number; documentId?: string }[]
//   >([]);
//   const [rejectedFiles, setRejectedFiles] = useState<
//     { fileName: string; message: string }[]
//   >([]);

//   const [showDrawer, setShowDrawer] = useState<boolean>(false);
//   const [moveFolderOpen, setMoveFolderOpen] = useState<boolean>(false);

//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

//   const [draggedDocument, setDraggedDocument] =
//     useState<DocumentWithLinksAndLinkCountAndViewCount | null>(null);
//   const [isOverFolder, setIsOverFolder] = useState<boolean>(false);
//   const [isDragging, setIsDragging] = useState<boolean>(false);

//   const { setShowDeleteDocumentsModal, DeleteDocumentsModal } =
//     useDeleteDocumentsModal({
//       documentIds: selectedDocuments,
//       setSelectedDocuments: setSelectedDocuments,
//     });

//   const sensors = useSensors(
//     useSensor(MouseSensor),
//     useSensor(TouchSensor),
//     useSensor(PointerSensor, {
//       activationConstraint: {
//         distance: 10,
//       },
//     }),
//   );

//   const handleSelect = useCallback((id: string) => {
//     setSelectedDocuments((prev) =>
//       prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id],
//     );
//   }, []);

//   const handleDragStart = (event: DragStartEvent) => {
//     setIsDragging(true);
//     // Set draggedDocumentName for DragOverlay
//     if (event.active.data.current?.type === "document") {
//       setDraggedDocument(
//         documents?.find((doc) => doc.id === event.active.id) ?? null,
//       );
//     }
//     const documentId = event.active.id as string;
//     // Find the index of the document that's being dragged
//     const documentIndex = documents?.findIndex((doc) => doc.id === documentId);

//     // Determine if the document is already selected
//     const isSelected = selectedDocuments.includes(documentId);

//     // Calculate yOffset only if the task is already selected
//     let yOffset = 0;
//     if (isSelected) {
//       const firstSelectedIndex = documents?.findIndex((document) =>
//         selectedDocuments.includes(document.id.toString()),
//       );
//       yOffset = (documentIndex! - firstSelectedIndex!) * 80; // Example task height, adjust accordingly
//     }

//     setDragOffset({ x: 0, y: yOffset });

//     // Select the document if it's not already selected
//     if (!isSelected) {
//       setSelectedDocuments([documentId]);
//     }
//   };

//   const handleDragOver = (event: DragOverEvent) => {
//     const { over } = event;

//     if (!over) return;

//     const overType = over.data.current?.type;
//     if (overType === "folder") {
//       setIsOverFolder(true);
//     } else {
//       setIsOverFolder(false);
//     }
//   };

//   const handleDragEnd = (event: DragEndEvent) => {
//     setIsDragging(false);
//     const { active, over } = event;

//     setDraggedDocument(null);

//     if (!over) return;

//     const activeId = active.id;
//     const overId = over.id;
//     const isActiveADocument = active.data.current?.type === "document";
//     const isOverAFolder = over.data.current?.type === "folder";

//     if (activeId === overId) return;
//     if (!isActiveADocument || !isOverAFolder) return;

//     // Move the document(s) to the new folder
//     const documentsToMove =
//       selectedDocuments.length > 0 ? selectedDocuments : [activeId.toString()];
//     moveDocumentToFolder({
//       documentIds: documentsToMove,
//       folderId: overId.toString(),
//       folderPathName,
//       teamId: teamInfo?.currentTeam?.id,
//     });

//     setSelectedDocuments([]);
//     setIsOverFolder(false);
//   };

  
  
//   // const [totalViews2, setTotalViews2] = useState(0);
//   // const [uniqueViews, setUniqueViews] = useState(0);
//   // const [avgViewDuration, setAvgViewDuration] = useState("0"); // string like "2:30" or "45"
//   // const [avgUnit, setAvgUnit] = useState("seconds"); // "seconds" or "minutes"
  
//   const documentIds = documents?.map((doc) => doc.id) ?? [];
//    const [excludeTeamMembers, setExcludeTeamMembers] = useState<boolean>(false);
//    const [totalViews, setTotalViews] = useState(0);

//   // Use the new hook to fetch stats for all documents
//   const { 
//     combinedStats, 
//     individualStats,
//     loading, 
//     error 
//   } = useMultiDocumentStats({
//     documentIds,
//     excludeTeamMembers
//   });

//   // Destructure the combined stats
//   // const { totalViews2, uniqueViews, avgDuration } = combinedStats;
//   const [totalViewsState, setTotalViewsState] = useState(0);
//   // const [totalViews, setTotalViews] = useState(0);

//   // const { totalViews, uniqueViews, avgDuration } = combinedStats;
//   const { totalViews: combinedTotalViews, uniqueViews, avgDuration } = combinedStats;

  
//   // If you want to access stats for an individual document:
//   // useEffect(() => {
//   //   if (!loading && !error) {
//   //     // Example: access stats for first document
//   //     if (documentIds.length > 0 && individualStats[documentIds[0]]) {
//   //       const firstDocStats = individualStats[documentIds[0]];
//   //       console.log('Stats for first document:', firstDocStats);
//   //     }
      
//   //     console.log('Combined stats for all documents:');
//   //     console.log(`- Total views: ${totalViews}`);
//   //     console.log(`- Unique views: ${uniqueViews}`);
//   //     console.log(`- Average duration: ${avgDuration.value} ${avgDuration.unit}`);
//   //   }
//   // }, [loading, error, documentIds, individualStats, totalViews2, uniqueViews, avgDuration,totalViews]);
// // }, [loading, error, documentIds, individualStats, totalViews2, uniqueViews, avgDuration]);

// useEffect(() => {
//   if (!loading && !error) {
//     // Example: access stats for first document
//     if (documentIds.length > 0 && individualStats[documentIds[0]]) {
//       const firstDocStats = individualStats[documentIds[0]];
//       console.log('document length:', documentIds.length);
//       // console.log('document length:', documentIds.length);
//       console.log('Stats for first document:', firstDocStats);
//     }

//     console.log('Combined stats for all documents:');
//     console.log(`- Total views: ${totalViews}`);
//     console.log(`- Unique views: ${uniqueViews}`);
//     console.log(`- Average duration: ${avgDuration.value} ${avgDuration.unit}`);
//   }
// }, [loading, error, documentIds, individualStats, totalViews, uniqueViews, avgDuration]);

// // Log the local state total views
// console.log('Total Views State:', totalViewsState);
  
//   // console.log('Total Views:', totalViews2);
//   console.log('Unique Views:', uniqueViews);
//   console.log('Avg View Duration:', avgDuration);
  



//   //  const [excludeTeamMembers, setExcludeTeamMembers] = useState<boolean>(false);
//   //   const statsData = useStats({ excludeTeamMembers });
//   //   console.log('--------documents list page 180 stats',statsData)

//   const HeaderContent = memo(() => {
//     if (selectedDocuments.length > 0) {
//       return (
//         <div className="mb-2 flex items-center gap-x-1 rounded-3xl bg-gray-100 text-sm text-foreground dark:bg-gray-800">
          
//           <ButtonTooltip content="Clear selection">
//             <Button
//               onClick={() => setSelectedDocuments([])}
//               className="mx-1.5 my-1 size-8 rounded-full hover:bg-gray-200 hover:dark:bg-gray-700"
//               variant="ghost"
//               size="icon"
//             >
//               <XIcon className="h-5 w-5" />
//             </Button>
//           </ButtonTooltip>
//           <div className="mr-2 tabular-nums">
//             {selectedDocuments.length} selected
//           </div>
//           {/* <ButtonTooltip content="Move">
//             <Button
//               onClick={() => setMoveFolderOpen(true)}
//               className="mx-1.5 my-1 size-8 rounded-full hover:bg-gray-200 hover:dark:bg-gray-700"
//               variant="ghost"
//               size="icon"
//             >
//               <FolderInputIcon className="h-5 w-5" />
//             </Button>
//           </ButtonTooltip> */}
//           <ButtonTooltip content="Delete">
//             <Button
//               onClick={() => setShowDeleteDocumentsModal(true)}
//               className="mx-1.5 my-1 size-8 rounded-full hover:bg-destructive hover:text-destructive-foreground"
//               variant="ghost"
//               size="icon"
//             >
//               <Trash2Icon className="h-5 w-5" />
//             </Button>
//           </ButtonTooltip>
//         </div>
//       );
//     } else {
//       return (
//         <div className="mb-2 flex items-center gap-x-2 pt-5">
          
//           {folders && folders.length > 0 && (
//             <p className="flex items-center gap-x-1 text-sm text-gray-400">
//               <FolderIcon className="h-5 w-5" />
//               <span>
//                 {folders.length} folder{folders.length > 1 ? "s" : ""}
//               </span>
//             </p>
//           )}
//           {documents && documents.length > 0 && (
//             <p className="flex items-center gap-x-1 text-sm text-[#4B5563]">
//               <FileIcon className="h-5 w-5" />
//               <span>
//                 {documents.length} document{documents.length > 1 ? "s" : ""}
//               </span>
//             </p>
//           )}
//         </div>
//       );
//     }
//   });
//   HeaderContent.displayName = "HeaderContent";


// const [totalLinks, setTotalLinks] = useState(0);

// useEffect(() => {
//   if (documents && documents.length > 0) {
//     let views = 0;
//     let links = 0;

//     documents.forEach((doc) => {
//       views += doc._count?.views || 0;
//       links += doc._count?.links || 0;
//     });

//     setTotalViews(views);
//     setTotalLinks(links);
//   } else {
//     setTotalViews(0);
//     setTotalLinks(0);
//   }
// }, [documents]);


//   return (
//     <>
    
//       <UploadZone
//         folderPathName={folderPathName?.join("/")}
//         onUploadStart={(newUploads) => {
//           setUploads(newUploads);
//           setShowDrawer(true);
//         }}
//         onUploadProgress={(index, progress, documentId) => {
//           setUploads((prevUploads) =>
//             prevUploads.map((upload, i) =>
//               i === index ? { ...upload, progress, documentId } : upload,
//             ),
//           );
//         }}
//         onUploadRejected={(rejected) => {
//           setRejectedFiles(rejected);
//           setShowDrawer(true);
//         }}
//         setUploads={setUploads}
//         setRejectedFiles={setRejectedFiles}
//       >
//         {isMobile ? (
//           <div className="space-y-4">
//             {/* Folders list */}
//             <ul role="list" className="space-y-4">
//               {folders
//                 ? folders.map((folder) => {
//                     return (
//                       <FolderCard
//                         key={folder.id}
//                         folder={folder}
//                         teamInfo={teamInfo}
//                       />
//                     );
//                   })
//                 : Array.from({ length: 3 }).map((_, i) => (
//                     <li
//                       key={i}
//                       className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
//                     >
//                       <Skeleton key={i} className="h-9 w-9" />
//                       <div>
//                         <Skeleton key={i} className="h-4 w-32" />
//                         <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
//                       </div>
//                       <Skeleton
//                         key={i + 1}
//                         className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
//                       />
//                     </li>
//                   ))}
//             </ul>

//             {/* Documents list */}
//             <ul role="list" className="space-y-4">
//               {documents
//                 ? documents.map((document) => {
//                     return (
//                       <DocumentCard
//                         key={document.id}
//                         document={document}
//                         teamInfo={teamInfo}
//                         isDragging={
//                           isDragging && selectedDocuments.includes(document.id)
//                         }
//                       />
//                     );
//                   })
//                 : Array.from({ length: 3 }).map((_, i) => (
//                     <li
//                       key={i}
//                       className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
//                     >
//                       <Skeleton key={i} className="h-9 w-9" />
//                       <div>
//                         <Skeleton key={i} className="h-4 w-32" />
//                         <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
//                       </div>
//                       <Skeleton
//                         key={i + 1}
//                         className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
//                       />
//                     </li>
//                   ))}
//             </ul>

//             <Portal containerId={"documents-header-count"}>
//               <HeaderContent />
//             </Portal>

//             {documents && documents.length === 0 && (
//               <div className="flex items-center justify-center">
//                 <EmptyDocuments />
//               </div>
//             )}
//           </div>
//         ) : (
//           <>
//             <DndContext
//               sensors={sensors}
//               onDragStart={handleDragStart}
//               onDragOver={handleDragOver}
//               onDragEnd={handleDragEnd}
//               onDragCancel={() => setIsOverFolder(false)}
//               measuring={{
//                 droppable: {
//                   strategy: MeasuringStrategy.Always,
//                 },
//               }}
//             >
//               <div className="space-y-4">
//                 {/* Folders list */}
//                 <ul role="list" className="space-y-4">
//                   {folders
//                     ? folders.map((folder) => {
//                         return (
//                           <DroppableFolder key={folder.id} id={folder.id}>
//                             <FolderCard
//                               key={folder.id}
//                               folder={folder}
//                               teamInfo={teamInfo}
//                             />
//                           </DroppableFolder>
//                         );
//                       })
//                     : Array.from({ length: 3 }).map((_, i) => (
//                         <li
//                           key={i}
//                           className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
//                         >
//                           <Skeleton key={i} className="h-9 w-9" />
//                           <div>
//                             <Skeleton key={i} className="h-4 w-32" />
//                             <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
//                           </div>
//                           <Skeleton
//                             key={i + 1}
//                             className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
//                           />
//                         </li>
//                       ))}
//                 </ul>

//                 {/* Documents list */}
//                 <ul role="list" className="space-y-4">
//                   {documents
//                     ? documents.map((document) => {
//                       // console.log("document---------lsit 390", document);
//                         return (
//                           <DraggableItem
//                             key={document.id}
//                             id={document.id}
//                             isSelected={selectedDocuments.includes(document.id)}
//                             onSelect={handleSelect}
//                             isDraggingSelected={isDragging}
//                           >
//                             <DocumentCard
//                               key={document.id}
//                               document={document}
//                               teamInfo={teamInfo}
//                               isDragging={
//                                 isDragging &&
//                                 selectedDocuments.includes(document.id)
//                               }
//                             />
//                           </DraggableItem>
//                         );
//                       })
//                     : Array.from({ length: 3 }).map((_, i) => (
//                         <li
//                           key={i}
//                           className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
//                         >
//                           <Skeleton key={i} className="h-9 w-9" />
//                           <div>
//                             <Skeleton key={i} className="h-4 w-32" />
//                             <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
//                           </div>
//                           <Skeleton
//                             key={i + 1}
//                             className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
//                           />
//                         </li>
//                       ))}
//                 </ul>

//                 <Portal>
//                   <DragOverlay className="cursor-default">
//                     <motion.div
//                       initial={{ scale: 1, opacity: 1 }}
//                       animate={{ scale: 0.9, opacity: 0.95 }}
//                       exit={{ scale: 1, opacity: 1 }}
//                       transition={{ duration: 0.2 }}
//                       className="relative"
//                       style={{ transform: `translateY(${dragOffset.y}px)` }}
//                     >
//                       {draggedDocument ? (
//                         <DocumentCard
//                           document={draggedDocument}
//                           teamInfo={teamInfo}
//                         />
//                       ) : null}
//                       {selectedDocuments.length > 1 ? (
//                         <div className="absolute -right-4 -top-4 rounded-full border border-border bg-foreground px-4 py-2">
//                           <span className="text-sm font-semibold text-background">
//                             {selectedDocuments.length}
//                           </span>
//                         </div>
//                       ) : null}
//                     </motion.div>
//                   </DragOverlay>
//                 </Portal>

//                 {/* <Portal containerId={"documents-header-count"}>
          
//                   <HeaderContent />
//                 </Portal> */}

// <Portal containerId={"documents-header-count"}>
//  <> {
//    documents && documents.length > 0 ? (
//       <div className="flex justify-between gap-4 w-full">
//       {/* Card 1 */}
//       <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
//         <div className="mr-4 p-3 rounded-md bg-[#FFEDD5]">
//         <svg width="15" height="25" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M15 24.5H0V0.5H15V24.5Z" stroke="#E5E7EB"/>
//     <g clip-path="url(#clip0_409_2145)">
//     <path d="M2.5 20.125C2.15625 20.125 1.875 19.8438 1.875 19.5V4.5C1.875 4.15625 2.15625 3.875 2.5 3.875H8.75V7C8.75 7.69141 9.30859 8.25 10 8.25H13.125V19.5C13.125 19.8438 12.8438 20.125 12.5 20.125H2.5ZM2.5 2C1.12109 2 0 3.12109 0 4.5V19.5C0 20.8789 1.12109 22 2.5 22H12.5C13.8789 22 15 20.8789 15 19.5V8.03516C15 7.37109 14.7383 6.73438 14.2695 6.26562L10.7305 2.73047C10.2617 2.26172 9.62891 2 8.96484 2H2.5ZM4.6875 12C4.16797 12 3.75 12.418 3.75 12.9375C3.75 13.457 4.16797 13.875 4.6875 13.875H10.3125C10.832 13.875 11.25 13.457 11.25 12.9375C11.25 12.418 10.832 12 10.3125 12H4.6875ZM4.6875 15.75C4.16797 15.75 3.75 16.168 3.75 16.6875C3.75 17.207 4.16797 17.625 4.6875 17.625H10.3125C10.832 17.625 11.25 17.207 11.25 16.6875C11.25 16.168 10.832 15.75 10.3125 15.75H4.6875Z" fill="#F97316"/>
//     </g>
//     <defs>
//     <clipPath id="clip0_409_2145">
//     <path d="M0 2H15V22H0V2Z" fill="white"/>
//     </clipPath>
//     </defs>
//     </svg>
    
//         </div>
//         <div>
//           <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Pitches</div>
//           <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>{documents?.length}</div>
//         </div>
//       </div>
    
//       {/* Card 2 */}
//       <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
//         <div className=" mr-4 p-3 rounded-md bg-[#DBEAFE]">
//         <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M22.5 24.5H0V0.5H22.5V24.5Z" stroke="#E5E7EB"/>
//     <g clip-path="url(#clip0_409_2155)">
//     <path d="M11.251 5.125C8.7041 5.125 6.61035 6.28125 5.00488 7.76953C3.50098 9.16797 2.46191 10.8281 1.93066 12C2.46191 13.1719 3.50098 14.832 5.00098 16.2305C6.61035 17.7187 8.7041 18.875 11.251 18.875C13.7979 18.875 15.8916 17.7187 17.4971 16.2305C19.001 14.832 20.04 13.1719 20.5713 12C20.04 10.8281 19.001 9.16797 17.501 7.76953C15.8916 6.28125 13.7979 5.125 11.251 5.125ZM3.72754 6.39844C5.56738 4.6875 8.09473 3.25 11.251 3.25C14.4072 3.25 16.9346 4.6875 18.7744 6.39844C20.6025 8.09766 21.8252 10.125 22.4072 11.5195C22.5361 11.8281 22.5361 12.1719 22.4072 12.4805C21.8252 13.875 20.6025 15.9062 18.7744 17.6016C16.9346 19.3125 14.4072 20.75 11.251 20.75C8.09473 20.75 5.56738 19.3125 3.72754 17.6016C1.89941 15.9062 0.676758 13.875 0.0986328 12.4805C-0.0302734 12.1719 -0.0302734 11.8281 0.0986328 11.5195C0.676758 10.125 1.89941 8.09375 3.72754 6.39844ZM11.251 15.125C12.9775 15.125 14.376 13.7266 14.376 12C14.376 10.2734 12.9775 8.875 11.251 8.875C11.2236 8.875 11.2002 8.875 11.1729 8.875C11.2236 9.07422 11.251 9.28516 11.251 9.5C11.251 10.8789 10.1299 12 8.75098 12C8.53613 12 8.3252 11.9727 8.12598 11.9219C8.12598 11.9492 8.12598 11.9727 8.12598 12C8.12598 13.7266 9.52441 15.125 11.251 15.125ZM11.251 7C12.5771 7 13.8488 7.52678 14.7865 8.46447C15.7242 9.40215 16.251 10.6739 16.251 12C16.251 13.3261 15.7242 14.5979 14.7865 15.5355C13.8488 16.4732 12.5771 17 11.251 17C9.92489 17 8.65312 16.4732 7.71544 15.5355C6.77776 14.5979 6.25098 13.3261 6.25098 12C6.25098 10.6739 6.77776 9.40215 7.71544 8.46447C8.65312 7.52678 9.92489 7 11.251 7Z" fill="#3B82F6"/>
//     </g>
//     <defs>
//     <clipPath id="clip0_409_2155">
//     <path d="M0 2H22.5V22H0V2Z" fill="white"/>
//     </clipPath>
//     </defs>
//     </svg>
    
//         </div>
//         <div>
//           <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Views</div>
//           <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>{totalViews}</div>
//         </div>
//       </div>
    
//       {/* Card 3 */}
//       <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
//         <div className=" mr-4 p-3 rounded-md bg-[#EDE9FE]">
//         <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M20 24.5H0V0.5H20V24.5Z" stroke="#E5E7EB"/>
//     <g clip-path="url(#clip0_409_2165)">
//     <path d="M18.125 12C18.125 14.1549 17.269 16.2215 15.7452 17.7452C14.2215 19.269 12.1549 20.125 10 20.125C7.84512 20.125 5.77849 19.269 4.25476 17.7452C2.73102 16.2215 1.875 14.1549 1.875 12C1.875 9.84512 2.73102 7.77849 4.25476 6.25476C5.77849 4.73102 7.84512 3.875 10 3.875C12.1549 3.875 14.2215 4.73102 15.7452 6.25476C17.269 7.77849 18.125 9.84512 18.125 12ZM0 12C0 14.6522 1.05357 17.1957 2.92893 19.0711C4.8043 20.9464 7.34784 22 10 22C12.6522 22 15.1957 20.9464 17.0711 19.0711C18.9464 17.1957 20 14.6522 20 12C20 9.34784 18.9464 6.8043 17.0711 4.92893C15.1957 3.05357 12.6522 2 10 2C7.34784 2 4.8043 3.05357 2.92893 4.92893C1.05357 6.8043 0 9.34784 0 12ZM9.0625 6.6875V12C9.0625 12.3125 9.21875 12.6055 9.48047 12.7812L13.2305 15.2812C13.6602 15.5703 14.2422 15.4531 14.5312 15.0195C14.8203 14.5859 14.7031 14.0078 14.2695 13.7188L10.9375 11.5V6.6875C10.9375 6.16797 10.5195 5.75 10 5.75C9.48047 5.75 9.0625 6.16797 9.0625 6.6875Z" fill="#8B5CF6"/>
//     </g>
//     <defs>
//     <clipPath id="clip0_409_2165">
//     <path d="M0 2H20V22H0V2Z" fill="white"/>
//     </clipPath>
//     </defs>
//     </svg>
    
//         </div>
//         <div>
//           <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Avg Time Spent</div>
//           <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display ' }}>{avgDuration.value} {avgDuration.unit}</div>
//         </div>
//       </div>
    
//       {/* Card 4 */}
//       <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
//         <div className=" mr-4 p-3 rounded-md bg-[#D1FAE5]">
//         <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M25 24.5H0V0.5H25V24.5Z" stroke="#E5E7EB"/>
//     <g clip-path="url(#clip0_409_2175)">
//     <path d="M22.6475 12.4572C24.8545 10.2502 24.8545 6.67598 22.6475 4.46895C20.6943 2.51583 17.6162 2.26192 15.3701 3.86739L15.3076 3.91036C14.7451 4.3127 14.6162 5.09395 15.0186 5.65255C15.4209 6.21114 16.2021 6.34395 16.7607 5.94161L16.8232 5.89864C18.0771 5.00411 19.792 5.14473 20.8779 6.23458C22.1084 7.46505 22.1084 9.45723 20.8779 10.6877L16.4951 15.0783C15.2646 16.3088 13.2725 16.3088 12.042 15.0783C10.9521 13.9885 10.8115 12.2736 11.7061 11.0236L11.749 10.9611C12.1514 10.3986 12.0186 9.61739 11.46 9.21895C10.9014 8.82052 10.1162 8.94942 9.71777 9.50801L9.6748 9.57052C8.06543 11.8127 8.31934 14.8908 10.2725 16.844C12.4795 19.051 16.0537 19.051 18.2607 16.844L22.6475 12.4572ZM2.35059 11.5432C0.143555 13.7502 0.143555 17.3244 2.35059 19.5315C4.30371 21.4846 7.38184 21.7385 9.62793 20.133L9.69043 20.09C10.2529 19.6877 10.3818 18.9065 9.97949 18.3479C9.57715 17.7893 8.7959 17.6565 8.2373 18.0588L8.1748 18.1018C6.9209 18.9963 5.20605 18.8557 4.12012 17.7658C2.88965 16.5315 2.88965 14.5393 4.12012 13.3088L8.50293 8.92208C9.7334 7.69161 11.7256 7.69161 12.9561 8.92208C14.0459 10.0119 14.1865 11.7268 13.292 12.9807L13.249 13.0432C12.8467 13.6057 12.9795 14.3869 13.5381 14.7854C14.0967 15.1838 14.8818 15.0549 15.2803 14.4963L15.3232 14.4338C16.9326 12.1877 16.6787 9.10958 14.7256 7.15645C12.5186 4.94942 8.94434 4.94942 6.7373 7.15645L2.35059 11.5432Z" fill="#10B981"/>
//     </g>
//     <defs>
//     <clipPath id="clip0_409_2175">
//     <path d="M0 2H25V22H0V2Z" fill="white"/>
//     </clipPath>
//     </defs>
//     </svg>
    
//         </div>
//         <div>
//           <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Links</div>
//           <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display ' }}>{totalLinks}</div>
//         </div>
//       </div>
//     </div>
//     ) : null
//   }



//   <HeaderContent />
//   </>
// </Portal>


//                 {documents && documents.length === 0 && (
//                   <div className="flex items-center justify-center">
//                     <EmptyDocuments />
//                   </div>
//                 )}
//               </div>
//             </DndContext>
//             {moveFolderOpen ? (
//               <MoveToFolderModal
//                 open={moveFolderOpen}
//                 setOpen={setMoveFolderOpen}
//                 setSelectedDocuments={setSelectedDocuments}
//                 documentIds={selectedDocuments}
//               />
//             ) : null}
//             <DeleteDocumentsModal />
//           </>
//         )}
//       </UploadZone>
//       {showDrawer ? (
//         <UploadNotificationDrawer
//           open={showDrawer}
//           onOpenChange={setShowDrawer}
//           uploads={uploads}
//           setUploads={setUploads}
//           rejectedFiles={rejectedFiles}
//           setRejectedFiles={setRejectedFiles}
//         />
//       ) : null}
//     </>
//   );
// }






import { memo, useCallback, useState } from "react";
import React, { useEffect } from "react";

import { useTeam } from "@/context/team-context";
import { useMultiDocumentStats } from "@/lib/swr/use-multiple-stats";

import { TeamContextType } from "@/context/team-context";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MeasuringStrategy,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import {
  FileIcon,
  FolderIcon,
  FolderInputIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import { UploadNotificationDrawer } from "@/components/upload-notification";
import UploadZone from "@/components/upload-zone";

import { moveDocumentToFolder } from "@/lib/documents/move-documents";
import { FolderWithCount } from "@/lib/swr/use-documents";
import { DocumentWithLinksAndLinkCountAndViewCount } from "@/lib/types";
import { useMediaQuery } from "@/lib/utils/use-media-query";

import { Button } from "../ui/button";
import { Portal } from "../ui/portal";
import { ButtonTooltip } from "../ui/tooltip";
import { useDeleteDocumentsModal } from "./actions/delete-documents-modal";
import DocumentCard from "./document-card";
import { DraggableItem } from "./drag-and-drop/draggable-item";
import { DroppableFolder } from "./drag-and-drop/droppable-folder";
import { EmptyDocuments } from "./empty-document";
import FolderCard from "./folder-card";
import { MoveToFolderModal } from "./move-folder-modal";

export function DocumentsList({
  folders,
  documents,
  teamInfo,
  folderPathName,
}: {
  folders: FolderWithCount[] | undefined;
  documents: DocumentWithLinksAndLinkCountAndViewCount[] | undefined;
  teamInfo: TeamContextType | null;
  folderPathName?: string[];
}) {
  const { isMobile } = useMediaQuery();

  const [uploads, setUploads] = useState<
    { fileName: string; progress: number; documentId?: string }[]
  >([]);
  const [rejectedFiles, setRejectedFiles] = useState<
    { fileName: string; message: string }[]
  >([]);

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [moveFolderOpen, setMoveFolderOpen] = useState<boolean>(false);

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  const [draggedDocument, setDraggedDocument] =
    useState<DocumentWithLinksAndLinkCountAndViewCount | null>(null);
  const [isOverFolder, setIsOverFolder] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Document stats from document metadata
  const [documentViewCount, setDocumentViewCount] = useState(0);
  const [documentLinkCount, setDocumentLinkCount] = useState(0);

  const { setShowDeleteDocumentsModal, DeleteDocumentsModal } =
    useDeleteDocumentsModal({
      documentIds: selectedDocuments,
      setSelectedDocuments: setSelectedDocuments,
    });

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleSelect = useCallback((id: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(id) ? prev.filter((docId) => docId !== id) : [...prev, id],
    );
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setIsDragging(true);
    // Set draggedDocumentName for DragOverlay
    if (event.active.data.current?.type === "document") {
      setDraggedDocument(
        documents?.find((doc) => doc.id === event.active.id) ?? null,
      );
    }
    const documentId = event.active.id as string;
    // Find the index of the document that's being dragged
    const documentIndex = documents?.findIndex((doc) => doc.id === documentId);

    // Determine if the document is already selected
    const isSelected = selectedDocuments.includes(documentId);

    // Calculate yOffset only if the task is already selected
    let yOffset = 0;
    if (isSelected) {
      const firstSelectedIndex = documents?.findIndex((document) =>
        selectedDocuments.includes(document.id.toString()),
      );
      yOffset = (documentIndex! - firstSelectedIndex!) * 80; // Example task height, adjust accordingly
    }

    setDragOffset({ x: 0, y: yOffset });

    // Select the document if it's not already selected
    if (!isSelected) {
      setSelectedDocuments([documentId]);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;

    if (!over) return;

    const overType = over.data.current?.type;
    if (overType === "folder") {
      setIsOverFolder(true);
    } else {
      setIsOverFolder(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false);
    const { active, over } = event;

    setDraggedDocument(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    const isActiveADocument = active.data.current?.type === "document";
    const isOverAFolder = over.data.current?.type === "folder";

    if (activeId === overId) return;
    if (!isActiveADocument || !isOverAFolder) return;

    // Move the document(s) to the new folder
    const documentsToMove =
      selectedDocuments.length > 0 ? selectedDocuments : [activeId.toString()];
    moveDocumentToFolder({
      documentIds: documentsToMove,
      folderId: overId.toString(),
      folderPathName,
      teamId: teamInfo?.currentTeam?.id,
    });

    setSelectedDocuments([]);
    setIsOverFolder(false);
  };

  const documentIds = documents?.map((doc) => doc.id) ?? [];
  const [excludeTeamMembers, setExcludeTeamMembers] = useState<boolean>(false);

  // Use the hook to fetch stats for all documents
  const { 
    combinedStats, 
    individualStats,
    loading, 
    error 
  } = useMultiDocumentStats({
    documentIds,
    excludeTeamMembers
  });

  // Destructure the combined stats
  const { totalViews, uniqueViews, avgDuration } = combinedStats;

  // Calculate document view and link counts from the document metadata
  useEffect(() => {
    if (documents && documents.length > 0) {
      let views = 0;
      let links = 0;

      documents.forEach((doc) => {
        views += doc._count?.views || 0;
        links += doc._count?.links || 0;
      });

      setDocumentViewCount(views);
      setDocumentLinkCount(links);
    } else {
      setDocumentViewCount(0);
      setDocumentLinkCount(0);
    }
  }, [documents]);

  // Log stats only when they change (not in an infinite loop)
  // useEffect(() => {
  //   if (!loading && !error) {
  //     // Only log for debugging purposes
  //     console.log('Combined stats for all documents:');
  //     console.log(`- Total views: ${totalViews}`);
  //     console.log(`- Unique views: ${uniqueViews}`);
  //     console.log(`- Average duration: ${avgDuration.value} ${avgDuration.unit}`);
      
  //     if (documentIds.length > 0 && individualStats[documentIds[0]]) {
  //       console.log('Stats for first document:', individualStats[documentIds[0]]);
  //     }
  //   }
  // }, [loading, error, totalViews, uniqueViews, avgDuration, individualStats, documentIds]);




//   // Add this at the top of your component, outside any hooks or effects
const hasLoggedRef = React.useRef(false);

// // Replace your current useEffect with this
useEffect(() => {
  // Only log once when data is loaded and not in an error state
  if (!loading && !error && !hasLoggedRef.current) {
    console.log('Combined stats for all documents:');
    console.log(`- Total views: ${totalViews}`);
    console.log(`- Unique views: ${uniqueViews}`);
    console.log(`- Average duration: ${avgDuration.value} ${avgDuration.unit}`);
    
    if (documentIds.length > 0 && individualStats[documentIds[0]]) {
      console.log('Stats for first document:', individualStats[documentIds[0]]);
    }
    
    // Mark that we've logged so we don't log again
    hasLoggedRef.current = true;
  }
  
  // If we enter a loading state again, reset the flag so we can log new data
  if (loading) {
    hasLoggedRef.current = false;
  }
// Just watching loading and error states
}, [loading, error]);

  const HeaderContent = memo(() => {
    if (selectedDocuments.length > 0) {
      return (
        <div className="mb-2 flex items-center gap-x-1 rounded-3xl bg-gray-100 text-sm text-foreground dark:bg-gray-800">
          
          <ButtonTooltip content="Clear selection">
            <Button
              onClick={() => setSelectedDocuments([])}
              className="mx-1.5 my-1 size-8 rounded-full hover:bg-gray-200 hover:dark:bg-gray-700"
              variant="ghost"
              size="icon"
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </ButtonTooltip>
          <div className="mr-2 tabular-nums">
            {selectedDocuments.length} selected
          </div>
          <ButtonTooltip content="Delete">
            <Button
              onClick={() => setShowDeleteDocumentsModal(true)}
              className="mx-1.5 my-1 size-8 rounded-full hover:bg-destructive hover:text-destructive-foreground"
              variant="ghost"
              size="icon"
            >
              <Trash2Icon className="h-5 w-5" />
            </Button>
          </ButtonTooltip>
        </div>
      );
    } else {
      return (
        <div className="mb-2 flex items-center gap-x-2 pt-5">
          
          {folders && folders.length > 0 && (
            <p className="flex items-center gap-x-1 text-sm text-gray-400">
              <FolderIcon className="h-5 w-5" />
              <span>
                {folders.length} folder{folders.length > 1 ? "s" : ""}
              </span>
            </p>
          )}
          {documents && documents.length > 0 && (
            <p className="flex items-center gap-x-1 text-sm text-[#4B5563]">
              <FileIcon className="h-5 w-5" />
              <span>
                {documents.length} document{documents.length > 1 ? "s" : ""}
              </span>
            </p>
          )}
        </div>
      );
    }
  });
  HeaderContent.displayName = "HeaderContent";

  return (
    <>
      <UploadZone
        folderPathName={folderPathName?.join("/")}
        onUploadStart={(newUploads) => {
          setUploads(newUploads);
          setShowDrawer(true);
        }}
        onUploadProgress={(index, progress, documentId) => {
          setUploads((prevUploads) =>
            prevUploads.map((upload, i) =>
              i === index ? { ...upload, progress, documentId } : upload,
            ),
          );
        }}
        onUploadRejected={(rejected) => {
          setRejectedFiles(rejected);
          setShowDrawer(true);
        }}
        setUploads={setUploads}
        setRejectedFiles={setRejectedFiles}
      >
        {isMobile ? (
          <div className="space-y-4">
            {/* Folders list */}
            <ul role="list" className="space-y-4">
              {folders
                ? folders.map((folder) => {
                    return (
                      <FolderCard
                        key={folder.id}
                        folder={folder}
                        teamInfo={teamInfo}
                      />
                    );
                  })
                : Array.from({ length: 3 }).map((_, i) => (
                    <li
                      key={i}
                      className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
                    >
                      <Skeleton key={i} className="h-9 w-9" />
                      <div>
                        <Skeleton key={i} className="h-4 w-32" />
                        <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
                      </div>
                      <Skeleton
                        key={i + 1}
                        className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
                      />
                    </li>
                  ))}
            </ul>

            {/* Documents list */}
            <ul role="list" className="space-y-4">
              {documents
                ? documents.map((document) => {
                    return (
                      <DocumentCard
                        key={document.id}
                        document={document}
                        teamInfo={teamInfo}
                        isDragging={
                          isDragging && selectedDocuments.includes(document.id)
                        }
                      />
                    );
                  })
                : Array.from({ length: 3 }).map((_, i) => (
                    <li
                      key={i}
                      className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
                    >
                      <Skeleton key={i} className="h-9 w-9" />
                      <div>
                        <Skeleton key={i} className="h-4 w-32" />
                        <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
                      </div>
                      <Skeleton
                        key={i + 1}
                        className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
                      />
                    </li>
                  ))}
            </ul>

            <Portal containerId={"documents-header-count"}>
              <HeaderContent />
            </Portal>

            {documents && documents.length === 0 && (
              <div className="flex items-center justify-center">
                <EmptyDocuments />
              </div>
            )}
          </div>
        ) : (
          <>
            <DndContext
              sensors={sensors}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
              onDragCancel={() => setIsOverFolder(false)}
              measuring={{
                droppable: {
                  strategy: MeasuringStrategy.Always,
                },
              }}
            >
              <div className="space-y-4">
                {/* Folders list */}
                <ul role="list" className="space-y-4">
                  {folders
                    ? folders.map((folder) => {
                        return (
                          <DroppableFolder key={folder.id} id={folder.id}>
                            <FolderCard
                              key={folder.id}
                              folder={folder}
                              teamInfo={teamInfo}
                            />
                          </DroppableFolder>
                        );
                      })
                    : Array.from({ length: 3 }).map((_, i) => (
                        <li
                          key={i}
                          className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
                        >
                          <Skeleton key={i} className="h-9 w-9" />
                          <div>
                            <Skeleton key={i} className="h-4 w-32" />
                            <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
                          </div>
                          <Skeleton
                            key={i + 1}
                            className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
                          />
                        </li>
                      ))}
                </ul>

                {/* Documents list */}
                <ul role="list" className="space-y-4">
                  {documents
                    ? documents.map((document) => {
                        return (
                          <DraggableItem
                            key={document.id}
                            id={document.id}
                            isSelected={selectedDocuments.includes(document.id)}
                            onSelect={handleSelect}
                            isDraggingSelected={isDragging}
                          >
                            <DocumentCard
                              key={document.id}
                              document={document}
                              teamInfo={teamInfo}
                              isDragging={
                                isDragging &&
                                selectedDocuments.includes(document.id)
                              }
                            />
                          </DraggableItem>
                        );
                      })
                    : Array.from({ length: 3 }).map((_, i) => (
                        <li
                          key={i}
                          className="relative flex w-full items-center space-x-3 rounded-lg border px-4 py-5 sm:px-6 lg:px-6"
                        >
                          <Skeleton key={i} className="h-9 w-9" />
                          <div>
                            <Skeleton key={i} className="h-4 w-32" />
                            <Skeleton key={i + 1} className="mt-2 h-3 w-12" />
                          </div>
                          <Skeleton
                            key={i + 1}
                            className="absolute right-5 top-[50%] h-5 w-20 -translate-y-[50%] transform"
                          />
                        </li>
                      ))}
                </ul>

                <Portal>
                  <DragOverlay className="cursor-default">
                    <motion.div
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ scale: 0.9, opacity: 0.95 }}
                      exit={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                      style={{ transform: `translateY(${dragOffset.y}px)` }}
                    >
                      {draggedDocument ? (
                        <DocumentCard
                          document={draggedDocument}
                          teamInfo={teamInfo}
                        />
                      ) : null}
                      {selectedDocuments.length > 1 ? (
                        <div className="absolute -right-4 -top-4 rounded-full border border-border bg-foreground px-4 py-2">
                          <span className="text-sm font-semibold text-background">
                            {selectedDocuments.length}
                          </span>
                        </div>
                      ) : null}
                    </motion.div>
                  </DragOverlay>
                </Portal>

                <Portal containerId={"documents-header-count"}>
                  <> 
                    {documents && documents.length > 0 ? (
                      <div className="flex justify-between gap-4 w-full">
                        {/* Card 1 */}
                        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
                          <div className="mr-4 p-3 rounded-md bg-[#FFEDD5]">
                            <svg width="15" height="25" viewBox="0 0 15 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 24.5H0V0.5H15V24.5Z" stroke="#E5E7EB"/>
                              <g clipPath="url(#clip0_409_2145)">
                                <path d="M2.5 20.125C2.15625 20.125 1.875 19.8438 1.875 19.5V4.5C1.875 4.15625 2.15625 3.875 2.5 3.875H8.75V7C8.75 7.69141 9.30859 8.25 10 8.25H13.125V19.5C13.125 19.8438 12.8438 20.125 12.5 20.125H2.5ZM2.5 2C1.12109 2 0 3.12109 0 4.5V19.5C0 20.8789 1.12109 22 2.5 22H12.5C13.8789 22 15 20.8789 15 19.5V8.03516C15 7.37109 14.7383 6.73438 14.2695 6.26562L10.7305 2.73047C10.2617 2.26172 9.62891 2 8.96484 2H2.5ZM4.6875 12C4.16797 12 3.75 12.418 3.75 12.9375C3.75 13.457 4.16797 13.875 4.6875 13.875H10.3125C10.832 13.875 11.25 13.457 11.25 12.9375C11.25 12.418 10.832 12 10.3125 12H4.6875ZM4.6875 15.75C4.16797 15.75 3.75 16.168 3.75 16.6875C3.75 17.207 4.16797 17.625 4.6875 17.625H10.3125C10.832 17.625 11.25 17.207 11.25 16.6875C11.25 16.168 10.832 15.75 10.3125 15.75H4.6875Z" fill="#F97316"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_409_2145">
                                  <path d="M0 2H15V22H0V2Z" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Pitches</div>
                            <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>{documents?.length}</div>
                          </div>
                        </div>
                      
                        {/* Card 2 */}
                        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
                          <div className="mr-4 p-3 rounded-md bg-[#DBEAFE]">
                            <svg width="23" height="25" viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M22.5 24.5H0V0.5H22.5V24.5Z" stroke="#E5E7EB"/>
                              <g clipPath="url(#clip0_409_2155)">
                                <path d="M11.251 5.125C8.7041 5.125 6.61035 6.28125 5.00488 7.76953C3.50098 9.16797 2.46191 10.8281 1.93066 12C2.46191 13.1719 3.50098 14.832 5.00098 16.2305C6.61035 17.7187 8.7041 18.875 11.251 18.875C13.7979 18.875 15.8916 17.7187 17.4971 16.2305C19.001 14.832 20.04 13.1719 20.5713 12C20.04 10.8281 19.001 9.16797 17.501 7.76953C15.8916 6.28125 13.7979 5.125 11.251 5.125ZM3.72754 6.39844C5.56738 4.6875 8.09473 3.25 11.251 3.25C14.4072 3.25 16.9346 4.6875 18.7744 6.39844C20.6025 8.09766 21.8252 10.125 22.4072 11.5195C22.5361 11.8281 22.5361 12.1719 22.4072 12.4805C21.8252 13.875 20.6025 15.9062 18.7744 17.6016C16.9346 19.3125 14.4072 20.75 11.251 20.75C8.09473 20.75 5.56738 19.3125 3.72754 17.6016C1.89941 15.9062 0.676758 13.875 0.0986328 12.4805C-0.0302734 12.1719 -0.0302734 11.8281 0.0986328 11.5195C0.676758 10.125 1.89941 8.09375 3.72754 6.39844ZM11.251 15.125C12.9775 15.125 14.376 13.7266 14.376 12C14.376 10.2734 12.9775 8.875 11.251 8.875C11.2236 8.875 11.2002 8.875 11.1729 8.875C11.2236 9.07422 11.251 9.28516 11.251 9.5C11.251 10.8789 10.1299 12 8.75098 12C8.53613 12 8.3252 11.9727 8.12598 11.9219C8.12598 11.9492 8.12598 11.9727 8.12598 12C8.12598 13.7266 9.52441 15.125 11.251 15.125ZM11.251 7C12.5771 7 13.8488 7.52678 14.7865 8.46447C15.7242 9.40215 16.251 10.6739 16.251 12C16.251 13.3261 15.7242 14.5979 14.7865 15.5355C13.8488 16.4732 12.5771 17 11.251 17C9.92489 17 8.65312 16.4732 7.71544 15.5355C6.77776 14.5979 6.25098 13.3261 6.25098 12C6.25098 10.6739 6.77776 9.40215 7.71544 8.46447C8.65312 7.52678 9.92489 7 11.251 7Z" fill="#3B82F6"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_409_2155">
                                  <path d="M0 2H22.5V22H0V2Z" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Views</div>
                            <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>
                              {loading ? "Loading..." : totalViews}
                            </div>
                          </div>
                        </div>
                      
                        {/* Card 3 */}
                        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
                          <div className="mr-4 p-3 rounded-md bg-[#EDE9FE]">
                            <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 24.5H0V0.5H20V24.5Z" stroke="#E5E7EB"/>
                              <g clipPath="url(#clip0_409_2165)">
                                <path d="M18.125 12C18.125 14.1549 17.269 16.2215 15.7452 17.7452C14.2215 19.269 12.1549 20.125 10 20.125C7.84512 20.125 5.77849 19.269 4.25476 17.7452C2.73102 16.2215 1.875 14.1549 1.875 12C1.875 9.84512 2.73102 7.77849 4.25476 6.25476C5.77849 4.73102 7.84512 3.875 10 3.875C12.1549 3.875 14.2215 4.73102 15.7452 6.25476C17.269 7.77849 18.125 9.84512 18.125 12ZM0 12C0 14.6522 1.05357 17.1957 2.92893 19.0711C4.8043 20.9464 7.34784 22 10 22C12.6522 22 15.1957 20.9464 17.0711 19.0711C18.9464 17.1957 20 14.6522 20 12C20 9.34784 18.9464 6.8043 17.0711 4.92893C15.1957 3.05357 12.6522 2 10 2C7.34784 2 4.8043 3.05357 2.92893 4.92893C1.05357 6.8043 0 9.34784 0 12ZM9.0625 6.6875V12C9.0625 12.3125 9.21875 12.6055 9.48047 12.7812L13.2305 15.2812C13.6602 15.5703 14.2422 15.4531 14.5312 15.0195C14.8203 14.5859 14.7031 14.0078 14.2695 13.7188L10.9375 11.5V6.6875C10.9375 6.16797 10.5195 5.75 10 5.75C9.48047 5.75 9.0625 6.16797 9.0625 6.6875Z" fill="#8B5CF6"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_409_2165">
                                  <path d="M0 2H20V22H0V2Z" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Avg Time Spent</div>
                            <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>
                              {loading ? "Loading..." : `${avgDuration.value} ${avgDuration.unit}`}
                            </div>
                          </div>
                        </div>
                      
                        {/* Card 4 */}
                        <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
                          <div className="mr-4 p-3 rounded-md bg-[#D1FAE5]">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M25 24.5H0V0.5H25V24.5Z" stroke="#E5E7EB"/>
                              <g clipPath="url(#clip0_409_2175)">
                                <path d="M22.6475 12.4572C24.8545 10.2502 24.8545 6.67598 22.6475 4.46895C20.6943 2.51583 17.6162 2.26192 15.3701 3.86739L15.3076 3.91036C14.7451 4.3127 14.6162 5.09395 15.0186 5.65255C15.4209 6.21114 16.2021 6.34395 16.7607 5.94161L16.8232 5.89864C18.0771 5.00411 19.792 5.14473 20.8779 6.23458C22.1084 7.46505 22.1084 9.45723 20.8779 10.6877L16.4951 15.0783C15.2646 16.3088 13.2725 16.3088 12.042 15.0783C10.9521 13.9885 10.8115 12.2736 11.7061 11.0236L11.749 10.9611C12.1514 10.3986 12.0186 9.61739 11.46 9.21895C10.9014 8.82052 10.1162 8.94942 9.71777 9.50801L9.6748 9.57052C8.06543 11.8127 8.31934 14.8908 10.2725 16.844C12.4795 19.051 16.0537 19.051 18.2607 16.844L22.6475 12.4572ZM2.35059 11.5432C0.143555 13.7502 0.143555 17.3244 2.35059 19.5315C4.30371 21.4846 7.38184 21.7385 9.62793 20.133L9.69043 20.09C10.2529 19.6877 10.3818 18.9065 9.97949 18.3479C9.57715 17.7893 8.7959 17.6565 8.2373 18.0588L8.1748 18.1018C6.9209 18.9963 5.20605 18.8557 4.12012 17.7658C2.88965 16.5315 2.88965 14.5393 4.12012 13.3088L8.50293 8.92208C9.7334 7.69161 11.7256 7.69161 12.9561 8.92208C14.0459 10.0119 14.1865 11.7268 13.292 12.9807L13.249 13.0432C12.8467 13.6057 12.9795 14.3869 13.5381 14.7854C14.0967 15.1838 14.8818 15.0549 15.2803 14.4963L15.3232 14.4338C16.9326 12.1877 16.6787 9.10958 14.7256 7.15645C12.5186 4.94942 8.94434 4.94942 6.7373 7.15645L2.35059 11.5432Z" fill="#10B981"/>
                              </g>
                              <defs>
                                <clipPath id="clip0_409_2175">
                                  <path d="M0 2H25V22H0V2Z" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Links</div>
                            <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>
                              {documentLinkCount}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : null
                  }
                  <HeaderContent />
                </>
                </Portal>

                {documents && documents.length === 0 && (
                  <div className="flex items-center justify-center">
                    <EmptyDocuments />
                  </div>
                )}
              </div>
            </DndContext>
            {moveFolderOpen ? (
              <MoveToFolderModal
                open={moveFolderOpen}
                setOpen={setMoveFolderOpen}
                setSelectedDocuments={setSelectedDocuments}
                documentIds={selectedDocuments}
              />
            ) : null}
            <DeleteDocumentsModal />
          </>
        )}
      </UploadZone>
      {showDrawer ? (
        <UploadNotificationDrawer
          open={showDrawer}
          onOpenChange={setShowDrawer}
          uploads={uploads}
          setUploads={setUploads}
          rejectedFiles={rejectedFiles}
          setRejectedFiles={setRejectedFiles}
        />
      ) : null}
    </>
  );
}