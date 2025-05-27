// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";
// import nodemailer from "nodemailer";

// // const transporter = nodemailer.createTransport({
// //   host: process.env.SMTP_HOST,
// //   port: parseInt(process.env.SMTP_PORT, 10),
// //   secure: process.env.SMTP_SECURE === "true",
// //   auth: {
// //     user: process.env.SMTP_USER,
// //     pass: process.env.SMTP_PASS,
// //   },
// // });

// //by aniket
// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || "",
//   port: parseInt(process.env.SMTP_PORT || "587", 10), // Default to 587 if undefined
//   secure: process.env.SMTP_SECURE === "true", 
//   auth: {
//     user: process.env.SMTP_USER || "",
//     pass: process.env.SMTP_PASS || "",
//   },
// });

// //by aniket end


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).json({ error: "Email is required" });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     await prisma.user.update({
//       where: { email },
//       data: { verificationCode: otp }, // 10 minutes expiry
//     });

//     // await transporter.sendMail({
//     //   from: process.env.SMTP_USER,
//     //   to: email,
//     //   subject: "Password Reset Verification Code",
//     //   text: `Your Verification Code is: ${otp}`,
//     //   html: `<p>Your Verification Code is: <strong>${otp}</strong></p>`,
//     // });
//     await transporter.sendMail({
//       from: process.env.SMTP_USER,
//       to: email,
//       subject: "Password Reset Verification Code",
//       text: `Your verification code is: ${otp}`,
//       html: `
//        <html>
//   <head>
//     <style>
//       @font-face {
//         font-family: 'PP Pangaia';
//         src: local('PP Pangaia'), url('your-font-path/pp-pangaia.woff2') format('woff2');
//       }

//       @font-face {
//         font-family: 'SF Pro Display';
//         src: local('SF Pro Display'), url('your-font-path/sf-pro-display.woff2') format('woff2');
//       }
//     </style>
//   </head>
//   <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f9f9f9; color: #333;">
//     <div style="width: 600px; margin: 40px auto; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

//       <!-- Top Section -->
//       <div style="width: 600px; height: 192px; background-color: #FFEDD5; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px; box-sizing: border-box;">
//         <div>
//           <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g clip-path="url(#clip0_626_1333)">
//               <path d="M36 36H0V0H36V36Z" stroke="#E5E7EB"/>
//               <path d="M18 0C18.3235 0 18.6469 0.0703125 18.9422 0.203906L32.1821 5.82188C33.7289 6.47578 34.8821 8.00156 34.875 9.84375C34.8399 16.8188 31.9711 29.5805 19.8563 35.3813C18.6821 35.9438 17.318 35.9438 16.1438 35.3813C4.02894 29.5805 1.16019 16.8188 1.12503 9.84375C1.118 8.00156 2.27113 6.47578 3.818 5.82188L17.0649 0.203906C17.3532 0.0703125 17.6766 0 18 0ZM18 4.69688V31.275C27.7032 26.5781 30.3118 16.1789 30.375 9.94219L18 4.69688Z" fill="#F97316"/>
//             </g>
//             <defs>
//               <clipPath id="clip0_626_1333">
//                 <rect width="36" height="36" fill="white"/>
//               </clipPath>
//             </defs>
//           </svg>
//         </div>
//         <h2 style="font-size: 22px; margin: 14px 0 4px 0; font-family: 'PP Pangaia', sans-serif; font-weight: 600;">
//           Reset Your Password
//         </h2>
//         <p style="font-size: 14px; font-family: 'SF Pro Display', sans-serif; margin: 0;">
//           We received a request to reset your password.
//         </p>
//       </div>

//       <!-- Middle and Bottom Sections (same as earlier layout) -->
// <!-- Middle Section -->
// <div style="width: 600px; height: 356px; background-color: #ffffff; padding: 32px; box-sizing: border-box; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
//   <!-- Code Box -->
//   <div style="width: 536px; height: 168px; background-color: #F9FAFB; border-radius: 8px; padding: 24px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center;">
//     <p style="font-size: 16px; margin-bottom: 16px;">Your verification code is:</p>
    
//     <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
//       <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
//         ${otp[0]}
//       </div>
//       <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
//         ${otp[1]}
//       </div>
//       <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
//         ${otp[2]}
//       </div>
//       <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
//         ${otp[3]}
//       </div>
//       <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
//         ${otp[4]}
//       </div>
//       <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
//         ${otp[5]}
//       </div>
//     </div>

   
//   </div>
//   <!-- Below the Code Box -->
// <p style="font-size: 14px; color: #666; margin-top: 24px; text-align: center;">
//   Didn't request this? You can safely ignore this email.
// </p>
// </div>


      
//       <div style="width: 600px; height: 97px; background-color: #ffffff; border-top: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center;">
//         <p style="font-size: 12px; color: #888; margin: 0;">
//           © ${new Date().getFullYear()} DocuPitch. All rights reserved.
//         </p>
//       </div>

//     </div>
//   </body>
// </html>

//       `,
//     });

//     res.status(200).json({ message: "Verification Code sent to email" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// }

 // <html>
        //   <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f9f9f9; color: #333;">
        //     <div style="max-width: 500px; margin: 40px auto; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
        //       <div style="text-align: center; margin-bottom: 20px;">
        //         <img src="https://github.com/Aniket-Shival/popup/blob/main/logo.png?raw=true" alt="Your Logo" style="height: 100px; width: 100px; margin: 0 auto; display: block;">
        //       </div>
        //       <h2 style="text-align: center; font-size: 24px; margin: 10px 0; font-weight: bold;">DocuPitch</h2>
        //       <p style="text-align: center; font-size: 18px; margin: 10px 0; font-weight: 600;">Password Reset Code</p>
        //       <p style="font-size: 14px; line-height: 1.5; margin: 10px 0; text-align: center;">
        //         We received a request to reset your password. Please use the verification code below to proceed.
        //       </p>
        //       <div style="text-align: center; margin: 20px 0;">
        //         <div style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: #fff; font-size: 16px; font-weight: bold; border-radius: 4px;">
        //           ${otp}
        //         </div>
        //       </div>
        //       <p style="font-size: 14px; line-height: 1.5; margin: 10px 0; text-align: center;">
        //         If you didn’t request this, please ignore this email.
        //       </p>
        //       <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
        //         © ${new Date().getFullYear()} DocuPitch. All rights reserved.
        //       </p>
        //     </div>
        //   </body>
        // </html>














        import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.update({
      where: { email },
      data: { verificationCode: otp },
    });

    const otpHTML = otp
      .split("")
      .map(
        (digit) => `
        <td style="padding: 0 6px;">
          <div style="width: 40px; height: 40px; border: 2px solid #FFEDD5; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center; background-color: #fff; border-radius: 4px;">
            ${digit}
          </div>
        </td>`
      )
      .join("");

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset Verification Code",
      html: `
<!DOCTYPE html>
<html>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f9f9f9;">
    <table align="center" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; margin: 40px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
      <tr>
        <td align="center" style="background-color: #FFEDD5; padding: 40px;">
          <h2 style="margin: 0; font-size: 22px; color: #333;">Reset Your Password</h2>
          <p style="margin-top: 10px; font-size: 14px; color: #333;">We received a request to reset your password.</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 32px; text-align: center;">
          <p style="font-size: 16px; color: #333;">Your verification code is:</p>
         <table align="center" cellpadding="0" cellspacing="0" style="margin: 20px auto;">
  <tr>
    ${otp
      .split("")
      .map(
        (digit) => `
        <td align="center" valign="middle" style="padding: 0 6px;">
          <div style="width: 40px; height: 40px; border: 2px solid #FFEDD5; padding-left:25px ;padding-top:10px; font-size: 20px; font-weight: bold; color: #F97316; display: flex; align-items: center; justify-content: center; background-color: #fff; border-radius: 4px;">
            ${digit}
          </div>
        </td>`
      )
      .join("")}
  </tr>
</table>
          <p style="font-size: 14px; color: #666;">Didn't request this? You can safely ignore this email.</p>
        </td>
      </tr>
      <tr>
        <td style="background-color: white; text-align: center; padding: 20px; font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} DocuPitch. All rights reserved.
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    });

    res.status(200).json({ message: "Verification Code sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
