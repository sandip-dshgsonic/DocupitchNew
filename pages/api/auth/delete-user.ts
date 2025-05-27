import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

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

    // if (!user) {
    //   return res.status(404).json({ error: "User not found" });
    // }

    await prisma.user.delete({ where: { email } });

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "User deleted successfully" });
  }
}
