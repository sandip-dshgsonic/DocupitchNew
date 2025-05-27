// import { useRouter } from "next/router";

// import { useTeam } from "@/context/team-context";
// import { View } from "@prisma/client";
// import { version } from "os";
// import useSWR from "swr";
// import useSWRImmutable from "swr/immutable";

// import { DocumentWithVersion, LinkWithViews } from "@/lib/types";
// import { fetcher } from "@/lib/utils";

// export function useDocument() {
//   const router = useRouter();
//   const teamInfo = useTeam();

//   const { id } = router.query as {
//     id: string;
//   };

//   console.log('lib swr use documents-------20 ',id,teamInfo)
 
//     // const { data: document, error } = useSWR<DocumentWithVersion>(
//     //   teamInfo?.currentTeam?.id &&
//     //     id &&
//     //     `/api/teams/${teamInfo?.currentTeam?.id}/documents/${encodeURIComponent(
//     //       id,
//     //     )}`,
//     //   fetcher,
//     //   {
//     //     dedupingInterval: 10000,
//     //   },
//     // );

//     const shouldFetch = Boolean(teamInfo?.currentTeam?.id && id);
// console.log("Should fetch:", shouldFetch);

//     const { data: document, error } = useSWR<DocumentWithVersion>(
//       teamInfo?.currentTeam?.id && id
//         ? `/api/teams/${teamInfo?.currentTeam?.id}/documents/${encodeURIComponent(id)}`
//         : null, // Pass null to disable fetching when conditions are not met
//       fetcher,
//       {
//         dedupingInterval: 10000,
//       }
//     );
//     console.log('------------lin swr use documents 43')
//     teamInfo?.currentTeam?.id && id?
//     console.log('------------lin swr use documents yyyyyyyyyyyy 44'): console.log('------------lin swr use documents nnnnnnn 44')
//     // Handle errors or absence of data
//     if (error) {
//       console.error("Error fetching document:", error);
//     }
    
//     if (!document) {
//       console.log("Document not available or still loading");
//     } else {
//       console.log("Fetched document:", document);
//     }
  
 

//   return {
//     document,
//     primaryVersion: document?.versions[0],
//     loading: !error && !document,
//     error,
//   };
// }

// export function useDocumentLinks() {
//   const router = useRouter();
//   const teamInfo = useTeam();


//   const { id } = router.query as {
//     id: string;
//   };

// console.log('lib swr usedocumetn links -------------79',router,teamInfo)

// const { data: links, error } = useSWR<LinkWithViews[]>(
//   teamInfo?.currentTeam?.id && id
//     ? `/api/teams/${teamInfo?.currentTeam?.id}/documents/${encodeURIComponent(id)}/links`
//     : null, // Prevent API call when currentTeam is undefined
//   fetcher,
//   {
//     dedupingInterval: 10000,
//   }
// );

//   return {
//     links,
//     loading: !error && !links,
//     error,
//   };
// }

// interface ViewWithDuration extends View {
//   internal: boolean;
//   duration: {
//     data: { pageNumber: string; sum_duration: number }[];
//   };
//   totalDuration: number;
//   completionRate: number;
//   link: {
//     name: string | null;
//   };
//   feedbackResponse: {
//     id: string;
//     data: {
//       question: string;
//       answer: string;
//     };
//   } | null;
//   agreementResponse: {
//     id: string;
//     agreementId: string;
//     agreement: {
//       name: string;
//     };
//   } | null;
//   versionNumber: number;
//   versionNumPages: number;
// }

// type TStatsData = {
//   hiddenViewCount: number;
//   viewsWithDuration: ViewWithDuration[];
//   totalViews: number;
// };

// export function useDocumentVisits(page: number, limit: number) {
//   const router = useRouter();
//   const teamInfo = useTeam();
//   const teamId = teamInfo?.currentTeam?.id;
 
//   const { id } = router.query as {
//     id: string;
//   };
//   console.log("use documents 109-++-----",id)
//   console.log("use documents 110-++-----",teamId)
//   const cacheKey =
//     teamId && id
//       ? `/api/teams/${teamId}/documents/${id}/views?page=${page}&limit=${limit}`
//       : null;
//       console.log("use documents 109------",cacheKey)
//   const { data: views, error } = useSWR<TStatsData>(cacheKey, fetcher, {
//     dedupingInterval: 20000,
//     revalidateOnFocus: true,
//   });
//   console.log("Views data----use doc: ", views);
// console.log("Error:----------use doc: ", error);
//   return {
//     views,
//     loading: !error && !views,
//     error,
//   };
// }

// interface DocumentProcessingStatus {
//   currentPageCount: number;
//   totalPages: number;
//   hasPages: boolean;
// }

// export function useDocumentProcessingStatus(documentVersionId: string) {
//   const teamInfo = useTeam();
//   const teamId = teamInfo?.currentTeam?.id;

//   const { data: status, error } = useSWR<DocumentProcessingStatus>(
//     teamId &&
//       `/api/teams/${teamId}/documents/document-processing-status?documentVersionId=${documentVersionId}`,
//     fetcher,
//     {
//       refreshInterval: 3000, // refresh every 3 seconds
//     },
//   );

//   return {
//     status: status,
//     loading: !error && !status,
//     error: error,
//   };
// }

// export function useDocumentThumbnail(
//   pageNumber: number,
//   documentId: string,
//   versionNumber?: number,
// ) {
//   const { data, error } = useSWR<{ imageUrl: string }>(
//     pageNumber === 0
//       ? null
//       : `/api/jobs/get-thumbnail?documentId=${documentId}&pageNumber=${pageNumber}&versionNumber=${versionNumber}`,
//     fetcher,
//     {
//       dedupingInterval: 1200000,
//       revalidateOnFocus: false,
//       // revalidateOnMount: false,
//       revalidateIfStale: false,
//       refreshInterval: 0,
//     },
//   );

//   if (pageNumber === 0) {
//     return {
//       data: null,
//       loading: false,
//       error: null,
//     };
//   }

//   return {
//     data,
//     loading: !error && !data,
//     error,
//   };
// }



import { useRouter } from "next/router";
import { useTeam } from "@/context/team-context";
import { View } from "@prisma/client";
import useSWR from "swr";

import { DocumentWithVersion, LinkWithViews } from "@/lib/types";
import { fetcher } from "@/lib/utils";

// ------------------ Document Info ------------------

export function useDocument() {
  const { query } = useRouter();
  const teamInfo = useTeam();
  const id = query?.id as string;

  const shouldFetch = !!teamInfo?.currentTeam?.id && !!id;

  const { data: document, error } = useSWR<DocumentWithVersion>(
    shouldFetch
      ? `/api/teams/${teamInfo?.currentTeam?.id}/documents/${encodeURIComponent(id)}`
      : null,
    fetcher,
    {
      dedupingInterval: 10000,
    },
  );

  return {
    document,
    primaryVersion: document?.versions?.[0],
    loading: !document && !error,
    error,
  };
}

// ------------------ Document Links ------------------

export function useDocumentLinks() {
  const { query } = useRouter();
  const teamInfo = useTeam();
  const id = query?.id as string;

  const shouldFetch = !!teamInfo?.currentTeam?.id && !!id;

  const { data: links, error } = useSWR<LinkWithViews[]>(
    shouldFetch
      ? `/api/teams/${teamInfo?.currentTeam?.id}/documents/${encodeURIComponent(id)}/links`
      : null,
    fetcher,
    {
      dedupingInterval: 10000,
    },
  );

  return {
    links,
    loading: !links && !error,
    error,
  };
}

// ------------------ Document Views / Stats ------------------

interface ViewWithDuration extends View {
  internal: boolean;
  duration: {
    data: { pageNumber: string; sum_duration: number }[];
  };
  totalDuration: number;
  completionRate: number;
  link: {
    name: string | null;
  };
  feedbackResponse: {
    id: string;
    data: {
      question: string;
      answer: string;
    };
  } | null;
  agreementResponse: {
    id: string;
    agreementId: string;
    agreement: {
      name: string;
    };
  } | null;
  versionNumber: number;
  versionNumPages: number;
}

type TStatsData = {
  hiddenViewCount: number;
  viewsWithDuration: ViewWithDuration[];
  totalViews: number;
};

export function useDocumentVisits(page: number, limit: number) {
  const { query } = useRouter();
  const teamInfo = useTeam();
  const teamId = teamInfo?.currentTeam?.id;
  const id = query?.id as string;

  const shouldFetch = !!teamId && !!id;

  const { data: views, error } = useSWR<TStatsData>(
    shouldFetch
      ? `/api/teams/${teamId}/documents/${id}/views?page=${page}&limit=${limit}`
      : null,
    fetcher,
    {
      dedupingInterval: 60000, // 1 minute
      revalidateOnFocus: false,
    },
  );

  return {
    views,
    loading: !views && !error,
    error,
  };
}

// ------------------ Document Processing Status ------------------

interface DocumentProcessingStatus {
  currentPageCount: number;
  totalPages: number;
  hasPages: boolean;
}

export function useDocumentProcessingStatus(documentVersionId: string) {
  const teamInfo = useTeam();
  const teamId = teamInfo?.currentTeam?.id;

  const shouldFetch = !!teamId && !!documentVersionId;

  const { data: status, error } = useSWR<DocumentProcessingStatus>(
    shouldFetch
      ? `/api/teams/${teamId}/documents/document-processing-status?documentVersionId=${documentVersionId}`
      : null,
    fetcher,
    {
      refreshInterval: 3000,
    },
  );

  return {
    status,
    loading: !status && !error,
    error,
  };
}

// ------------------ Document Thumbnail ------------------

export function useDocumentThumbnail(
  pageNumber: number,
  documentId: string,
  versionNumber?: number,
) {
  const shouldFetch = pageNumber > 0 && !!documentId;

  const { data, error } = useSWR<{ imageUrl: string }>(
    shouldFetch
      ? `/api/jobs/get-thumbnail?documentId=${documentId}&pageNumber=${pageNumber}&versionNumber=${versionNumber}`
      : null,
    fetcher,
    {
      dedupingInterval: 1200000, // 20 minutes
      revalidateOnFocus: false,
      revalidateIfStale: false,
      refreshInterval: 0,
    },
  );

  return {
    data,
    loading: !data && !error,
    error,
  };
}
