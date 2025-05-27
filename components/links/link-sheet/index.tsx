import { useRouter } from "next/router";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { useTeam } from "@/context/team-context";
import { LinkAudienceType, LinkType } from "@prisma/client";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { mutate } from "swr";

import { UpgradePlanModal } from "@/components/billing/upgrade-plan-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ButtonTooltip } from "@/components/ui/tooltip";

import { useAnalytics } from "@/lib/analytics";
import { usePlan } from "@/lib/swr/use-billing";
import useDataroomGroups from "@/lib/swr/use-dataroom-groups";
import { useDomains } from "@/lib/swr/use-domains";
import { LinkWithViews, WatermarkConfig } from "@/lib/types";
import { convertDataUrlToFile, uploadImage } from "@/lib/utils";


import DomainSection from "./domain-section";
import { LinkOptions } from "./link-options";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { signOut, useSession } from "next-auth/react";

export const DEFAULT_LINK_PROPS = (linkType: LinkType) => ({
  id: null,
  name: null,
  domain: null,
  creatorEmail: null,
  signaturePage:null,
  signatureX:null,
  signatureY:null,
  renderedWidth: null,  
  renderedHeight: null,
  slug: null,
  expiresAt: null,
  password: null,
  emailProtected: true,
  emailAuthenticated: false,
  allowDownload: false,
  allowList: [],
  denyList: [],
  enableNotification: true,
  enableFeedback: false,
  enableScreenshotProtection: false,
  enableCustomMetatag: false,
  metaTitle: null,
  metaDescription: null,
  metaImage: null,
  enabledQuestion: false,
  questionText: null,
  questionType: null,
  enableAgreement: false,
  agreementId: null,
  showBanner: linkType === LinkType.DOCUMENT_LINK ? true : false,
  enableWatermark: false,
  watermarkConfig: null,
  audienceType: LinkAudienceType.GENERAL,
  groupId: null,
});

export type DEFAULT_LINK_TYPE = {
  id: string | null;
  name: string | null;
  domain: string | null;
  creatorEmail: string | null;
  signaturePage:Number | null,
  signatureX:Number | null,
  signatureY:Number | null,
  renderedWidth:Number | null,
  renderedHeight:Number | null,
  slug: string | null;
  expiresAt: Date | null;
  password: string | null;
  emailProtected: boolean;
  emailAuthenticated: boolean;
  allowDownload: boolean;
  allowList: string[];
  denyList: string[];
  enableNotification: boolean;
  enableFeedback: boolean;
  enableScreenshotProtection: boolean;
  enableCustomMetatag: boolean; // metatags
  metaTitle: string | null; // metatags
  metaDescription: string | null; // metatags
  metaImage: string | null; // metatags
  enableQuestion?: boolean; // feedback question
  questionText: string | null;
  questionType: string | null;
  enableAgreement: boolean; // agreement
  agreementId: string | null;
  showBanner: boolean;
  enableWatermark: boolean;
  watermarkConfig: WatermarkConfig | null;
  audienceType: LinkAudienceType;
  groupId: string | null;
};

export default function LinkSheet({
  isOpen,
  setIsOpen,
  linkType,
  currentLink,
  existingLinks,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  linkType: LinkType;
  currentLink?: DEFAULT_LINK_TYPE;
  existingLinks?: LinkWithViews[];
}) {
  const { domains } = useDomains();
  const {
    viewerGroups,
    loading: isLoadingGroups,
    mutate: mutateGroups,
  } = useDataroomGroups();
  const teamInfo = useTeam();
  const { plan, trial } = usePlan();
  const analytics = useAnalytics();
  const [data, setData] = useState<DEFAULT_LINK_TYPE>(
    DEFAULT_LINK_PROPS(linkType),
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const targetId = router.query.id as string;

    const { data: session, status } = useSession();
    const creatorEmail = session?.user?.email

    const [signaturePosition, setSignaturePosition] = useState<{
      x: number;
      y: number;
      page: number;
    } | null>(null);
    

  // useEffect(() => {
  //   setData(currentLink || DEFAULT_LINK_PROPS(linkType));
  // }, [currentLink]);

   useEffect(() => {
       setData(currentLink || DEFAULT_LINK_PROPS(linkType));
     }, [currentLink, linkType]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setIsLoading(true);

    // Upload the image if it's a data URL
    let blobUrl: string | null =
      data.metaImage && data.metaImage.startsWith("data:")
        ? null
        : data.metaImage;
    if (data.metaImage && data.metaImage.startsWith("data:")) {
      // Convert the data URL to a blob
      const blob = convertDataUrlToFile({ dataUrl: data.metaImage });
      // Upload the blob to vercel storage
      blobUrl = await uploadImage(blob);
      setData({ ...data, metaImage: blobUrl });
    }

    let endpoint = "/api/links";
    let method = "POST";

    if (currentLink) {
      // Assuming that your endpoint to update links appends the link's ID to the URL
      endpoint = `/api/links/${currentLink.id}`;
      method = "PUT";
    }

    const response = await fetch(endpoint, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...data,
        metaImage: blobUrl,
        targetId: targetId,
        linkType: linkType,
        teamId: teamInfo?.currentTeam?.id,
      }),
    });

    if (!response.ok) {
      // handle error with toast message
      const { error } = await response.json();
      toast.error(error);
      setIsLoading(false);
      return;
    }

    const returnedLink = await response.json();
    const endpointTargetType = `${linkType.replace("_LINK", "").toLowerCase()}s`; // "documents" or "datarooms"

    if (currentLink) {
      setIsOpen(false);
      // Update the link in the list of links
      mutate(
        `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}/${encodeURIComponent(
          targetId,
        )}/links`,
        (existingLinks || []).map((link) =>
          link.id === currentLink.id ? returnedLink : link,
        ),
        false,
      );
      toast.success("Link updated successfully");
    } else {
      setIsOpen(false);
      // Add the new link to the list of links
      mutate(
        `/api/teams/${teamInfo?.currentTeam?.id}/${endpointTargetType}/${encodeURIComponent(
          targetId,
        )}/links`,
        [returnedLink, ...(existingLinks || [])],
        false,
      );

      analytics.capture("Link Added", {
        linkId: returnedLink.id,
        targetId,
        linkType,
        customDomain: returnedLink.domainSlug,
      });

      toast.success("Link created successfully");
    }

    setData(DEFAULT_LINK_PROPS(linkType));
    setIsLoading(false);
  };

  return (
   

    <Dialog open={isOpen} onOpenChange={(open: boolean) => setIsOpen(open)}>
    <DialogContent className="flex flex-col justify-between w-full max-w-2xl px-6 py-5 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex items-center justify-center mb-4">
      <div className="w-16 h-16 bg-[#FFEDD5] dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M30 24H0V0H30V24Z" stroke="#E5E7EB"/>
<path d="M30 24H0V0H30V24Z" stroke="#E5E7EB"/>
<path d="M6.75 22.5C3.02344 22.5 0 19.4766 0 15.75C0 12.8062 1.88437 10.3031 4.50937 9.37969C4.50469 9.25313 4.5 9.12656 4.5 9C4.5 4.85625 7.85625 1.5 12 1.5C14.7797 1.5 17.2031 3.00937 18.5016 5.25937C19.2141 4.78125 20.0766 4.5 21 4.5C23.4844 4.5 25.5 6.51562 25.5 9C25.5 9.57187 25.3922 10.1156 25.2 10.6219C27.9375 11.175 30 13.5984 30 16.5C30 19.8141 27.3141 22.5 24 22.5H6.75ZM10.4531 12.3281C10.0125 12.7688 10.0125 13.4812 10.4531 13.9172C10.8938 14.3531 11.6062 14.3578 12.0422 13.9172L13.8703 12.0891V18.375C13.8703 18.9984 14.3719 19.5 14.9953 19.5C15.6187 19.5 16.1203 18.9984 16.1203 18.375V12.0891L17.9484 13.9172C18.3891 14.3578 19.1016 14.3578 19.5375 13.9172C19.9734 13.4766 19.9781 12.7641 19.5375 12.3281L15.7875 8.57812C15.3469 8.1375 14.6344 8.1375 14.1984 8.57812L10.4484 12.3281H10.4531Z" fill="#F97316"/>
</svg>
</div>
      </div>
 
      <DialogHeader className="text-center">
        <DialogTitle className='text-center'>
          {currentLink
            ? `Edit ${currentLink.audienceType === LinkAudienceType.GROUP ? "group" : ""} link`
            : "Create a new link"}
        </DialogTitle>
      


      </DialogHeader>
  
      <form className="flex flex-col grow space-y-4" onSubmit={handleSubmit}>
      
  <ScrollArea className="flex-grow rounded-md  dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-4">

    <div className="space-y-6 ">
      <Tabs
        value={data.audienceType}
        onValueChange={(value) =>
          setData({
            ...data,
            audienceType: value as LinkAudienceType,
          })
        }
      >
        {linkType === LinkType.DATAROOM_LINK && !!!currentLink ? (
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
            <TabsTrigger value={LinkAudienceType.GENERAL} className="py-2 px-4 text-sm">
              🌐 General
            </TabsTrigger>
            {plan === "datarooms" || trial ? (
              <TabsTrigger value={LinkAudienceType.GROUP} className="py-2 px-4 text-sm">
                👥 Group
              </TabsTrigger>
            ) : (
              <UpgradePlanModal clickedPlan="Data Rooms" trigger="add_group_link">
                <div className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium bg-gray-200 dark:bg-gray-600 rounded-md">
                  👥 Group
                </div>
              </UpgradePlanModal>
            )}
          </TabsList>
        ) : null}

        <TabsContent value={LinkAudienceType.GENERAL}>
          {/* GENERAL LINK */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="link-name" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                🔗 Link Name
              </Label>
              <Input
                type="text"
                name="link-name"
                id="link-name"
                placeholder="Link Name"
                value={data.name || ""}
                className="px-3 py-2 border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 "
                onChange={(e) =>
                  setData({ ...data, name: e.target.value })
                }
              />
            </div>
          </div>
        </TabsContent>

        <TabsContent value={LinkAudienceType.GROUP}>
          {/* GROUP LINK */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="group-id" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                👥 Group
              </Label>
              <ButtonTooltip content="Refresh groups">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6"
                  onClick={async (e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    await mutateGroups();
                  }}
                >
                  <RefreshCwIcon className="h-4 w-4" />
                </Button>
              </ButtonTooltip>
            </div>
            <Select
              onValueChange={(value) => {
                if (value === "add_group") {
                  console.log("add_group redirect");
                  return;
                }
                setData({ ...data, groupId: value });
              }}
              defaultValue={data.groupId ?? undefined}
            >
              <SelectTrigger className="w-full bg-gray-100 dark:bg-gray-700 rounded-md px-3 py-2 text-sm">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {isLoadingGroups ? (
                  <SelectItem value="loading" disabled>
                    Loading groups...
                  </SelectItem>
                ) : viewerGroups && viewerGroups.length > 0 ? (
                  viewerGroups.map(({ id, name, _count }) => (
                    <SelectItem key={id} value={id}>
                      {name}{" "}
                      <span className="text-gray-500">
                        ({_count.members} members)
                      </span>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-groups" disabled>
                    No groups available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </ScrollArea>

  <DialogFooter className="pt-1 mx-auto">
    <Button
      className="  dark:border-white px-10 bg-orange-500 text-white dark:text-black dark:bg-white hover:bg-orange-600 transition"
      type="submit"
      loading={isLoading}
    >
      {currentLink ? "Update Link" : "Save Link"}
    </Button>
  </DialogFooter>
</form>

    </DialogContent>
  </Dialog>
  
  

  );
}
