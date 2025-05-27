import { useTeam } from "@/context/team-context";
import { FileIcon, FolderIcon, FolderPlusIcon, PlusIcon } from "lucide-react";

import { AddDocumentModal } from "@/components/documents/add-document-modal";
import { DocumentsList } from "@/components/documents/documents-list";
import { AddFolderModal } from "@/components/folders/add-folder-modal";
import AppLayout from "@/components/layouts/app";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useState } from 'react';

import useDocuments, { useRootFolders } from "@/lib/swr/use-documents";
import { Dialog } from "@radix-ui/react-dialog";

export default function Documents() {
  const { documents } = useDocuments();
  const { folders } = useRootFolders();
  const teamInfo = useTeam();
  const [isAddDocumentModalOpen, setAddDocumentModalOpen] = useState(false);


  return (
    <>
      {isAddDocumentModalOpen && (
        <div className="fixed inset-0 z-100  backdrop-blur-md " />
      )}
      <AppLayout>

        <div className="sticky top-0 mt-[64px] z-50 bg-[#F9FAFB] p-4 pb-0 dark:bg-gray-900 sm:mx-4 sm:pt-8">
          <section className="mb-4  flex items-center justify-between md:mb-8 lg:mb-12">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                All Pitches
              </h2>
              <p className="text-xs text-muted-foreground sm:text-sm">
                Manage all your Pitches in one place.

              </p>
            </div>
            <div className="flex items-center gap-x-1 ">
              <AddDocumentModal open={isAddDocumentModalOpen}
                setOpen={setAddDocumentModalOpen} >
                <Button
                  className="group border-[#F97316] bg-[#F97316] text-white dark:border-white border-2 flex flex-1 items-center justify-start gap-x-3 px-3 text-left"
                  title="Add New Pitches"
                >
                  <PlusIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span >Add New Pitch</span>
                </Button>
              </AddDocumentModal>
            </div>
          </section>

          {/* Portaled in from DocumentsList component */}
          <section id="documents-header-count" />

          {/* <Separator className="mb-5 bg-gray-200 dark:bg-gray-800" /> */}
        </div>

        <div className="p-4 pt-0 sm:mx-4 sm:mt-4">
          <DocumentsList
            documents={documents}
            folders={folders}
            teamInfo={teamInfo}
          />
        </div>
      </AppLayout>
    </>
  );
}
