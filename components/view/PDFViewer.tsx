import { useEffect, useRef, useState } from "react";
import { useCallback } from 'react';
import { useTeam } from "@/context/team-context";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import Nav from "./nav";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

export default function PDFViewer(props: any) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1); // start on first page
  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(0);

  const startTimeRef = useRef(Date.now());
  const pageNumberRef = useRef<number>(pageNumber);
  const teamInfo = useTeam();
  console.log("teamInfo----19",teamInfo)

  const updateNumPages = useCallback(async (numPages: number) => {
    try {
      const response = await fetch(`/api/teams/${teamInfo?.currentTeam?.id}/documents/update`, {
        method: "POST",
        body: JSON.stringify({
          documentId: props.documentId,
          numPages: numPages,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error updating number of pages: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to update number of pages:", error);
    }
  }, [props.documentId, teamInfo?.currentTeam?.id]);

  const trackPageView = useCallback(async (duration: number = 0) => {
    console.log("page number ref current ", pageNumberRef.current)
    try {
      const response = await fetch("/api/record_view", {
        method: "POST",
        body: JSON.stringify({
          linkId: props.linkId,
          documentId: props.documentId,
          viewId: props.viewId,
          duration: duration,
          pageNumber: pageNumberRef.current,
          versionNumber: props.versionNumber,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error recording page view: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Failed to track page view:", error);
    }
  }, [props.linkId, props.documentId, props.viewId, props.versionNumber]);


  useEffect(() => {
    pageNumberRef.current = pageNumber;
  }, [pageNumber]);

  useEffect(() => {
    startTimeRef.current = Date.now(); // update the start time for the new page

    // when component unmounts, calculate duration and track page view
    return () => {
      const endTime = Date.now();
      const duration = Math.round(endTime - startTimeRef.current);
      console.log("component view pdfviewer start time end time ",startTimeRef.current,endTime)
      trackPageView(duration);
    };
  }, [pageNumber,trackPageView]); // monitor pageNumber for changes
// }, [pageNumber]); // monitor pageNumber for changes

// useEffect(() => {
//   if (numPages > 0) {
//     updateNumPages(numPages);
//   }
// }, [numPages, updateNumPages]); // monitor numPages and updateNumPages for changes

// }, [numPages]); // monitor numPages for changes

  useEffect(()=>{
console.log("99999999999999999999999999999999999-----------------******************")
  },[])

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: number;
  }) {
    setNumPages(nextNumPages);
  }

  // Send the last page view when the user leaves the page
  // duration is measured in milliseconds
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     const endTime = Date.now();
  //     const duration = Math.round(endTime - startTimeRef.current);
  //     trackPageView(duration);
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const endTime = Date.now();
      const duration = Math.round(endTime - startTimeRef.current);
      trackPageView(duration); // Ensure trackPageView is always in sync
    };
  
    window.addEventListener("beforeunload", handleBeforeUnload);
  
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [trackPageView]); // Add trackPageView as a dependency
  

  function onPageLoadSuccess() {
    setPageWidth(window.innerWidth);
    setLoading(false);
  }

  const options = {
    cMapUrl: "cmaps/",
    cMapPacked: true,
    standardFontDataUrl: "standard_fonts/",
  };

  const [error, setError] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(true);


// }, [pageNumber]);

  // // Go to next page
  // function goToNextPage() {
  //   if (pageNumber >= numPages!) return;
  //   setPageNumber((prevPageNumber) => prevPageNumber + 1);
  // }

  // function goToPreviousPage() {
  //   if (pageNumber <= 1) return;
  //   setPageNumber((prevPageNumber) => prevPageNumber - 1);
  // }

  // async function downloadfile(e: React.MouseEvent<HTMLButtonElement>) {
  //   try {
  //     //get file data
  //     console.log("---115")
  //     const response = await fetch(props?.file);
  //     const fileData = await response.blob();
  //     console.log("---117 ",fileData)
  //     //create <a/> to download the file
  //     const a = document.createElement("a");
  //     a.href = window.URL.createObjectURL(fileData);
  //     a.download = props?.name;
  //     document.body.appendChild(a);
  //     a.click();
      
  //     //clean up used resources
  //     document.body.removeChild(a);
  //     console.log("---128 ",a)
  //     window.URL.revokeObjectURL(a.href); 
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // }

  // async function trackPageView(duration: number = 0) {
  //   console.log("page number ref current ",pageNumberRef.current)
  //   try {
  //     const response = await fetch("/api/record_view", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         linkId: props.linkId,
  //         documentId: props.documentId,
  //         viewId: props.viewId,
  //         duration: duration,
  //         pageNumber: pageNumberRef.current,
  //         versionNumber: props.versionNumber,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error recording page view: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Failed to track page view:", error);
  //   }
  // }
  
  // async function updateNumPages(numPages: number) {
  //   try {
  //     const response = await fetch(`/api/teams/${teamInfo?.currentTeam?.id}/documents/update`, {
  //       method: "POST",
  //       body: JSON.stringify({
  //         documentId: props.documentId,
  //         numPages: numPages,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Error updating number of pages: ${response.statusText}`);
  //     }
  //   } catch (error) {
  //     console.error("Failed to update number of pages:", error);
  //   }
  // }
  

  useEffect(() => {
    console.log("Attempting to load PDF file:", props.file);
    console.log("File is type:", typeof props.file, props.file);
  }, [props.file]);

const goToNextPage = useCallback(() => {
  if (pageNumber >= numPages!) return;
  setPageNumber((prevPageNumber) => prevPageNumber + 1);
}, [pageNumber, numPages]);

const goToPreviousPage = useCallback(() => {
  if (pageNumber <= 1) return;
  setPageNumber((prevPageNumber) => prevPageNumber - 1);
}, [pageNumber]);

useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowRight":
        goToNextPage();
        break;
      case "ArrowLeft":
        goToPreviousPage();
        break;
      default:
        break;
    }
  };

  // when the component mounts, attach the event listener
  document.addEventListener("keydown", handleKeyDown);

  // when the component unmounts, detach the event listener
  return () => {
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [pageNumber,goToNextPage,goToPreviousPage]); // monitor pageNumber for changes

const downloadfile = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
  try {
    // get file data
    console.log("---115")
    const response = await fetch(props?.file);
    const fileData = await response.blob();
    console.log("---117 ", fileData)
    // create <a/> to download the file
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(fileData);
    a.download = props?.name;
    document.body.appendChild(a);
    a.click();
    
    // clean up used resources
    document.body.removeChild(a);
    console.log("---128 ", a)
    window.URL.revokeObjectURL(a.href);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
}, [props?.file, props?.name]);

// const trackPageView = useCallback(async (duration: number = 0) => {
//   console.log("page number ref current ", pageNumberRef.current)
//   try {
//     const response = await fetch("/api/record_view", {
//       method: "POST",
//       body: JSON.stringify({
//         linkId: props.linkId,
//         documentId: props.documentId,
//         viewId: props.viewId,
//         duration: duration,
//         pageNumber: pageNumberRef.current,
//         versionNumber: props.versionNumber,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error recording page view: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error("Failed to track page view:", error);
//   }
// }, [props.linkId, props.documentId, props.viewId, props.versionNumber]);

// const updateNumPages = useCallback(async (numPages: number) => {
//   try {
//     const response = await fetch(`/api/teams/${teamInfo?.currentTeam?.id}/documents/update`, {
//       method: "POST",
//       body: JSON.stringify({
//         documentId: props.documentId,
//         numPages: numPages,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`Error updating number of pages: ${response.statusText}`);
//     }
//   } catch (error) {
//     console.error("Failed to update number of pages:", error);
//   }
// }, [props.documentId, teamInfo?.currentTeam?.id]);


  // async function checkPDFFile() {
  //   try {
  //     const response = await fetch(props?.file);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch PDF file.");
  //     }
  //     console.log("PDF file fetched successfully.");
  //   } catch (error) {
  //     console.error("Error fetching PDF file:", error);
  //   }
  // }
  
  // useEffect(() => {
  //   checkPDFFile();
  //   console.log("PDF file URL:", props.file);
  // }, [props?.file]);

return (
  <>
    <Nav
      pageNumber={pageNumber}
      numPages={numPages}
      allowDownload={props.allowDownload}
      assistantEnabled={props.assistantEnabled}
      viewId={props.viewId}
      linkId={props.linkId}
    />
    <div
      hidden={loading}
      className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-8"
    >
      <div className={`fixed inset-0 z-10 flex items-center justify-between px-2 pointer-events-none`}>
        {/* ...existing navigation buttons... */}
      </div>

      <div className="mx-auto flex justify-center">
      <div
  className={`fixed inset-0 z-10 flex items-center justify-between px-2 pointer-events-none`}
>
  <button
    onClick={goToPreviousPage}
    disabled={pageNumber <= 1}
    className="relative px-2 py-4 text-[#F97316]  focus:z-20 pointer-events-auto"
  >
    <span className="sr-only">Previous</span>
    <ChevronLeftIcon className="h-10 w-10 " style={{color:'#F97316'}} aria-hidden="true" />
  </button>
  <button
    onClick={goToNextPage}
    disabled={pageNumber >= numPages!}
    className="relative px-2 py-4 text-[#F97316]  focus:z-20 pointer-events-auto"
  >
    <span className="sr-only">Next</span>
    <ChevronRightIcon className="h-10 w-10 " style={{color:'#F97316'}} aria-hidden="true" />
  </button>
</div>
        <Document
          file={props.file}
          onLoadSuccess={(pdf) => {
            setError(null);
            setIsLoading(false);
            onDocumentLoadSuccess(pdf);
          }}
          onLoadError={(error) => {
            console.error("Failed to load PDF:", error);
            setError("Failed to load PDF. Please try again.");
            setLoading(false);
            setIsLoading(false);
          }}
          options={{
            ...options,
            standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
            cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
            cMapPacked: true,
          }}
          loading={
            <div className="flex items-center justify-center min-h-[600px]">
              <div className="animate-pulse">Loading PDF... </div>
            </div>
          }
          error={
            <div className="flex items-center justify-center min-h-[600px] text-red-500">
              {error || "Failed to load PDF"}
            </div>
          }
          className="max-w-full"
          renderMode="canvas"
        >
          {!error && (
            <Page
              key={pageNumber}
              pageNumber={pageNumber}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              onLoadSuccess={onPageLoadSuccess}
              onRenderError={(error) => {
                console.error("Page render error:", error);
                setError("Failed to render page");
                setLoading(false);
              }}
              width={Math.max(pageWidth * 0.8, 390)}
              className="shadow-lg rounded-lg"
              loading={
                <div className="animate-pulse min-h-[600px] flex items-center justify-center">
                  Loading page {pageNumber}...
                </div>
              }
            />
          )}
        </Document>




      </div>
    </div>
  </>
);
}



// // components/PDFViewer.tsx
// import { useEffect, useRef, useState } from "react";
// import { useTeam } from "@/context/team-context";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { Document, Page, pdfjs } from "react-pdf";
// import Nav from "./nav";
// import ESignatureComponent from "../../components/ESignatureComponent";

// pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.12.313/pdf.worker.min.js';

// export default function PDFViewer(props: any) {
//   const [numPages, setNumPages] = useState<number>(0);
//   const [pageNumber, setPageNumber] = useState<number>(1);
//   const [loading, setLoading] = useState(true);
//   const [pageWidth, setPageWidth] = useState(0);
//   const [showSignaturePad, setShowSignaturePad] = useState(false);
//   const [savedSignature, setSavedSignature] = useState<string | null>(null);

//   const startTimeRef = useRef(Date.now());
//   const pageNumberRef = useRef<number>(pageNumber);
//   const teamInfo = useTeam();

//   useEffect(() => {
//     pageNumberRef.current = pageNumber;
//   }, [pageNumber]);

//   // Track time spent on a page
//   useEffect(() => {
//     startTimeRef.current = Date.now();
//     return () => {
//       const endTime = Date.now();
//       const duration = Math.round(endTime - startTimeRef.current);
//       console.log("Page duration:", duration);
//       trackPageView(duration);
//     };
//   }, [pageNumber]);

//   useEffect(() => {
//     if (numPages > 0) {
//       updateNumPages(numPages);
//     }
//   }, [numPages]);

//   function onDocumentLoadSuccess({ numPages: nextNumPages }: { numPages: number; }) {
//     setNumPages(nextNumPages);
//   }

//   // Ensure we track page view if the user leaves the page
//   useEffect(() => {
//     const handleBeforeUnload = () => {
//       const endTime = Date.now();
//       const duration = Math.round(endTime - startTimeRef.current);
//       trackPageView(duration);
//     };
//     window.addEventListener("beforeunload", handleBeforeUnload);
//     return () => {
//       window.removeEventListener("beforeunload", handleBeforeUnload);
//     };
//   }, []);

//   function onPageLoadSuccess() {
//     setPageWidth(window.innerWidth);
//     setLoading(false);
//   }

//   const options = {
//     cMapUrl: "cmaps/",
//     cMapPacked: true,
//     standardFontDataUrl: "standard_fonts/",
//   };

//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Key event handler for page navigation
//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === "ArrowRight") {
//         goToNextPage();
//       } else if (event.key === "ArrowLeft") {
//         goToPreviousPage();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, [pageNumber]);

//   function goToNextPage() {
//     if (pageNumber >= numPages) return;
//     setPageNumber(prev => prev + 1);
//   }

//   function goToPreviousPage() {
//     if (pageNumber <= 1) return;
//     setPageNumber(prev => prev - 1);
//   }

//   async function downloadfile(e: React.MouseEvent<HTMLButtonElement>) {
//     try {
//       const response = await fetch(props?.file);
//       const fileData = await response.blob();
//       const a = document.createElement("a");
//       a.href = window.URL.createObjectURL(fileData);
//       a.download = props?.name;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       window.URL.revokeObjectURL(a.href);
//     } catch (error) {
//       console.error("Error downloading file:", error);
//     }
//   }

//   async function trackPageView(duration: number = 0) {
//     console.log("Tracking page view. Page number:", pageNumberRef.current);
//     try {
//       const response = await fetch("/api/record_view", {
//         method: "POST",
//         body: JSON.stringify({
//           linkId: props.linkId,
//           documentId: props.documentId,
//           viewId: props.viewId,
//           duration: duration,
//           pageNumber: pageNumberRef.current,
//           versionNumber: props.versionNumber,
//         }),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!response.ok) {
//         throw new Error(`Error recording page view: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Failed to track page view:", error);
//     }
//   }

//   async function updateNumPages(numPages: number) {
//     try {
//       const response = await fetch(`/api/teams/${teamInfo?.currentTeam?.id}/documents/update`, {
//         method: "POST",
//         body: JSON.stringify({ documentId: props.documentId, numPages }),
//         headers: { "Content-Type": "application/json" },
//       });
//       if (!response.ok) {
//         throw new Error(`Error updating number of pages: ${response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Failed to update number of pages:", error);
//     }
//   }

//   async function checkPDFFile() {
//     try {
//       const response = await fetch(props?.file);
//       if (!response.ok) throw new Error("Failed to fetch PDF file.");
//       console.log("PDF file fetched successfully.");
//     } catch (error) {
//       console.error("Error fetching PDF file:", error);
//     }
//   }
  
//   useEffect(() => {
//     checkPDFFile();
//     console.log("PDF file URL:", props.file);
//   }, [props?.file]);

//   // Callback when the signature is saved
//   const handleSignatureSave = (dataURL: string) => {
//     console.log("Signature saved as DataURL:", dataURL);
//     setSavedSignature(dataURL);
//     // Here you can overlay the signature on the PDF or use it as needed.
//   };

//   return (
//     <>
//       <Nav
//         pageNumber={pageNumber}
//         numPages={numPages}
//         allowDownload={props.allowDownload}
//         assistantEnabled={props.assistantEnabled}
//         viewId={props.viewId}
//         linkId={props.linkId}
//       />
//       <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center py-8">
//         <div className="fixed inset-0 z-10 flex items-center justify-between px-2 pointer-events-none">
//           <button
//             onClick={goToPreviousPage}
//             disabled={pageNumber <= 1}
//             className="relative px-2 py-4 text-gray-400 hover:text-gray-50 focus:z-20 pointer-events-auto"
//           >
//             <span className="sr-only">Previous</span>
//             <ChevronLeftIcon className="h-10 w-10" aria-hidden="true" />
//           </button>
//           <button
//             onClick={goToNextPage}
//             disabled={pageNumber >= numPages}
//             className="relative px-2 py-4 text-gray-400 hover:text-gray-50 focus:z-20 pointer-events-auto"
//           >
//             <span className="sr-only">Next</span>
//             <ChevronRightIcon className="h-10 w-10" aria-hidden="true" />
//           </button>
//         </div>

//         <div className="mx-auto flex flex-col items-center">
//           <Document
//             file={props.file}
//             onLoadSuccess={(pdf) => {
//               setError(null);
//               setIsLoading(false);
//               onDocumentLoadSuccess(pdf);
//             }}
//             onLoadError={(error) => {
//               console.error("Failed to load PDF:", error);
//               setError("Failed to load PDF. Please try again.");
//               setLoading(false);
//               setIsLoading(false);
//             }}
//             options={{
//               ...options,
//               standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
//               cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
//               cMapPacked: true,
//             }}
//             loading={
//               <div className="flex items-center justify-center min-h-[600px]">
//                 <div className="animate-pulse">Loading PDF...</div>
//               </div>
//             }
//             error={
//               <div className="flex items-center justify-center min-h-[600px] text-red-500">
//                 {error || "Failed to load PDF"}
//               </div>
//             }
//             className="max-w-full"
//             renderMode="canvas"
//           >
//             {!error && (
//               <Page
//                 key={pageNumber}
//                 pageNumber={pageNumber}
//                 renderAnnotationLayer={false}
//                 renderTextLayer={false}
//                 onLoadSuccess={onPageLoadSuccess}
//                 onRenderError={(error) => {
//                   console.error("Page render error:", error);
//                   setError("Failed to render page");
//                   setLoading(false);
//                 }}
//                 width={Math.max(pageWidth * 0.8, 390)}
//                 className="shadow-lg rounded-lg"
//                 loading={
//                   <div className="animate-pulse min-h-[600px] flex items-center justify-center">
//                     Loading page {pageNumber}...
//                   </div>
//                 }
//               />
//             )}
//           </Document>

//           {/* Button to toggle the signature pad */}
//           <button
//             onClick={() => setShowSignaturePad(prev => !prev)}
//             className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
//           >
//             {showSignaturePad ? "Hide Signature Pad" : "Add Signature"}
//           </button>

//           {/* Render the signature pad if enabled */}
//           {showSignaturePad && (
//             <ESignatureComponent
//               onSave={handleSignatureSave}
//               onClose={() => setShowSignaturePad(false)}
//             />
//           )}

//           {/* Optionally display the saved signature */}
//           {savedSignature && (
//             <div className="mt-4">
//               <p className="text-white">Your saved signature:</p>
//               <img src={savedSignature} alt="Saved signature" className="border border-gray-300" />
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }


// import { useEffect, useRef, useState, useCallback } from "react";
// import { useTeam } from "@/context/team-context";
// import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
// import { Document, Page, pdfjs } from "react-pdf";
// import Nav from "./nav";

// pdfjs.GlobalWorkerOptions.workerSrc =
//   `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// export default function PDFViewer(props: {
//   file: string;
//   documentId: string;
//   linkId: string;
//   viewId: string;
//   versionNumber: number;
//   allowDownload?: boolean;
//   assistantEnabled?: boolean;
//   name?: string;
// }) {
//   const teamInfo = useTeam();

//   // --- state & refs ---
//   const [numPages, setNumPages] = useState(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [pageWidth, setPageWidth] = useState(0);
//   const [error, setError] = useState<string | null>(null);

//   const startTimeRef = useRef(Date.now());
//   const pageNumberRef = useRef(pageNumber);

//   // keep ref in sync
//   useEffect(() => {
//     pageNumberRef.current = pageNumber;
//   }, [pageNumber]);

//   // --- telemetry: track each page’s view duration ---
//   const trackPageView = useCallback(
//     async (duration: number) => {
//       try {
//         await fetch("/api/record_view", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             linkId: props.linkId,
//             documentId: props.documentId,
//             viewId: props.viewId,
//             duration,
//             pageNumber: pageNumberRef.current,
//             versionNumber: props.versionNumber,
//           }),
//         });
//       } catch (err) {
//         console.error("Failed to track page view:", err);
//       }
//     },
//     [props.linkId, props.documentId, props.viewId, props.versionNumber]
//   );

//   // whenever pageNumber changes, send the previous page’s duration
//   useEffect(() => {
//     startTimeRef.current = Date.now();
//     return () => {
//       const duration = Date.now() - startTimeRef.current;
//       trackPageView(duration);
//     };
//   }, [pageNumber, trackPageView]);

//   // final beacon on unload
//   useEffect(() => {
//     const onUnload = () => {
//       const duration = Date.now() - startTimeRef.current;
//       navigator.sendBeacon?.(
//         "/api/record_view",
//         JSON.stringify({
//           linkId: props.linkId,
//           documentId: props.documentId,
//           viewId: props.viewId,
//           duration,
//           pageNumber: pageNumberRef.current,
//           versionNumber: props.versionNumber,
//         })
//       );
//     };
//     window.addEventListener("beforeunload", onUnload);
//     return () => window.removeEventListener("beforeunload", onUnload);
//   }, [props, trackPageView]);

//   // update total pages on your backend
//   const updateNumPages = useCallback(
//     async (n: number) => {
//       try {
//         await fetch(
//           `/api/teams/${teamInfo?.currentTeam?.id}/documents/update`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               documentId: props.documentId,
//               numPages: n,
//             }),
//           }
//         );
//       } catch (err) {
//         console.error("Failed to update numPages:", err);
//       }
//     },
//     [props.documentId, teamInfo?.currentTeam?.id]
//   );
//   useEffect(() => {
//     if (numPages > 0) updateNumPages(numPages);
//   }, [numPages, updateNumPages]);

//   // --- PDF.js callbacks ---
//   function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
//     setNumPages(numPages);
//   }
//   function onPageLoadSuccess() {
//     // capture container width once first page is visible
//     setPageWidth(window.innerWidth);
//     setLoading(false);
//   }

//   // --- navigation ---
//   const goNext = useCallback(() => {
//     setPageNumber((p) => Math.min(p + 1, numPages));
//   }, [numPages]);
//   const goPrev = useCallback(() => {
//     setPageNumber((p) => Math.max(p - 1, 1));
//   }, []);
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "ArrowRight") goNext();
//       if (e.key === "ArrowLeft") goPrev();
//     };
//     document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [goNext, goPrev]);

//   // --- download helper (if enabled) ---
//   const downloadFile = useCallback(async () => {
//     try {
//       const resp = await fetch(props.file);
//       const blob = await resp.blob();
//       const a = document.createElement("a");
//       a.href = URL.createObjectURL(blob);
//       a.download = props.name || "document.pdf";
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//       URL.revokeObjectURL(a.href);
//     } catch (err) {
//       console.error("Download failed:", err);
//     }
//   }, [props.file, props.name]);

//   return (
//     <>
//       <Nav
//         pageNumber={pageNumber}
//         numPages={numPages}
//         allowDownload={props.allowDownload}
//         assistantEnabled={props.assistantEnabled}
//         viewId={props.viewId}
//         linkId={props.linkId}
//       />

//       {/* full‑screen loader */}
//       {loading && (
//         <div className="flex items-center justify-center min-h-[600px]">
//           <div className="animate-pulse">Loading PDF…</div>
//         </div>
//       )}

//       {/* once loaded, show the PDF + nav buttons */}
//       <div hidden={loading} className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-8">
//         <div className="fixed inset-0 z-10 flex items-center justify-between px-2 pointer-events-none">
//           <button onClick={goPrev} disabled={pageNumber === 1} className="pointer-events-auto">
//             <ChevronLeftIcon className="h-10 w-10 text-gray-400 hover:text-white" />
//           </button>
//           <button onClick={goNext} disabled={pageNumber === numPages} className="pointer-events-auto">
//             <ChevronRightIcon className="h-10 w-10 text-gray-400 hover:text-white" />
//           </button>
//         </div>

//         <Document
//           file={props.file}
//           options={{ disableStream: true, disableRange: true }}
//           onLoadSuccess={onDocumentLoadSuccess}
//           onLoadError={(err) => {
//             console.error("PDF load error:", err);
//             setError("Failed to load PDF");
//             setLoading(false);
//           }}
//           loading={null}
//           error={<div className="text-red-500">{error || "Error loading PDF"}</div>}
//           className="max-w-full"
//           renderMode="canvas"
//         >
//           {!error && (
//             <Page
//               pageNumber={pageNumber}
//               width={Math.max(pageWidth * 0.8, 400)}
//               onLoadSuccess={onPageLoadSuccess}
//               onRenderError={(err) => {
//                 console.error("Page render error:", err);
//                 setError("Failed to render page");
//                 setLoading(false);
//               }}
//               renderAnnotationLayer={false}
//               renderTextLayer={false}
//               loading={
//                 <div className="animate-pulse min-h-[600px] flex items-center justify-center">
//                   Loading page {pageNumber}…
//                 </div>
//               }
//             />
//           )}
//         </Document>
//       </div>
//     </>
//   );
// }
