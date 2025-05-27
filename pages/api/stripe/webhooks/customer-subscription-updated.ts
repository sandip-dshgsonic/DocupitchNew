import prisma from "@/lib/prisma"; // Adjust import based on your project structure  // by aniket
// import { prisma } from "@/lib/prisma"; // Adjust import based on your project structure
// import { stripe } from "@/lib/stripe";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe"; // ✅ Import Stripe types
import type { NextApiRequest, NextApiResponse } from "next";

export async function customerSubsciptionUpdated(
  event: Stripe.Event,
  res: NextApiResponse
) {
  const subscription = event.data.object as Stripe.Subscription;

  console.log("Subscription updated:", subscription);

  // Update your database with the updated subscription status
  await prisma.team.update({
    where: { subscriptionId: subscription.id },
    data: {
      plan: subscription.items.data[0].price.id, // Use price ID for the plan
      // status: subscription.status, // Update the subscription status  // by aniket
    },
  });

  res.status(200).end();
}
