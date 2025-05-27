// import type { AppProps } from "next/app";
// import { Inter } from "next/font/google";
// import Head from "next/head";

// import { TeamProvider } from "@/context/team-context";
// import type { Session } from "next-auth";
// import { SessionProvider } from "next-auth/react";
// import PlausibleProvider from "next-plausible";
// import { PostHogCustomProvider } from "@/components/providers/posthog-provider";
// import { TriggerCustomProvider } from "@/components/providers/trigger-provider";
// import { ThemeProvider } from "@/components/theme-provider";
// import { Toaster } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { EXCLUDED_PATHS } from "@/lib/constants";
// import "@/styles/globals.css";
// import "@fontsource/inter/index.css";
// import { useEffect, useState } from "react";


// import Script from "next/script";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// const inter = Inter({ subsets: ["latin"] });

// export default function App({
//   Component,
//   pageProps: { session, ...pageProps },
//   router,
// }: AppProps<{ session: Session }>) {


//   return (
//     <>
//       <Head>
//         <title>DocuPitch | Analytics for Startup Pitch Decks</title>
//         <link rel="icon" href="/icons/favicon.ico" />
//         <meta name="theme-color" content="#000000" />
//         <meta name="google-site-verification" content="eyFvDKcwkv7EfuPOt2wno_YCvSV_WaUCwcPx9rKWQ98" />
//         <meta
//           name="description"
//           content="Analytics for Startup Pitch Decks"
//           key="description"
//         />
//         {/* More meta tags */}
//       </Head>
//       <Script
//         strategy="afterInteractive"
//         src="https://www.googletagmanager.com/gtag/js?id=G-PNYMLR05ST"
//       />
//       <Script id="google-analytics" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           gtag('config', 'G-PNYMLR05ST');
//         `}
//       </Script>
//       <SessionProvider session={session}>
//         <PostHogCustomProvider>
//           <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
//             <PlausibleProvider domain="docupitch.com" enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}>
//               <main className={inter.className}>
//                 <Toaster closeButton />
//                 <TooltipProvider delayDuration={100}>
//                   {EXCLUDED_PATHS.includes(router.pathname) ? (
//                     <Component {...pageProps} />
//                   ) : (
//                     <TeamProvider>
//                       <TriggerCustomProvider>
//                         <Component {...pageProps} />
//                       </TriggerCustomProvider>
//                     </TeamProvider>
//                   )}
//                 </TooltipProvider>
//               </main>
//             </PlausibleProvider>
//           </ThemeProvider>
//         </PostHogCustomProvider>
//       </SessionProvider>
//     </>
//   );
// }





import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Head from "next/head";

import { TeamProvider } from "@/context/team-context";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import PlausibleProvider from "next-plausible";
import { PostHogCustomProvider } from "@/components/providers/posthog-provider";
import { TriggerCustomProvider } from "@/components/providers/trigger-provider";
// import { ThemeProvider } from "@/components/theme-provider";
// import { ThemeProvider } from "@/app/context/ThemeContext";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
// import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { EXCLUDED_PATHS } from "@/lib/constants";
import "@/styles/globals.css";
import "@fontsource/inter/index.css";
import { useEffect, useState } from "react";

import Script from "next/script";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const inter = Inter({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router,
}: AppProps<{ session: Session }>) {

  return (
    <>
      <Head>
        <title>DocuPitch | Analytics for Startup Pitch Decks</title>
        <link rel="icon" href="/icons/favicon.ico" />
        <meta name="theme-color" content="#000000" />
        <meta name="google-site-verification" content="eyFvDKcwkv7EfuPOt2wno_YCvSV_WaUCwcPx9rKWQ98" />
        <meta
          name="description"
          content="Analytics for Startup Pitch Decks"
          key="description"
        />
        {/* More meta tags */}
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-PNYMLR05ST"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-PNYMLR05ST');
        `}
      </Script>
      <SessionProvider session={session}>
        <PostHogCustomProvider>
          <ThemeProvider 
            // attribute="class" 
            // defaultTheme="light" 
            // enableSystem={false}
            // forcedTheme="light"
          >
            <PlausibleProvider domain="docupitch.com" enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}>
              <main className={inter.className}>
                <Toaster closeButton />
                <TooltipProvider delayDuration={100}>
                  {EXCLUDED_PATHS.includes(router.pathname) ? (
                    <Component {...pageProps} />
                  ) : (
                    <TeamProvider>
                      <TriggerCustomProvider>
                        <Component {...pageProps} />
                      </TriggerCustomProvider>
                    </TeamProvider>
                  )}
                </TooltipProvider>
              </main>
            </PlausibleProvider>
          </ThemeProvider>
        </PostHogCustomProvider>
      </SessionProvider>
    </>
  );
}