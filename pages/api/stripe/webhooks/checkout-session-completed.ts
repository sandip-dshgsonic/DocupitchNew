import prisma from "@/lib/prisma"; // Adjust import based on your project structure  // by aniket
// import { prisma } from "@/lib/prisma"; // Adjust import based on your project structure
// import { stripe } from "@/lib/stripe";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe"; // ✅ Import Stripe types

export async function checkoutSessionCompleted(event: Stripe.Event) {
  const session = event.data.object as Stripe.Checkout.Session;

  console.log("Checkout session completed:", session);

  if (session.mode === "subscription" && session.subscription) {
    const subscriptionId = session.subscription as string;
    const clientReferenceId = session.client_reference_id as string;

    // Fetch the subscription details from Stripe
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log("Fetched subscription:", subscription);

    // Update your database with subscription details
    await prisma.team.update({
      where: { id: clientReferenceId }, // Team ID passed as client_reference_id
      data: {
        subscriptionId: subscription.id,
        plan: subscription.items.data[0].price.id, // Example: Use price ID
      },
    });

    console.log("Subscription updated in the database.");
  } else {
    console.warn("No subscription found in session.");
  }
}
