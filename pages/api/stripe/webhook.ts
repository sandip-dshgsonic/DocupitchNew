// import { checkoutSessionCompleted } from "@/lib/stripe/webhooks/checkout-session-completed";
// import { customerSubsciptionUpdated } from "@/lib/stripe/webhooks/customer-subscription-updated";
// import { customerSubscriptionDeleted } from "@/lib/stripe/webhooks/customer-subscription-deleted";

// Handle Stripe events
// switch (event.type) {
//   case "checkout.session.completed":
//     await checkoutSessionCompleted(event);
//     break;
//   case "customer.subscription.updated":
//     await customerSubsciptionUpdated(event, res);
//     break;
//   case "customer.subscription.deleted":
//     await customerSubscriptionDeleted(event, res);
//     break;
// }


// by aniket

import type { NextApiRequest, NextApiResponse } from "next";
import { checkoutSessionCompleted } from "@/lib/stripe/webhooks/checkout-session-completed";
import { customerSubsciptionUpdated } from "@/lib/stripe/webhooks/customer-subscription-updated";
import { customerSubscriptionDeleted } from "@/lib/stripe/webhooks/customer-subscription-deleted";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Extract the event from the request body
  const event = req.body;
  if (!event) {
    return res.status(400).send("No event data");
  }

  try {
    // Handle Stripe events based on their type
    switch (event.type) {
      case "checkout.session.completed":
        await checkoutSessionCompleted(event);
        break;
      case "customer.subscription.updated":
        await customerSubsciptionUpdated(event, res);
        break;
      case "customer.subscription.deleted":
        await customerSubscriptionDeleted(event, res);
        break;
      default:
        return res.status(400).send("Unhandled event type");
    }
    res.status(200).send("Success");
  } catch (error) {
    console.error("Error handling webhook event:", error);
    res.status(500).send("Webhook Error");
  }
}
