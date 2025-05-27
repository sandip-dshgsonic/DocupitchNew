// import { Head, Html, Main, NextScript } from "next/document";

// export default function Document() {
//   return (
//     <Html lang="en" className="h-full bg-background" suppressHydrationWarning>
//       <Head >
//       <title>DocuPitch | Analytics for Startup Pitch Decks</title>
    

// <meta name="theme-color" content="#000000" />
// <meta name="google-site-verification" content="eyFvDKcwkv7EfuPOt2wno_YCvSV_WaUCwcPx9rKWQ98" />
// <meta
//   name="description"
//   content="Analytics for Startup Pitch Decks"
//   key="description"
// />
// {/* More meta tags */}
//       </Head>
//       <body className="h-full">
//         <Main />
//         <NextScript />
//       </body>
//     </Html>
//   );
// }


import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-background" suppressHydrationWarning>
      <Head>
        <meta name="theme-color" content="#000000" />
        <meta name="google-site-verification" content="eyFvDKcwkv7EfuPOt2wno_YCvSV_WaUCwcPx9rKWQ98" />
        <meta
          name="description"
          content="Analytics for Startup Pitch Decks"
          key="description"
        />
        {/* More meta tags */}
      </Head>
      <body className="h-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
