// import LoginLink from "@/components/emails/verification-link";

// import { sendEmail } from "@/lib/resend";

// export const sendVerificationRequestEmail = async (params: {
//   email: string;
//   url: string;
// }) => {
//   const { url, email } = params;
//   const emailTemplate = LoginLink({ url });
//   console.log("Sending verification request...");
//   console.log(`Identifier: ${email}`);
//   console.log(`URL --send verifica req--13: ${url}`);
//   try {
//     await sendEmail({
//       to: email as string,
//       subject: "Welcome to Papermark!",
//       react: emailTemplate,
//       test: process.env.NODE_ENV === "development",
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };




import LoginLink from "@/components/emails/verification-link";
import { sendEmail } from "@/lib/resend"; // Replace the import with the nodemailer version

export const sendVerificationRequestEmail = async (params: {
  email: string;
  url: string;
}) => {
  const { url, email } = params;
  const emailTemplate = LoginLink({ url });
  console.log("Sending verification request...");
  console.log(`Identifier: ${email}`);
  console.log(`Identifier url: ${url}`);
  console.log(`URL --send verifica req--13: ${url}`);
  try {
    await sendEmail({
      to: email,
      subject: "DocuPitch Authentication Email",
      react: emailTemplate,
      test: process.env.NODE_ENV === "development",
    });
  } catch (e) {
    console.error(e);
  }
};
