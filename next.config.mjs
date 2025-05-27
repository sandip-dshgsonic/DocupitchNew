


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
//   images: {
//     minimumCacheTTL: 2592000, // 30 days
//     remotePatterns: prepareRemotePatterns(),
//   },
//   transpilePackages: ["@trigger.dev/react"],
//   skipTrailingSlashRedirect: true,
//   assetPrefix:
//     process.env.NODE_ENV === "production" &&
//     process.env.VERCEL_ENV === "production"
//       ? process.env.NEXT_PUBLIC_BASE_URL
//       : process.env.NEXT_PUBLIC_BASE_URL,
//   async redirects() {
//     return[];
//     // return [
//     //   {
//     //     source: "/",
//     //     destination: "/documents",
//     //     permanent: false,
//     //   },
//     // ];
//   },
//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: [
//           {
//             key: "Referrer-Policy",
//             value: "no-referrer-when-downgrade",
//           },
//           {
//             key: "X-DNS-Prefetch-Control",
//             value: "on",
//           },
//           {
//             key: "X-Frame-Options",
//             value: "DENY",
//           },
//         ],
//       },
//     ];
//   },
//   experimental: {
//     outputFileTracingIncludes: {
//       "/api/mupdf/*": ["./node_modules/mupdf/dist/*.wasm"],
//     },
//     missingSuspenseWithCSRBailout: false,
//   },
//   // Adding Docker-specific config
//   output: 'standalone',
// };


// function prepareRemotePatterns() {
//   let patterns = [
//     // static images and videos
//     { protocol: "https", hostname: "assets.papermark.io" },
//     { protocol: "https", hostname: "cdn.papermarkassets.com" },
//     { protocol: "https", hostname: "d2kgph70pw5d9n.cloudfront.net" },
//     // twitter img
//     { protocol: "https", hostname: "pbs.twimg.com" },
//     // linkedin img
//     { protocol: "https", hostname: "media.licdn.com" },
//     // google img
//     { protocol: "https", hostname: "lh3.googleusercontent.com" },
//     // papermark img
//     { protocol: "https", hostname: "www.papermark.io" },
//     { protocol: "https", hostname: "app.papermark.io" },
//     // useragent img
//     { protocol: "https", hostname: "faisalman.github.io" },
//     // special document pages
//     { protocol: "https", hostname: "d36r2enbzam0iu.cloudfront.net" },
//   ];

//   if (process.env.NEXT_PRIVATE_UPLOAD_DISTRIBUTION_HOST) {
//     patterns.push({
//       protocol: "https",
//       hostname: process.env.NEXT_PRIVATE_UPLOAD_DISTRIBUTION_HOST,
//     });
//   }

//   if (process.env.NEXT_PRIVATE_ADVANCED_UPLOAD_DISTRIBUTION_HOST) {
//     patterns.push({
//       protocol: "https",
//       hostname: process.env.NEXT_PRIVATE_ADVANCED_UPLOAD_DISTRIBUTION_HOST,
//     });
//   }

//   if (process.env.VERCEL_ENV === "production") {
//     patterns.push({
//       // production vercel blob
//       protocol: "https",
//       hostname: "yoywvlh29jppecbh.public.blob.vercel-storage.com",
//     });
//   }

//   if (
//     process.env.VERCEL_ENV === "preview" ||
//     process.env.NODE_ENV === "development"
//   ) {
//     patterns.push({
//       // staging vercel blob
//       protocol: "https",
//       hostname: "36so9a8uzykxknsu.public.blob.vercel-storage.com",
//     });
//   }

//   return patterns;
// }

// export default nextConfig;


// by aniket
// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],
  images: {
    minimumCacheTTL: 2592000, // 30 days
    remotePatterns: prepareRemotePatterns(),
  },
  transpilePackages: ["@trigger.dev/react", "pdf-lib"],
  skipTrailingSlashRedirect: true,
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || "",
  async redirects() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Referrer-Policy",
            value: "no-referrer-when-downgrade",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fix for pdf-lib
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   './writers/PDFWriter': './writers/pdfwriter',
    // };
    
    // Handle case-sensitivity issues
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };

    return config;
  },
  experimental: {
    outputFileTracingIncludes: {
      "/api/mupdf/*": ["./node_modules/mupdf/dist/*.wasm"],
    },
    missingSuspenseWithCSRBailout: false,
  },
  // Adding Docker-specific config
  output: "standalone",
  // Disable SWC minify if you're still having issues with SWC
  swcMinify: false,
};

function prepareRemotePatterns() {
  let patterns = [
    // Static images and videos from your domain and other trusted sources
    { protocol: "https", hostname: "docupitch.com" },
    { protocol: "https", hostname: "d2kgph70pw5d9n.cloudfront.net" },
    { protocol: "https", hostname: "pbs.twimg.com" },
    { protocol: "https", hostname: "media.licdn.com" },
    { protocol: "https", hostname: "lh3.googleusercontent.com" },
  ];

  if (process.env.NEXT_PRIVATE_UPLOAD_DISTRIBUTION_HOST) {
    patterns.push({
      protocol: "https",
      hostname: process.env.NEXT_PRIVATE_UPLOAD_DISTRIBUTION_HOST,
    });
  }

  if (process.env.NEXT_PRIVATE_ADVANCED_UPLOAD_DISTRIBUTION_HOST) {
    patterns.push({
      protocol: "https",
      hostname: process.env.NEXT_PRIVATE_ADVANCED_UPLOAD_DISTRIBUTION_HOST,
    });
  }

  if (process.env.VERCEL_ENV === "production") {
    patterns.push({
      // Production Vercel blob storage
      protocol: "https",
      hostname: "yoywvlh29jppecbh.public.blob.vercel-storage.com",
    });
  }

  if (
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development"
  ) {
    patterns.push({
      // Staging Vercel blob storage
      protocol: "https",
      hostname: "36so9a8uzykxknsu.public.blob.vercel-storage.com",
    });
  }

  return patterns;
}

export default nextConfig;