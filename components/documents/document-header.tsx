import Image from "next/image";
import { useRouter } from "next/router";
// import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

import { useTeam } from "@/context/team-context";
import { Document, DocumentVersion } from "@prisma/client";
import {
  BetweenHorizontalStartIcon,
  SheetIcon,
  Sparkles,
  TrashIcon,
} from "lucide-react";
import { usePlausible } from "next-plausible";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { mutate } from "swr";

import FileUp from "@/components/shared/icons/file-up";
import MoreVertical from "@/components/shared/icons/more-vertical";
import PapermarkSparkle from "@/components/shared/icons/papermark-sparkle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { usePlan } from "@/lib/swr/use-billing";
import { DocumentWithLinksAndLinkCountAndViewCount } from "@/lib/types";
import { cn, getExtension } from "@/lib/utils";
import { fileIcon } from "@/lib/utils/get-file-icon";

import AdvancedSheet from "../shared/icons/advanced-sheet";
import PortraitLandscape from "../shared/icons/portrait-landscape";
import LoadingSpinner from "../ui/loading-spinner";
import { ButtonTooltip } from "../ui/tooltip";
import { AddDocumentModal } from "./add-document-modal";
import { AddToDataroomModal } from "./add-document-to-dataroom-modal";

export default function DocumentHeader({
  prismaDocument,
  primaryVersion,
  teamId,
  actions,
}: {
  prismaDocument: Document;
  primaryVersion: DocumentVersion;
  teamId: string;
  actions?: React.ReactNode[];
}) {
  const router = useRouter();
  const teamInfo = useTeam();
  const { theme, systemTheme } = useTheme();
  const isLight =
    theme === "light" || (theme === "system" && systemTheme === "light");
  const { plan, trial } = usePlan();

  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isFirstClick, setIsFirstClick] = useState<boolean>(false);
  const [orientationLoading, setOrientationLoading] = useState<boolean>(false);
  const [addDataroomOpen, setAddDataroomOpen] = useState<boolean>(false);
  const [addDocumentVersion, setAddDocumentVersion] = useState<boolean>(false);

  const nameRef = useRef<HTMLHeadingElement>(null);
  const enterPressedRef = useRef<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const actionRows: React.ReactNode[][] = [];
  if (actions) {
    for (let i = 0; i < actions.length; i += 3) {
      actionRows.push(actions.slice(i, i + 3));
    }
  }

  const plausible = usePlausible();

  // https://github.com/radix-ui/primitives/issues/1241#issuecomment-1888232392
  useEffect(() => {
    if (!addDataroomOpen || !addDocumentVersion) {
      setTimeout(() => {
        document.body.style.pointerEvents = "";
      });
    }
  }, [addDataroomOpen, addDocumentVersion]);

  const handleNameSubmit = async () => {
    if (enterPressedRef.current) {
      enterPressedRef.current = false;
      return;
    }
    if (nameRef.current && isEditingName) {
      const newName = nameRef.current.innerText;

      if (newName !== prismaDocument!.name) {
        const response = await fetch(
          `/api/teams/${teamId}/documents/${prismaDocument!.id}/update-name`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: newName,
            }),
          },
        );

        if (response.ok) {
          const { message } = await response.json();
          toast.success(message);
        } else {
          const { message } = await response.json();
          toast.error(message);
        }
      }
      setIsEditingName(false);
    }
  };

  const preventEnterAndSubmit = (
    event: React.KeyboardEvent<HTMLHeadingElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent the default line break
      setIsEditingName(true);
      enterPressedRef.current = true;
      handleNameSubmit(); // Handle the submit
      if (nameRef.current) {
        nameRef.current.blur(); // Remove focus from the h2 element
      }
    }
  };

  const activateOrRedirectAssistant = async (document: Document) => {
    if (document.assistantEnabled) {
      router.push(`/documents/${document.id}/chat`);
    } else {
      toast.promise(
        fetch("/api/assistants", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            documentId: document.id,
          }),
        }).then(() => {
          // Once the assistant is activated, redirect to the chat
          plausible("assistantEnabled", { props: { documentId: document.id } }); // track the event

          // refetch to fix the UI delay
          mutate(`/api/teams/${teamId}/documents/${document.id}`);

          router.push(`/documents/${document.id}/chat`);
        }),
        {
          loading: "Activating Assistant...",
          success: "DocuPitch Assistant successfully activated.",
          error: "Activation failed. Please try again.",
        },
      );
    }
  };

  const activateOrDeactivateAssistant = async (
    active: boolean,
    prismaDocumentId: string,
  ) => {
    const fetchPromise = fetch("/api/assistants", {
      method: active ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        documentId: prismaDocumentId,
      }),
    }).then(() => {
      // refetch to fix the UI delay
      mutate(`/api/teams/${teamId}/documents/${prismaDocumentId}`);
    });

    toast.promise(fetchPromise, {
      loading: `${active ? "Activating" : "Deactivating"} Assistant...`,
      success: `DocuPitch Assistant successfully ${active ? "activated" : "deactivated"}.`,
      error: `${active ? "Activation" : "Deactivation"} failed. Please try again.`,
    });
  };

  const changeDocumentOrientation = async () => {
    setOrientationLoading(true);
    try {
      const response = await fetch(
        "/api/teams/" +
        teamId +
        "/documents/" +
        prismaDocument.id +
        "/change-orientation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            versionId: primaryVersion.id,
            isVertical: primaryVersion.isVertical ? false : true,
          }),
        },
      );

      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);

        mutate(`/api/teams/${teamId}/documents/${prismaDocument.id}`);
      } else {
        const { message } = await response.json();
        toast.error(message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setOrientationLoading(false);
    }
  };

  const enableAdvancedExcel = async (document: Document) => {
    try {
      const response = await fetch(
        `/api/teams/${teamId}/documents/${document.id}/advanced-mode`,
        { method: "POST", headers: { "Content-Type": "application/json" } },
      );
      if (!response.ok) {
        const { message } = await response.json();
        toast.error(message);
      } else {
        const { message } = await response.json();
        plausible("advancedExcelEnabled", {
          props: { documentId: document.id },
        }); // track the event
        toast.success(message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

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

  const handleDeleteDocument = async (documentId: string) => {
    // Prevent the first click from deleting the document
    if (!isFirstClick) {
      setIsFirstClick(true);
      return;
    }


    toast.promise(
      fetch(`/api/teams/${teamId}/documents/${documentId}`, {
        method: "DELETE",
      }).then(() => {
        mutate(`/api/teams/${teamInfo?.currentTeam?.id}/documents`, null, {
          // populateCache: (_, docs) => {
          //   console.log('Docs:', docs);
          //   return docs.filter(
          //     (doc: DocumentWithLinksAndLinkCountAndViewCount) =>
          //       doc.id !== documentId,
          //   );
          // },
          revalidate: false,
        });
        setIsFirstClick(false);
        setMenuOpen(false);
        router.push("/documents");
      }),
      {
        loading: "Deleting document...",
        success: "Document deleted successfully.",
        error: "Failed to delete document. Try again.",
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

  const handleButtonClick = (event: any, documentId: string) => {
    event.stopPropagation();
    event.preventDefault();

    if (isFirstClick) {
      handleDeleteDocument(documentId);
      setIsFirstClick(false);
      setMenuOpen(false); // Close the dropdown after deleting
    } else {
      setIsFirstClick(true);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="flex mt-[64px] items-center justify-between gap-x-8">
      <div className="flex items-center space-x-2">
        {/* {fileIcon({
          fileType: prismaDocument.type ?? "",
          className: "size-7 sm:size-8",
          isLight,
        })} */}
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

        <div className="mt-1 flex flex-col lg:mt-0">
          <h2
            className="rounded-md border border-transparent px-1 py-0.5 text-lg font-semibold tracking-tight text-foreground duration-200 hover:cursor-text hover:border hover:border-border focus-visible:text-lg lg:px-3 lg:py-1 lg:text-xl lg:focus-visible:text-xl xl:text-2xl"
            ref={nameRef}
            contentEditable={true}
            onFocus={() => setIsEditingName(true)}
            onBlur={handleNameSubmit}
            onKeyDown={preventEnterAndSubmit}
            title="Click to edit"
            dangerouslySetInnerHTML={{ __html: prismaDocument.name }}
          />
          {isEditingName && (
            <span className="mt-1 text-xs text-muted-foreground">
              {`Press <Enter> to save the name.`}
            </span>
          )}
        </div>

        {prismaDocument.type === "sheet" &&
          prismaDocument.advancedExcelEnabled && (
            <ButtonTooltip content="Advanced Excel mode">
              <span className="mt-1 text-xs">
                <AdvancedSheet className="h-6 w-6" />
              </span>
            </ButtonTooltip>
          )}
      </div>

      <div className="flex items-center gap-x-4 md:gap-x-2 lg:gap-x-4">
        {/* {!orientationLoading ? (
          <ButtonTooltip content="Change orientation">
            <button
              className="hidden md:flex"
              onClick={changeDocumentOrientation}
              title={`Change document orientation to ${primaryVersion.isVertical ? "landscape" : "portrait"}`}
            >
              <PortraitLandscape
                className={cn(
                  "h-6 w-6",
                  !primaryVersion.isVertical && "-rotate-90 transform",
                )}
              />
            </button>
          </ButtonTooltip>
        ) : (
          <div className="hidden md:flex">
            <LoadingSpinner className="h-6 w-6" />
          </div>
        )} */}

        {primaryVersion.type !== "notion" && (
          <AddDocumentModal newVersion   open={isModalOpen}
          setOpen={setIsModalOpen}>
            <Button
              className="group  bg-[#E5E7EB] text-black dark:border-white border-2 flex flex-1 items-center justify-start gap-x-3 px-3 text-left"
              title="Update Pitch"
            >Update Pitch</Button>
          </AddDocumentModal>
        )}

        {/* {prismaDocument.type !== "notion" &&
          prismaDocument.type !== "sheet" &&
          prismaDocument.assistantEnabled && (
            <Button
              className="group hidden h-8 space-x-1 whitespace-nowrap bg-gradient-to-r from-[#16222A] via-emerald-500 to-[#16222A] text-xs duration-200 ease-linear hover:bg-right md:flex lg:h-9 lg:text-sm"
              variant={"special"}
              size={"icon"}
              style={{ backgroundSize: "200% auto" }}
              onClick={() => activateOrRedirectAssistant(prismaDocument)}
              title="Open AI Assistant"
            >
              <PapermarkSparkle className="h-5 w-5" />
            </Button>
          )} */}
   
        <div className="flex items-center gap-x-1">
          {actionRows.map((row, i) => (
            <ul
              key={i.toString()}
              className="flex flex-wrap items-center justify-end gap-2 bg-[#F97316] rounded text-white border-none md:flex-nowrap md:gap-4 "
            >
              {row.map((action, i) => (
                <li key={i}>
                 {action}</li>
              ))}
             
            </ul>
           
          ))}
         
        </div>

        <DropdownMenu open={menuOpen} onOpenChange={handleMenuStateChange}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 bg-transparent p-0 lg:h-9 lg:w-9"
            >
              <span className="sr-only">Open menu</span>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-[240px] bg-white dark:bg-gray-800 border-black"
            ref={dropdownRef}
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuGroup className="block md:hidden">
              <DropdownMenuItem>
                <AddDocumentModal
                  newVersion
                  setAddDocumentModalOpen={setAddDocumentVersion}
                  open={addDocumentVersion}
                  setOpen={setAddDocumentVersion}
                  
                >
                  <button
                    title="Add a new version"
                    className="flex items-center"
                    onClick={(e) => {
                      e.stopPropagation();
                      setAddDocumentVersion(true);
                    }}
                  >
                    <FileUp className="mr-2 h-4 w-4" /> Add new version
                  </button>
                </AddDocumentModal>
              </DropdownMenuItem>

              {/* <DropdownMenuItem onClick={() => changeDocumentOrientation()}>
                <PortraitLandscape
                  className={cn(
                    "mr-2 h-4 w-4",
                    !primaryVersion.isVertical && "-rotate-90 transform",
                  )}
                />
                {" Change orientation"}
              </DropdownMenuItem> */}

              {/* {prismaDocument.type !== "notion" &&
                prismaDocument.type !== "sheet" && (
                  <DropdownMenuItem
                    onClick={() => activateOrRedirectAssistant(prismaDocument)}
                  >
                    <PapermarkSparkle className="mr-2 h-4 w-4" />
                    Open AI Assistant
                  </DropdownMenuItem>
                )} */}

              <DropdownMenuSeparator />
            </DropdownMenuGroup>

            {/* {primaryVersion.type !== "notion" &&
              primaryVersion.type !== "sheet" &&
              (!prismaDocument.assistantEnabled ? (
                <DropdownMenuItem
                  onClick={() =>
                    activateOrDeactivateAssistant(true, prismaDocument.id)
                  }
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Activate Assistant
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() =>
                    activateOrDeactivateAssistant(false, prismaDocument.id)
                  }
                >
                  <Sparkles className="mr-2 h-4 w-4" /> Disable Assistant
                </DropdownMenuItem>
              ))}

            {prismaDocument.type === "sheet" &&
              !prismaDocument.advancedExcelEnabled &&
              (plan === "business" || plan === "datarooms" || trial) && (
                <DropdownMenuItem
                  onClick={() => enableAdvancedExcel(prismaDocument)}
                >
                  <SheetIcon className="mr-2 h-4 w-4" />
                  Enable Advanced Mode
                </DropdownMenuItem>
              )} */}

            {/* <DropdownMenuItem onClick={() => setAddDataroomOpen(true)}>
              <BetweenHorizontalStartIcon className="mr-2 h-4 w-4" />
              Add to dataroom
            </DropdownMenuItem> */}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive focus:bg-destructive focus:text-destructive-foreground"
              onClick={(event) => handleButtonClick(event, prismaDocument.id)}
            >
              <TrashIcon className="mr-2 h-4 w-4" />
              {isFirstClick ? "Really delete?" : "Delete Pitch"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {addDataroomOpen ? (
        <AddToDataroomModal
          open={addDataroomOpen}
          setOpen={setAddDataroomOpen}
          documentId={prismaDocument.id}
          documentName={prismaDocument.name}
        />
      ) : null}
    </header>
  );
}
