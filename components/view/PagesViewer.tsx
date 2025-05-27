import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useEffect, useRef, useState } from "react";
import React from "react";

import BlankImg from "@/public/_static/blank.gif";
import { Brand, DataroomBrand } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { toast } from "sonner";

import LoadingSpinner from "@/components/ui/loading-spinner";

import { cn } from "@/lib/utils";

import { ScreenProtector } from "./ScreenProtection";
import { TDocumentData } from "./dataroom/dataroom-view";
import Nav from "./nav";
import { PoweredBy } from "./powered-by";
import Question from "./question";
import Toolbar from "./toolbar";

const DEFAULT_PRELOADED_IMAGES_NUM = 5;

export default function PagesViewer({
  pages,
  linkId,
  documentId,
  viewId,
  assistantEnabled,
  allowDownload,
  feedbackEnabled,
  screenshotProtectionEnabled,
  versionNumber,
  brand,
  documentName,
  dataroomId,
  setDocumentData,
  showPoweredByBanner,
  enableQuestion = false,
  feedback,
}: {
  pages: { file: string; pageNumber: string; embeddedLinks: string[] }[];
  linkId: string;
  documentId: string;
  viewId: string;
  assistantEnabled?: boolean;
  allowDownload: boolean;
  feedbackEnabled: boolean;
  screenshotProtectionEnabled: boolean;
  versionNumber: number;
  brand?: Partial<Brand> | Partial<DataroomBrand> | null;
  documentName?: string;
  dataroomId?: string;
  setDocumentData?: React.Dispatch<React.SetStateAction<TDocumentData | null>>;
  showPoweredByBanner?: boolean;
  enableQuestion?: boolean | null;
  feedback?: {
    id: string;
    data: { question: string; type: string };
  } | null;
}) {
  const router = useRouter();
  const numPages = pages.length;
  const numPagesWithFeedback =
    enableQuestion && feedback ? numPages + 1 : numPages;
  const pageQuery = router.query.p ? Number(router.query.p) : 1;

  const [pageNumber, setPageNumber] = useState<number>(() =>
    pageQuery >= 1 && pageQuery <= numPages ? pageQuery : 1,
  ); // start on first page

  const [loadedImages, setLoadedImages] = useState<boolean[]>(
    new Array(numPages).fill(false),
  );

  const [submittedFeedback, setSubmittedFeedback] = useState<boolean>(false);

  const startTimeRef = useRef(Date.now());
  const pageNumberRef = useRef<number>(pageNumber);
  const visibilityRef = useRef<boolean>(true);

  const preloadImage = useCallback(
    (index: number) => {
      if (index < numPages && !loadedImages[index]) {
        const newLoadedImages = [...loadedImages];
        newLoadedImages[index] = true;
        setLoadedImages(newLoadedImages);
      }
    },
    [numPages, loadedImages]
  );

  const goToPreviousPage = useCallback(() => {
    if (pageNumber <= 1) return;
    if (pageNumber === numPagesWithFeedback)
      return setPageNumber(pageNumber - 1);
    setPageNumber(pageNumber - 1);
  }, [pageNumber, numPagesWithFeedback]);
  
  const goToNextPage = useCallback(() => {
    if (pageNumber >= numPagesWithFeedback) return;
    preloadImage(DEFAULT_PRELOADED_IMAGES_NUM - 1 + pageNumber);
    setPageNumber(pageNumber + 1);
  }, [pageNumber, numPagesWithFeedback, preloadImage]);

  const trackPageView = useCallback(
    async (duration: number = 0) => {
      await fetch("/api/record_view", {
        method: "POST",
        body: JSON.stringify({
          linkId,
          documentId,
          viewId,
          duration,
          pageNumber: pageNumberRef.current,
          versionNumber,
          dataroomId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [linkId, documentId, viewId, versionNumber, dataroomId, pageNumberRef]
  );

  // Update the previous page number after the effect hook has run
  useEffect(() => {
    pageNumberRef.current = pageNumber;
  }, [pageNumber]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        visibilityRef.current = true;
        startTimeRef.current = Date.now(); // Reset start time when the page becomes visible again
      } else {
        visibilityRef.current = false;
        if (pageNumber <= numPages) {
          const duration = Date.now() - startTimeRef.current;
          trackPageView(duration);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [pageNumber, numPages,trackPageView]); // track page view when the page becomes visible or hidden on mount and unmount

  useEffect(() => {
    startTimeRef.current = Date.now();

    return () => {
      if (visibilityRef.current && pageNumber <= numPages) {
        // Only track the page view if the page is visible
        const duration = Date.now() - startTimeRef.current;
        trackPageView(duration);
      }
    };
  }, [pageNumber, numPages,trackPageView]); // Track page view when the page number changes

  // Send the last page view when the user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (pageNumber <= numPages && visibilityRef.current) {
        const duration = Date.now() - startTimeRef.current;
        trackPageView(duration);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [pageNumber, numPages,trackPageView]);

  useEffect(() => {
    setLoadedImages((prev) =>
      prev.map((loaded, index) =>
        index < DEFAULT_PRELOADED_IMAGES_NUM ? true : loaded,
      ),
    );
  }, []); // Run once on mount

  useEffect(() => {
    // Remove token and email query parameters on component mount
    const removeQueryParams = () => {
      const currentQuery = { ...router.query };
      delete currentQuery.token;
      delete currentQuery.email;

      router.replace(
        {
          pathname: router.pathname,
          query: currentQuery,
        },
        undefined,
        { shallow: true },
      );
    };

    if (!dataroomId) {
      removeQueryParams();
    }
  }, [dataroomId,router]); // Run once on mount
// }, []); // Run once on mount

  // const handleKeyDown = (event: KeyboardEvent) => {
  //   switch (event.key) {
  //     case "ArrowRight":
  //       event.preventDefault(); // Prevent default behavior
  //       event.stopPropagation(); // Stop propagation
  //       goToNextPage();
  //       break;
  //     case "ArrowLeft":
  //       event.preventDefault(); // Prevent default behavior
  //       event.stopPropagation(); // Stop propagation
  //       goToPreviousPage();
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!screenshotProtectionEnabled) {
      return null;
    }

    event.preventDefault();
    // Close menu on click anywhere
    const clickHandler = () => {
      document.removeEventListener("click", clickHandler);
    };
    document.addEventListener("click", clickHandler);

    toast.info("Context menu has been disabled.");
  };

  // // Function to preload next image
  // const preloadImage = (index: number) => {
  //   if (index < numPages && !loadedImages[index]) {
  //     const newLoadedImages = [...loadedImages];
  //     newLoadedImages[index] = true;
  //     setLoadedImages(newLoadedImages);
  //   }
  // };

  // // Navigate to previous page
  // const goToPreviousPage = () => {
  //   if (pageNumber <= 1) return;
  //   if (pageNumber === numPagesWithFeedback)
  //     return setPageNumber(pageNumber - 1);
  //   setPageNumber(pageNumber - 1);
  // };

  // // Navigate to next page and preload next image
  // const goToNextPage = () => {
  //   if (pageNumber >= numPagesWithFeedback) return;
  //   preloadImage(DEFAULT_PRELOADED_IMAGES_NUM - 1 + pageNumber); // Preload the next image
  //   setPageNumber(pageNumber + 1);
  // };

 

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          event.stopPropagation();
          goToNextPage();
          break;
        case "ArrowLeft":
          event.preventDefault();
          event.stopPropagation();
          goToPreviousPage();
          break;
        default:
          break;
      }
    },
    [goToNextPage, goToPreviousPage]
  );
  

  

  

  // async function trackPageView(duration: number = 0) {
  //   await fetch("/api/record_view", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       linkId: linkId,
  //       documentId: documentId,
  //       viewId: viewId,
  //       duration: duration,
  //       pageNumber: pageNumberRef.current,
  //       versionNumber: versionNumber,
  //       dataroomId: dataroomId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  // }

  // const trackPageView = useCallback(
  //   async (duration: number = 0) => {
  //     await fetch("/api/record_view", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         linkId,
  //         documentId,
  //         viewId,
  //         duration,
  //         pageNumber: pageNumberRef.current,
  //         versionNumber,
  //         dataroomId,
  //       }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   },
  //   [linkId, documentId, viewId, versionNumber, dataroomId, pageNumberRef]
  // );
  

  useEffect(() => {
    // when the component mounts, attach the event listener
    document.addEventListener("keydown", handleKeyDown);

    // when the component unmounts, detach the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, goToNextPage, goToPreviousPage]);

  return (
    <>
      <Nav
        pageNumber={pageNumber}
        numPages={numPagesWithFeedback}
        assistantEnabled={assistantEnabled}
        allowDownload={allowDownload}
        brand={brand}
        viewId={viewId}
        linkId={linkId}
        documentName={documentName}
        embeddedLinks={pages[pageNumber - 1]?.embeddedLinks}
        isDataroom={dataroomId ? true : false}
        setDocumentData={setDocumentData}
      />
      <div
        style={{ height: "calc(100vh - 64px)" }}
        className="relative flex items-center"
      >
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber == 1}
          className={cn(
            "h-[calc(100vh - 64px)] absolute left-0 z-20 px-2 py-24",
            pageNumber == 1 && "hidden",
          )}
        >
          <span className="sr-only">Previous</span>
          <div className="relative flex items-center justify-center rounded-full bg-gray-950/50 p-1 hover:bg-gray-950/75">
            <ChevronLeftIcon
              className="h-10 w-10 text-white"
              aria-hidden="true"
            />
          </div>
        </button>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPagesWithFeedback}
          className={cn(
            "h-[calc(100vh - 64px)] absolute right-0 z-20 px-2 py-24",
            pageNumber >= numPagesWithFeedback && "hidden",
          )}
        >
          <span className="sr-only">Next</span>
          <div className="relative flex items-center justify-center rounded-full bg-gray-950/50 p-1 hover:bg-gray-950/75">
            <ChevronRightIcon
              className="h-10 w-10 text-white"
              aria-hidden="true"
            />
          </div>
        </button>

        <div
          className="relative mx-auto flex h-full w-full justify-center"
          onContextMenu={handleContextMenu}
        >
          {pageNumber <= numPages &&
            (pages && loadedImages[pageNumber - 1] ? (
              pages.map((page, index) => {
                // served from cloudfront, then use img tag otherwise use next/image
                if (page.file.toLowerCase().includes("files.docupitch.com")) {
                  return (
                    <img
                      key={index}
                      className={`mx-auto object-contain ${
                        pageNumber - 1 === index ? "block" : "hidden"
                      }`}
                      src={
                        loadedImages[index]
                          ? page.file
                          : "https://docupitch.com/_static/blank.gif"
                      }
                      alt={`Page ${index + 1}`}
                      fetchPriority={loadedImages[index] ? "high" : "auto"}
                    />
                  );
                }

                return (
                  <Image
                    key={index}
                    className={`mx-auto object-contain ${
                      pageNumber - 1 === index ? "block" : "hidden"
                    }`}
                    src={loadedImages[index] ? page.file : BlankImg}
                    alt={`Page ${index + 1}`}
                    priority={loadedImages[index] ? true : false}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
                    quality={100}
                  />
                );
              })
            ) : (
              <LoadingSpinner className="h-20 w-20 text-foreground" />
            ))}
          {enableQuestion && feedback && pageNumber === numPagesWithFeedback ? (
            <div className="flex w-full items-center justify-center">
              <Question
                feedback={feedback}
                viewId={viewId}
                submittedFeedback={submittedFeedback}
                setSubmittedFeedback={setSubmittedFeedback}
              />
            </div>
          ) : null}
        </div>
        {feedbackEnabled && pageNumber !== numPages + 1 ? (
          <Toolbar viewId={viewId} pageNumber={pageNumber} />
        ) : null}
        {screenshotProtectionEnabled ? <ScreenProtector /> : null}
        {showPoweredByBanner ? <PoweredBy linkId={linkId} /> : null}
      </div>
    </>
  );
}
