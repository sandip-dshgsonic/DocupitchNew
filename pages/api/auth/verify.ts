// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/lib/prisma";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const { email, verificationCode } = req.body;

//   if (!email || !verificationCode) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     const user = await prisma.user.findUnique({ where: { email } });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     if (user.verificationCode !== verificationCode) {
//       return res.status(400).json({ error: "Invalid verification code" });
//     }

//     await prisma.user.update({
//       where: { email },
//       data: { verified: true, verificationCode: null },
//     });

//     return res.status(200).json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }


import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the verification code matches
    if (user.verificationCode !== verificationCode) {
      // If verification fails, delete the user
      await prisma.user.delete({ where: { email } });
      return res.status(400).json({ error: "Invalid verification code. User deleted." });
    }

    // Update user as verified and clear the verification code
    await prisma.user.update({
      where: { email },
      data: { verified: true, verificationCode: null },
    });

    return res.status(200).json({ message: "Email verified successfully",email:email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
