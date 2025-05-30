import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
  useCallback
} from "react";

import { useTeam } from "@/context/team-context";
import { toast } from "sonner";
import { mutate } from "swr";

import DocumentUpload from "@/components/document-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  DocumentData,
  createAgreementDocument,
} from "@/lib/documents/create-document";
import { putFile } from "@/lib/files/put-file";
import { getSupportedContentType } from "@/lib/utils/get-content-type";

import LinkItem from "../link-item";

export default function AgreementSheet({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const teamInfo = useTeam();
  const teamId = teamInfo?.currentTeam?.id;
  const [data, setData] = useState({ name: "", link: "", requireName: true });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [currentLink, setCurrentLink] = useState<string | null>(null);

  const handleBrowserUpload = useCallback(async () => {
    if (!currentFile) {
      toast.error("Please select a file to upload.");
      return;
    }
  
    try {
      setIsLoading(true);
  
      const contentType = currentFile.type;
      const supportedFileType = getSupportedContentType(contentType);
  
      if (!supportedFileType || contentType !== "application/pdf") {
        toast.error("Unsupported file format. Please upload a PDF file.");
        return;
      }
  
      const { type, data, numPages } = await putFile({
        file: currentFile,
        teamId: teamId!,
      });
  
      const documentData: DocumentData = {
        name: currentFile.name,
        key: data!,
        storageType: type!,
        contentType: contentType,
        supportedFileType: supportedFileType,
      };
  
      const response = await createAgreementDocument({
        documentData,
        teamId: teamId!,
        numPages,
      });
  
      if (response) {
        const document = await response.json();
        const linkId = document.links[0].id;
        setData((prevData) => ({
          ...prevData,
          link: "https://docupitch.com/view/" + linkId,
        }));
      }
    } catch (error) {
      console.error("An error occurred while uploading the file: ", error);
    } finally {
      setCurrentFile(null);
      setIsLoading(false);
    }
  }, [currentFile, teamId]); // Memoize the function to avoid unnecessary re-creations
  
  useEffect(() => {
    if (currentFile) {
      handleBrowserUpload();
    }
  }, [currentFile, handleBrowserUpload]); // Dependency array updated
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsLoading(true);

    try {
      const response = await fetch(`/api/teams/${teamId}/agreements`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });

      if (!response.ok) {
        // handle error with toast message
        toast.error("Error creating agreement");
        return;
      }

      // Update the agreements list
      mutate(`/api/teams/${teamId}/agreements`);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      setData({ name: "", link: "", requireName: true });
    }
  };

  useEffect(() => {
    if (currentFile) {
      handleBrowserUpload();
    }
  }, [currentFile,handleBrowserUpload]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-[85%] flex-col justify-between bg-background px-4 text-foreground sm:w-[500px] md:px-5">
        <SheetHeader className="text-start">
          <SheetTitle>Create a new agreement</SheetTitle>
          <SheetDescription>
            An agreement is a special document that visitors must accept before
            accessing your link. You can create a new agreement here.
          </SheetDescription>
        </SheetHeader>

        <form className="flex grow flex-col" onSubmit={handleSubmit}>
          <div className="flex-grow space-y-6">
            <div className="w-full space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                className="flex w-full rounded-md border-0 bg-background py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                id="name"
                type="text"
                name="name"
                required
                autoComplete="off"
                data-1p-ignore
                placeholder="Standard NDA"
                value={data.name || ""}
                onChange={(e) =>
                  setData({
                    ...data,
                    name: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <LinkItem
                title="Require viewer's name"
                enabled={data.requireName}
                action={() =>
                  setData({ ...data, requireName: !data.requireName })
                }
              />
            </div>

            <div className="space-y-4">
              <div className="w-full space-y-2">
                <Label htmlFor="link">Link to an agreement</Label>
                <Input
                  className="flex w-full rounded-md border-0 bg-background py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                  id="link"
                  type="url"
                  pattern="https://.*"
                  name="link"
                  required
                  autoComplete="off"
                  data-1p-ignore
                  placeholder="https://docupitch.com/nda"
                  value={data.link || ""}
                  onChange={(e) =>
                    setData({
                      ...data,
                      link: e.target.value,
                    })
                  }
                  onInvalid={(e) =>
                    e.currentTarget.setCustomValidity(
                      "Please enter a valid URL starting with https://",
                    )
                  }
                />
              </div>

              <div className="space-y-12">
                <div className="space-y-2 pb-6">
                  <Label>Or upload an agreement</Label>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <DocumentUpload
                      currentFile={currentFile}
                      setCurrentFile={setCurrentFile}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SheetFooter>
            <div className="flex items-center">
              <Button type="submit" loading={isLoading}>
                Create Agreement
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
