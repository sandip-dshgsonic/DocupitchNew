// // import { Metadata } from "next";
// // import { Inter } from "next/font/google";

// // import PlausibleProvider from "next-plausible";

// // import "@/styles/globals.css";
// // import '../app/globals.css'


// // const inter = Inter({ subsets: ["latin"] });

// // const data = {
// //   description:
// //     "Document Sharing with Analytics.",
// //   title: "DocuPitch | Document Sharing with Analytics.",
// //   url: "/",
// // };

// // export const metadata: Metadata = {
// //   metadataBase: new URL("https://www.papermark.io"),
// //   title: data.title,
// //   description: data.description,
// //   openGraph: {
// //     title: data.title,
// //     description: data.description,
// //     url: data.url,
// //     siteName: "DocuPitch",
// //     images: [
// //       {
// //         url: "/_static/meta-image.png",
// //         width: 800,
// //         height: 600,
// //       },
// //     ],
// //     locale: "en_US",
// //     type: "website",
// //   },
// //   twitter: {
// //     card: "summary_large_image",
// //     title: data.title,
// //     description: data.description,
// //     creator: "@papermarkio",
// //     images: ["/_static/meta-image.png"],
// //   },
// // };

// // export default function RootLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   return (
// //     <html lang="en">
// //       <head>
// //         <PlausibleProvider
// //           domain="papermark.io"
// //           enabled={process.env.NEXT_PUBLIC_VERCEL_ENV === "production"}
// //         />
// //       </head>
// //       <body className={inter.className}>{children}</body>
// //     </html>
// //   );
// // }

// import './globals.css';
// import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
// // import { ThemeProvider } from './context/ThemeContext';

// const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//   title: 'DocuPitch - Transform the Way You Pitch Documents',
//   description: 'Streamline your workflow with DocuPitch, the ultimate tool for seamless document collaboration and professional presentations.',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className={`${inter.className} dark:bg-gray-900`}>
//         {/* <ThemeProvider> */}
//           {children}
//           {/* </ThemeProvider> */}
//       </body>
//     </html>
//   );
// }



import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
// import { ThemeProvider } from './context/ThemeContext';
import { ThemeProvider } from './providers/ThemeProvider';
export const metadata: Metadata = {
  title: "DocuPitch - Create Winning Pitch Decks | Startup Fundraising Platform",
  description: "Transform your startup's fundraising journey with DocuPitch. Create compelling pitch decks, connect with investors, and secure funding with our innovative platform.",
  keywords: "pitch deck, startup, fundraising, investor pitch, startup presentation, pitch deck platform",
  openGraph: {
    title: "DocuPitch - Create Winning Pitch Decks | Startup Fundraising Platform",
    description: "Transform your startup's fundraising journey with DocuPitch. Create compelling pitch decks, connect with investors, and secure funding with our innovative platform.",
    type: "website",
    locale: "en_US",
    siteName: "DocuPitch"
  },
  twitter: {
    card: "summary_large_image",
    title: "DocuPitch - Create Winning Pitch Decks | Startup Fundraising Platform",
    description: "Transform your startup's fundraising journey with DocuPitch. Create compelling pitch decks, connect with investors, and secure funding with our innovative platform."
  }
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
      <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}