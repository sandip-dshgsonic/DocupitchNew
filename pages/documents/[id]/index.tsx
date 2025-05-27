import ErrorPage from "next/error";

import { useState,useEffect } from "react";

import { useTeam } from "@/context/team-context";

import DocumentHeader from "@/components/documents/document-header";
import { StatsComponent } from "@/components/documents/stats";
import AppLayout from "@/components/layouts/app";
import LinkSheet from "@/components/links/link-sheet";
import {LinksTable} from "@/components/links/links-table";
import { NavMenu } from "@/components/navigation-menu";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/ui/loading-spinner";
import VisitorsTable from "@/components/visitors/visitors-table";
import { useStats } from "@/lib/swr/use-stats";

import { useDocument, useDocumentLinks } from "@/lib/swr/use-document";

export default function DocumentPage() {
  const { document: prismaDocument, primaryVersion, error } = useDocument();
  console.log('--------documents id page 20',primaryVersion,prismaDocument)
  
  const { links } = useDocumentLinks();
  const teamInfo = useTeam();
  
  const [isLinkSheetOpen, setIsLinkSheetOpen] = useState<boolean>(false);

  console.log('--------documents id page 28',teamInfo,links,)




 const [excludeTeamMembers, setExcludeTeamMembers] = useState<boolean>(false);
  const statsData = useStats({ excludeTeamMembers });
  console.log('--------documents id page 43 stats',statsData)

  const [totalViews, setTotalViews] = useState(0);
  const [uniqueViews, setUniqueViews] = useState(0);
  const [avgViewDuration, setAvgViewDuration] = useState("0"); // string like "2:30" or "45"
  const [avgUnit, setAvgUnit] = useState("seconds"); // "seconds" or "minutes"
  
  useEffect(() => {
    if (!statsData?.stats) return;
  
    const { views, total_duration } = statsData.stats;
  
    // Total and Unique Views
    const total = views.length;
    const unique = new Set(views.map(v => v.viewerEmail)).size;
  
    setTotalViews(total);
    setUniqueViews(unique);
  
    // Format avg view duration
    const avgDuration = total > 0 ? Math.floor(total_duration / total) : null;
  
    if (avgDuration == null) {
      setAvgViewDuration("0");
      setAvgUnit("seconds");
    } else if (avgDuration < 60000) {
      setAvgViewDuration(`${Math.round(avgDuration / 1000)}`);
      setAvgUnit("seconds");
    } else {
      const minutes = Math.floor(avgDuration / 60000);
      const seconds = Math.round((avgDuration % 60000) / 1000);
      setAvgViewDuration(`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`);
      setAvgUnit("minutes");
    }
  }, [statsData]);
  
  if (error && error.status === 404) {
    return <ErrorPage statusCode={404} />;
  }
  
  if (error && error.status === 400) {
    return <ErrorPage statusCode={400} />;
  }

  return (
    <AppLayout>
      <main className="relative mx-2 mb-10 mt-[64px] space-y-8 overflow-hidden px-1 sm:mx-3 md:mx-5 md:mt-5 lg:mx-7 lg:mt-8 xl:mx-10">
        {prismaDocument && primaryVersion ? (
          <>
            {/* Action Header */}
            <DocumentHeader
              primaryVersion={primaryVersion}
              prismaDocument={prismaDocument}
              teamId={teamInfo?.currentTeam?.id!}
              actions={[
                <Button
                  key={"create-link"}
                  className="flex h-8 whitespace-nowrap border-black dark:border-white border-2 hover:bg-[#10B981] hover:text-white text-xs lg:h-9 lg:text-sm"
                  onClick={() => setIsLinkSheetOpen(true)}
                >
                  Create Link 
                </Button>,
              ]}
            />

<div className="flex justify-between gap-4 w-full">
      {/* Card 1 */}
      <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
        <div className="mr-4 p-3 rounded-md bg-[#FFEDD5]">
        <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.25 20H0.75V0H23.25V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_480_557)">
<path d="M12.001 3.125C9.4541 3.125 7.36035 4.28125 5.75488 5.76953C4.25098 7.16797 3.21191 8.82812 2.68066 10C3.21191 11.1719 4.25098 12.832 5.75098 14.2305C7.36035 15.7187 9.4541 16.875 12.001 16.875C14.5479 16.875 16.6416 15.7187 18.2471 14.2305C19.751 12.832 20.79 11.1719 21.3213 10C20.79 8.82812 19.751 7.16797 18.251 5.76953C16.6416 4.28125 14.5479 3.125 12.001 3.125ZM4.47754 4.39844C6.31738 2.6875 8.84473 1.25 12.001 1.25C15.1572 1.25 17.6846 2.6875 19.5244 4.39844C21.3525 6.09766 22.5752 8.125 23.1572 9.51953C23.2861 9.82812 23.2861 10.1719 23.1572 10.4805C22.5752 11.875 21.3525 13.9062 19.5244 15.6016C17.6846 17.3125 15.1572 18.75 12.001 18.75C8.84473 18.75 6.31738 17.3125 4.47754 15.6016C2.64941 13.9062 1.42676 11.875 0.848633 10.4805C0.719727 10.1719 0.719727 9.82812 0.848633 9.51953C1.42676 8.125 2.64941 6.09375 4.47754 4.39844ZM12.001 13.125C13.7275 13.125 15.126 11.7266 15.126 10C15.126 8.27344 13.7275 6.875 12.001 6.875C11.9736 6.875 11.9502 6.875 11.9229 6.875C11.9736 7.07422 12.001 7.28516 12.001 7.5C12.001 8.87891 10.8799 10 9.50098 10C9.28613 10 9.0752 9.97266 8.87598 9.92188C8.87598 9.94922 8.87598 9.97266 8.87598 10C8.87598 11.7266 10.2744 13.125 12.001 13.125ZM12.001 5C13.3271 5 14.5988 5.52678 15.5365 6.46447C16.4742 7.40215 17.001 8.67392 17.001 10C17.001 11.3261 16.4742 12.5979 15.5365 13.5355C14.5988 14.4732 13.3271 15 12.001 15C10.6749 15 9.40312 14.4732 8.46544 13.5355C7.52776 12.5979 7.00098 11.3261 7.00098 10C7.00098 8.67392 7.52776 7.40215 8.46544 6.46447C9.40312 5.52678 10.6749 5 12.001 5Z" fill="#F97316"/>
</g>
<defs>
<clipPath id="clip0_480_557">
<path d="M0.75 0H23.25V20H0.75V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

    
        </div>
        <div>
          <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Total Views</div>
          <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>{totalViews}</div>
        </div>
      </div>
    
      {/* Card 2 */}
      <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
        <div className=" mr-4 p-3 rounded-md bg-[#DBEAFE]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20H0V0H20V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_480_572)">
<path d="M6.11328 17.4883L5.62109 18.6406C4.89062 18.2695 4.21875 17.8125 3.60938 17.2773L4.49609 16.3906C4.98438 16.8164 5.52734 17.1875 6.11328 17.4883ZM1.58594 10.625H0.332031C0.386719 11.4531 0.542969 12.2539 0.789063 13.0117L1.95312 12.5469C1.76172 11.9336 1.63281 11.2891 1.58594 10.625ZM1.58594 9.375C1.64062 8.64062 1.78906 7.92969 2.01953 7.26172L0.867188 6.76953C0.574219 7.58984 0.390625 8.46484 0.332031 9.375H1.58594ZM2.51172 6.11328C2.81641 5.53125 3.18359 4.98828 3.60938 4.49219L2.72266 3.60547C2.1875 4.21484 1.72656 4.88672 1.35938 5.61719L2.51172 6.11328ZM15.5078 16.3906C14.9648 16.8594 14.3594 17.2617 13.707 17.5781L14.1719 18.7422C14.9805 18.3555 15.7266 17.8594 16.3945 17.2734L15.5078 16.3906ZM4.49219 3.60938C5.03516 3.14062 5.64062 2.73828 6.29297 2.42188L5.82812 1.25781C5.01953 1.64453 4.27344 2.14063 3.60938 2.72656L4.49219 3.60938ZM17.4883 13.8867C17.1836 14.4688 16.8164 15.0117 16.3906 15.5078L17.2773 16.3945C17.8125 15.7852 18.2734 15.1094 18.6406 14.3828L17.4883 13.8867ZM18.4141 10.625C18.3594 11.3594 18.2109 12.0703 17.9805 12.7383L19.1328 13.2305C19.4258 12.4062 19.6094 11.5312 19.6641 10.6211H18.4141V10.625ZM12.5469 18.0469C11.9336 18.2422 11.2891 18.3672 10.625 18.4141V19.668C11.4531 19.6133 12.2539 19.457 13.0117 19.2109L12.5469 18.0469ZM9.375 18.4141C8.64062 18.3594 7.92969 18.2109 7.26172 17.9805L6.76953 19.1328C7.59375 19.4258 8.46875 19.6094 9.37891 19.6641V18.4141H9.375ZM18.0469 7.45312C18.2422 8.06641 18.3672 8.71094 18.4141 9.375H19.668C19.6133 8.54688 19.457 7.74609 19.2109 6.98828L18.0469 7.45312ZM3.60938 15.5078C3.14062 14.9648 2.73828 14.3594 2.42188 13.707L1.25781 14.1719C1.64453 14.9805 2.14063 15.7266 2.72656 16.3945L3.60938 15.5078ZM10.625 1.58594C11.3594 1.64062 12.0664 1.78906 12.7383 2.01953L13.2305 0.867188C12.4102 0.574219 11.5352 0.390625 10.625 0.332031V1.58594ZM7.45312 1.95312C8.06641 1.75781 8.71094 1.63281 9.375 1.58594V0.332031C8.54688 0.386719 7.74609 0.542969 6.98828 0.789063L7.45312 1.95312ZM17.2773 3.60547L16.3906 4.49219C16.8594 5.03516 17.2617 5.64062 17.582 6.29297L18.7461 5.82812C18.3594 5.01953 17.8633 4.27344 17.2773 3.60547ZM15.5078 3.60938L16.3945 2.72266C15.7852 2.1875 15.1133 1.72656 14.3828 1.35938L13.8906 2.51172C14.4688 2.81641 15.0156 3.18359 15.5078 3.60938Z" fill="#3B82F6"/>
<path d="M10 15.3125C10.6041 15.3125 11.0938 14.8228 11.0938 14.2188C11.0938 13.6147 10.6041 13.125 10 13.125C9.39594 13.125 8.90625 13.6147 8.90625 14.2188C8.90625 14.8228 9.39594 15.3125 10 15.3125Z" fill="#3B82F6"/>
<path d="M10.301 12.1875H9.67599C9.41818 12.1875 9.20724 11.9766 9.20724 11.7188C9.20724 8.94531 12.2307 9.22266 12.2307 7.50781C12.2307 6.72656 11.5354 5.9375 9.98849 5.9375C8.85177 5.9375 8.25802 6.3125 7.67599 7.05859C7.52365 7.25391 7.2424 7.29297 7.04318 7.15234L6.53146 6.79297C6.31271 6.64062 6.26193 6.33203 6.4299 6.12109C7.25802 5.05859 8.2424 4.375 9.9924 4.375C12.0354 4.375 13.7971 5.53906 13.7971 7.50781C13.7971 10.1484 10.7736 9.98828 10.7736 11.7188C10.7697 11.9766 10.5588 12.1875 10.301 12.1875Z" fill="#3B82F6"/>
</g>
<defs>
<clipPath id="clip0_480_572">
<path d="M0 0H20V20H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

    
        </div>
        <div>
          <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Links Created</div>
          <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display' }}>{links?.length || 0}</div>
        </div>
      </div>
    
      {/* Card 3 */}
      <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
        <div className=" mr-4 p-3 rounded-md bg-[#EDE9FE]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 20H0V0H20V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_480_591)">
<path d="M18.125 10C18.125 12.1549 17.269 14.2215 15.7452 15.7452C14.2215 17.269 12.1549 18.125 10 18.125C7.84512 18.125 5.77849 17.269 4.25476 15.7452C2.73102 14.2215 1.875 12.1549 1.875 10C1.875 7.84512 2.73102 5.77849 4.25476 4.25476C5.77849 2.73102 7.84512 1.875 10 1.875C12.1549 1.875 14.2215 2.73102 15.7452 4.25476C17.269 5.77849 18.125 7.84512 18.125 10ZM0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C4.8043 18.9464 7.34784 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 7.34784 18.9464 4.8043 17.0711 2.92893C15.1957 1.05357 12.6522 0 10 0C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10ZM9.0625 4.6875V10C9.0625 10.3125 9.21875 10.6055 9.48047 10.7812L13.2305 13.2812C13.6602 13.5703 14.2422 13.4531 14.5312 13.0195C14.8203 12.5859 14.7031 12.0078 14.2695 11.7188L10.9375 9.5V4.6875C10.9375 4.16797 10.5195 3.75 10 3.75C9.48047 3.75 9.0625 4.16797 9.0625 4.6875Z" fill="#8B5CF6"/>
</g>
<defs>
<clipPath id="clip0_480_591">
<path d="M0 0H20V20H0V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

    
        </div>
        <div>
          <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Avg Time Spent</div>
          <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display ' }}>{avgViewDuration} {avgUnit}</div>
        </div>
      </div>
    
      {/* Card 4 */}
      <div className="flex items-center bg-white border border-[#E5E7EB] rounded-lg p-4 flex-1">
        <div className=" mr-4 p-3 rounded-md bg-[#D1FAE5]">
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.75 20H0.25V0H17.75V20Z" stroke="#E5E7EB"/>
<g clip-path="url(#clip0_480_606)">
<path d="M12.125 5C12.125 4.1712 11.7958 3.37634 11.2097 2.79029C10.6237 2.20424 9.8288 1.875 9 1.875C8.1712 1.875 7.37634 2.20424 6.79029 2.79029C6.20424 3.37634 5.875 4.1712 5.875 5C5.875 5.8288 6.20424 6.62366 6.79029 7.20971C7.37634 7.79576 8.1712 8.125 9 8.125C9.8288 8.125 10.6237 7.79576 11.2097 7.20971C11.7958 6.62366 12.125 5.8288 12.125 5ZM4 5C4 3.67392 4.52678 2.40215 5.46447 1.46447C6.40215 0.526784 7.67392 0 9 0C10.3261 0 11.5979 0.526784 12.5355 1.46447C13.4732 2.40215 14 3.67392 14 5C14 6.32608 13.4732 7.59785 12.5355 8.53553C11.5979 9.47322 10.3261 10 9 10C7.67392 10 6.40215 9.47322 5.46447 8.53553C4.52678 7.59785 4 6.32608 4 5ZM2.17578 18.125H15.8242C15.4766 15.6523 13.3516 13.75 10.7852 13.75H7.21484C4.64844 13.75 2.52344 15.6523 2.17578 18.125ZM0.25 18.8398C0.25 14.9922 3.36719 11.875 7.21484 11.875H10.7852C14.6328 11.875 17.75 14.9922 17.75 18.8398C17.75 19.4805 17.2305 20 16.5898 20H1.41016C0.769531 20 0.25 19.4805 0.25 18.8398Z" fill="#10B981"/>
</g>
<defs>
<clipPath id="clip0_480_606">
<path d="M0.25 0H17.75V20H0.25V0Z" fill="white"/>
</clipPath>
</defs>
</svg>

    
        </div>
        <div>
          <div className="text-sm text-gray-500" style={{ fontFamily: 'SF Pro Display Light' }}>Unique Visitors</div>
          <div className="text-xl font-semibold text-gray-800" style={{ fontFamily: 'SF Pro Display ' }}>{uniqueViews}</div>
        </div>
      </div>
    </div>




            {/* Stats */}
            <StatsComponent
              documentId={prismaDocument.id}
              numPages={primaryVersion.numPages!}
            />

            {/* Links */}
            <LinksTable
              links={links}
              targetType={"DOCUMENT"}
              primaryVersion={primaryVersion}
            />

            {/* Visitors */}
            <VisitorsTable numPages={primaryVersion.numPages!} />

            <LinkSheet
              isOpen={isLinkSheetOpen}
              linkType="DOCUMENT_LINK"
              setIsOpen={setIsLinkSheetOpen}
              existingLinks={links}
            />
          </>
        ) : (
          <div className="flex h-screen items-center justify-center">
            <LoadingSpinner className="mr-1 h-20 w-20" />
          </div>
        )}
      </main>
    </AppLayout>
  );
}
