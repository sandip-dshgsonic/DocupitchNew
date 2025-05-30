import { useRouter } from "next/router";

import { useEffect, useRef, useState } from "react";

import { TeamContextType } from "@/context/team-context";
import {
  BetweenHorizontalStartIcon,
  FolderIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataroomFolderWithCount } from "@/lib/swr/use-dataroom";
import { FolderWithCount } from "@/lib/swr/use-documents";
import { timeAgo } from "@/lib/utils";
//by aniket
// components\folders\edit-folder-modal.tsx
import { EditFolderModal } from "../../../components/folders/edit-folder-modal";
// import { EditFolderModal } from "../folders/edit-folder-modal";
import { AddFolderToDataroomModal } from "./add-folder-to-dataroom-modal";

type FolderCardProps = {
  folder: FolderWithCount | DataroomFolderWithCount;
  teamInfo: TeamContextType | null;
  isDataroom?: boolean;
  dataroomId?: string;
  isDragging?: boolean;
  isOver?: boolean;
};
export default function FolderCard({
  folder,
  teamInfo,
  isDataroom,
  dataroomId,
  isDragging,
  isOver,
}: FolderCardProps) {
  const router = useRouter();
  const [openFolder, setOpenFolder] = useState<boolean>(false);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [addDataroomOpen, setAddDataroomOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const folderPath =
    isDataroom && dataroomId
      ? `/datarooms/${dataroomId}/documents${folder.path}`
      : `/documents/tree${folder.path}`;
  const parentFolderPath = folder.path.substring(
    0,
    folder.path.lastIndexOf("/"),
  );

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

  // https://github.com/radix-ui/primitives/issues/1241#issuecomment-1888232392
  useEffect(() => {
    if (!openFolder || !addDataroomOpen) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      });
    }
  }, [openFolder, addDataroomOpen]);

  const handleButtonClick = (event: any, documentId: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (isFirstClick) {
      handleDeleteFolder(documentId);
      setIsFirstClick(false);
      setMenuOpen(false); // Close the dropdown after deleting
    } else {
      setIsFirstClick(true);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    // Prevent the first click from deleting the document
    if (!isFirstClick) {
      setIsFirstClick(true);
      return;
    }

    const endpointTargetType =
      isDataroom && dataroomId ? `datarooms/${dataroomId}/folders` : "folders";

    toast.promise(
      fetch(
        `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}/manage/${folderId}`,
        {
          method: "DELETE",
        },
      ),
      {
        loading: isDataroom ? "Removing folder..." : "Deleting folder...",
        success: () => {
          mutate(
            `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}?root=true`,
          );
          mutate(
            `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}`,
          );
          mutate(
            `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}${parentFolderPath}`,
          );
          return isDataroom
            ? "Folder removed successfully."
            : "Folder deleted successfully.";
        },
        error: isDataroom
          ? "Failed to remove folder."
          : "Failed to delete folder. Move documents first.",
      },
    );
  };

  const handleMenuStateChange = (open: boolean) => {
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

  const handleCreateDataroom = (e: any, folderId: string) => {
    e.stopPropagation();
    e.preventDefault();

    toast.promise(
      fetch(
        `/api/teams/${teamInfo?.currentTeam?.id}/datarooms/create-from-folder`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            folderId: folderId,
          }),
        },
      ),
      {
        loading: "Creating dataroom...",
        success: () => {
          mutate(`/api/teams/${teamInfo?.currentTeam?.id}/datarooms`);
          return "Dataroom created successfully.";
        },
        error: "Failed to create dataroom.",
      },
    );
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    router.push(folderPath);
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className="group/row relative flex items-center justify-between rounded-lg border-0 bg-white p-3 ring-1 ring-gray-400 transition-all hover:bg-secondary hover:ring-gray-500 dark:bg-secondary dark:ring-gray-500 hover:dark:ring-gray-400 sm:p-4"
      >
        <div className="flex min-w-0 shrink items-center space-x-2 sm:space-x-4">
          <div className="mx-0.5 flex w-8 items-center justify-center text-center sm:mx-1">
            <FolderIcon className="h-8 w-8" strokeWidth={1} />
          </div>

          <div className="flex-col">
            <div className="flex items-center">
              <h2 className="min-w-0 max-w-[150px] truncate text-sm font-semibold leading-6 text-foreground sm:max-w-md">
                {folder.name}
              </h2>
            </div>
            <div className="mt-1 flex items-center space-x-1 text-xs leading-5 text-muted-foreground">
              <p className="truncate">{timeAgo(folder.createdAt)}</p>
              <p>•</p>
              <p className="truncate">
                {folder._count.documents}{" "}
                {folder._count.documents === 1 ? "Document" : "Documents"}
              </p>
              <p>•</p>
              <p className="truncate">
                {folder._count.childFolders}{" "}
                {folder._count.childFolders === 1 ? "Folder" : "Folders"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-2">
          {/* <Link
          onClick={(e) => {
            e.stopPropagation();
          }}
          href={`/documents/${prismaDocument.id}`}
          className="flex items-center z-10 space-x-1 rounded-md bg-gray-200 dark:bg-gray-700 px-1.5 sm:px-2 py-0.5 transition-all duration-75 hover:scale-105 active:scale-100"
        >
          <BarChart className="h-3 sm:h-4 w-3 sm:w-4 text-muted-foreground" />
          <p className="whitespace-nowrap text-xs sm:text-sm text-muted-foreground">
            {nFormatter(prismaDocument._count.views)}
            <span className="ml-1 hidden sm:inline-block">views</span>
          </p>
        </Link> */}

          <DropdownMenu open={menuOpen} onOpenChange={handleMenuStateChange}>
            <DropdownMenuTrigger asChild>
              <Button
                // size="icon"
                variant="outline"
                className="z-10 h-8 w-8 border-gray-200 bg-transparent p-0 hover:bg-gray-200 dark:border-gray-700 hover:dark:bg-gray-700 lg:h-9 lg:w-9"
              >
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" ref={dropdownRef}>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenFolder(true);
                }}
              >
                Rename
              </DropdownMenuItem>
              {!isDataroom ? (
                <>
                  <DropdownMenuItem
                    onClick={(e) => handleCreateDataroom(e, folder.id)}
                  >
                    Create dataroom from folder
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setAddDataroomOpen(true);
                    }}
                  >
                    <BetweenHorizontalStartIcon className="mr-2 h-4 w-4" />
                    Add folder to dataroom
                  </DropdownMenuItem>
                </>
              ) : null}
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(event) => handleButtonClick(event, folder.id)}
                className="text-destructive duration-200 focus:bg-destructive focus:text-destructive-foreground"
              >
                {isFirstClick ? (
                  `Really ${isDataroom ? "remove" : "delete"}?`
                ) : (
                  <>
                    <TrashIcon className="mr-2 h-4 w-4" />{" "}
                    {isDataroom ? "Remove Folder" : "Delete Folder"}
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* only used for drag and drop */}
        {isOver && !isDragging && (
          <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-20 dark:bg-white dark:bg-opacity-20">
            <span className="font-semibold text-black dark:text-gray-100">
              Drop to move
            </span>
          </div>
        )}
      </div>

      {openFolder ? (
        <EditFolderModal
          open={openFolder}
          setOpen={setOpenFolder}
          folderId={folder.id}
          name={folder.name}
          isDataroom={isDataroom}
          dataroomId={dataroomId}
        />
      ) : null}
      {addDataroomOpen ? (
        <AddFolderToDataroomModal
          open={addDataroomOpen}
          setOpen={setAddDataroomOpen}
          folderId={folder.id}
          folderName={folder.name}
        />
      ) : null}
    </>
  );
}
