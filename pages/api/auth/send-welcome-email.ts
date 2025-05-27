
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
  

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Welcome to DocuPitch!",
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to DocuPitch</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f9f9f9; color: #333;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f9f9f9">
      <tr>
        <td align="center" style="padding: 40px 0;">
          <!-- Container Table -->
          <table width="600" border="0" cellspacing="0" cellpadding="0" style="border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <!-- Header -->
            <tr>
              <td align="center" bgcolor="#FFEDD5" style="padding: 20px;">
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center">
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
                    </td>
                  </tr>
                  <tr>
                    <td align="center" style="padding-top: 14px; padding-bottom: 4px;">
                      <h2 style="font-size: 22px; margin: 0; font-family: Arial, Helvetica, sans-serif; font-weight: 600;">Welcome to DocuPitch</h2>
                    </td>
                  </tr>
                  <tr>
                    <td align="center">
                      <p style="font-size: 14px; margin: 0; font-family: Arial, Helvetica, sans-serif;">Thanks for signing up!</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Content Section -->
            <tr>
              <td align="center" bgcolor="#ffffff" style="padding: 32px;">
                <table border="0" cellspacing="0" cellpadding="0" width="100%">
                  <tr>
                    <td align="center">
                      <p style="font-size: 14px; margin-bottom: 24px; font-family: Arial, Helvetica, sans-serif;">Here are a few things you can do to get started:</p>
                    </td>
                  </tr>
                  
                  <!-- Card 1 -->
                  <tr>
                    <td align="center" style="padding-bottom: 16px;">
                      <table width="536" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFEDD5" style="border-radius: 8px;">
                        <tr>
                          <td style="padding: 16px 24px;">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                              <tr>
                                <td width="16" valign="top" style="padding-right: 16px;">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 1.33334L1.33334 4.66668L8 8.00001L14.6667 4.66668L8 1.33334Z" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.33334 11.3333L8 14.6667L14.6667 11.3333" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.33334 8L8 11.3333L14.6667 8" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </td>
                                <td align="left">
                                  <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 4px 0; font-family: Arial, Helvetica, sans-serif;">Upload a pitch</h3>
                                  <p style="font-size: 14px; color: #666; margin: 0; font-family: Arial, Helvetica, sans-serif;">Share your ideas with potential investors</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Card 2 -->
                  <tr>
                    <td align="center" style="padding-bottom: 16px;">
                      <table width="536" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFEDD5" style="border-radius: 8px;">
                        <tr>
                          <td style="padding: 16px 24px;">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                              <tr>
                                <td width="16" valign="top" style="padding-right: 16px;">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M13.3333 2H2.66667C1.93029 2 1.33333 2.59695 1.33333 3.33333V12.6667C1.33333 13.403 1.93029 14 2.66667 14H13.3333C14.0697 14 14.6667 13.403 14.6667 12.6667V3.33333C14.6667 2.59695 14.0697 2 13.3333 2Z" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5.33333 1.33334V2.66668" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M10.6667 1.33334V2.66668" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M1.33333 6H14.6667" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </td>
                                <td align="left">
                                  <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 4px 0; font-family: Arial, Helvetica, sans-serif;">Create a virtual data room</h3>
                                  <p style="font-size: 14px; color: #666; margin: 0; font-family: Arial, Helvetica, sans-serif;">Securely share your documents</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Card 3 -->
                  <tr>
                    <td align="center" style="padding-bottom: 16px;">
                      <table width="536" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFEDD5" style="border-radius: 8px;">
                        <tr>
                          <td style="padding: 16px 24px;">
                            <table border="0" cellspacing="0" cellpadding="0" width="100%">
                              <tr>
                                <td width="16" valign="top" style="padding-right: 16px;">
                                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.66667 8.00001L7.33333 10.6667L11.3333 5.33334" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8.00001C14.6667 4.31811 11.6819 1.33334 8 1.33334C4.3181 1.33334 1.33333 4.31811 1.33333 8.00001C1.33333 11.6819 4.3181 14.6667 8 14.6667Z" stroke="#F97316" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
                                  </svg>
                                </td>
                                <td align="left">
                                  <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 4px 0; font-family: Arial, Helvetica, sans-serif;">Share a link with your custom domain</h3>
                                  <p style="font-size: 14px; color: #666; margin: 0; font-family: Arial, Helvetica, sans-serif;">Make your pitch look professional</p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <!-- Button -->
                  <tr>
                    <td align="center" style="padding-top: 24px; padding-bottom: 24px;">
                      <table border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" bgcolor="#F97316" style="border-radius: 8px;">
                            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/welcome" target="_blank" style="font-size: 16px; font-family: Arial, Helvetica, sans-serif; color: #ffffff; text-decoration: none; padding: 14px 28px;  display: inline-block; font-weight: 600;">Get Started</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer Section -->
            <tr>
              <td bgcolor="#ffffff" style="padding: 20px; border-top: 1px solid #E5E7EB;" align="center">
                <p style="font-size: 12px; color: #888; margin: 0; font-family: Arial, Helvetica, sans-serif;">© ${new Date().getFullYear()} DocuPitch. All rights reserved.</p>
              </td>
            </tr>
          </table>
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
