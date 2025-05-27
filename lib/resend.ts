// import { JSXElementConstructor, ReactElement } from "react";

// import { Resend } from "resend";

// import { log, nanoid } from "@/lib/utils";

// export const resend = process.env.RESEND_API_KEY
//   ? new Resend(process.env.RESEND_API_KEY)
//   : null;

// export const sendEmail = async ({
//   to,
//   subject,
//   react,
//   marketing,
//   system,
//   test,
//   cc,
//   scheduledAt,
// }: {
//   to: string;
//   subject: string;
//   react: ReactElement<any, string | JSXElementConstructor<any>>;
//   marketing?: boolean;
//   system?: boolean;
//   test?: boolean;
//   cc?: string | string[];
//   scheduledAt?: string;
// }) => {
//   if (!resend) {
//     // Throw an error if resend is not initialized
//     throw new Error("Resend not initialized");
//   }

//   try {
//     const { data, error } = await resend.emails.send({
//       from: marketing
//         ? "Marc from Papermark <marc@ship.papermark.io>"
//         : system
//           ? "Papermark <system@papermark.io>"
//           : !!scheduledAt
//             ? "Marc Seitz <marc@papermark.io>"
//             : "Marc from Papermark <marc@papermark.io>",
//       to: test ? "delivered@resend.dev" : to,
//       cc: cc,
//       replyTo: marketing ? "marc@papermark.io" : undefined,
//       subject,
//       react,
//       scheduledAt,
//       headers: {
//         "X-Entity-Ref-ID": nanoid(),
//       },
//     });

//     // Check if the email sending operation returned an error and throw it
//     if (error) {
//       log({
//         message: `Resend returned error when sending email: ${error.name} \n\n ${error.message}`,
//         type: "error",
//         mention: true,
//       });
//       throw error;
//     }

//     // If there's no error, return the data
//     return data;
//   } catch (exception) {
//     // Log and rethrow any caught exceptions for upstream handling
//     log({
//       message: `Unexpected error when sending email: ${exception}`,
//       type: "error",
//       mention: true,
//     });
//     throw exception; // Rethrow the caught exception
//   }
// };






import nodemailer from "nodemailer";
import { log, nanoid } from "@/lib/utils";

export const sendEmail = async ({
  to,
  subject,
  react,
  marketing,
  system,
  test,
  cc,
  scheduledAt,
}: {
  to: string;
  subject: string;
  react: React.ReactElement;
  marketing?: boolean;
  system?: boolean;
  test?: boolean;
  cc?: string | string[];
  scheduledAt?: string;
}) => {
  try {
    console.log("-------106 resend ",to,test)
    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587", 10),
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // SMTP username
        pass: process.env.SMTP_PASS, // SMTP password
      },
    });

    // Generate email HTML content from React component (if needed)
    const emailHtml = renderEmailTemplate(react); // You can implement this function to convert react elements to HTML

    // Define email options
    const mailOptions = {
      from: marketing
        ? "DocuPitch"
        : system
        ? "DocuPitch"
        : !!scheduledAt
        ? "DocuPitch"
        : "DocuPitch",
      to: test ?  to : "test@example.com",
      cc: cc,
      subject: subject,
      html: emailHtml, // The rendered HTML content
      headers: {
        "X-Entity-Ref-ID": nanoid(),
      },
    };

    // Send the email using the transporter
    const info = await transporter.sendMail(mailOptions);

    log({
      message: `Email sent: ${info.messageId}`,
      type: "info",
    });

    return info;
  }  catch (error) {
    const typedError = error as Error; // Cast 'error' to 'Error'
    log({
      message: `Failed to send email: ${typedError.message}`,
      type: 'error',
      mention: true,
    });
    throw error;
  }
};

// Function to render React component to HTML (implement as needed)
const renderEmailTemplate = (reactElement: React.ReactElement) => {
  // Use a library like `react-dom/server` to render React components as HTML
  const { renderToStaticMarkup } = require("react-dom/server");
  return renderToStaticMarkup(reactElement);
};