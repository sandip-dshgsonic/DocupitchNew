import WelcomeEmail from "@/components/emails/welcome";

import { sendEmail } from "@/lib/resend";

import { CreateUserEmailProps } from "../types";
import { cp } from "fs";

export const sendWelcomeEmail = async (params: CreateUserEmailProps) => {
  const { name, email } = params.user;
  const emailTemplate = WelcomeEmail({ name });
  console.log("Sending welcome email to-11:", email);
  try {
    await sendEmail({
      to: email as string,
      subject: "Welcome to DocuPitch!",
      react: emailTemplate,
      test: process.env.NODE_ENV === "development",
    });
  } catch (e) {
    console.error(e);
  }
};
