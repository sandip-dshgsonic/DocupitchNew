// import React, { useRef } from "react";
// import Sidebar from "../Sidebar";
// import TrialBanner from "./trial-banner";


// const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // Create a QueryClient instance using useRef to avoid recreating it on every render

//   return (
//       <div className="flex min-h-screen flex-col bg-[#F9FAFB] dark:bg-black lg:flex-row">
//         <Sidebar />
//         <div className="h-dvh flex-1">
//           {/* Trial banner shown only on trial */}
//           {/* <TrialBanner /> */}
//           <main className="h-dvh flex-1 lg:p-2">
//             <div className="h-full overflow-y-auto rounded-xl bg-[#F9FAFB] dark:border-none dark:bg-gray-900 dark:ring-gray-800">
//               {children}
//             </div> 
//           </main>
//         </div>
//       </div>
//   );
// };

// export default AppLayout;

import React from "react";
import Sidebar from "../Sidebar";
import TrialBanner from "./trial-banner";
import logo from '../../styles/logo.svg'
import Link from "next/link";
import ProfileMenu from "../profile-menu";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB] dark:bg-black" >
      {/* Global Top Navbar */}
      <div className="fixed top-0 left-0 w-full flex items-center justify-between h-[64px] bg-white dark:bg-gray-800 px-6 py-3 shadow-sm z-10" style={{ borderBottom: '1px solid #E5E7EB' }}>
  <div className="flex h-16 shrink-0 items-center space-x-3">
    <p className="flex items-center text-2xl font-bold tracking-tighter text-black dark:text-white" style={{ fontFamily: 'SF Pro Display' }}>
      <Link href="/">
        <img src={logo.src} style={{ height: '50px', width: '50px' }} alt='.' className="m-2" />
      </Link>
      {" "} Docu<span style={{ color: '#F97316', fontFamily: 'PP Pangaia' }}>Pitch</span>{" "}
    </p>
  </div>
  {/* Optional: Add nav actions here */}
  <ProfileMenu size="large" />
</div>

      {/* Sidebar + Main Layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <div className="h-dvh flex-1">
          {/* <TrialBanner /> */}
          <main className="h-dvh flex-1 lg:p-2">
            <div className="h-full overflow-y-auto rounded-xl bg-[#F9FAFB] dark:border-none dark:bg-gray-900 dark:ring-gray-800">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
