import { useTeam } from "@/context/team-context";
import { Folder } from "@prisma/client";
import useSWR from "swr";

import { DocumentWithLinksAndLinkCountAndViewCount } from "@/lib/types";
import { fetcher } from "@/lib/utils";

export default function useDocuments() {
  const teamInfo = useTeam();
  console.log('lib swr useDocuments-------10 ',teamInfo)
  console.log('lib swr useDocuments-------11 ',teamInfo?.currentTeam?.id)

  const { data: documents, error } = useSWR<
    DocumentWithLinksAndLinkCountAndViewCount[]
  >(
    teamInfo?.currentTeam?.id &&
      `/api/teams/${teamInfo?.currentTeam?.id}/documents`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    documents,
    loading: !documents && !error,
    error,
  };
}

export function useFolderDocuments({ name }: { name: string[] }) {
  const teamInfo = useTeam();

  const { data: documents, error } = useSWR<
    DocumentWithLinksAndLinkCountAndViewCount[]
  >(
    teamInfo?.currentTeam?.id &&
      name &&
      `/api/teams/${teamInfo?.currentTeam?.id}/folders/documents/${name.join("/")}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    documents,
    loading: !documents && !error,
    error,
  };
}

export type FolderWithCount = Folder & {
  _count: {
    documents: number;
    childFolders: number;
  };
};

export function useFolder({ name }: { name: string[] }) {
  const teamInfo = useTeam();

  const { data: folders, error } = useSWR<FolderWithCount[]>(
    teamInfo?.currentTeam?.id &&
      name &&
      `/api/teams/${teamInfo?.currentTeam?.id}/folders/${name.join("/")}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    folders,
    loading: !folders && !error,
    error,
  };
}

export type FolderWithDocuments = Folder & {
  childFolders: FolderWithDocuments[];
  documents: {
    id: string;
    name: string;
    folderId: string;
  }[];
};

export function useFolders() {
  const teamInfo = useTeam();

  const { data: folders, error } = useSWR<FolderWithDocuments[]>(
    teamInfo?.currentTeam?.id &&
      `/api/teams/${teamInfo?.currentTeam?.id}/folders`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    folders,
    loading: !folders && !error,
    error,
  };
}

export function useRootFolders() {
  const teamInfo = useTeam();

  const { data: folders, error } = useSWR<FolderWithCount[]>(
    teamInfo?.currentTeam?.id &&
      `/api/teams/${teamInfo?.currentTeam?.id}/folders?root=true`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 30000,
    },
  );

  return {
    folders,
    loading: !folders && !error,
    error,
  };
}
