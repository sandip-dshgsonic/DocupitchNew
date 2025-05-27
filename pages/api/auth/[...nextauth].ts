// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PasskeyProvider } from "@teamhanko/passkeys-next-auth-provider";
// import NextAuth, { type NextAuthOptions } from "next-auth";
// import EmailProvider from "next-auth/providers/email";
// import GoogleProvider from "next-auth/providers/google";
// import LinkedInProvider from "next-auth/providers/linkedin";

// import { identifyUser, trackAnalytics } from "@/lib/analytics";
// import { sendVerificationRequestEmail } from "@/lib/emails/send-verification-request";
// import { sendWelcomeEmail } from "@/lib/emails/send-welcome";
// import hanko from "@/lib/hanko";
// import prisma from "@/lib/prisma";
// import { CreateUserEmailProps, CustomUser } from "@/lib/types";

// const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;
// // console.log('--next auth vercel dpe ---16 ',VERCEL_DEPLOYMENT)
// // console.log('--next auth vercel dpe ---17 ',`${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`)
// // console.log('--next auth vercel dpe ---18 ',VERCEL_DEPLOYMENT ? ".papermark.io" : undefined)
// // console.log('--next auth vercel dpe ---19 ',VERCEL_DEPLOYMENT)

// // This function can run for a maximum of 180 seconds
// export const config = {
//   maxDuration: 180,
// };

// export const authOptions: NextAuthOptions = {
//   pages: {
//     error: "/login",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//       allowDangerousEmailAccountLinking: true,
//     }),
//     LinkedInProvider({
//       clientId: process.env.LINKEDIN_CLIENT_ID as string,
//       clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
//       authorization: {
//         params: { scope: "openid profile email" },
//       },
//       issuer: "https://www.linkedin.com/oauth",
//       jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
//       profile(profile, tokens) {
//         const defaultImage =
//           "https://cdn-icons-png.flaticon.com/512/174/174857.png";
//         return {
//           id: profile.sub,
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture ?? defaultImage,
//         };
//       },
//       allowDangerousEmailAccountLinking: true,
//     }),
//     EmailProvider({
//       async sendVerificationRequest({ identifier, url }) {
//         // console.log("abovr dev node env----54",url,identifier)
//         if (process.env.NODE_ENV === "development") {
//           await sendVerificationRequestEmail({
//             url,
//             email: identifier,
//           });
//           // console.log("login url ", url);
//           return;
//         } else {
//           await sendVerificationRequestEmail({
//             url,
//             email: identifier,
//           });
//         }
//       },
//     }),
//     PasskeyProvider({
//       tenant: hanko,
//       async authorize({ userId }) {
//         const user = await prisma.user.findUnique({ where: { id: userId } });
//         if (!user) return null;
//         return user;
//       },
//     }),
//   ],
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   cookies: {
//     sessionToken: {
//       name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
//       options: {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)  ooooo
//         domain: VERCEL_DEPLOYMENT ? ".papermark.io" : undefined,
//         secure: VERCEL_DEPLOYMENT,
//       },
//     },
//   },

//   callbacks: {
//     jwt: async ({ token, user }) => {
//       // console.log('--------101--jwt--nextauth.js ',token)
//       console.log('--------102----nextauth.js ')
//       if (!token.email) {
//         return {};
//       }
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
      
//       (session.user as CustomUser) = {
//         id: token.sub,
//         // @ts-ignore
//         ...(token || session).user,
//       };
//       // console.log('--------111-session---nextauth.js ',session.user)
//       return session;
//     },
//   },

//   events: {
//     async createUser(message) {
//       const params: CreateUserEmailProps = {
//         user: {
//           name: message.user.name,
//           email: message.user.email,
//         },
//       };

//       await identifyUser(message.user.email ?? message.user.id);
//       await trackAnalytics({
//         event: "User Signed Up",
//         email: message.user.email,
//         userId: message.user.id,
//       });

//       await sendWelcomeEmail(params);
//     },
//     async signIn(message) {
//       await identifyUser(message.user.email ?? message.user.id);
//       await trackAnalytics({
//         event: "User Signed In",
//         email: message.user.email,
//       });
//     },
//   },
// };

// export default NextAuth(authOptions);


import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PasskeyProvider } from "@teamhanko/passkeys-next-auth-provider";
import NextAuth, { type NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";

import { compare } from "bcrypt";
import { identifyUser, trackAnalytics } from "@/lib/analytics";
import { sendVerificationRequestEmail } from "@/lib/emails/send-verification-request";
import { sendWelcomeEmail } from "@/lib/emails/send-welcome";
import hanko from "@/lib/hanko";
import prisma from "@/lib/prisma";
import { CreateUserEmailProps, CustomUser } from "@/lib/types";

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL;

// This function can run for a maximum of 180 seconds
export const config = {
  maxDuration: 180,
};

export const authOptions: NextAuthOptions = {
  pages: {
    error: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID as string,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
      authorization: {
        params: { scope: "openid profile email" },
      },
      issuer: "https://www.linkedin.com/oauth",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile, tokens) {
        const defaultImage =
          "https://cdn-icons-png.flaticon.com/512/174/174857.png";
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture ?? defaultImage,
        };
      },
      allowDangerousEmailAccountLinking: true,
    }),
    EmailProvider({
      async sendVerificationRequest({ identifier, url }) {
        if (process.env.NODE_ENV === "development") {
          await sendVerificationRequestEmail({
            url,
            email: identifier,
          });
          return;
        } else {
          await sendVerificationRequestEmail({
            url,
            email: identifier,
          });
        }
      },
    }),
    PasskeyProvider({
      tenant: hanko,
      async authorize({ userId }) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) return null;
        return user;
      },
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "name@example.com" },
        password: { label: "Password", type: "password" },
      },
      //by aniket
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password.");
        }
      
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
      
        if (!user || !user.password) {
          throw new Error("Invalid email or password.");
        }
      
        const isPasswordValid = await compare(credentials.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }
      
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      }
      
      //by aniket ended
      // async authorize(credentials) {
      //   if (!credentials?.email || !credentials?.password) {
      //     throw new Error("Please provide both email and password.");
      //   }

      //   const user = await prisma.user.findUnique({
      //     where: { email: credentials.email },
      //   });

      //   if (!user) {
      //     throw new Error("No user found with the given email.");
      //   }

      //   const isPasswordValid = await compare(credentials.password, user.password);
      //   if (!isPasswordValid) {
      //     throw new Error("Invalid email or password.");
      //   }

      //   return {
      //     id: user.id,
      //     name: user.name,
      //     email: user.email,
      //   };
      // },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? "__Secure-" : ""}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: VERCEL_DEPLOYMENT ? ".docupitch.com" : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (!token.email) {
        return {};
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
    // session: async ({ session, token }) => {
    //   (session.user as CustomUser) = {
    //     id: token.sub,
    //     ...(token || session).user,
    //   };
    //   return session;
    // },
    //by aniket
  
    
      session: async ({ session, token }) => {
        session.user = {
          id: token.sub,
          ...(((token || session).user) || {}),
        } as CustomUser;
        
        
      return session;
    },
    
    //by aniket ended
  },

  events: {
    async createUser(message) {
      const params: CreateUserEmailProps = {
        user: {
          name: message.user.name,
          email: message.user.email,
        },
      };

      console.log("message.user.email-------347", message.user.email);

      await identifyUser(message.user.email ?? message.user.id);
      await trackAnalytics({
        event: "User Signed Up",
        email: message.user.email,
        userId: message.user.id,
      });
      console.log("message.user.email-------355", message.user.email);

      await sendWelcomeEmail(params);
      console.log("message.user.email-------358", message.user.email);

    },
    async signIn(message) {
      await identifyUser(message.user.email ?? message.user.id);
      await trackAnalytics({
        event: "User Signed In",
        email: message.user.email,
      });
    },
  },
};

export default NextAuth(authOptions);
