// /pages/api/auth/resend-code.ts

import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Configure the transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT ?? "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
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

    const newCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.update({
      where: { email },
      data: { verificationCode: newCode },
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Resend: Verify Code for DocuPitch",
      text: `Your verification code is: ${newCode}`,
      html: `
       <html>
  <body style="margin: 0; padding: 0; font-family: 'SF Pro Display', sans-serif; background-color: #f9f9f9; color: #333;">
    <div style="width: 600px; margin: 40px auto; background: #fff; border: 1px solid #ddd; border-radius: 12px; overflow: hidden;">

      <!-- Top Section -->
      <div style="height: 192px; background-color: #FFEDD5; display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_626_1333)">
            <path d="M36 36H0V0H36V36Z" stroke="#E5E7EB"/>
            <path d="M18 0C18.3235 0 18.6469 0.0703125 18.9422 0.203906L32.1821 5.82188C33.7289 6.47578 34.8821 8.00156 34.875 9.84375C34.8399 16.8188 31.9711 29.5805 19.8563 35.3813C18.6821 35.9438 17.318 35.9438 16.1438 35.3813C4.02894 29.5805 1.16019 16.8188 1.12503 9.84375C1.118 8.00156 2.27113 6.47578 3.818 5.82188L17.0649 0.203906C17.3532 0.0703125 17.6766 0 18 0ZM18 4.69688V31.275C27.7032 26.5781 30.3118 16.1789 30.375 9.94219L18 4.69688Z" fill="#F97316"/>
          </g>
          <defs>
            <clipPath id="clip0_626_1333">
              <rect width="36" height="36" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <h2 style="margin: 16px 0 4px 0; font-size: 24px; font-family: 'PP Pangaia', sans-serif;">Verify Your Email</h2>
        <p style="margin: 0; font-size: 16px;">Welcome to DocuPitch!</p>
      </div>

   <div style="width: 600px; height: 356px; background-color: #ffffff; padding: 32px; box-sizing: border-box; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center;">
  <!-- Code Box -->
  <div style="width: 536px; height: 168px; background-color: #F9FAFB; border-radius: 8px; padding: 24px; box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: center;">
    <p style="font-size: 16px; margin-bottom: 16px;">Your verification code is:</p>
    
    <div style="display: flex; gap: 12px; justify-content: center; margin-bottom: 16px;">
      <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
        ${newCode[0]}
      </div>
      <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
        ${newCode[1]}
      </div>
      <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
        ${newCode[2]}
      </div>
      <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
        ${newCode[3]}
      </div>
      <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
        ${newCode[4]}
      </div>
      <div style="width: 48px; height: 48px; background-color: #ffffff; border: 2px solid #FFEDD5; border-radius: 5px; font-size: 20px; font-weight: bold; display: flex; align-items: center; justify-content: center;">
        ${newCode[5]}
      </div>
    </div>

   

  <!-- Footer text -->
  <p style="font-size: 14px; color: #666; margin-top: 24px;">
    Didn't request this? You can safely ignore this email.
  </p>
</div>


      <!-- Bottom Section -->
      <div style="height: 97px; background-color: #ffffff; border-top: 1px solid #E5E7EB; display: flex; align-items: center; justify-content: center;">
        <p style="font-size: 12px; color: #888;">
          © ${new Date().getFullYear()} DocuPitch. All rights reserved.
        </p>
      </div>

    </div>
  </body>
</html>

      `,
    });

    return res.status(200).json({ message: "Verification code resent" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// <html>
// <body style="margin: 0; padding: 0; font-family: sans-serif; background-color: #f9f9f9; color: #333;">
//   <div style="max-width: 500px; margin: 40px auto; background: #fff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
//     <div style="text-align: center; margin-bottom: 20px;">
//       <img src="https://github.com/Aniket-Shival/popup/blob/main/logo.png?raw=true" alt="DocuPitch Logo" style="height: 100px; width: 100px; margin: 0 auto; display: block;">
//     </div>
//     <h2 style="text-align: center; font-size: 24px; margin: 10px 0; font-weight: bold;">DocuPitch</h2>
//     <p style="text-align: center; font-size: 18px; margin: 10px 0; font-weight: 600;">Verify Your Email</p>
//     <p style="font-size: 14px; line-height: 1.5; margin: 10px 0; text-align: center;">
//       Welcome to DocuPitch! Please use the verification code below to verify your email address.
//     </p>
//     <div style="text-align: center; margin: 20px 0;">
//       <div style="display: inline-block; padding: 12px 20px; background-color: #000; color: #fff; font-size: 16px; font-weight: bold; border-radius: 4px;">
//         ${newCode}
//       </div>
//     </div>
//     <p style="font-size: 14px; line-height: 1.5; margin: 10px 0; text-align: center;">
//       If you didn’t request this, please ignore this email.
//     </p>
//     <p style="font-size: 12px; color: #888; text-align: center; margin-top: 20px;">
//       © ${new Date().getFullYear()} DocuPitch. All rights reserved.
//     </p>
//   </div>
// </body>
// </html>