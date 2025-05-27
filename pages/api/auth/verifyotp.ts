import type { NextApiRequest, NextApiResponse } from "next";  // by aniket
import prisma from "../../../lib/prisma"; // adjust the path as necessary   // by aniket

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }
  
    const { email, otp } = req.body;
  
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and Verification Code are required" });
    }
  
    try {
      const user = await prisma.user.findUnique({ where: { email } });
  
      if (!user || user.verificationCode !== otp ) {
        console.log('16--- verifyopt ',user)
        return res.status(400).json({ error: `Invalid or expired OTP` });
      }
  
      // OTP is verified, clear OTP fields
      await prisma.user.update({
        where: { email },
        data: { verificationCode: null, canChangePassword:true },
      });
  
      res.status(200).json({ message: "Code verified successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
  