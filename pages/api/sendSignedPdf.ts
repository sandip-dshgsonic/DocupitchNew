// import { NextApiRequest, NextApiResponse } from "next";
// import nodemailer from "nodemailer";

// // Configure the transporter using environment variables
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT ?? "587", 10),
//   secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports (typically 587)
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   // Only allow POST method
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   try {
//     const { documentId, viewId, linkId, versionNumber, signedPdf, additionalEmails,viewerEmail } = req.body;

//     // Convert the signed PDF (sent as an array of numbers) back into a Buffer
//     const pdfBuffer = Buffer.from(signedPdf);

//     // Define recipient emails
//     // You can optionally set these via environment variables or retrieve viewer email from session
//     const adminEmail = process.env.ADMIN_EMAIL || "aniket@dshgsonic.com";
//     // const viewerEmail = viewerEmail || "viewer@example.com";
//     // 'additionalEmails' is expected to be an array
//     const recipients = [adminEmail, viewerEmail, ...(Array.isArray(additionalEmails) ? additionalEmails : [])];

//     // Send the email with the signed PDF as an attachment
//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: recipients.join(","),
//       subject: "Signed PDF Document",
//       text: "Please find the signed PDF attached.",
//       attachments: [
//         {
//           filename: "signed-document.pdf",
//           content: pdfBuffer,
//         },
//       ],
//     });

//     // Return a success response
//     res.status(200).json({ message: "Email sent successfully" });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res.status(500).json({ error: "Failed to send email" });
//   }
// }


// pages/api/sendSignedPdf.ts







// export const config = {
//     api: {
//       bodyParser: {
//         sizeLimit: '10mb', // Increase the limit to 10mb (adjust as needed)
//       },
//     },
//   };
  
//   import { NextApiRequest, NextApiResponse } from "next";
//   import nodemailer from "nodemailer";
//   import { signOut, useSession } from "next-auth/react";
//   const { data: session, status } = useSession()
  
//   // Configure the transporter using environment variables
//   const transporter = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: parseInt(process.env.SMTP_PORT ?? "587", 10),
//     secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });
  
//   export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     // Only allow POST method
//     if (req.method !== "POST") {
//       return res.status(405).json({ error: "Method not allowed" });
//     }
  
//     try {
//       const { documentId, viewId, linkId, versionNumber, signedPdf, additionalEmails , viewerEmail} = req.body;
  
//       // Convert the signed PDF (sent as an array of numbers) back into a Buffer
//       const pdfBuffer = Buffer.from(signedPdf);
  
//       // Define recipient emails
//       const adminEmail = session?.user?.email;
//     //   const viewerEmail = process.env.VIEWER_EMAIL || "viewer@example.com";
//       const recipients = [adminEmail, viewerEmail, ...(Array.isArray(additionalEmails) ? additionalEmails : [])];
  
//       // Send the email with the signed PDF as an attachment
//       await transporter.sendMail({
//         from: process.env.SMTP_USER,
//         to: recipients.join(","),
//         subject: "Signed PDF Document",
//         text: "Please find the signed PDF attached.",
//         attachments: [
//           {
//             filename: "signed-document.pdf",
//             content: pdfBuffer,
//           },
//         ],
//       });
  
//       // Return a success response
//       res.status(200).json({ message: "Email sent successfully" });
//     } catch (error) {
//       console.error("Error sending email:", error);
//       res.status(500).json({ error: "Failed to send email" });
//     }
//   }
  


export const config = {
    api: {
      bodyParser: {
        sizeLimit: '10mb', // Increase the limit to 10mb (adjust as needed)
      },
    },
  };
  
  import { NextApiRequest, NextApiResponse } from "next";
  import nodemailer from "nodemailer";
  import { getServerSession } from "next-auth";
  import { authOptions } from "../api/auth/[...nextauth]"; // Adjust this path if your authOptions file is located elsewhere
  
  // Configure the transporter using environment variables
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? "587", 10),
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    try {
      const session = await getServerSession(req, res, authOptions);
      console.log('----session 30',session)
      const adminEmail = session?.user?.email;
  
      const { documentId, viewId, linkId, versionNumber, signedPdf, additionalEmails, viewerEmail, creatorEmail } = req.body;
  
      const pdfBuffer = Buffer.from(signedPdf);
  
      const recipients = [
   
        viewerEmail,
        creatorEmail,
        ...(Array.isArray(additionalEmails) ? additionalEmails : []),
      ].filter(Boolean); // Remove undefined or null
      console.log("Recipients:", recipients);
      // return 'ok'
  
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: recipients.join(","),
        subject: "Signed PDF Document",
        text: "Please find the signed PDF attached.",
        attachments: [
          {
            filename: "signed-document.pdf",
            content: pdfBuffer,
          },
        ],
      });
  
      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  }
  