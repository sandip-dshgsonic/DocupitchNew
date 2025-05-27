import { useRouter } from "next/router";

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

import { useTeam } from "@/context/team-context";
import { toast } from "sonner";
import { mutate } from "swr";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";

import { useAnalytics } from "@/lib/analytics";

function DeleteDocumentsModal({
  showDeleteDocumentsModal,
  setShowDeleteDocumentsModal,
  documentIds,
  setSelectedDocuments,
}: {
  showDeleteDocumentsModal: boolean;
  setShowDeleteDocumentsModal: Dispatch<SetStateAction<boolean>>;
  documentIds: string[];
  setSelectedDocuments: Dispatch<SetStateAction<string[]>>;
}) {
  const router = useRouter();
  const folderPathName = router.query.name as string[] | undefined;
  const teamInfo = useTeam();
  const analytics = useAnalytics();

  const [deleting, setDeleting] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Check if the input matches the pattern
    if (value === "permanently delete") {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  async function deleteDocuments(documentIds: string[]) {
    return new Promise(async (resolve, reject) => {
      setDeleting(true);

      try {
        const deletePromises = documentIds.map((documentId) =>
          fetch(
            `/api/teams/${teamInfo?.currentTeam?.id}/documents/${documentId}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            },
          ).then(async (res) => {
            if (!res.ok) {
              const error = await res.json();
              throw new Error(
                `Failed to delete document ${documentId}: ${error.message}`,
              );
            }
            analytics.capture("Document Deleted", {
              team: teamInfo?.currentTeam?.id,
              documentId,
            });
            return documentId; // Return the ID of the successfully deleted document
          }),
        );

        const results = await Promise.allSettled(deletePromises);

        const successfullyDeletedDocuments = results
          .filter((result) => result.status === "fulfilled")
          .map((result) => (result as PromiseFulfilledResult<string>).value);

        const errors = results
          .filter((result) => result.status === "rejected")
          .map((result) => (result as PromiseRejectedResult).reason);

        // Deselect only the successfully deleted documents
        setSelectedDocuments((prevSelected) =>
          prevSelected.filter(
            (id) => !successfullyDeletedDocuments.includes(id),
          ),
        );

        // Call mutate only once, after all deletions
        await mutate(
          `/api/teams/${teamInfo?.currentTeam?.id}/${folderPathName ? `folders/documents/${folderPathName.join("/")}` : "documents"}`,
        );

        setDeleting(false);

        if (errors.length) {
          reject(errors);
        } else {
          resolve(null);
        }
      } catch (error) {
        setDeleting(false);
        reject((error as Error).message);
      } finally {
        setShowDeleteDocumentsModal(false);
      }
    });
  }

  return (
    // <Modal
    //   showModal={showDeleteDocumentsModal}
    //   setShowModal={setShowDeleteDocumentsModal}
    //   noBackdropBlur
    // >
    //   <div className="flex flex-col items-center justify-center space-y-3 border-b border-border bg-white px-4 py-4 pt-8 dark:border-gray-900 dark:bg-gray-900 sm:px-8">
    //     <DialogTitle className="text-2xl">
    //       Delete {documentIds.length} Pitch{documentIds.length > 1 && "s"}
    //     </DialogTitle>
    //     <DialogDescription>
    //       Warning: This will permanently delete your selected Pitchs, all
    //       associated links and their respective views.
    //     </DialogDescription>
    //   </div>

    //   <form
    //     onSubmit={async (e) => {
    //       e.preventDefault();
    //       toast.promise(deleteDocuments(documentIds), {
    //         loading: "Deleting Pitchs...",
    //         success: "Pitchs deleted successfully!",
    //         error: (err) => err,
    //       });
    //     }}
    //     className="flex flex-col space-y-6 bg-muted px-4 py-8 text-left dark:bg-gray-900 sm:px-8"
    //   >
    //     <div>
    //       <label
    //         htmlFor="verification"
    //         className="block text-sm text-muted-foreground"
    //       >
    //         To confirm deletion, type{" "}
    //         <span className="font-semibold text-foreground">
    //           permanently delete
    //         </span>{" "}
    //         below
    //       </label>
    //       <div className="relative mt-1 rounded-md shadow-sm">
    //         <Input
    //           type="text"
    //           name="verification"
    //           id="verification"
    //           pattern="permanently delete"
    //           required
    //           autoComplete="off"
    //           className="bg-white dark:border-gray-500 dark:bg-gray-800 focus:dark:bg-transparent"
    //           onInput={handleInputChange}
    //         />
    //       </div>
    //     </div>

    //     <Button variant="destructive" loading={deleting} disabled={!isValid}>
    //       Confirm delete Pitch
    //     </Button>
    //   </form>
    // </Modal>
    <Modal
    className=" dark:border-gray-800 dark:bg-gray-900 border-b border-border bg-white"
  showModal={showDeleteDocumentsModal}
  setShowModal={setShowDeleteDocumentsModal}
  // noBackdropBlur
>
  {/* Header Section */}
  <div className="flex flex-col items-center justify-center space-y-4 border-b border-border bg-white px-6 py-6 pt-10 dark:border-gray-800 dark:bg-gray-900 sm:px-10">
  
       {/* Close Button */}
       <button
      className="absolute top-2 right-2 rounded-full p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 focus:outline-none dark:hover:bg-gray-800 dark:hover:text-gray-300"
      onClick={() => setShowDeleteDocumentsModal(false)}
      aria-label="Close Modal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  
    <DialogTitle className="text-2xl font-semibold text-gray-800 dark:text-white">
      Delete {documentIds.length} Pitch{documentIds.length > 1 && "es"}
    </DialogTitle>
    <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 text-center">
      Warning: This action cannot be undone. It will permanently delete your
      selected pitch{documentIds.length > 1 && "es"}, all associated links, and their views.
    </DialogDescription>
  </div>

  {/* Form Section */}
  <form
    onSubmit={async (e) => {
      e.preventDefault();
      toast.promise(deleteDocuments(documentIds), {
        loading: "Deleting pitch(es)...",
        success: "Pitch(es) deleted successfully!",
        error: (err) => err,
      });
    }}
    className="flex flex-col space-y-8 bg-muted px-6 py-8 dark:bg-gray-900 sm:px-10"
  >
    {/* Verification Input */}
    <div>
      <label
        htmlFor="verification"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        To confirm deletion, type{" "}
        <span className="font-semibold text-red-600">permanently delete</span>{" "}
        below:
      </label>
      <div className="relative mt-2">
        <Input
          type="text"
          name="verification"
          id="verification"
          pattern="permanently delete"
          required
          autoComplete="off"
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 dark:border-gray-600 dark:bg-gray-800 dark:placeholder-gray-500 dark:focus:border-red-500 dark:focus:ring-red-500"
          onInput={handleInputChange}
        />
      </div>
    </div>

    {/* Confirm Delete Button */}
    <Button
      variant="destructive"
      loading={deleting}
      disabled={!isValid}
      className="w-full py-3 rounded-lg bg-red-600 text-white font-medium shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
    >
      Confirm Delete Pitch{documentIds.length > 1 && "es"}
    </Button>
  </form>
</Modal>

  );
}

export function useDeleteDocumentsModal({
  documentIds,
  setSelectedDocuments,
}: {
  documentIds: string[];
  setSelectedDocuments: Dispatch<SetStateAction<string[]>>;
}) {
  const [showDeleteDocumentsModal, setShowDeleteDocumentsModal] =
    useState(false);

  const DeleteDocumentsModalCallback = useCallback(() => {
    return (
      <DeleteDocumentsModal
        showDeleteDocumentsModal={showDeleteDocumentsModal}
        setShowDeleteDocumentsModal={setShowDeleteDocumentsModal}
        documentIds={documentIds}
        setSelectedDocuments={setSelectedDocuments}
      />
    );
  }, [
    showDeleteDocumentsModal,
    setShowDeleteDocumentsModal,
    documentIds,
    setSelectedDocuments,
  ]);

  return useMemo(
    () => ({
      setShowDeleteDocumentsModal,
      DeleteDocumentsModal: DeleteDocumentsModalCallback,
    }),
    [setShowDeleteDocumentsModal, DeleteDocumentsModalCallback],
  );
}
