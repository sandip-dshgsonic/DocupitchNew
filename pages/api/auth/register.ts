
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  // port: parseInt(process.env.SMTP_PORT, 10),
  port: parseInt(process.env.SMTP_PORT ?? "587", 10), // by aniket

  secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        verificationCode,
        verified: false,
      },
    });

    // Get the base URL for logo (you may need to adjust this based on your setup)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const logoUrl = `${baseUrl}/logo.png`;

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Verify Your Email - DocuPitch",
      text: `Welcome to DocuPitch! Your verification code is: ${verificationCode}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification - DocuPitch</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; background-color: #f8fafc; line-height: 1.6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    
    <!-- Header with Logo -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); border-radius: 12px 12px 0 0;">
      <tr>
        <td style="padding: 40px 30px; text-align: center;">
          <img src="${logoUrl}" alt="DocuPitch Logo" style="height: 50px; width: auto; margin-bottom: 20px; display: block; margin-left: auto; margin-right: auto;" />
          <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            Welcome to DocuPitch
          </h1>
          <p style="margin: 8px 0 0 0; color: #FED7AA; font-size: 16px; font-weight: 400;">
            Verify your email to get started
          </p>
        </td>
      </tr>
    </table>

    <!-- Main Content -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff;">
      <tr>
        <td style="padding: 48px 40px 32px 40px;">
          <div style="text-align: center;">
            <h2 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 600; color: #1f2937;">
              Email Verification Required
            </h2>
            <p style="margin: 0 0 32px 0; font-size: 16px; color: #6b7280; line-height: 1.5;">
              Thank you for signing up! Please enter the verification code below to activate your account and start using DocuPitch.
            </p>
            
            <!-- Verification Code -->
            <div style="margin: 32px 0; padding: 32px; background-color: #fefefe; border: 2px solid #f3f4f6; border-radius: 12px;">
              <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600; color: #374151;">
                Your Verification Code
              </p>
              <table align="center" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                <tr>
                  ${verificationCode
          .split("")
          .map(
            (digit) => `
                  <td style="padding: 0 4px;">
                    <div style="
                      width: 50px; 
                      height: 50px; 
                      background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); 
                      color: #ffffff; 
                      font-size: 24px; 
                      font-weight: bold; 
                      display: flex; 
                      align-items: center; 
                      justify-content: center; 
                      border-radius: 8px; 
                      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); 
                      text-align: center; 
                      line-height: 50px;
                    ">
                      ${digit}
                    </div>
                  </td>`
          )
          .join("")}
                </tr>
              </table>
              <p style="margin: 24px 0 0 0; font-size: 14px; color: #9ca3af;">
                This code will expire in 10 minutes
              </p>
            </div>

            <!-- Instructions -->
            <div style="background-color: #fef3e2; border: 1px solid #fbbf24; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: left;">
              <h3 style="margin: 0 0 12px 0; font-size: 16px; font-weight: 600; color: #92400e;">
                📋 Next Steps:
              </h3>
              <ul style="margin: 0; padding-left: 20px; color: #92400e; font-size: 14px;">
                <li style="margin-bottom: 8px;">Copy the 6-digit code above</li>
                <li style="margin-bottom: 8px;">Return to the DocuPitch verification page</li>
                <li>Paste the code to complete your registration</li>
              </ul>
            </div>

            <!-- Security Notice -->
            <div style="background-color: #f9fafb; border-left: 4px solid #d1d5db; padding: 16px; margin: 24px 0; text-align: left;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                <strong>🔒 Security Notice:</strong> If you didn't create an account with DocuPitch, please ignore this email. Your security is important to us.
              </p>
            </div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Footer -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-radius: 0 0 12px 12px;">
      <tr>
        <td style="padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
          <p style="margin: 0 0 12px 0; font-size: 14px; color: #6b7280;">
            Need help? Contact our support team at 
            <a href="mailto:support@docupitch.com" style="color: #F97316; text-decoration: none; font-weight: 500;">
              support@docupitch.com
            </a>
          </p>
          <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            © ${new Date().getFullYear()} DocuPitch. All rights reserved.
          </p>
          <p style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;">
            This email was sent to ${email}
          </p>
        </td>
      </tr>
    </table>

  </div>
</body>
</html>
      `,
    });

    return res.status(200).json({ message: "Verification code sent to email" });
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
//         ${verificationCode}
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