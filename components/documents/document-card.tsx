import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";

import { TeamContextType } from "@/context/team-context";
import {
  BetweenHorizontalStartIcon,
  FolderInputIcon,
  Layers2Icon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { mutate } from "swr";

import BarChart from "@/components/shared/icons/bar-chart";
import Check from "@/components/shared/icons/check";
import Copy from "@/components/shared/icons/copy";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DocumentWithLinksAndLinkCountAndViewCount } from "@/lib/types";
import { cn, nFormatter, timeAgo } from "@/lib/utils";
import { fileIcon } from "@/lib/utils/get-file-icon";
import { useCopyToClipboard } from "@/lib/utils/use-copy-to-clipboard";

import { AddToDataroomModal } from "./add-document-to-dataroom-modal";
import { MoveToFolderModal } from "./move-folder-modal";

type DocumentsCardProps = {
  document: DocumentWithLinksAndLinkCountAndViewCount;
  teamInfo: TeamContextType | null;
  isDragging?: boolean;
  isSelected?: boolean;
  isHovered?: boolean;
};
export default function DocumentsCard({
  document: prismaDocument,
  teamInfo,
  isDragging,
  isSelected,
  isHovered,
}: DocumentsCardProps) {
  const router = useRouter();
  const { theme, systemTheme } = useTheme();
  const isLight =
    theme === "light" || (theme === "system" && systemTheme === "light");

// console.log('document card ----------59 ',prismaDocument)

  const { isCopied, copyToClipboard } = useCopyToClipboard({});
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [moveFolderOpen, setMoveFolderOpen] = useState<boolean>(false);
  const [addDataroomOpen, setAddDataroomOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /** current folder name */
  const currentFolderPath = router.query.name as string[] | undefined;

  function handleCopyToClipboard(id: string) {
    copyToClipboard(
      `${process.env.NEXT_PUBLIC_MARKETING_URL}/view/${id}`,
      "Link copied to clipboard.",
    );
  }

  // https://github.com/radix-ui/primitives/issues/1241#issuecomment-1888232392
  useEffect(() => {
    if (!moveFolderOpen || !addDataroomOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      });
    }
  }, [moveFolderOpen, addDataroomOpen]);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
        setIsFirstClick(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

const handleButtonClick = (event: any, documentId: string) => {
  event.stopPropagation();
  event.preventDefault();
  setSelectedDocId(documentId);
  setShowConfirmModal(true);
};

const handleConfirmDelete = async () => {
  if (!selectedDocId) return;

  const endpoint = currentFolderPath
    ? `/folders/documents/${currentFolderPath.join("/")}`
    : "/documents";

  toast.promise(
    fetch(`/api/teams/${teamInfo?.currentTeam?.id}/documents/${selectedDocId}`, {
      method: "DELETE",
    }).then(() => {
      mutate(`/api/teams/${teamInfo?.currentTeam?.id}${endpoint}`, null, {
        populateCache: (_, docs) => {
          return docs.filter(
            (doc: DocumentWithLinksAndLinkCountAndViewCount) =>
              doc.id !== selectedDocId,
          );
        },
        revalidate: false,
      });
    }),
    {
      loading: "Deleting pitch...",
      success: "Pitch deleted successfully.",
      error: "Failed to delete pitch. Try again.",
    }
  );

  setShowConfirmModal(false);
  setSelectedDocId(null);
};

const handleCancelDelete = () => {
  setShowConfirmModal(false);
  setSelectedDocId(null);
};


  // const handleButtonClick = (event: any, documentId: string) => {
  //   event.stopPropagation();
  //   event.preventDefault();

  //   if (isFirstClick) {
  //     handleDeleteDocument(documentId);
  //     setIsFirstClick(false);
  //     setMenuOpen(false); // Close the dropdown after deleting
  //   } else {
  //     setIsFirstClick(true);
  //   }
  // };

  // const handleDeleteDocument = async (documentId: string) => {
  //   // Prevent the first click from deleting the document
  //   console.log('delete working ========card 116')
  //   if (!isFirstClick) {
  //     setIsFirstClick(true);
  //     return;
  //   }

  //   const endpoint = currentFolderPath
  //     ? `/folders/documents/${currentFolderPath.join("/")}`
  //     : "/documents";

  //   toast.promise(
  //     fetch(`/api/teams/${teamInfo?.currentTeam?.id}/documents/${documentId}`, {
  //       method: "DELETE",
  //     }).then(() => {
  //       mutate(`/api/teams/${teamInfo?.currentTeam?.id}${endpoint}`, null, {
  //         populateCache: (_, docs) => {
  //           console.log('Docs:', docs);
  //           return docs.filter(
  //             (doc: DocumentWithLinksAndLinkCountAndViewCount) =>
  //               doc.id !== documentId,
  //           );
  //         },
  //         revalidate: false,
  //       });
  //     }),
  //     {
  //       loading: "Deleting pitch...",
  //       success: "Pitch deleted successfully.",
  //       error: "Failed to delete pitch. Try again.",
  //     },
  //   );
  // };

  const handleMenuStateChange = (open: boolean) => {
    // If the document is selected, don't open the dropdown
    if (isSelected) return;

    if (isFirstClick) {
      setMenuOpen(true); // Keep the dropdown open on the first click
      return;
    }

    // If the menu is closed, reset the isFirstClick state
    if (!open) {
      setIsFirstClick(false);
      setMenuOpen(false); // Ensure the dropdown is closed
    } else {
      setMenuOpen(true); // Open the dropdown
    }
  };

  const handleDuplicateDocument = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    // 
    toast.promise(
      fetch(
        `/api/teams/${teamInfo?.currentTeam?.id}/documents/${prismaDocument.id}/duplicate`,
        { method: "POST" },
      ).then(() => {
        mutate(`/api/teams/${teamInfo?.currentTeam?.id}/documents`);
        mutate(
          `/api/teams/${teamInfo?.currentTeam?.id}/folders/documents/${currentFolderPath?.join("/")}`,
        );
      }),
      {
        loading: "Duplicating pitch...",
        success: "Pitch duplicated successfully.",
        error: "Failed to duplicate pitch. Try again.",
      },
    );
  };

  const [isLoading,setIsLoading]= useState(false)

  return (
    <>
      <div
        className={cn(
          "group/row relative flex items-center justify-between rounded-lg border-0 bg-white p-3 ring-1 ring-gray-200 transition-all hover:bg-secondary hover:ring-gray-300 dark:bg-gray-700 dark:ring-gray-700 hover:dark:ring-gray-500 sm:p-4",
          isHovered && "bg-secondary ring-gray-300 dark:ring-gray-500",
        )}
      >
        <div className="flex min-w-0 shrink items-center space-x-2 sm:space-x-4">
          {!isSelected && !isHovered ? (
            // <div className="mx-0.5 flex w-8 items-center justify-center text-center sm:mx-1">
            //   {fileIcon({
            //     fileType: prismaDocument.type ?? "",
            //     className: "h-8 w-8",
            //     isLight,
            //   })}
            // </div>
            <div className="mx-0.5 p-2 rounded-md flex w-8 items-center justify-center text-center sm:mx-1 bg-[#F3F4F6]">
  <svg
    width="16"
    height="20"
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
  >
    <path d="M16 20H0V0H16V20Z" stroke="#E5E7EB" />
    <g clipPath="url(#clip0_409_2193)">
      <path
        d="M2 16.5H3V18H2C0.896875 18 0 17.1031 0 16V4C0 2.89688 0.896875 2 2 2H7.17188C7.70312 2 8.2125 2.20938 8.5875 2.58438L11.4156 5.4125C11.7906 5.7875 12 6.29688 12 6.82812V11H10.5V7H8C7.44688 7 7 6.55312 7 6V3.5H2C1.725 3.5 1.5 3.725 1.5 4V16C1.5 16.275 1.725 16.5 2 16.5ZM5.5 13H6.5C7.46562 13 8.25 13.7844 8.25 14.75C8.25 15.7156 7.46562 16.5 6.5 16.5H6V17.5C6 17.775 5.775 18 5.5 18C5.225 18 5 17.775 5 17.5V16V13.5C5 13.225 5.225 13 5.5 13ZM6.5 15.5C6.91563 15.5 7.25 15.1656 7.25 14.75C7.25 14.3344 6.91563 14 6.5 14H6V15.5H6.5ZM9.5 13H10.5C11.3281 13 12 13.6719 12 14.5V16.5C12 17.3281 11.3281 18 10.5 18H9.5C9.225 18 9 17.775 9 17.5V13.5C9 13.225 9.225 13 9.5 13ZM10.5 17C10.775 17 11 16.775 11 16.5V14.5C11 14.225 10.775 14 10.5 14H10V17H10.5ZM13 13.5C13 13.225 13.225 13 13.5 13H15C15.275 13 15.5 13.225 15.5 13.5C15.5 13.775 15.275 14 15 14H14V15H15C15.275 15 15.5 15.225 15.5 15.5C15.5 15.775 15.275 16 15 16H14V17.5C14 17.775 13.775 18 13.5 18C13.225 18 13 17.775 13 17.5V15.5V13.5Z"
        fill="#4B5563"
      />
    </g>
    <defs>
      <clipPath id="clip0_409_2193">
        <path d="M0 2H16V18H0V2Z" fill="white" />
      </clipPath>
    </defs>
  </svg>
</div>

          ) : (
            <div className="mx-0.5 w-8 sm:mx-1"></div>
          )}

          <div className="flex-col">
            <div className="flex items-center">
              <h2 className="min-w-0 max-w-[150px] truncate text-sm font-semibold leading-2 text-foreground sm:max-w-md">
                <Link
                  href={`/documents/${prismaDocument.id}`}
                  className="w-full truncate"
                  onClick={()=>{ copyToClipboard(`/documents/${prismaDocument.id}`,
                    "You are being redirected. Kindly Wait...",
                  );}}
                >
                  <span>{prismaDocument.name} </span>
                  <span className="absolute inset-0" />
                </Link>
              </h2>
              <div className="ml-2 flex">
                <Button
                  className="group z-10 rounded-md  p-1 transition-all duration-75 hover:scale-105 hover:bg-emerald-100 active:scale-95  hover:dark:bg-emerald-500"
                  // onClick={() =>
                  //   handleCopyToClipboard(prismaDocument.links[0].id)
                  // }
                  loading={isLoading}
                  onClick={() => {
                    if (prismaDocument?.links?.[0]?.id) {
                      // setIsLoading(true)
                      handleCopyToClipboard(prismaDocument.links[0].id);
                    } else if (prismaDocument?.id) {
                      // router.push(`/documents/${prismaDocument.id}`);
                      setIsLoading(true)
                      copyToClipboard(
                        `${process.env.NEXT_PUBLIC_MARKETING_URL}/documents/${prismaDocument.id}`,
                        "You Need To Create a Link, Redirecting...",
                      );
                      router.push(`/documents/${prismaDocument.id}`);
                    }
                  }}
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <Check className="size-3 text-muted-foreground group-hover:text-emerald-700" />
                  ) : (
                    <Copy className="size-3 text-muted-foreground group-hover:text-emerald-700" />
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-0 flex items-center space-x-1 text-xs leading-2 text-muted-foreground">
              <p className="truncate">{timeAgo(prismaDocument.createdAt)}</p>
              <p>•</p>
              <p className="truncate">
                {prismaDocument._count.links}{" "}
                {prismaDocument._count.links === 1 ? "Link" : "Links"}
              </p>
              {prismaDocument._count.versions > 1 ? (
                <>
                  <p>•</p>
                  <p className="truncate">{`${prismaDocument._count.versions} Versions`}</p>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          <Link
            onClick={(e) => {
              e.stopPropagation();
            }}
            href={`/documents/${prismaDocument.id}`}
            className="z-20 flex items-center space-x-1 rounded-md bg-[#F3F4F6] px-1.5 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100 dark:bg-gray-700 sm:px-2"
          >
            <BarChart className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
            <p className="whitespace-nowrap text-xs text-muted-foreground sm:text-sm ">
              {nFormatter(prismaDocument._count.views)}
              <span className="ml-1 hidden sm:inline-block">views</span>
            </p>
          </Link>

          {/* <DropdownMenu open={menuOpen} onOpenChange={handleMenuStateChange}>
            <DropdownMenuTrigger asChild>
              <Button
                // size="icon"
                variant="outline"
                className="z-20 h-8 w-8 border-gray-200 bg-transparent p-0 hover:bg-gray-200 dark:border-gray-700 hover:dark:bg-gray-700 lg:h-9 lg:w-9"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" ref={dropdownRef}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {/* <DropdownMenuItem onClick={() => setMoveFolderOpen(true)}>
                <FolderInputIcon className="mr-2 h-4 w-4" />
                Move to folder
            
              <DropdownMenuItem onClick={(e) => handleDuplicateDocument(e)}>
                <Layers2Icon className="mr-2 h-4 w-4" />
                Duplicate document
              </DropdownMenuItem>
              {/* <DropdownMenuItem onClick={() => setAddDataroomOpen(true)}>
                <BetweenHorizontalStartIcon className="mr-2 h-4 w-4" />
                Add to dataroom
             
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(event) => handleButtonClick(event, prismaDocument.id)}
                className="text-destructive duration-200 focus:bg-destructive focus:text-destructive-foreground"
              >
                {isFirstClick ? (
                  "Really delete?"
                ) : (
                  <>
                    <TrashIcon className="mr-2 h-4 w-4" /> Delete document
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <DropdownMenu open={menuOpen} onOpenChange={handleMenuStateChange}>
  <DropdownMenuTrigger asChild>
    <Button
      variant="outline"
      className="z-20 h-8 w-8 rounded-md border-gray-200 bg-white p-0 shadow-sm hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 lg:h-9 lg:w-9"
      aria-label="Open menu"
    >
      <MoreVertical className="h-4 w-4 text-gray-500 dark:text-gray-400" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent
    align="end"
    ref={dropdownRef}
    className="w-48 rounded-md bg-white p-2 shadow-lg ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700"
  >
    <DropdownMenuLabel className="px-2 py-1 text-sm text-black">
      Actions
    </DropdownMenuLabel>
    <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
    <DropdownMenuItem
      onClick={(e) => handleDuplicateDocument(e)}
      className="flex items-center space-x-2 rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    >
      <Layers2Icon className="h-4 w-4 text-[#F2C94C]" />
      <span className="text-[#F2C94C]">Duplicate Pitch</span>
    </DropdownMenuItem>
    <DropdownMenuSeparator className="my-2 border-gray-200 dark:border-gray-700" />
    <DropdownMenuItem
  onClick={(event) => {setMenuOpen(false);setIsFirstClick(false); handleButtonClick(event, prismaDocument.id)}}
  className="flex items-center space-x-2 rounded-md px-2 py-2 text-sm text-destructive hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700"
>
  <TrashIcon className="h-4 w-4 text-[#EF4444]" />
  <span className="text-[#EF4444]">Delete Pitch</span>
</DropdownMenuItem>


    {/* <DropdownMenuItem
      onClick={(event) => handleButtonClick(event, prismaDocument.id)}
      className={`flex items-center space-x-2 rounded-md px-2 py-2 text-sm duration-200 ${
        isFirstClick
          ? "text-orange-600 hover:bg-orange-100 dark:text-orange-500 dark:hover:bg-orange-700"
          : "text-destructive hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700"
      }`}
    >
      {isFirstClick ? (
        <span className=" text-[#EF4444]">Really delete?</span>
      ) : (
        <>
          <TrashIcon className="h-4 w-4 text-[#EF4444]" />
          <span className=" text-[#EF4444]">Delete Document</span>
        </>
      )}
    </DropdownMenuItem> */}
  </DropdownMenuContent>
</DropdownMenu>

{showConfirmModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
    <div className="w-[90%] max-w-sm rounded-[20px] overflow-hidden shadow-lg bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="bg-[#E5E7EB] dark:bg-gray-700 px-5 py-3">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Delete Pitch
        </h2>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-base text-gray-700 dark:text-gray-200 mb-4">
          Are you sure?
        </p>

        <div className="border-t border-gray-200 dark:border-gray-700 mb-4" />

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancelDelete}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  </div>
)}



        </div>
      </div>
      {moveFolderOpen ? (
        <MoveToFolderModal
          open={moveFolderOpen}
          setOpen={setMoveFolderOpen}
          documentIds={[prismaDocument.id]}
          documentName={prismaDocument.name}
        />
      ) : null}

      {addDataroomOpen ? (
        <AddToDataroomModal
          open={addDataroomOpen}
          setOpen={setAddDataroomOpen}
          documentId={prismaDocument.id}
          documentName={prismaDocument.name}
        />
      ) : null}
    </>
  );
}
